import React from "react";
import { UnsplashPhoto, UnsplashPhotoInList } from "../Types";
import styles from "./Image.module.css";

export default function Image({
  image,
  handleClick,
}: {
  image: UnsplashPhotoInList;
  handleClick: (image: UnsplashPhotoInList) => void;
}) {
  return (
    <div style={{ overflow: "hidden" }}>
      <img
        src={image.urls.small}
        width={300}
        height={300}
        alt={image.description}
        className={styles.img}
        onClick={() => handleClick(image)}
      />
    </div>
  );
}
