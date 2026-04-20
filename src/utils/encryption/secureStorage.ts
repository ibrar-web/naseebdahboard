import CryptoJS from 'crypto-js';
import { env } from '@/config/env';

const encrypt = (value: unknown) =>
  CryptoJS.AES.encrypt(JSON.stringify(value), env.authSecret).toString();

const decrypt = <T,>(value: string): T | null => {
  try {
    const bytes = CryptoJS.AES.decrypt(value, env.authSecret);
    const parsed = bytes.toString(CryptoJS.enc.Utf8);
    return parsed ? (JSON.parse(parsed) as T) : null;
  } catch {
    return null;
  }
};

export const secureStorage = {
  set<T>(key: string, value: T) {
    localStorage.setItem(key, encrypt(value));
  },
  get<T>(key: string) {
    const value = localStorage.getItem(key);
    return value ? decrypt<T>(value) : null;
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
};
