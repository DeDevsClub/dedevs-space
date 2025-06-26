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
        `fixed top-0 left-0 sm:top-4 sm:left-4 z-50 p-1.5 w-screen sm:w-12 max-w-full justify-center items-center bg-neutral-200/20 dark:bg-neutral-800/20
        hover:shadow-lg hover:border hover:border-neutral-500 hover:bg-neutral-500 dark:hover:border-neutral-900 dark:hover:bg-neutral-900 cursor-pointer
        sm:shadow transition-all 
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

// Hook to detect mobile (below sm)
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 640); // Tailwind 'sm' breakpoint
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

// Sidebar Drawer
export function Sidebar({ children }: { children?: React.ReactNode }) {
  const { open, close } = useSidebar();
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

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
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm transition-opacity"
          aria-hidden="true"
          onClick={close}
        />
      )}
      {/* Sidebar Drawer */}
      {isMobile ? (
        <aside
          ref={sidebarRef}
          className={clsx(
            "fixed z-50 bg-background shadow-lg transition-transform duration-300 ease-in-out w-full left-0",
            open ? "translate-y-0" : "-translate-y-full",
            "top-0 h-[90vh] rounded-b-2xl border-b border-border",
            open ? "pointer-events-auto" : "pointer-events-none"
          )}
          style={{
            transitionProperty: "transform, box-shadow, opacity",
          }}
          aria-label="Sidebar"
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* NavMenu */}
            {children}
          </div>
        </aside>
      ) : (
        <aside
          ref={sidebarRef}
          className={clsx(
            "fixed z-50 bg-background shadow-lg transition-transform duration-300 ease-in-out",
            open ? "translate-x-0" : "-translate-x-full",
            "top-0 left-0 h-full w-72 sm:w-80 sm:rounded-r-2xl sm:border-r sm:border-border",
            open ? "pointer-events-auto" : "pointer-events-none"
          )}
          style={{
            transitionProperty: "transform, box-shadow, opacity",
          }}
          aria-label="Sidebar"
        >
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {/* NavMenu */}
            {children}
          </div>
        </aside>
      )}
    </>
  );
}