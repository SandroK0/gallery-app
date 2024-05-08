import React, { useEffect, useState } from "react";
import styles from "./ImageModal.module.css";
import { UnsplashPhoto, PhotoStatistics } from "../Types";
import useImageData from "../Hooks/useImageData";

export default function ImageModal(props: {
  img: UnsplashPhoto;
  handleCloseModal: () => void;
}) {
  const { handleCloseModal } = props;
  const { getPhotoStats } = useImageData();
  const [imgStats, setImgStats] = useState<PhotoStatistics>();

  const getData = async () => {
    let data: PhotoStatistics = await getPhotoStats(props.img.id);
    setImgStats(data);
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
          alt={props.img.description}
          style={{ height: 700 }}
        />
        <div className={styles.overlay}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Likes:</span>{" "}
              {props.img.likes}
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Downloads:</span>{" "}
              {imgStats?.downloads.total}
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Views:</span>{" "}
              {imgStats?.views.total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
