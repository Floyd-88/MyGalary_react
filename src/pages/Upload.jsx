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
        <button
          className={styles.btn_next_gal}
        >
          New Photo
        </button>
      </Paralax>
    </>
  );
}
