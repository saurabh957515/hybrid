/** @format */
import React, { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

function CustomPicker() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
    } else if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, [theme]);
  const [value, setValue] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const handleValueChange = (newValue) => {
    console.log("newValue:", newValue);
    setValue(newValue);
  };
  function handleMode() {
    setTheme((pre) => {
      if (pre === "light") {
        return "dark";
      } else if (pre === "dark") {
        return "light";
      }
    });
  }
  console.log(theme);

  return (
    <div className="">
      <button onClick={handleMode}>Switch</button>
      <Datepicker
        primaryColor={"blue"}
        value={value}
        onChange={handleValueChange}
        showShortcuts={true}
      />
    </div>
  );
}

export default CustomPicker;
