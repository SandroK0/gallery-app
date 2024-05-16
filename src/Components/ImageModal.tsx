import React, { useEffect, useState } from "react";
import styles from "./ImageModal.module.css";
import { UnsplashPhoto, PhotoStatistics } from "../Types";
import useApi from "../Hooks/useApi";
import { CiHeart } from "react-icons/ci";

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
  console.log(img.id);
  console.log(img.links.download_location);
  return (
    <div className={styles.modalBackdrop}>
      <button className={styles.closeButton} onClick={handleCloseModal}>
        &times;
      </button>
      <div className={styles.modalContent}>
        <div className={styles.top}>
          <div className={styles.userInfo}>
            <img src={img.user.profile_image.medium} />
            <div>{img.user.name}</div>
          </div>
          <button className={styles.downloadButton}>Download</button>
        </div>
        <img
          src={img.urls.regular}
          className={styles.image}
          alt={img.description}
          style={{ height: 700 }}
        />
        <table>
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
          <tr>
            <th className={styles.stat}>{img.likes}</th>
            <th className={styles.stat}>{imgStats?.downloads.total}</th>
            <th className={styles.stat}>{imgStats?.views.total}</th>
          </tr>
        </table>
      </div>
    </div>
  );
}
