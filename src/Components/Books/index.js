import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";
import Layout from "../Layout";
export default function Index() {
  const [books, setBooks] = useState([]);
  const [Errors, setErrors] = useState([]);
  useEffect(() => {
    getData();
  }, []);
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
          // Handle successful response
          setBooks(res.data.books);
          setErrors({});
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }
  return (
    <div>
      <Layout />
      <div className="grid grid-cols-3">
        {books?.map((book) => (
          <div>HELo</div>
        ))}
      </div>

      <button onClick={getData}>GetData</button>
    </div>
  );
}
