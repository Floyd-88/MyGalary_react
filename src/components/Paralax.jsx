import { useNavigate } from "react-router-dom";
// import { useEffect, useRef, useState } from "react";
import styles from "../css/paralax.module.css";

export default function Paralax({ ...props }) {
  const navigate = useNavigate();

  function goGallery(to) {
    navigate(`/MyGalary_react/${to}`);
  }

  return (
    <>
      <div
        className={styles.section}
        style={{ backgroundImage: `url(${props.fone})` }}
      >
        <div className={styles.filter}></div>
        <div className={styles.block_text}>
          <div className={styles.wrapper_text_1}>
            <div className={styles.text_1}>{props.text_1}</div>
          </div>

          <div className={styles.wrapper_text_2}>
            <h1>{props.text_2}</h1>
          </div>

          <div className={styles.wrapper_text_3}>
            <div className={styles.text_3}>{props.text_3}</div>
          </div>
          {props.children}

          <div className={styles.wrapper_button}>
          <button
            onClick={() => goGallery(props.to)}
            className={styles.btn_next_gal}
          >
            {props.text_btn}
          </button>
          </div>
        </div>
      </div>
    </>
  );
}
