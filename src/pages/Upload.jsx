import styles from "../css/upload.module.css";
import { useOutletContext } from "react-router-dom";

import Paralax from "../components/Paralax";
import { useRef, useState } from "react";
import "../firebaseConfig";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { fetchCategories } from "../ServerRequest";

const storage = getStorage();

export default function Upload() {
  const [isSelect, setIsSelect] = useState(false);
  const [selectCat, setSelectCat] = useState("");
  const [selectIndex, setSelectIndex] = useState();
  const [files, setFiles] = useState([]);
  const [btnDisabled, setBtnDisabled] = useState(false);
  const [errorUpload, setErrorUpload] = useState("");

  const photos = useRef(null);
  const addBtn = useRef(null);
  const { setShowAuto, user, token, setCategorys, categorys } =
    useOutletContext();

  let photosCollection = {
    category: selectIndex,
    name: selectCat,
    photos: [],
  };

  const scrollToRef = () => {
    setTimeout(() => {
      addBtn.current.scrollIntoView({ behavior: "smooth" });
    }, 500);
  };

  function newPhoto() {
    if (user.id) {
      setIsSelect(true);
      setSelectCat("");
      setFiles([]);

      // useEffect(() => {
      fetchCategories()
        .then((data) => {
          setCategorys(data);
        })
        .catch((error) => {
          console.error("Ошибка запроса:", error);
        });
      // }, []);
    } else {
      setShowAuto("Войти");
    }
  }

  function handleCLickUploadPhoto() {
    // Изменение: Используем метод сброса значений для `input`
    photos.current.value = null;
    setFiles([]);
    setBtnDisabled(false);
    setErrorUpload("");
    //при клике на кнопку срабатывает инпут
    photos.current.click();
  }

  // добавляем превью фото
  function handleChangeUploadPhoto() {
    let photoFiles = {};

    //указываем допустимые форматы картинки
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];

    //проверяем выбрана ли картинка
    if (!photos.current.files) {
      return;
    }

    if (photos.current.files.length > 4) {
      setErrorUpload("Вы не можете загрузить больше 4 фотографий за один раз");
      photoFiles = Array.prototype.slice.call(photos.current.files, 0, 4);
    } else {
      photoFiles = photos.current.files;
    }
    //трансформируем выбранные картинки в массив
    const filesArray = Array.from(photoFiles);

    filesArray.map((file) => {
      if (!allowedTypes.includes(file.type)) {
        setErrorUpload("Формат одного из выбранных файлов не поддерживается");
        filesArray.filter((elem) => elem.name != file.name);
        return;
      } else if (file.size > 5000000) {
        setErrorUpload("Размер одной из фоторгафий превышает допустимый");
        filesArray.filter((elem) => elem.name != file.name);
        return;
      } else {
        const reader = new FileReader();
        reader.onload = (e) => {
          file.preview = e.target.result;
          file.progress = 0;
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

  // удаляем превью фото
  function removePreviewPhoto(preview) {
    setFiles((prev) => prev.filter((el) => el.preview !== preview));
  }

  // отправка фотографий на firebase
  async function addPhotoServer() {
    if (files.length === 0) {
      console.log("Нет файлов для загрузки");
      return;
    }
    try {
      setBtnDisabled(true);
      // Create the file metadata
      /** @type {any} */
      const metadata = {
        contentType: "image/jpeg",
      };

      const uploadPromises = files.map(async (file) => {
        return new Promise((resolve, reject) => {
          const storageRef = ref(
            storage,
            `images/${Date.now() + "_" + file.name}`
          );
          const uploadTask = uploadBytesResumable(storageRef, file, metadata);
          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const newFiles = files
                .map((elem) => {
                  if (elem.name === file.name) {
                    elem.progress = Math.round(
                      (snapshot.bytesTransferred / snapshot.totalBytes) * 100,
                      2
                    );
                  }
                  return elem;
                })
                .filter((file) => file.progress !== 100);
              setFiles(() => newFiles);

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
              reject(error);
            },
            () => {
              // Upload completed successfully, now we can get the download URL
              getDownloadURL(uploadTask.snapshot.ref).then((urlPhoto) => {
                // console.log("File available at");
                photosCollection.photos.push(urlPhoto);
                resolve();
              });
            }
          );
        });
      });

      // Ждем завершения всех загрузок
      Promise.all(uploadPromises)
        .then(() => {
          // Все загрузки завершены успешно, выполняем нужное действие
          saveCatologPhotoServer()
            .then((responseData) => {
              console.log("Ответ от сервера:", responseData);
            })
            .catch((error) => {
              setErrorUpload("Произошла ошибка при отправке данных, попробуйте еще раз")
              console.error("Ошибка при отправке данных:", error);
            });
        })
        .catch((error) => {
          // Обрабатываем ошибку, если какая-либо загрузка не удалась
          setErrorUpload("Произошла ошибка при загрузки фотографий, попробуйте еще раз")
          console.error("Ошибка при загрузке файлов:", error);
        });
    } catch (error) {
      console.error("Ошибка загрузки изображения:", error);
    }
  }

  async function saveCatologPhotoServer() {
    if (photosCollection.photos.length === 0) {
      throw new Error("Отсутствуют данные для отправки");
    }
    try {
      photosCollection.userID = user?.id || "";
      const res = await fetch(
        `https://afbf733ef0b7e113.mokky.dev/photos_collections`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
          body: JSON.stringify(photosCollection),
        }
      );
      if (!res.ok) {
        throw new Error(`Ошибка HTTP: ${res.status}`);
      } else {
        console.log("Success");
        return await res.json();
      }
    } catch (err) {
      console.error("Ошибка при выполнении POST-запроса:", err.message);
      throw err;
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
          {
            <button
              className={styles.btn_next_gal}
              onClick={() => {
                newPhoto();
              }}
            >
              New Photo
            </button>
          }

          <div className={styles.header_btns_load_photo}>
            {isSelect && (
              <div className={styles.select_cat_photo}>
                <select
                  className={styles.select_cat_photo_sel}
                  onChange={(e) => {
                    setSelectCat(e.target.value);
                    setSelectIndex(e.target.selectedIndex);
                  }}
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
                  {categorys.map((cat) => (
                    +cat.category !== 0 && <option
                      key={cat.category}
                      className={styles.select_cat_photo_opt}
                      value={cat.name}
                    >
                      {cat.name}
                    </option>
                  ))}           
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
        <p>{errorUpload ? errorUpload : ""}</p>
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
                  <div
                    className={styles.preview_info_progress}
                    style={{ width: `${file.progress}%` }}
                  >
                    {file.progress !== 0 && file.progress + "%"}
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
            disabled={btnDisabled}
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
