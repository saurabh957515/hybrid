/** @format */

import React from "react";
import { Link } from "react-router-dom";
function Index() {
  return (
    <div className="w-full space-x-5 flex justify-end px-5">
      <Link style={{ textDecoration: "none" }} as="li" to="AddBook">
        AddBook
      </Link>
      <Link style={{ textDecoration: "none" }} as="li" to="Authors">
        Authors
      </Link>
      <Link style={{ textDecoration: "none" }} as="li" to="AddAuthor">
        AddAuthor
      </Link>
      <Link style={{ textDecoration: "none" }} as="li" to="Books">
        Books
      </Link>
    </div>
  );
}

export default Index;
