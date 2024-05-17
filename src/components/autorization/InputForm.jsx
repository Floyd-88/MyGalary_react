import styles from "../../css/inputForm.module.css";

export default function InputForm({ type, id, placeholder }) {
  return (
    <>
      <div className={styles.wrapper_form_input}>
        {/* <div className={text-left text-sm text-red-500 mb-1" v-if="errors.email">
          {{ errors.email }}
        </div> */}
        <input
          className={styles.input}
          type={type}
          id={id}
          placeholder={placeholder}
        />
      </div>
    </>
  );
}
