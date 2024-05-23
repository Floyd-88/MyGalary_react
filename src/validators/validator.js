import DOMPurify from "dompurify";

export function isValidEmail(email) {
  // Регулярное выражение для проверки email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function sanitizeInput(value) {
  return DOMPurify.sanitize(value);
}


export function validateName(name) {
  if (name.length < 2) {
    return "Имя должно содержать минимум 2 буквы";
  }
  return "";
}

export function validateLastName(lastName) {
  if (lastName.length < 2) {
    return "Фамилия должна содержать минимум 2 буквы";
  }
  return "";
}

export function validateEmail(email) {
  if (!isValidEmail(email)) {
    return "Введите корректный email";
  }
  return "";
}

export function validateText(text) {
  if (text.length < 5) {
    return "Текст должен содержать минимум 5 символов";
  }
  return "";
}

export function validatePassword(text) {
  if (text.length < 8) {
    return "Пароль должен содержать минимум 8 символов";
  }
  return "";
}