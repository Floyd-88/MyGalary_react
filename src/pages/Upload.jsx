import styles from "../css/upload.module.css";

import Paralax from "../components/Paralax";
import { useRef, useState } from "react";
import "../firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const storage = getStorage();

export default function Upload() {
  const [isSelect, setIsSelect] = useState(false);
  const [selectCat, setSelectCat] = useState("");
  const [files, setFiles] = useState([]);
  // const [progressLoadPhoto, setProgressLoadPhoto] = useState(0);

  const photos = useRef(null);
  const addBtn = useRef(null);

  const scrollToRef = () => {
    setTimeout(() => {
      addBtn.current.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  function handleCLickUploadPhoto() {
    //сбрасываем загрузчик что бы можно было выбрать тот же файл еще раз
    // if (photos.current) {
    //   photos.current = null;
    // }

    //при клике на кнопку срабатывает инпут
    photos.current.click();
  }

  function handleChangeUploadPhoto() {
    let photoFiles = {};

    //указываем допустимые форматы картинки
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    //проверяем выбрана ли картинка
    if (!photos.current.files) {
      return;
    }

    if (photos.current.files.length > 5) {
      console.log("Вы не можете загрузить больше 5 фотографий за один раз");
      photoFiles = Array.prototype.slice.call(photos.current.files, 0, 5);
    } else {
      photoFiles = photos.current.files;
    }
    //трансформируем выбранные картинки в массив
    const filesArray = Array.from(photoFiles);

    filesArray.map((file) => {
      if (!allowedTypes.includes(file.type)) {
        console.log("Формат одного из выбранных файлов не поддерживается");
        filesArray.filter((elem) => elem.name != file.name);
        return;
      } else if (file.size > 5000000) {
        console.log("Размер одной из фоторгафий превышает допустимый");
        filesArray.filter((elem) => elem.name != file.name);
        return;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          file.preview = e.target.result;
          setFiles((prevFiles) => [...prevFiles, file]); // Обновляем состояние с новым файлом и его превью
        };
        reader.readAsDataURL(file);
        return file;
      }


    });

    scrollToRef();
  }

  //конвертирует байты
  function bytesToSize(bytes) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    if (!bytes) {
      return "0 Byte";
    }
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i)) + " " + sizes[i];
  }

  function removePreviewPhoto(preview) {
    setFiles((prev) => prev.filter((el) => el.preview !== preview));
  }

  async function addPhotoServer() {
    if (files.length === 0) {
      console.log("Нет файлов для загрузки");
      return;
    }
    try {
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };

      files.forEach(async (file) => {

        const storageRef = ref(storage, `images/${Date.now()+"_"+file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file, metadata);
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
            }
          },
          (error) => {
            // A full list of error codes is available at
            // https://firebase.google.com/docs/storage/web/handle-errors
            switch (error.code) {
              case "storage/unauthorized":
                // User doesn't have permission to access the object
                break;
              case "storage/canceled":
                // User canceled the upload
                break;
              case "storage/unknown":
                // Unknown error occurred, inspect error.serverResponse
                break;
            }
          },
          () => {
            // Upload completed successfully, now we can get the download URL
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at", downloadURL);
            });
          }
        );
      });
    } catch (error) {
      console.error("Ошибка загрузки изображения:", error);
    }
  }

  return (
    <>
      <Paralax
        text_1={"Загрузи новые фотографии прямо сейчас"}
        text_2={"UPLOAD PHOTO"}
        text_btn={"Gallery"}
        fone={"./paralax_1.jpg"}
        to={"/gallery"}
      >
        <div className={styles.wrapper_upload_photo}>
          <button
            className={styles.btn_next_gal}
            onClick={() => {
              setIsSelect(true);
              setSelectCat("");
              setFiles([]);
            }}
          >
            New Photo
          </button>

          <div className={styles.header_btns_load_photo}>
            {isSelect && (
              <div className={styles.select_cat_photo}>
                <select
                  className={styles.select_cat_photo_sel}
                  onChange={(e) => setSelectCat(e.target.value)}
                  value={selectCat}
                >
                  <option
                    className={styles.select_cat_photo_opt}
                    value=""
                    disabled
                    hidden
                  >
                    Выбрать категорию
                  </option>

                  <option
                    className={styles.select_cat_photo_opt}
                    value="Абстрактные/Графика/3D"
                  >
                    Абстрактные/Графика/3D
                  </option>
                  <option className={styles.select_cat_photo_opt} value="Аниме">
                    Аниме
                  </option>
                  <option className={styles.select_cat_photo_opt} value="Арты">
                    Арты
                  </option>
                  <option className={styles.select_cat_photo_opt} value="Город">
                    Город
                  </option>
                  <option className={styles.select_cat_photo_opt} value="Горы">
                    Горы
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Девушки"
                  >
                    Девушки
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Друзья"
                  >
                    Друзья
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Животные"
                  >
                    Животные
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Компьютер"
                  >
                    Компьютер
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Космос"
                  >
                    Космос
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Любовь"
                  >
                    Любовь
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Машины"
                  >
                    Машины
                  </option>
                  <option className={styles.select_cat_photo_opt} value="Море">
                    Море
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Музыка"
                  >
                    Музыка
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Мультфильмы"
                  >
                    Мультфильмы
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Отношения"
                  >
                    Отношения
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Пейзажи"
                  >
                    Пейзажи
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Персонажи"
                  >
                    Персонажи
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Приколы"
                  >
                    Приколы
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Природа"
                  >
                    Природа
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Развлечение"
                  >
                    Развлечение
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Разные"
                  >
                    Разные
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Романтика"
                  >
                    Романтика
                  </option>
                  <option className={styles.select_cat_photo_opt} value="Семья">
                    Семья
                  </option>
                  <option className={styles.select_cat_photo_opt} value="Спорт">
                    Спорт
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Страшные"
                  >
                    Страшные
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Фильмы"
                  >
                    Фильмы
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Фэнтези"
                  >
                    Фэнтези
                  </option>
                  <option className={styles.select_cat_photo_opt} value="Цветы">
                    Цветы
                  </option>
                  <option
                    className={styles.select_cat_photo_opt}
                    value="Черно-белые"
                  >
                    Черно-белые
                  </option>

                  <option
                    className={styles.select_cat_photo_opt}
                    value="Черно-белые"
                  >
                    Добавить свою категорию
                  </option>
                </select>
              </div>
            )}

            {selectCat && (
              <div className={styles.btn_load_photo}>
                <button
                  className={`${styles.btn} ${styles.show_more_photo_btn}`}
                  onClick={() => handleCLickUploadPhoto()}
                >
                  Загрузить фото
                </button>

                <div className={styles.wrapper_load_photo}>
                  <input
                    className={styles.load_photo}
                    ref={photos}
                    type="file"
                    onChange={handleChangeUploadPhoto}
                    multiple
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </Paralax>

      {files.length > 0 && (
        <div className={styles.wrapper_preview_photos}>
          {files.map((file, index) => (
            <div key={index} className={styles.preview_image}>
              <div
                className={styles.preview_remove}
                onClick={() => removePreviewPhoto(file.preview)}
              >
                &times;
              </div>
              <img
                className={styles.preview_photo}
                src={file?.preview}
                alt={file?.name}
              />

              <div className={`${styles.preview_info} ${styles.active_load}`}>
                {/* размер фото */}
                <div className={styles.preview_info_name}>
                  <span>{file.name}</span>
                  <span>{bytesToSize(file.size)}</span>
                </div>

                {/* полоса загрузки фото */}
                <div>
                  <div className={styles.preview_info_progress}>
                    {/* {{ getProgressLoadPhoto }} */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div ref={addBtn} className={styles.wrapper_btn_next_gal}>
        {files.length > 0 && (
          <button
            onClick={addPhotoServer}
            className={`${styles.btn_next_gal} ${styles.btn_next_gal_shadow}`}
          >
            Добавить в свою галерею
          </button>
        )}
      </div>
    </>
  );
}
