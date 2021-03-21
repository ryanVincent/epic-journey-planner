import React, { FC } from "react";

import "./Header.css";

export const Header: FC = ({ children }) => {
  return (
    <header className="appHeader">
      <h1>{children}</h1>
    </header>
  );
};
