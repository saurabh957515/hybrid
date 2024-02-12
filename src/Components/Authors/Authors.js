/** @format */

import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import PopUp from "../Fileds/PopUp";
import TextInput from "../Fileds/TextInput";
import PrimaryButton from "../Fileds/PrimaryButton";
import { ToastContainer, toast, useToast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import Books from "../Books/Books";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState();
  const [error, setError] = useState({});
  const [selectedAuthor, setSelectedAuthor] = useState({});
  const [book, setBook] = useState({});
  const notify = () => toast.success("Success Notification !", {});
  // make the new page where user can change the authors and book and customize both and get the books according to eachOthers
  const [authorName, setAuthorName] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    if (isEdit) {
      const data = await axios
        .put(`/author/${selectedAuthor?._id}`, { name: authorName })
        .then((res) => console.log(res.data));
      setIsEdit(false);
      setIsOpen(false);
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
    if (data?.data?.errors) {
      setError(data?.data?.errors);
    } else {
      getAuthors();
      setAuthorName("");
      toast.success("Author Deleted !!");
    }
  }
  useEffect(() => {
    getAuthors();
  }, [isOpen]);

  console.log(book);
  return (
    <div className="relative h-full">
      <Layout />
      <div className="flex w-full h-[80vh] p-5 ">
        <div className="flex flex-col w-full h-full">
          {authors?.map((author, index) => (
            <Disclosure defaultOpen={index == 0} className="w-full" key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button>
                    <div className="mx-auto text-lg font-bold text-white bg-blue-400 ">
                      <div className="flex justify-between w-full">
                        <span>
                          {index + 1} {author?.name}
                        </span>
                        <div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setAuthorName(author?.name);
                              setIsOpen(true);
                              setIsEdit(true);
                              setSelectedAuthor(author);
                            }}
                          >
                            <PencilSquareIcon className="w-6 h-6 text-gray-900" />
                          </button>
                          <button onClick={() => deleteAuthor(author?._id)}>
                            <TrashIcon className="w-6 h-6 text-gray-900 " />
                          </button>
                        </div>
                      </div>

                      {error[`${author?.name}`]}
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel className="flex">
                    {author?.books?.map((book) => (
                      <div key={book?._id}>
                        <Books isAuthor={true} searchAuthor={author?._id} />{" "}
                      </div>
                    ))}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
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

export default Authors;
