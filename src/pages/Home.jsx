import styles from "../css/home.module.css";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.section}>
          <div className={styles.filter}></div>
          <div className={styles.block_text}>
          <div className={styles.text_1}>FASHION GALLERY</div>
          <div className={styles.text_2}>
            <h1>CLASSY REBEL FASHION GALLERY</h1>
          </div>
          <div className={styles.text_3}>08.05.2024</div>
          <button className={styles.btn_next_gal}>View Gallery</button>
          </div>
        </div>
      </div>
    </>
  );
}
