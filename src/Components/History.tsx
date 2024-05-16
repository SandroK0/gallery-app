import React from "react";
import styles from "./History.module.css";

interface HistoryProps {
  queryKeys: string[];
  handleClick: (query: string) => void;
  query: string;
}

export default function History(props: HistoryProps) {
  const { queryKeys, handleClick, query } = props;

  return (
    <div className={styles.dropdown}>
      <div>Recent Searches</div>
      <div className={styles.keyCont}>
        {queryKeys?.map(
          (item: string, index: number) =>
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
    </div>
  );
}

const active = {
  color: "#111",
  border: "1px solid #424242",
};
