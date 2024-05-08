import React, { useEffect, useState } from "react";
import { queryClient } from "..";
import Gallery from "../Components/Gallery";
import styles from "./History.module.css";
import ScrollToTopButton from "../Components/ScrollToTopButton";

export default function History() {
  const queryCache = queryClient.getQueryCache();

  const [query, setQuery] = useState<string>("");
  const [queryKeys, setQueryKeys] = useState<string[]>();

  const handleClick = (query: string) => {
    setQuery(query);
  };

  useEffect(() => {
    const querys: string[] = queryCache
      .findAll()
      .map((query: any) => query.queryKey[0])
      .reverse();
    setQuery(querys[0]);
    setQueryKeys(querys);
  }, [queryCache]);

  return (
    <div className={styles.History}>
      <div className={styles.keyCont}>
        {queryKeys?.map(
          (item: string, index) =>
            item && (
              <div
                className={styles.key}
                key={index}
                onClick={() => handleClick(item)}
                style={query === item ? { ...active } : undefined}
              >
                {item}
              </div>
            )
        )}
      </div>
      {queryKeys && queryKeys.length <= 1 && <h1>History is clear!</h1>}
      {query && <Gallery query={query}></Gallery>}
      <ScrollToTopButton></ScrollToTopButton>
    </div>
  );
}

const active = {
  backgroundColor: "black",
  color: "white",
};
