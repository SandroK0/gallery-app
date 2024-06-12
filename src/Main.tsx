import React, { useState } from "react";
import styles from "./Main.module.css";
import Gallery from "./Components/Gallery";
import ScrollToTopButton from "./Components/ScrollToTopButton";
import Searchbar from "./Components/Searchbar";
import logo  from "./assets/logo.png"


export default function Main() {
  const [query, setQuery] = useState<string>("");

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.logo} onClick={() => setQuery("")}>
          <img src={logo}></img>
        </div>
        <Searchbar query={query} setQuery={setQuery}></Searchbar>
      </header>
      <Gallery query={query}></Gallery>
      <ScrollToTopButton></ScrollToTopButton>
    </div>
  );
}

const active = {
  color: "#111",
};
