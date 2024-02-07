/** @format */

import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import PopUp from "../Fileds/PopUp";
import TextInput from "../Fileds/TextInput";
import PrimaryButton from "../Fileds/PrimaryButton";

function Index() {
  const [authors, setAuthors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const [authorName, setAuthorName] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    axios
      .post("/author", { name: authorName })
      .then((res) => console.log(res, res.data));
  }

  useEffect(() => {
    axios.get("/author").then((res) => setAuthors(res.data.authors));
  }, [isOpen]);

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
      <PopUp title={"Add Author"} isOpen={isOpen} setIsOpen={setIsOpen}>
        <form onSubmit={onSubmit}>
          <label>Name</label>
          <TextInput
            handleChange={(e) => setAuthorName(e.target.value)}
            value={authorName}
          />
          <PrimaryButton>Submit</PrimaryButton>
        </form>
      </PopUp>
    </div>
  );
}

export default Index;
