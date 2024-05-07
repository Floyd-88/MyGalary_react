import Card from "./Card";
import styles from "../css/cards.module.css";

export default function Cards() {

  return (
    <>
      <div className={styles.block_cards}>
        <Card/>
      </div>
    </>
  );
}
