import React, { useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { UnsplashPhoto } from "../Types";
import ImageModal from "../Components/ImageModal";
import useInfiniteScroll from "../Hooks/useInfiniteScroll";
import Image from "./Image";
import useApi from "../Hooks/useApi";
import MasonryLayout from "./MasonryLayout";

export default function Gallery(props: { query: string }) {
  const { query } = props;
  const { FetchPages } = useApi();
  const [modal, setModal] = useState<UnsplashPhoto | null>(null);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    error,
    status,
    data: images,
  } = useInfiniteQuery({
    queryKey: [query],
    queryFn: FetchPages,
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      return lastPageParam + 1;
    },
  });

  useInfiniteScroll(fetchNextPage, hasNextPage);

  if (error) {
    return <div>{error.message}</div>;
  }

  const handleClick = (image: UnsplashPhoto) => {
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
      {images && (
        <MasonryLayout>
          {images.pages.flatMap((page) =>
            page.map((image: UnsplashPhoto) => (
              <Image image={image} handleClick={handleClick} key={image.id}/>
            )),
          )}
        </MasonryLayout>
      )}
      {isFetchingNextPage && <div>Loading More...</div>}
    </>
  );
}
