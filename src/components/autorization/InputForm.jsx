import styles from "../../css/inputForm.module.css";
import { isValidEmail } from "../../validator.js";

export default function InputForm({
  type,
  name,
  placeholder,
  formErrors,
  setFormErrors,
  props,
}) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;

    props.setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    setFormErrors((prevState) => ({
      ...prevState,
      [name]: "",
    }));

    if (name === "name" && value.length < 2) {
      setFormErrors((prevState) => ({
        ...prevState,
        name: "Имя должно содежать минимум 2 буквы",
      }));
    } else if (name === "email" && !isValidEmail(value)) {
      setFormErrors((prevState) => ({
        ...prevState,
        email: "Введите коректный email",
      }));
    } else if (name === "password" && value.length < 8) {
      setFormErrors((prevState) => ({
        ...prevState,
        password: "Пароль должен содержать минимум 8 символов",
      }));
    }
  };
  return (
    <>
      <div className={styles.wrapper_form_input}>
        <input
          className={styles.input}
          type={type}
          name={name}
          placeholder={placeholder}
          value={props.formData[name]}
          onChange={handleInputChange}
        />
        {formErrors[name] && (
          <p className={styles.error_text}>{formErrors[name]}</p>
        )}
      </div>
    </>
  );
}
