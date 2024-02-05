/** @format */

import React from "react";
import { Link } from "react-router-dom";

function Index() {
  return (
    <div className="text-red-500 w-20">
      <Link style={{ textDecoration: "none" }} as="li" to="Add Book">
        Home
      </Link>
      <Link style={{ textDecoration: "none" }} as="li" to="Authors">
        Home
      </Link>
      <Link style={{ textDecoration: "none" }} as="li" to="Add Author">
        Home
      </Link>
      <Link style={{ textDecoration: "none" }} as="li" to="Books">
        Home
      </Link>
    </div>
  );
}

export default Index;
