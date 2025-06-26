"use client";

import React, { createContext, useContext, useRef, useState, useEffect } from "react";
import { X, Menu } from "lucide-react";
import clsx from "clsx";

// Sidebar Context for global control
const SidebarContext = createContext<{
  open: boolean;
  toggle: () => void;
  close: () => void;
} | null>(null);

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen((v) => !v);
  const close = () => setOpen(false);

  return (
    <SidebarContext.Provider value={{ open, toggle, close }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  const ctx = useContext(SidebarContext);
  if (!ctx) throw new Error("useSidebar must be used within SidebarProvider");
  return ctx;
}

// Sidebar Toggle Button (can be placed anywhere, e.g., in SiteHeader)
export function SidebarToggleButton({ className }: { className?: string }) {
  const { toggle, open } = useSidebar();
  // "fixed top-4 left-4 z-50 p-2 rounded-full bg-background shadow hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary",
  return (
    <button
      aria-label={open ? "Close sidebar" : "Open sidebar"}
      className={clsx(
        `fixed top-0 left-0 sm:top-4 sm:left-4 z-50 p-1.5 w-screen sm:w-12 max-w-full justify-center items-center bg-blue-200/20 opacity-70 sm:opacity-100 
        sm:shadow hover:bg-accent transition-colors focus:outline-none focus:ring-2 focus:ring-primary
        rounded-lg
        `,
        className
      )}
      onClick={toggle}
    >
      {open ? <X className="h-6 w-full" /> : <Menu className="h-6 w-full" />}
    </button>
  );
}

// Sidebar Drawer
export function Sidebar({ children }: { children?: React.ReactNode }) {
  const { open, close } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node)
      ) {
        close();
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") close();
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, close]);

  return (
    <>
      {/* Overlay */}
      <div
        className={clsx(
          "fixed inset-0 z-40 bg-black/30 transition-opacity",
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        aria-hidden={!open}
      />
      {/* Sidebar Drawer */}
      <aside
        ref={sidebarRef}
        className={clsx(
          "fixed top-0 left-0 z-50 h-full w-72 max-w-[90vw] bg-background shadow-lg border-r border-border transition-transform duration-300 flex flex-col",
          open ? "translate-x-0" : "-translate-x-full"
        )}
        tabIndex={-1}
        aria-label="Sidebar"
      >
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* NavMenu */}
          {children}
        </div>
      </aside>
    </>
  );
}