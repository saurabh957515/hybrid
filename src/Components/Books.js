import React, { useEffect, useState } from "react";

function Books() {
  const [book, setBooks] = useState([]);
  const getData=()=>{
    fetch("/api/users")
    .then((res) => res.json())
    .then((data) => setBooks(data));
  }

  console.log(book);
  return <div>Good book by me
    <button onClick={getData}>GetData</button>
  </div>;
}

export default Books;
