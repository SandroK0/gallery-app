import React, { useEffect, useState } from "react";
import styles from "./ImageModal.module.css";
import { UnsplashPhoto, UnsplashPhotoInList } from "../Types";
import useImageData from "../Hooks/useImageData";

export default function ImageModal(props: {
  img: UnsplashPhotoInList;
  handleCloseModal: () => void;
}) {
  const { handleCloseModal } = props;
  const { getPhoto } = useImageData();
  const [img, setImg] = useState<UnsplashPhoto>();

  const getData = async () => {
    let data: UnsplashPhoto = await getPhoto(props.img.id);
    setImg(data);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className={styles.modalBackdrop} onClick={handleCloseModal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleCloseModal}>
          &times;
        </button>
        <img
          src={props.img.urls.regular}
          className={styles.image}
          alt={img?.description}
          style={{ height: 700 }}
        />
        <div className={styles.overlay}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Likes:</span> {img?.likes}
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Downloads:</span>
              {img?.downloads}
            </div>
            {/* <div className={styles.stat}>
              <span className={styles.statLabel}>{img?.description}</span> 
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}
