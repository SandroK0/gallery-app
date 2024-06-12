import React, { useState } from "react";
import styles from "./Searchbar.module.css";
import History from "./History";
import { IoSearch } from "react-icons/io5";

interface SearchbarProps {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function Searchbar(props: SearchbarProps) {
  const { query, setQuery } = props;
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
      let querys = [query, ...queryKeys];
      setQueryKeys(querys);
      setShowRecentSearches(false);
    }
  }, 1000);

  const handleClick = (query: string) => {
    setQuery(query);
    setShowRecentSearches(false);
  };

  const handleShowRecent = () => {
    if (queryKeys.length != 0) {
      setShowRecentSearches(showRecentSearches ? false : true);
    }
  };

  return (
    <div className={styles.searchbar}>
      <div className={styles.inputContainer}>
        <input
          onChange={(e) => {
            HandleChange(e.target.value);
          }}
          placeholder="Search high-resolution images"
        ></input>
        <IoSearch
          className={styles.histBtn}
          onClick={handleShowRecent}
        ></IoSearch>
      </div>
      {showRecentSearches && (
        <History
          query={query}
          queryKeys={queryKeys}
          handleClick={handleClick}
        ></History>
      )}
    </div>
  );
}
