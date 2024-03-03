import React, { useEffect } from "react";
import styles from "./ImageModal.module.css";
import { UnsplashPhoto } from "../Types";

export default function ImageModal(  props: {
  img: UnsplashPhoto;
  handleCloseModal: () => void
  }
) {
  const {img , handleCloseModal} = props


  // გადმოწერებს და ნახვებს აღარ აგზავნის API

  return (
    <div className={styles.modalBackdrop} onClick={handleCloseModal}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={handleCloseModal}>
          &times;
        </button>
        <img src={img.urls.regular} className={styles.image} alt={img.alt_description} style={{height: 700}} />
        <div className={styles.overlay}>
          <div className={styles.stats}>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Likes:</span> {img.likes}
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Downloads:</span> 999
              
            </div>
            <div className={styles.stat}>
              <span className={styles.statLabel}>Views:</span> 999
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
