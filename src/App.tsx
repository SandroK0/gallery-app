import React from "react";
import styles from "./App.module.css";
import Navbar from "./Components/Navbar";
import { Outlet } from "react-router-dom";

function App() {

  return (
    <div className={styles.App}>
      <header>Gallery</header>
      <Navbar></Navbar>
      <div className={styles.content}>
          <Outlet />
      </div>
    </div>
  );
}

export default App;
