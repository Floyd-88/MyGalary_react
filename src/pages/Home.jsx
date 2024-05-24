import styles from "../css/home.module.css";
import Paralax from "../components/Paralax";

export default function Home() {
  return (
    <>
      <div className={styles.container}>
        <Paralax
          text_1={"FASHION GALLERY"}
          text_2={"CLASSY REBEL FASHION GALLERY"}
          text_3={"08.05.2024"}
          text_btn={"View Gallery"}
          fone={"./paralax_3.jpg"}
          to={"gallery"}
        />
      </div>
    </>
  );
}
