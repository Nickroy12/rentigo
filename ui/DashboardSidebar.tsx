"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Home,
  FileText,
  CreditCard,
  Settings,
  StickyNotePlus,
  CookingPot,
  ShoppingCart,
  LucideIcon,
  MessagesSquare,
  TicketPercent,
  LayoutDashboard,
} from "lucide-react";
import { useSession } from "@/lib/auth-client";

// Define strict typing for navigation links
interface NavigationLink {
  icon: LucideIcon;
  href: string;
  name: string;
  exact?: boolean;
}

// Unified Navigation Links for Consumers matching HamimMart's domain
const consumerLinks: NavigationLink[] = [
  { icon: Home, href: "/dashboard/renter/status", name: "Dashboard", exact: true },
  { icon: TicketPercent, href: "/dashboard/renter/booked", name: "My Booking" },

  { icon: Settings, href: "/dashboard/profile", name: "Profile" },
];

const adminLinks: NavigationLink[] = [
  { icon: Home, href: "/dashboard/admin/state", name: "Dashboard", exact: true },
  { icon: StickyNotePlus, href: "/dashboard/admin/new", name: "Add New Car" },
  { icon: StickyNotePlus, href: "/dashboard/admin/management", name: "Car Management" },
  { icon: ShoppingCart, href: "/dashboard/admin/purchaseInfo", name: "Purchase Info" },
  { icon: Settings, href: "/dashboard/profile", name: "Profile" },
];

export default function DashboardSidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);
  const { data: session } = useSession();

  // Dynamically switch links based on user role/plan
  const currentLinks = session?.user?.role  === "admin" ? adminLinks : consumerLinks;

  const SidebarContent = () => (
    <div className="flex flex-col h-full w-full text-foreground bg-white dark:bg-zinc-950">
      {/* Brand & Profile Section */}
      <div className="p-5 bg-blue-500 rounded-b-3xl dark:border-zinc-900 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          {/* Blue Accent Avatar using the user's initial */}
          <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold shrink-0 bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200/50 dark:border-blue-900/30">
            {session?.user?.name?.charAt(0) || "U"}
          </div>

          <div className="text-sm space-y-0.5 min-w-0">
            <p className="font-semibold truncate text-white ">
              {session?.user?.name || "User"}
            </p>
            <p className="text-white text-xs truncate">
              {session?.user?.email}
            </p>
          </div>
        </div>
        
        {/* Plan Status Badge Styled after HamimMart Green Accent */}
        <div>
          <span className="inline-block px-3 py-1 text-xs font-medium bg-blue-50 text-blue-600 dark:bg-green-950/30 dark:text-green-400 rounded-full border border-green-200/50 dark:border-green-900/30">
            {session?.user?.role === "admin" 
              ? "Admin" 
              : "Renter"
            }</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {currentLinks.map((item) => {
          const Icon = item.icon;

          const active = item.exact
            ? pathname === item.href
            : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                active
                  ? "bg-blue-600 text-white font-semibold shadow-sm border border-blue-700"
                  : "text-zinc-500 dark:text-zinc-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-950/10"
              }`}
            >
              <Icon 
                size={18} 
                className={active ? "text-white" : "text-zinc-400 dark:text-zinc-500"} 
              />
              <span className="text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile Header */}
      <div className="md:hidden border-b  p-4    ">
        <button onClick={() => setOpen(true)} className="text-zinc-800 dark:text-zinc-200">
          <LayoutDashboard size={24} />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex w-64 h-screen sticky top-0 border-r border-zinc-100 dark:border-zinc-900 bg-background">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 md:hidden ${
          open ? "pointer-events-auto" : "pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          onClick={() => setOpen(false)}
          className={`absolute inset-0 bg-black/40 dark:bg-black/60 transition-opacity duration-300 ${
            open ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Drawer */}
        <div
          className={`absolute top-0 left-0 h-screen w-72 bg-background border-r border-zinc-200 dark:border-zinc-800 text-foreground transform transition-transform duration-300 flex flex-col ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between p-4 border-b border-zinc-100 dark:border-zinc-900">
            <h2 className="text-blue-600 dark:text-blue-500 font-semibold"> Menu </h2>
            <button onClick={() => setOpen(false)} className="text-zinc-500 dark:text-zinc-400 hover:text-blue-600">
              <X size={22} />
            </button>
          </div>

          <SidebarContent />
        </div>
      </div>
    </>
  );
}