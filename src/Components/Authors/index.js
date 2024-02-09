/** @format */

import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import PopUp from "../Fileds/PopUp";
import TextInput from "../Fileds/TextInput";
import PrimaryButton from "../Fileds/PrimaryButton";
import { ToastContainer, toast, useToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Index() {
  const [authors, setAuthors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState();
  const [selectedAuthor, setSelectedAuthor] = useState({});
  const notify = () => toast.success("Success Notification !", {});

  const [authorName, setAuthorName] = useState("");

  function onSubmit(e) {
    e.preventDefault();
    if (isEdit) {
      axios
        .put(`/author/${selectedAuthor?._id}`)
        .then((res) => console.log(res.data));
      setIsEdit(false);
    } else {
      axios.post("/author", { name: authorName });
      setIsOpen(false);
      toast.success("Author Successfully Saved !", {});
      setAuthorName("");
    }
  }
  function getAuthors() {
    axios.get("/author").then((res) => setAuthors(res.data.authors));
  }
  async function deleteAuthor(id) {
    const data = await axios.delete(`/author/${id}`);
    getAuthors();
    setAuthorName("");
    toast.success("Author Deleted !!");
  }
  useEffect(() => {
    getAuthors();
  }, [isOpen]);
  return (
    <div className="relative">
      <Layout />
      <div className="">
        {authors?.map((author, index) => (
          <div className="text-lg w-1/2 mx-auto my-2 font-bold text-white bg-blue-400 ">
            <span>{index + 1}</span>
            <button
              onClick={() => {
                setAuthorName(author?.name);
                setIsOpen(true);
                setIsEdit(true);
                setSelectedAuthor(author);
              }}
            >
              Edit
            </button>
            <button onClick={() => deleteAuthor(author?._id)}>Delete</button>
            {author?.name}
          </div>
        ))}
      </div>
      Authors
      <div>
        <button onClick={notify}>Notify!</button>
        <ToastContainer
          position="top-right"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={true}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable={true}
          pauseOnHover={true}
          theme="light"
        />
      </div>
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
