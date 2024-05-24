import styles from "../css/burgerMenu.module.css";

export default function BurgerMenu({ isOpen, toggleMenu }) {
  return (
    <div className={`${styles.burger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
      <div className="bar1"></div>
      <div className="bar2"></div>
      <div className="bar3"></div>
    </div>
  );
}

