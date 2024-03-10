import { createContext } from "react";
export default function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const FlashContext = createContext({});
