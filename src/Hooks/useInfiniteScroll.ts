import { useEffect } from "react";

export default function useInfiniteScroll(func: Function, condition: boolean) {
  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    console.log(scrollHeight);
    if (scrollTop + clientHeight >= scrollHeight - 1000) {
      func();
    }
  };

  useEffect(() => {
    if (condition) {
      window.addEventListener("scroll", handleScroll);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [condition]);
}
