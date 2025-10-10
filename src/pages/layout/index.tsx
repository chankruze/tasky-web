import React from "react";
import clsx from "clsx";
import { Outlet } from "react-router";
import Sidebar from "./sidebar";
import BottomNav from "./bottom-nav";

interface LayoutProps {
  className?: string;
}

const Layout: React.FC<React.PropsWithChildren<LayoutProps>> = ({ className = "" }) => (
  <div className="flex h-screen flex-col overflow-hidden md:flex-row">
    {/* Sidebar (desktop only) */}
    <Sidebar className="hidden h-full md:block" />

    {/* Main content */}
    <div className={clsx("flex flex-1 flex-col overflow-y-auto", className)}>
      <Outlet />
    </div>

    {/* Bottom navigation (mobile only) */}
    <BottomNav className="mt-auto block md:hidden" />
  </div>
);

export default Layout;
