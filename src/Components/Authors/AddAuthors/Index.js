/** @format */

import React, { useState } from "react";
import Layout from "../../Layout";
import TextInput from "../../../Fileds/TextInput";
import PrimaryButton from "../../../Fileds/PrimaryButton";
import axios from "axios";

function Index() {
  const [authorName, setAuthorName] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    axios
      .post("/author", { name: authorName })
      .then((res) => console.log(res, res.data));
  }
  return (
    <div>
      <Layout />
      <form onSubmit={onSubmit}>
        <label>Name</label>
        <TextInput
          handleChange={(e) => setAuthorName(e.target.value)}
          value={authorName}
        />
        <PrimaryButton>Submit</PrimaryButton>
      </form>
      index1
    </div>
  );
}

export default Index;
