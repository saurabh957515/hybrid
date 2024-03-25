/** @format */

import React, { memo } from "react";
import Select from "react-select";

function getValueObj(options, val) {
  return options?.find(({ label, value }) => {
    return value === val;
  });
}

function ReactSelect({
  closeMenuOnSelect,
  onChange,
  value,
  className,
  altInput,
  options,
  disabled,
  isClearable,
  ...props
}) {
  const styleOptions={
    menuPortal: (base) => ({ ...base, zIndex: 9999 }),
    control: (provided, state) => ({
      ...provided,
      minHeight: "42px",
      color: "white",
      backgroundColor: state.isFocused ? "rgba(66, 153, 225, 0.3)" : "rgba(66, 153, 225, 0.1)",
      '@apply dark:bg-gray-800': 'dark', // Apply dark mode background color
    }),
    singleValue: (provided, state) => ({
      ...provided,
      opacity: 0.75,
      color: "white",
      '@apply dark:text-gray-300': 'dark', // Apply dark mode text color
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "rgba(66, 153, 225, 0.3)" : "rgba(66, 153, 225, 0.1)",
      '@apply dark:bg-gray-800': 'dark', // Apply dark mode background color
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      backgroundColor: state.isSelected ? "rgba(66, 153, 225, 0.9)" : "transparent",
      "&:hover": {
        backgroundColor: state.isSelected ? "rgba(66, 153, 225, 0.9)" : "rgba(66, 153, 225, 0.3)",
      },
      '@apply dark:text-white': 'dark', // Apply dark mode text color
    }),
  }
  return (
    <Select
      {...props}
      closeMenuOnSelect={closeMenuOnSelect}
      onChange={onChange}
      value={typeof value === "object" ? value : getValueObj(options, value)}
      className="my-react-select-container"
      classNamePrefix="my-react-select"
      styles={{
        menu: (provided) => ({
          ...provided,
          backgroundColor: "rgba(255, 255, 255, 0.9)", // Example style
        }),
      }}
      isDisabled={disabled}
      options={options}
      isClearable={isClearable}
    />
  );
}

export default memo(ReactSelect);
