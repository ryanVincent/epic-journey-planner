import React from "react";
import "./Container.css";

export const Container: React.FC = ({ children }) => (
  <div className="container">
    {!navigator.onLine && "You're offline :("}
    {navigator.onLine && children}
  </div>
);
