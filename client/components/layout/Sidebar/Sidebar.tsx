import React, { FC } from "react";
import "./SideBar.css";

export const Sidebar: React.FC = ({ children, title }) => (
  <div className="sideBar">
    <h1>{title}</h1>
    {children}
  </div>
);

export const SideBarFooter: FC = ({ children }) => (
  <div className="sideBar-footer">{children}</div>
);
