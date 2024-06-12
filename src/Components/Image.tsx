import React from "react";
import { UnsplashPhoto } from "../Types";
import styles from "./Image.module.css";

export default function Image({
  image,
  handleClick,
}: {
  image: UnsplashPhoto;
  handleClick: (image: UnsplashPhoto) => void;
}) {
  return (
    <div style={{ overflow: "hidden" }}>
      <img
        src={image.urls.small}
        alt={image.description}
        className={styles.img}
        onClick={() => handleClick(image)}
      />
    </div>
  );
}
