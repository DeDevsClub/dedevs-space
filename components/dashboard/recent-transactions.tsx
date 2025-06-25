import {
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Transaction,
  mockTransactions
} from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// In a real app, this data would be fetched or passed as props
const transactions: Transaction[] = mockTransactions;

export default function RecentTransactions() {
  const getStatusBadgeVariant = (status: Transaction['status']) => {
    switch (status) {
      case 'completed':
        return 'default'; // Or 'success' if you have that variant
      case 'pending':
        return 'secondary'; // Or 'warning'
      case 'failed':
        return 'destructive';
      default:
        return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>
          A list of your recent vault activity.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.length > 0 ? (
              transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    {transaction.description}
                  </TableCell>
                  <TableCell
                    className={cn(
                      "text-right",
                      transaction.amount < 0 ? "text-red-500" : "text-green-500"
                    )}
                  >
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: transaction.currency,
                    }).format(transaction.amount)}
                  </TableCell>
                  <TableCell className="capitalize">{transaction.type}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(transaction.status)} className="capitalize">
                      {transaction.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
