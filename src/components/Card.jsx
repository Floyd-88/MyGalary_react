import { useEffect, useRef, useState } from "react";
import styles from "../css/card.module.css";

export default function Card({ collection, openModal, index }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      {
        threshold: 0,
      }
    );
    const currentCardRef = cardRef.current;
    if (currentCardRef) {
      observer.observe(currentCardRef);
    }
    return () => {
      if (currentCardRef) {
        observer.unobserve(currentCardRef);
      }
      observer.disconnect();
    };
  }, [index]);

  return (
    <>
      <div
        ref={cardRef}
        className={`${styles.card} ${isVisible ? styles.fadeIn : ""}`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <ul className={styles.items_photo}>
          {collection.photos.map((photo, photoIndex) => (
            <li key={photoIndex} className={styles.item_photo}>
              <img
                src={photo}
                alt="photo"
                onClick={() => openModal({ photoSrc: photo, collection })}
              />
            </li>
          ))}
        </ul>

        <div className={styles.title}>{collection.name}</div>
      </div>
    </>
  );
}
