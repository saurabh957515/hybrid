import React, { useState } from "react";
import { Link } from "react-router-dom";

function Books() {
  const [books, setBooks] = useState([]);
  const [Errors,setErrors]=useState([])
  const getData = () => {
    axios.get("/book", formData)
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
        setsetBooksBook(res.data);
        setErrors({})
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  };

  return (
    <div>
      Good book by me

      <button onClick={getData}>GetData</button>
    </div>
  );
}

export default Books;
