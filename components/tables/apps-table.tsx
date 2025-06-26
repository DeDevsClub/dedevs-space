"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
  TableMeta,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown } from "lucide-react";
import { Icon } from "@iconify/react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dapp } from "@/config/types";
import dappsData from "@/data/dapps.json";

interface AppsTableMeta extends TableMeta<Dapp> {
  handleCopyUrl: (url: string) => Promise<void>;
  copiedUrl: string | null;
}

export const columns: ColumnDef<Dapp>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-between w-full cursor-pointer text-foreground hover:bg-muted-background"
        >
          Name
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "url",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="justify-between w-full cursor-pointer text-foreground hover:bg-muted-background"
        >
          URL
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row, table }) => {
      const url: string = row.getValue("url");
      const meta = table.options.meta as AppsTableMeta | undefined;
      const isCopied = meta?.copiedUrl === url;
      const displayUrl = url.split("/")[2] || url;

      return (
        <div className="font-medium justify-end items-center flex w-full">
          <div
            className="flex items-center gap-2 truncate mr-2"
            title={displayUrl}
          >
            {displayUrl}
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Icon
              icon={isCopied ? "tabler:check" : "tabler:copy"}
              className={`inline-block size-4 cursor-pointer ${
                isCopied ? "text-green-500" : "hover:text-primary"
              }`}
              onClick={() => meta?.handleCopyUrl?.(url)}
            />
            <Icon
              icon="tabler:external-link"
              className="inline-block size-4 cursor-pointer hover:text-primary"
              onClick={() => window.open(url, "_blank")}
            />
          </div>
        </div>
      );
    },
  },
];

export function AppsTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [copiedUrl, setCopiedUrl] = React.useState<string | null>(null);

  const handleCopyUrl = async (urlToCopy: string) => {
    try {
      await navigator.clipboard.writeText(urlToCopy);
      toast.success("URL copied to clipboard!");
      setCopiedUrl(urlToCopy);
      setTimeout(() => setCopiedUrl(null), 2000); // Reset icon after 2 seconds
    } catch (err) {
      toast.error("Failed to copy URL.");
      console.error("Failed to copy URL: ", err);
    }
  };

  const data: Dapp[] = dappsData.dapps;

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
    meta: {
      // Pass methods and state to table instance
      handleCopyUrl,
      copiedUrl,
    } as AppsTableMeta, // Cast meta to our defined interface
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 bg-background">
        <Input
          placeholder="Filter titles..." // Corrected placeholder
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""} // Corrected column name
          onChange={
            (event) =>
              table.getColumn("title")?.setFilterValue(event.target.value) // Corrected column name
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AppsTable;
