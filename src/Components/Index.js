import React from "react";
import { Link } from "react-router-dom";

function Index() {
  return (
    <div>
      <Link style={{ textDecoration: "none" }} as="li" to="about">
        Home
      </Link>
      Index
    </div>
  );
}

export default Index;
