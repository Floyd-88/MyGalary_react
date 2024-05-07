import Card from "./Card";
import styles from "../css/cards.module.css";

export default function Cards({collections, activeCategorys}) {

  return (
    <>
      <div className={styles.block_cards}>
        {collections.filter((collection) => collection.category == activeCategorys || activeCategorys == 0).map((collection, index) => (
        <Card key={index} collection={collection}/>
        ))}

      </div>
    </>
  );
}
