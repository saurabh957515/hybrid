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
  return (
    <Select
      {...props}
      closeMenuOnSelect={closeMenuOnSelect}
      onChange={onChange}
      value={typeof value === "object" ? value : getValueObj(options, value)}
      className={
        "block w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 focus:border-blue-500 dark:focus:border-blue-600 focus:ring-blue-500 dark:focus:ring-blue-600 rounded-md shadow-sm " +
        className +
        (altInput ? " bg-white" : " bg-mlmgray-200")
      }
      styles={{
        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
        control: (provided) => ({ ...provided, minHeight: "42px" }),
      }}
      isDisabled={disabled}
      menuPortalTarget={document.body}
      options={options}
      isClearable={isClearable}
    />
  );
}

export default memo(ReactSelect);
