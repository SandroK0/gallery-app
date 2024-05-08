import React, { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import { NavLink, useLocation } from "react-router-dom";

export default function Navbar() {
  const [currentPath, setCurrentPath] = useState<string>("");

  let location = useLocation();

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location]);

  return (
    <div className={styles.nav}>
      <NavLink
        to={"/"}
        style={currentPath === "/" ? { ...active } : { ...nonActive }}
      >
        Main
      </NavLink>
      <NavLink
        to={"/history"}
        style={currentPath === "/history" ? { ...active } : { ...nonActive }}
      >
        History
      </NavLink>
    </div>
  );
}

const active = {
  textDecoration: "underline",
  color: "black",
};

const nonActive = {
  cursor: "pointer",
  textDecoration: "none",
  color: "#ccc",
};
