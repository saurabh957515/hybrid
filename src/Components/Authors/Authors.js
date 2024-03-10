/** @format */

import React, { useEffect, useState } from "react";
import Layout from "../Layout";
import axios from "axios";
import PopUp from "../Fileds/PopUp";
import TextInput from "../Fileds/TextInput";
import PrimaryButton from "../Fileds/PrimaryButton";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  ChevronDownIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { Disclosure } from "@headlessui/react";
import Books from "../Books/Books";
import WhiteButton from "../Fileds/WhiteButton";

function Authors() {
  const [authors, setAuthors] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isEdit, setIsEdit] = useState();
  const [error, setError] = useState({});
  const [selectedAuthor, setSelectedAuthor] = useState({});
  const [book, setBook] = useState({});
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

  function ClassNames(...strings) {
    return strings.join(" ");
  }

  return (
    <div className="relative h-full ">
      <div className=" w-full h-[80vh] p-5 ">
        <div className="flex items-center justify-between">
          <form className="flex items-center w-3/4 px-8 mx-auto space-x-2 ">
            <div className="relative pt-2 text-gray-600 grow">
              <TextInput
                className="h-10 px-5 pr-16 text-white border-gray-300 rounded-lg C dark:border-white dark:bg-gray-800 border-1 focus:outline-none"
                type="search"
                placeholder="Search"
              />
              <button
                type="submit"
                className="absolute top-0 right-0 mt-5 mr-4"
              >
                <MagnifyingGlassIcon className="w-5 h-5 dark:text-white dark:opacity-80" />
              </button>
            </div>
          </form>
          <div className="inline-block px-8 text-right">
            <PopUp
              title={
                <WhiteButton className="border-gray-400">
                  <p className="text-base text-gray-900 dark:text-white">
                    Add Book
                  </p>
                </WhiteButton>
              }
              isOpen={isOpen}
              setIsOpen={setIsOpen}
            >
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
        </div>
        <div className="flex flex-col w-full h-full space-y-2.5">
          {authors?.map((author, index) => (
            <Disclosure defaultOpen={index == 0} className="w-full" key={index}>
              {({ open }) => (
                <>
                  <Disclosure.Button as="div">
                    <div className="px-2 mx-auto text-lg font-medium text-gray-500 dark:text-white custom-border">
                      <div className="flex justify-between w-full">
                        <span>
                          {index + 1} {author?.name}
                        </span>
                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setAuthorName(author?.name);
                              setIsOpen(true);
                              setIsEdit(true);
                              setSelectedAuthor(author);
                            }}
                          >
                            <PencilSquareIcon className="w-6 h-6 text-blue-500" />
                          </button>
                          <button onClick={() => deleteAuthor(author?._id)}>
                            <TrashIcon className="w-6 h-6 text-red-500 " />
                          </button>
                          <button>
                            <ChevronDownIcon
                              className={ClassNames(
                                open ? "rotate-180" : "",
                                "h-5 w-5"
                              )}
                            />
                          </button>
                        </div>
                      </div>

                      {error[`${author?.name}`]}
                    </div>
                  </Disclosure.Button>
                  <Disclosure.Panel className="flex w-full">
                    <div className="w-full p-5" key={book?._id}>
                      <Books isAuthor={true} searchAuthor={author?._id} />{" "}
                    </div>
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Authors;
