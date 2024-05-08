import React, { useState } from "react";
import useImageData from "../Hooks/useImageData";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UnsplashPhoto, UnsplashPhotoInList } from "../Types";
import ImageModal from "../Components/ImageModal";
import styles from "./Gallery.module.css";
import useInfiniteScroll from "../Hooks/useInfiniteScroll";
import Image from "./Image";

export default function Gallery(props: { query: string }) {
  const { query } = props;
  const { FetchData } = useImageData();
  const [modal, setModal] = useState<UnsplashPhotoInList | null>(null);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    status,
    data: images,
  } = useInfiniteQuery({
    queryKey: [query],
    queryFn: FetchData,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPageParam + 1;
    },
  });

  useInfiniteScroll(fetchNextPage, hasNextPage);

  if (error) {
    return <div>{error.message}</div>;
  }

  const handleClick = (image: UnsplashPhotoInList) => {
    setModal(image);
  };

  const handleCloseModal = () => {
    setModal(null);
  };

  return (
    <>
      {status === "pending" && <div>Loading...</div>}
      {modal && (
        <ImageModal img={{ ...modal }} handleCloseModal={handleCloseModal} />
      )}
      {images &&
        images.pages.map((page, index) => (
          <div key={index} className={styles.gallery}>
            {page.map((image: UnsplashPhotoInList, idx: number) => (
              <Image image={image} handleClick={handleClick} key={idx} />
            ))}
          </div>
        ))}
      {isFetchingNextPage && <div>Loading More...</div>}
    </>
  );
}
