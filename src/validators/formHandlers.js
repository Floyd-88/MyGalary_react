import {
  sanitizeInput,
  validateName,
  validateLastName,
  validateEmail,
  validateText,
  validatePassword,
} from "./validator.js";

export function handleInputChange(
  e,
  setFormData,
  setFormDataErrors,
  setSuccess
) {
  const { name, value } = e.target;
  const sanitizedValue = sanitizeInput(value);
  setSuccess("");
  setFormData((prevState) => ({
    ...prevState,
    [name]: sanitizedValue,
  }));

  let error = "";
  switch (name) {
    case "name":
      error = validateName(value);
      break;
    case "lastName":
      error = validateLastName(value);
      break;
    case "email":
      error = validateEmail(value);
      break;
    case "text":
      error = validateText(value);
      break;
    case "password":
      error = validatePassword(value);
      break;
    default:
      break;
  }

  setFormDataErrors((prevState) => ({
    ...prevState,
    [name]: error,
  }));
}
