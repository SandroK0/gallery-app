import React, { useState } from "react";
import styles from "./Main.module.css";
import Gallery from "./Components/Gallery";
import ScrollToTopButton from "./Components/ScrollToTopButton";
import History from "./Components/History";
import { IoSearch } from "react-icons/io5";

export default function Main() {
  const [query, setQuery] = useState<string>("");
  const [queryKeys, setQueryKeys] = useState<string[]>([]);
  const [showRecentSearches, setShowRecentSearches] = useState<boolean>(false);

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
      let querys = [...queryKeys, query];
      setQueryKeys(querys);
    }
  }, 1000);

  const handleClick = (query: string) => {
    setQuery(query);
  };

  return (
    <div className={styles.main}>
      <header>
        <div className={styles.logo} onClick={() => setQuery("")}>
          Gallery
        </div>
        <div className={styles.inputContainer}>
          <IoSearch
            onClick={() =>
              setShowRecentSearches(showRecentSearches ? false : true)
            }
          ></IoSearch>
          <input
            onChange={(e) => {
              HandleChange(e.target.value);
            }}
            placeholder="Search high-resolution images"
          ></input>
        </div>
        {showRecentSearches && (
          <History
            query={query}
            queryKeys={queryKeys}
            handleClick={handleClick}
          ></History>
        )}
      </header>
      <Gallery query={query}></Gallery>
      <ScrollToTopButton></ScrollToTopButton>
    </div>
  );
}

const active = {
  color: "#111",
};
