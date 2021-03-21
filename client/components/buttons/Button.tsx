import React, { FC } from "react";

import "./Button.css";

type ButtonProps = {
  onClick: () => void;
  variant: "primary" | "icon";
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
