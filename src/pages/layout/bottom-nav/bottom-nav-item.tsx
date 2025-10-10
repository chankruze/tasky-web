import React from "react";
import clsx from "clsx";
import { Link } from "react-router";
import type { LucideIcon } from "lucide-react";

interface BottomNavItemProps {
  label: string;
  icon: LucideIcon;
  path: string;
  active?: boolean;
}

const BottomNavItem: React.FC<BottomNavItemProps> = ({
  label,
  icon: Icon,
  path,
  active = false,
}) => (
  <li>
    <Link
      to={path}
      className={clsx(
        "flex flex-col items-center justify-center transition-colors select-none",
        active ? "text-blue-600" : "text-gray-500 hover:text-blue-500"
      )}
    >
      <Icon size={22} />
      <span className="mt-1 text-xs">{label}</span>
    </Link>
  </li>
);

export default BottomNavItem;
