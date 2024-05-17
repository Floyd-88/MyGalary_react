import styles from "../../css/btnForm.module.css";

export default function BtnForm({children, disabled}) {
  return (
    <>
      <div>
        <button
          className={styles.form_btn_enter}
          type="submit"
          disabled={disabled}
        >
          {children}
        </button>
      </div>
    </>
  );
}
