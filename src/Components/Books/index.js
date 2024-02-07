/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Layout from "../Layout";
import PopUp from "../Fileds/PopUp";
import AddBook from "./AddBooks/AddBook";
export default function Index() {
  const [books, setBooks] = useState([]);
  const [isBookAdd, setIsBookAdd] = useState(false);
  const [authorOptions, setAuthorOptions] = useState([]);
  const [Errors, setErrors] = useState([]);
  useEffect(() => {
    getData();
  }, [isBookAdd]);
  function getData() {
    axios
      .get("/book")
      .then((res) => {
        if (res.data.errors) {
          setErrors(() => {
            let newErrors = {};
            _.forIn(res.data.errors, function (value, key) {
              newErrors[key] = value.message;
            });
            return newErrors;
          });
        } else {
          setBooks(res.data.books);
          setAuthorOptions(res.data?.searchOptions);
          setErrors({});
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  console.log(authorOptions);
  return (
    <div>
      <Layout />

      <div className="grid grid-cols-3 ">
        {books?.map((book, index) => (
          <div key={index}>
            HELo
            <img
              className="w-full h-full max-w-xl rounded-lg"
              src={`http://localhost:5000/${book?.coverImage}`}
            />
          </div>
        ))}
      </div>
      <PopUp title={"Add Book"} setIsOpen={setIsBookAdd} isOpen={isBookAdd}>
        <AddBook authorOptions={authorOptions} />
      </PopUp>
      <button onClick={getData}>GetData</button>
    </div>
  );
}
