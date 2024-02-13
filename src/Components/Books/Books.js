/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Layout from "../Layout";
import PopUp from "../Fileds/PopUp";
import AddBook from "./AddBooks/AddBook";
import TextInput from "../Fileds/TextInput";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Datepicker from "react-tailwindcss-datepicker";
import { Popover, Transition } from "@headlessui/react";

export default function Books({ oldbooks = [], searchAuthor = "", isAuthor }) {
  const [books, setBooks] = useState(oldbooks);
  const [searchOptions, setSearchOptions] = useState({
    title: "",
    author: searchAuthor,
    dateOptions: {
      startDate: new Date(),
      endDate: new Date(),
    },
  });
  const [isBookAdd, setIsBookAdd] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [authorOptions, setAuthorOptions] = useState([]);
  const [Errors, setErrors] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [dateOptions, setDateOptions] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  useEffect(() => {
    getData();
  }, [isBookAdd]);

  function getData() {
    console.log(searchOptions);
    axios
      .get("/book", {
        params: searchOptions,
      })
      .then((res) => {
        if (res.data.errors) {
          setErrors(() => {
            let newErrors = {};
            _.forIn(res.data.errors, function (value, key) {
              newErrors[key] = value.message;
            });
            return newErrors;
          });
        } else {
          setBooks(res.data.books);
          setAuthorOptions(res.data?.searchOptions);
          setErrors({});
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async function deleteBook(id) {
    const data = await axios.delete(`/book/${id}`).then((res) => res?.data);
    if (data?.errors) {
    } else {
      getData();
    }
  }
  async function editBook(id, book) {
    const data = await axios.put(`/book/${id}`, book).then((res) => res?.data);
    if (data?.errors) {
    } else {
      getData();
      setIsBookAdd(false);
    }
  }

  function onClose() {
    setIsBookAdd((pre) => !pre);
    setIsEdit(false);
  }

  return (
    <div>
      {!isAuthor && <Layout />}
      <div className="w-3/4 mx-auto bg-white dark:bg-gray-800">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getData();
          }}
          className="flex items-center w-full px-8 space-x-2 "
        >
          <div>
            <Popover className="relative">
              <Popover.Button>
                <FunnelIcon className="h-6 w-6" />
              </Popover.Button>
              <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
              >
                <Popover.Panel className="absolute z-10 ">
                  <div className="bg-white dark:bg-gray-800 text-black p-2 w-44 flex flex-col border rounded-lg border-gray-300">
                    <div>By the Range</div>
                    <div>By the AfterDate</div>
                    <div>By the BeforeDate</div>
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>
          </div>

          <div className="items-center w-full">
            <Datepicker
              useRange={false}
              asSingle={false}
              inputClassName="border w-full py-1.5 pr-10 px-2 rounded-lg"
              value={dateOptions}
              onChange={(date) => {
                setSearchOptions((pre) => ({
                  ...pre,
                  dateOptions: date,
                }));
              }}
            />
          </div>
          <div className="pt-2 relative grow text-gray-600">
            <TextInput
              value={searchOptions?.publishedBefore}
              handleChange={(e) =>
                setSearchOptions((pre) => ({
                  ...pre,
                  title: e.target.value,
                }))
              }
              className="h-10 px-5 pr-16 border-1 border-gray-300 rounded-lg focus:outline-none"
              type="search"
              placeholder="Search"
            />
            <button type="submit" className="absolute top-0 right-0 mt-5 mr-4">
              <MagnifyingGlassIcon
                onClick={(e) => {
                  getData();
                }}
                className="w-5 h-5"
              />
            </button>
          </div>
        </form>
      </div>

      <div className="grid grid-cols-4 gap-x-4 bg-white dark:bg-gray-800  dark:text-white text-gray-900">
        {books?.map((book, index) => (
          <div key={index}>
            HELo
            <p className="">{book?.title}</p>
            <button onClick={() => deleteBook(book?._id)}>Delete</button>
            <button
              onClick={() => {
                setIsBookAdd(true);
                setIsEdit(true);
                setSelectedBook(book);
              }}
            >
              Edit
            </button>
            <img
              className="object-cover w-full max-w-xl rounded-lg opacity-80 h-96"
              src={`http://localhost:5000/${book?.coverImage}`}
            />{" "}
          </div>
        ))}
      </div>
      <PopUp title={"Add Book"} setIsOpen={onClose} isOpen={isBookAdd}>
        <AddBook
          onClose={onClose}
          isBookAdd={isBookAdd}
          editBook={editBook}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          selectedBook={selectedBook}
          authorOptions={authorOptions}
        />
      </PopUp>
      <button onClick={getData}>GetData</button>
    </div>
  );
}
