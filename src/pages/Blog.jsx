import styles from "../css/blog.module.css";
import Paralax from "../components/Paralax";
import { useEffect, useRef, useState } from "react";
import Loader from "../components/Loader";

export default function Blog() {
  const [cards, setCards] = useState([]);
  const [meta, setMeta] = useState({});
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const myRef = useRef();
  const [lastAnimatedIndex, setLastAnimatedIndex] = useState(-1);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://afbf733ef0b7e113.mokky.dev/blog?limit=3&page=${page}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        if (data.items.length > 0) {
          setMeta(data.meta);
          if (page === 1) {
            setCards(data.items); // Очистка списка карточек перед загрузкой новых
          } else {
            setCards((prevItems) => [...prevItems, ...data.items]);
          }
          setPage((prevPage) => prevPage + 1);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };

    const handleObserver = (entities) => {
      const target = entities[0];
      if (target.isIntersecting && !loading && meta.remaining_count !== 0) {
        loadItems();
      }
    };

    const observer = new IntersectionObserver(handleObserver, { threshold: 1 });
    const currentRef = myRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [page, loading, meta.remaining_count]);

  useEffect(() => {
    if (lastAnimatedIndex < cards.length - 1) {
      const timeoutId = setTimeout(() => {
        setLastAnimatedIndex((prevIndex) => prevIndex + 1);
      }, 200); // Задержка между анимациями карточек
      return () => clearTimeout(timeoutId);
    }
  }, [cards, lastAnimatedIndex]);

  return (
    <>
      <Paralax
        text_2={"BLOG"}
        text_btn={"Gallery"}
        fone={"./paralax_1.jpg"}
        to={"gallery"}
      />

      <div className={styles.wrapper_card}>
        {cards.map((card, index) => (
          <div
            key={card.id}
            className={`${styles.card} ${
              index <= lastAnimatedIndex ? styles.fadeIn : ""
            }`}
          >
            <img className={styles.photo} src={card.photo} alt="photo" />

            <div className={styles.wrapper_title}>
              <h3 className={styles.title}>{card.title}</h3>
              <div className={styles.desc}>{card.desc}</div>
            </div>

            <div className={styles.card_info}>
              <div className={styles.wrapper_name}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>

                <p className={styles.name}>by:</p>
                <p className={styles.name}>{card.name + " " + card.lastName}</p>
              </div>

              <div className={styles.wrapper_data}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5"
                  />
                </svg>

                <div className={styles.data}>{card.data}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.observe} ref={myRef}>
        {loading && <Loader />}
      </div>
    </>
  );
}
