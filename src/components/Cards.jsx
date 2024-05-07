import Card from "./Card";
import styles from "../css/cards.module.css";

export default function Cards({collections}) {

  return (
    <>
      <div className={styles.block_cards}>
        {collections.map((collection, index) => (
        <Card key={index} collection={collection}/>
        ))}

      </div>
    </>
  );
}
