import React, { FC, ReactElement } from "react";

import "./Button.css";

type ButtonProps = {
  onClick: () => void;
  variant: "primary" | "icon";
  icon?: ReactElement;
};

export const Button: FC<ButtonProps> = ({
  onClick,
  children,
  variant,
  icon,
}) => (
  <button className={variant} onClick={onClick}>
    {icon}
    {children && children}
  </button>
);
