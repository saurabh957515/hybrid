/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Layout from "../Layout";
import PopUp from "../Fileds/PopUp";
import AddBook from "./AddBooks/AddBook";
import TextInput from "../Fileds/TextInput";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Datepicker from "tailwind-datepicker-react";
import { get } from "lodash";
import { Menu, MenuButton, MenuItem, MenuItems, Popover, PopoverButton, PopoverOverlay, PopoverPanel } from "@headlessui/vue";
export default function Books({ oldbooks = [], searchAuthor = "", isAuthor }) {
  const [books, setBooks] = useState(oldbooks);
  const [searchOptions, setSearchOptions] = useState({
    title: "",
    author: searchAuthor,
  });
  const [isBookAdd, setIsBookAdd] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [authorOptions, setAuthorOptions] = useState([]);
  const [Errors, setErrors] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  useEffect(() => {
    getData();
  }, [isBookAdd]);
  function getData() {
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
  const [show, setShow] = useState(false);
  const handleChange = (selectedDate) => {
    console.log(selectedDate);
  };
  const handleClose = (state) => {
    setShow(state);
  };

  return (
    <div>
                  {!isAuthor && <Layout />}
      <div className="w-3/4 mx-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getData();
          }}
          className="flex items-center w-full px-8 space-x-2"
        >
          <div>
            
    
          </div>

          <div className="items-center">
            <Datepicker
              onChange={handleChange}
              show={show}
              setShow={handleClose}
            />
          </div>
          <div class="pt-2 relative grow text-gray-600">
            <TextInput
              value={searchOptions?.publishedBefore}
              handleChange={(e) =>
                setSearchOptions((pre) => ({
                  ...pre,
                  publishedBefore: e.target.value,
                }))
              }
              className="h-10 px-5 pr-16 border-2 border-gray-300 rounded-lg focus:outline-none"
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
          {/* <TextInput
            value={searchOptions?.publishedBefore}
            handleChange={(e) =>
              setSearchOptions((pre) => ({
                ...pre,
                publishedBefore: e.target.value,
              }))
            }
            type="date"
          /> */}
        </form>
      </div>

      <div className="grid grid-cols-4 gap-x-4">
        {books?.map((book, index) => (
          <div key={index}>
            HELo{console.log(book)}
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
