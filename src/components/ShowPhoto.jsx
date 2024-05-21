import styles from "../css/showPhoto.module.css";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root"); // Установка корневого элемента для модального окна

export default function ShowPhoto({ isModalOpen, closeModal, selectedPhoto }) {
  return (
    <>
      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Photo Modal"
        className={styles.modal}
        overlayClassName={styles.overlay}
      >
        <div className={styles.wrapper_close}>
          <svg
            onClick={closeModal}
            className={styles.close}
            viewBox="0 0 24 24"
          >
            <path d="M12 10.586L16.95 5.636a1 1 0 0 1 1.414 1.414L13.414 12l4.95 4.95a1 1 0 0 1-1.414 1.414L12 13.414l-4.95 4.95a1 1 0 1 1-1.414-1.414L10.586 12 5.636 7.05a1 1 0 1 1 1.414-1.414L12 10.586z" />
          </svg>
        </div>

        {selectedPhoto && (
          <img src={selectedPhoto} alt="photo" className={styles.full_image} />
        )}
      </ReactModal>
    </>
  );
}
