import DOMPurify from "dompurify";


export function isValidEmail(email) {
    // Регулярное выражение для проверки email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  export function sanitizeInput(value) {
    return DOMPurify.sanitize(value);
  }