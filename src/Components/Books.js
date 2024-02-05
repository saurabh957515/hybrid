import React, { useState } from "react";
import { Link } from "react-router-dom";

function Books() {
  const [book, setBooks] = useState([]);
  const getData = () => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };

  return (
    <div>
      Good book by me
      <Link style={{ textDecoration: "none" }} as="li" to="/">
        Home
      </Link>
      <button onClick={getData}>GetData</button>
    </div>
  );
}

export default Books;
