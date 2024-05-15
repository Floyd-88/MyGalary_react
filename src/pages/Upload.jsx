import styles from "../css/upload.module.css";

import Paralax from "../components/Paralax";

export default function Upload() {
  
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
          <button className={styles.btn_next_gal}>New Photo</button>

          <div className={styles.header_btns_load_photo}>
              <div className={styles.select_cat_photo}>
                <select className={styles.select_cat_photo_sel}>
                  <option
                    className={styles.select_cat_photo_opt}
                    disabled
                    selected
                    value=""
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

            <div className={styles.btn_load_photo}>
              <button className={`${styles.btn} ${styles.show_more_photo_btn}`}>
                Загрузить фото
              </button>
            </div>
          </div>
        </div>

      </Paralax>
    </>
  );
}
