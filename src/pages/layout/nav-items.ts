import { Home, History, Settings, DollarSign, type LucideIcon } from "lucide-react";
import routes from "@/routes";

export interface NavLink {
  label: string;
  to: string;
  count?: number;
}

export interface NavItem {
  label: string;
  icon: LucideIcon;
  path: string;
  links?: NavLink[];
}

const navItems: NavItem[] = [
  {
    label: "Home",
    icon: Home,
    path: routes.root,
  },
  {
    label: "Tasks",
    icon: DollarSign,
    path: routes.tasks.index,
  },
  {
    label: "History",
    icon: History,
    path: routes.tasks.index,
    links: [
      {
        label: "All",
        to: routes.tasks.index,
        count: Math.ceil(Math.random() * (10 - 1) + 1),
      },
      {
        label: "Pending",
        to: routes.tasks.tasksWithStatus("pending"),
        count: Math.ceil(Math.random() * (10 - 1) + 1),
      },
      {
        label: "Failed",
        to: routes.tasks.tasksWithStatus("failed"),
        count: Math.ceil(Math.random() * (10 - 1) + 1),
      },
      {
        label: "Done",
        to: routes.tasks.tasksWithStatus("done"),
        count: Math.ceil(Math.random() * (10 - 1) + 1),
      },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    path: routes.settings.index,
  },
];

export default navItems;
