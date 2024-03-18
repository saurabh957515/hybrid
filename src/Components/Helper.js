import { createContext } from "react";
export default function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export const storedToken = localStorage.getItem("token");

export const FlashContext = createContext({});
