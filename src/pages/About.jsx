import styles from "../css/about.module.css";
import Paralax from "../components/Paralax";
import designerPhoto from "/designer_photo.png";

export default function About() {
  return (
    <>
      <Paralax
        text_2={"ABOUT"}
        text_btn={"Gallery"}
        fone={"./paralax_1.jpg"}
        to={"gallery"}
      />
      <div className={styles.wrapper_block}>
        <div className={styles.wrapper_photo}>
          <img src={designerPhoto} alt="Designer" />
        </div>
        <div className={styles.wrapper_info}>
          <p className={styles.title}>About</p>
          <p className={styles.info}>
            Наш сайт - это уютное пространство для хранения ваших личных
            фотографий. Здесь вы можете сохранять свои снимки, наслаждаться ими
            и управлять своим творчеством. Мы предоставляем простой и удобный
            способ организации вашей коллекции личных фотографий, обеспечивая
            легкий доступ к вашим изображениям.
          </p>
          <br />
          <p className={styles.info}>
            Мы стремимся сделать ваше пребывание на нашем сайте максимально
            приятным и удобным. Наша галерея разработана с учетом интуитивно
            понятного интерфейса. Присоединяйтесь к нашей галерее уже сегодня,
            чтобы начать создавать, сохранять и наслаждаться вашими личными
            фотографиями в удобном пространстве!
          </p>
        </div>
      </div>
    </>
  );
}
