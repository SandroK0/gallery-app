import React, { useState } from "react";
import styles from "./Main.module.css";
import Gallery from "../Components/Gallery";
import ScrollToTopButton from "../Components/ScrollToTopButton";

export default function Main() {
  const [query, setQuery] = useState<string>("");

  const debounce = (func: Function, delay: number) => {
    let timeoutId: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const HandleChange = debounce((query: string) => {
    if (query) {
      setQuery(query);
    }
  }, 1000);

  return (
    <div className={styles.main}>
      <input
        onChange={(e) => {
          HandleChange(e.target.value);
        }}
        placeholder="ძებნა"
      ></input>
      <Gallery query={query}></Gallery>
      <ScrollToTopButton></ScrollToTopButton>
    </div>
  );
}
