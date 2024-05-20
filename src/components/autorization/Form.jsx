import styles from "../../css/form.module.css";
import BtnForm from "./BtnForm";

export default function Form({
  children,
  title,
  btnText_1,
  btnText_2,
  formErrors,
  setFormErrors,
  props
}) {
  function resetFormData() {
    props.setFormData({
      name: "",
      email: "",
      password: "",
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const isFormValid = Object.values(formErrors).every(
      (error) => error === ""
    );

    if (isFormValid) {
      resetFormData();

      if (btnText_1 === "Регистрация") {
        setFormErrors({
          name: true,
          email: true,
          password: true,
        });

        console.log("Вы зарегистрировались");
      } else {
        setFormErrors({
          email: true,
          password: true,
        });

        console.log("Вы авторизовались");
      }
    } else {
      console.log("Форма содержит ошибки в полях ввода");
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h2 className={styles.title}>{title}</h2>
        {children}
        <BtnForm
          disabled={Object.values(formErrors).some((formError) => formError)}
        >
          {btnText_1}
        </BtnForm>
        <div>
          <button
            className={styles.form_btn_reg}
            onClick={() => {
              props.setShowAuto(btnText_2);
              resetFormData();
            }}
          >
            {btnText_2}
          </button>
        </div>
      </form>
    </>
  );
}
