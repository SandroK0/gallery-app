import React, { useEffect, useState } from "react";
import styles from "./ImageModal.module.css";
import { UnsplashPhoto, PhotoStatistics } from "../Types";
import useApi from "../Hooks/useApi";

export default function ImageModal(props: {
  img: UnsplashPhoto;
  handleCloseModal: () => void;
}) {
  const { handleCloseModal, img } = props;
  const { getPhotoStats, accessKey } = useApi();
  const [imgStats, setImgStats] = useState<PhotoStatistics>();

  const getData = async () => {
    let data: PhotoStatistics = await getPhotoStats(props.img.id);
    setImgStats(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDownload = async () => {
    try {
      // Trigger the download tracking endpoint
      await fetch(img.links.download_location, {
        method: "GET",
        headers: {
          Authorization: `Client-ID ${accessKey}`,
        },
      });

      // Fetch the image as a Blob
      const response = await fetch(img.urls.full);
      const blob = await response.blob();

      // Create a link element and download the Blob
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", "unsplash-image.jpg"); // Name for the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the image:", error);
    }
  };

  return (
    <div className={styles.modalBackdrop}>
      <button className={styles.closeButton} onClick={handleCloseModal}>
        &times;
      </button>
      <div className={styles.modalContent}>
        <div className={styles.top}>
          <div className={styles.userInfo}>
            <img src={img.user.profile_image.medium} alt={img.user.name} />
            <div>{img.user.name}</div>
          </div>
          <button className={styles.downloadButton} onClick={handleDownload}>
            Download
          </button>
        </div>
        <img
          src={img.urls.regular}
          className={styles.image}
          alt={img.description}
          style={{ height: 700 }}
        />
        <table className={styles.table}>
          <thead>
            <tr>
              <th>
                <span className={styles.statHead}>Likes</span>
              </th>
              <th>
                <span className={styles.statHead}>Downloads</span>
              </th>
              <th>
                <span className={styles.statHead}>Views</span>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={styles.stat}>{img.likes}</td>
              <td className={styles.stat}>{imgStats?.downloads.total}</td>
              <td className={styles.stat}>{imgStats?.views.total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
