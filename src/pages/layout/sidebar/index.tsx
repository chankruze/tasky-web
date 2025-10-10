import React from "react";
import clsx from "clsx";
import Container from "./container";
import Section from "./section";
import navItems from "../nav-items";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => (
  <Container title="CashUp" className={clsx(className)}>
    {navItems.map(({ label, icon, path, links }) => (
      <Section key={label} icon={icon} title={label} to={path} links={links} />
    ))}
  </Container>
);

export default Sidebar;
