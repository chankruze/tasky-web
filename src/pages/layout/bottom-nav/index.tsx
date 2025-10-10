import React from "react";
import clsx from "clsx";
import { useLocation } from "react-router";
import navItems from "../nav-items";
import BottomNavItem from "./bottom-nav-item";

interface BottomNavProps {
  className?: string;
}

const BottomNav: React.FC<BottomNavProps> = ({ className }) => {
  const location = useLocation();

  return (
    <nav
      className={clsx("border-t border-gray-200 bg-white shadow-md dark:bg-gray-900", className)}
    >
      <ul className="flex justify-around py-2">
        {navItems.map(({ label, icon, path }) => (
          <BottomNavItem
            key={path}
            label={label}
            icon={icon}
            path={path}
            active={location.pathname === path}
          />
        ))}
      </ul>
    </nav>
  );
};

export default BottomNav;
