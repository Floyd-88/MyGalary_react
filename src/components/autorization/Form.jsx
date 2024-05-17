import styles from "../../css/form.module.css";
import BtnForm from "./BtnForm";

export default function Form({children, title, btnText_1, btnText_2}) {
  return (
    <>
      <form onSubmit={(e) => e.preventDefault()}>
        <h2 className={styles.title}>
          {title}
        </h2>
            {children}
        {/* <p className={text-sm mb-4 text-red-500" >{{ errorAuth }}</p> */}
          
        <p className={styles.error_text}></p>
        <BtnForm disabled={false}>{btnText_1}</BtnForm>
        <div>
          <button className={styles.form_btn_reg}>{btnText_2}</button>
        </div>
      </form>
    </>
  );
}
