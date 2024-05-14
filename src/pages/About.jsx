import styles from "../css/about.module.css";

import Paralax from "../components/Paralax";

export default function About() {
  return (
    <>
      <Paralax
        text_2={"ABOUT"}
        text_btn={"Gallery"}
        fone={"./paralax_1.jpg"}
        to={"/gallery"}
      />
      <div className={styles.wrapper_block}>
        <div className={styles.wrapper_photo}>
          <img src="./public/designer_photo.png" alt="photo" />
        </div>
        <div className={styles.wrapper_info}>
          <p className={styles.title}>Обо мне</p>
          <p className={styles.info}>
            The Big Oxmox advised her not to do so, because there were thousands
            of bad Commas, wild Question Marks and devious Semikoli, but the
            Little Blind Text didn’t listen. She packed her seven versalia, put
            her initial into the belt and made herself on the way.
          </p>
          <p className={styles.info}>
            When she reached the first hills of the Italic Mountains, she had a
            last view back on the skyline of her hometown Bookmarksgrove, the
            headline of Alphabet Village and the subline of her own road, the
            Line Lane. Pityful a rethoric question ran over her cheek, then she
            continued her way.
          </p>
        </div>
      </div>
    </>
  );
}
