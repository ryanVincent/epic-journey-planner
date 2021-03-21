import React, { FC } from "react";
import "./SideBar.css";

type SidebarProps = {
  title: string;
};

export const Sidebar: React.FC<SidebarProps> = ({ children, title }) => (
  <div className="sideBar">
    <h1>{title}</h1>
    {children}
  </div>
);

export const SideBarFooter: FC = ({ children }) => (
  <div className="sideBar-footer">{children}</div>
);
