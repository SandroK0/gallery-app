import { useEffect, useState } from "react";
import styles from "./ImageModal.module.css";
import { UnsplashPhoto, PhotoStatistics } from "../Types";
import useApi from "../Hooks/useApi";

export default function ImageModal(props: {
  img: UnsplashPhoto;
  handleCloseModal: () => void;
}) {
  const { handleCloseModal, img } = props;
  const { getPhotoStats, trackPhotoDownload } = useApi();
  const [imgStats, setImgStats] = useState<PhotoStatistics>();

  const getData = async () => {
    let data: PhotoStatistics = await getPhotoStats(props.img.id);
    setImgStats(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleDownload = async () => {
    const data = await trackPhotoDownload(img.id);
    if (data) {
      // Fetch the image as a Blob
      const response = await fetch(data.url);
      const blob = await response.blob();

      // Create a link element and download the Blob
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute("download", "unsplash-image.jpg"); // Name for the downloaded file
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
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
              <td className={styles.stat}>{img.likes ? img.likes : "---"}</td>
              <td className={styles.stat}>{imgStats?.downloads.total ? imgStats?.downloads.total : "---"}</td>
              <td className={styles.stat}>{imgStats?.views.total ? imgStats?.views.total : "---"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
