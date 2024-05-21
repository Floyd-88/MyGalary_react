import { useState } from "react";
import styles from "../css/showPhoto.module.css";
import ReactModal from "react-modal";

ReactModal.setAppElement("#root"); // Установка корневого элемента для модального окна

export default function ShowPhoto({
  isModalOpen,
  closeModal,
  selectedPhoto,
  removePhoto,
  errorAuthRemove,
}) {
  const [isDelete, setIsDelete] = useState(true);

  return (
    <>
      <div onClick={() => setIsDelete(true)}>
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

          {selectedPhoto?.photoSrc && (
            <img
              src={selectedPhoto?.photoSrc}
              alt="photo"
              className={styles.full_image}
            />
          )}
          <ul
            className={styles.wrapper_dote}
            onClick={(e) => {
              e.stopPropagation();
              setIsDelete(false);
            }}
          >
            {isDelete ? (
              <>
                <li className={styles.dote}></li>
                <li className={styles.dote}></li>
                <li className={styles.dote}></li>
              </>
            ) : (
              <li
                className={styles.wrapper_delete}
                onClick={() => removePhoto(selectedPhoto)}
              >
                <svg
                  className={styles.delete}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </li>
            )}
          </ul>
          <p className={styles.error}>{errorAuthRemove}</p>
        </ReactModal>
      </div>
    </>
  );
}
