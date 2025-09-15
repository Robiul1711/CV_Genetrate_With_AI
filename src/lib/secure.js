import CryptoJS from "crypto-js";

const SECRET_KEY = import.meta.env.VITE_STORAGE_SECRET;

export const secureSet = (key, value) => {
  const encrypted = CryptoJS.AES.encrypt(
    JSON.stringify(value),
    SECRET_KEY
  ).toString();
  localStorage.setItem(key, encrypted);
};

export const secureGet = (key) => {
  const encrypted = localStorage.getItem(key);
  if (!encrypted) return null;
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY);
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch {
    return null;
  }
};

export const secureRemove = (key) => {
  localStorage.removeItem(key);
};