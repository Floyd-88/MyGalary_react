import styles from "../css/contact.module.css";

import Paralax from "../components/Paralax";
import { useState } from "react";
import { handleInputChange } from "../validators/formHandlers";

export default function Contact() {
  const initialFormState = {
    name: "",
    lastName: "",
    email: "",
    text: "",
  };

  const [formContact, setFormContact] = useState(initialFormState);
  const [formContactErrors, setFormContactErrors] = useState({});
  const [success, setSuccess] = useState("");

  function formReset() {
    setFormContact(initialFormState);
    setFormContactErrors({});
  }

  function handleSubmit(e) {
    e.preventDefault();

    const trimmedFormContact = Object.fromEntries(
      Object.entries(formContact).map(([key, value]) => [key, value.trim()])
    );

    fetch("https://formspree.io/f/xvoenkne", {
      method: "POST",
      body: JSON.stringify(trimmedFormContact),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          setSuccess("Ваше сообщение отправлено!");
          formReset();
        } else {
          response.json().then((data) => {
            if (data.errors) {
              console.log(data.errors.map((error) => error.message).join(", "));
            } else {
              console.log("Oops! There was a problem submitting your form");
            }
          });
        }
      })
      .catch((error) => {
        console.log("Oops! There was a problem submitting your form", error);
      });
  }

  return (
    <>
      <Paralax
        text_2={"CONTACT"}
        text_btn={"Gallery"}
        fone={"./paralax_1.jpg"}
        to={"/gallery"}
      />
      <div className={styles.wrapper_forms}>
        <form onSubmit={handleSubmit}>
          <h3 className={styles.form_title}>Обратная связь</h3>
          {success && <p className={styles.success}>{success}</p>}

          <div className={styles.form_name}>
            <div className={styles.wrapper_input}>
              <input
                type="text"
                className={styles.form_input}
                placeholder="Ваше имя"
                name="name"
                value={formContact["name"]}
                onChange={(e) => handleInputChange(e, setFormContact, setFormContactErrors)}
              />
              {formContactErrors["name"] && (
                <p className={styles.error_text}>{formContactErrors["name"]}</p>
              )}
            </div>

            <div className={styles.wrapper_input}>
              <input
                type="text"
                className={styles.form_input}
                placeholder="Ваша Фамилия"
                name="lastName"
                value={formContact["lastName"]}
                onChange={(e) => handleInputChange(e, setFormContact, setFormContactErrors)}
              />
              {formContactErrors["lastName"] && (
                <p className={styles.error_text}>
                  {formContactErrors["lastName"]}
                </p>
              )}
            </div>
          </div>

          <div className={styles.wrapper_input}>
            <input
              type="email"
              className={styles.form_input}
              placeholder="Ваш адрес электронной почты"
              name="email"
              value={formContact["email"]}
              onChange={(e) => handleInputChange(e, setFormContact, setFormContactErrors)}
            />
            {formContactErrors["email"] && (
              <p className={styles.error_text}>{formContactErrors["email"]}</p>
            )}
          </div>

          <div className={styles.wrapper_input}>
            <textarea
              name="text"
              className={styles.form_text}
              placeholder="Текст сообщения"
              value={formContact["text"]}
              onChange={(e) => handleInputChange(e, setFormContact, setFormContactErrors)}
            ></textarea>
            {formContactErrors["text"] && (
              <p className={styles.error_text}>{formContactErrors["text"]}</p>
            )}
          </div>

          <input
            disabled={
              !formContact.name ||
              !formContact.lastName ||
              !formContact.email ||
              !formContact.text ||
              Object.values(formContactErrors).some((error) => !!error)
            }
            className={styles.form_btn}
            type="submit"
            value="Отправить"
          />
        </form>

        <div className={styles.contacts}>
          <h3 className={styles.form_title}>Контактные данные</h3>

          <div className={styles.contacts_items}>
            <div className={styles.wrapper_address}>
              <div className={styles.address}>
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
                    d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                  />
                </svg>
                ул. Ленина 127, п.1
              </div>
              <p>г. Москва, 355000</p>
            </div>
          </div>

          <div className={styles.contacts_items}>
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
                d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
              />
            </svg>
            <p>+7 900-000-00-00</p>
          </div>
          <div className={styles.contacts_items}>
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
                d="M21.75 9v.906a2.25 2.25 0 0 1-1.183 1.981l-6.478 3.488M2.25 9v.906a2.25 2.25 0 0 0 1.183 1.981l6.478 3.488m8.839 2.51-4.66-2.51m0 0-1.023-.55a2.25 2.25 0 0 0-2.134 0l-1.022.55m0 0-4.661 2.51m16.5 1.615a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V8.844a2.25 2.25 0 0 1 1.183-1.981l7.5-4.039a2.25 2.25 0 0 1 2.134 0l7.5 4.039a2.25 2.25 0 0 1 1.183 1.98V19.5Z"
              />
            </svg>

            <p>feed_back@portfolioit.ru</p>
          </div>
          <div className={styles.contacts_items}>
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
                d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418"
              />
            </svg>

            <p>https://portfolioit.ru</p>
          </div>
        </div>
      </div>
    </>
  );
}
