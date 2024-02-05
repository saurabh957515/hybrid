/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";

function Index() {
  const [book, setBooks] = useState([]);
  const getData = () => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };
  console.log("data here", book);
  return (
    <div>
      Good book by me
      <Link style={{ textDecoration: "none" }} as="li" to="/">
        Home
      </Link>
      <button
        className="bg-blue-400 text-white font-semibold p-2 rounded-lg"
        onClick={getData}
      >
        GetData
      </button>
    </div>
  );
}

export default Index;
