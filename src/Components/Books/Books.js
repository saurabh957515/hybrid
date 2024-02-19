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
import WhiteButton from "../Fileds/WhiteButton";
import ReactSelect from "../Fileds/ReactSelect";

export default function Books({ oldbooks = [], searchAuthor = "", isAuthor }) {
  const [books, setBooks] = useState(oldbooks);
  const [searchOptions, setSearchOptions] = useState({
    title: "",
    author: searchAuthor,
    dateOptions: {
      startDate: "",
      endDate: "",
    },
  });
  const [isBookAdd, setIsBookAdd] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [authorOptions, setAuthorOptions] = useState([]);
  const [Errors, setErrors] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [show, setShow] = useState(false);
  const [dateRange, setDateRange] = useState(false);
  const [dateOptions, setDateOptions] = useState({
    startDate: "",
    endDate: "",
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
    <div className="bg-white dark:bg-gray-800">
      {!isAuthor && (
        <>
          <div className="flex items-center justify-between">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                getData();
              }}
              className="flex items-center w-3/4 px-8 mx-auto space-x-2 "
            >
              <div>
                <Popover className="relative">
                  <Popover.Button>
                    <FunnelIcon className="w-6 h-6 text-gray-300 dark:text-white" />
                  </Popover.Button>
                  <Transition
                    enter="transition duration-100 ease-out"
                    enterFrom="transform scale-95 opacity-0"
                    enterTo="transform scale-100 opacity-100"
                    leave="transition duration-75 ease-out"
                    leaveFrom="transform scale-100 opacity-100"
                    leaveTo="transform scale-95 opacity-0"
                  >
                    <Popover.Panel className="absolute z-10 mt-1">
                      {({ close }) => (
                        <div className="flex flex-col p-2 text-base font-medium text-black bg-white border border-gray-300 rounded-lg dark:bg-gray-800 w-44 dark:text-white">
                          <div
                            onClick={() => {
                              setDateRange(true);
                              close();
                            }}
                            className="cursor-pointer"
                          >
                            By the Range
                          </div>
                          <div
                            onClick={() => {
                              setDateRange(false);
                              close();
                            }}
                            className="cursor-pointer"
                          >
                            By the SingleDate
                          </div>
                        </div>
                      )}
                    </Popover.Panel>
                  </Transition>
                </Popover>
              </div>

              <div className="items-center w-full">
                <Datepicker
                  useRange={dateRange}
                  primaryColor="blue"
                  asSingle={!dateRange}
                  inputClassName="border border-gray-500 dark:border-white w-full py-1.5 text-opacity-80 pr-10 px-2 rounded-lg dark:bg-gray-800 text-white"
                  value={searchOptions?.dateOptions}
                  onChange={(date) => {
                    setSearchOptions((pre) => ({
                      ...pre,
                      dateOptions: date,
                    }));
                  }}
                />
              </div>
              <div className="relative pt-2 text-gray-600 grow">
                <TextInput
                  value={searchOptions?.title}
                  handleChange={(e) =>
                    setSearchOptions((pre) => ({
                      ...pre,
                      title: e.target.value,
                    }))
                  }
                  className="h-10 px-5 pr-16 text-white border-gray-300 rounded-lg C dark:border-white dark:bg-gray-800 border-1 focus:outline-none"
                  type="search"
                  placeholder="Search"
                />
                <button
                  type="submit"
                  className="absolute top-0 right-0 mt-5 mr-4"
                >
                  <MagnifyingGlassIcon
                    onClick={(e) => {
                      getData();
                    }}
                    className="w-5 h-5 dark:text-white dark:opacity-80"
                  />
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
                setIsOpen={onClose}
                isOpen={isBookAdd}
              >
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
            </div>
          </div>
        </>
      )}
      <div className="grid grid-cols-4 gap-4 text-gray-900 bg-white gap-x-4 dark:bg-gray-800 dark:text-white">
        {books?.map((book, index) => (
          <div
            key={index}
            className="relative block max-w-sm p-6 overflow-hidden bg-center bg-cover rounded-lg shadow-lg h-96 dark:bg-neutral-700"
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(http://localhost:5000/${book?.coverImage})`,
            }}
          >
            <h5 className="absolute text-xl font-medium leading-tight text-white capitalize dark:opacity-75 top-2 left-2 dark:text-neutral-50">
              {book?.title}
            </h5>

            <div className="absolute space-x-2 bottom-2 right-2">
              <WhiteButton
                className="text-sm dark:opacity-75"
                onClick={() => {
                  setIsBookAdd(true);
                  setIsEdit(true);
                  setSelectedBook(book);
                }}
              >
                Edit
              </WhiteButton>
              <WhiteButton
                className="text-sm dark:opacity-75"
                onClick={() => deleteBook(book?._id)}
              >
                Delete
              </WhiteButton>
            </div>
          </div>
        ))}
      </div>

      <button onClick={getData}>GetData</button>
    </div>
  );
}
