/** @format */

import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";

function Index() {
  const [authors, setAuthors] = useState([]);
  useEffect(() => {
    axios.get("/author").then((res) => setAuthors(res.data.authors));
  }, []);
  return (
    <div className="">
      <Layout />
      <div className="flex space-x-4 w-full my-2">
        {authors?.map((author) => (
          <div className="text-lg w-1/2 font-bold text-white bg-blue-400 ">
            {author?.name}
          </div>
        ))}
      </div>
      Authors
    </div>
  );
}

export default Index;
