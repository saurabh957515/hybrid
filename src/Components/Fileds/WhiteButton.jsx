import React from "react";

function WhiteButton({ onClick, children, className }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`inline-block rounded border-2 dark:border-gray-500 border-neutral-50 sm:px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-neutral-50 transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10 ${className}`}
      data-te-ripple-init
    >
      {children}
    </button>
  );
}

export default WhiteButton;
