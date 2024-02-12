/** @format */

import axios from "axios";
import React, { useEffect, useState } from "react";
import _ from "lodash";
import Layout from "../Layout";
import PopUp from "../Fileds/PopUp";
import AddBook from "./AddBooks/AddBook";
import TextInput from "../Fileds/TextInput";
import { FunnelIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { get } from "lodash";
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
  return (
    <div>
      {!isAuthor && <Layout />}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          getData();
        }}
        class="flex items-center"
      >
        <label for="simple-search" class="sr-only">
          Search
        </label>
        <div class="relative w-full">
          <FunnelIcon className="h-5 w-5" />
          <TextInput
            handleChange={(e) => {
              setSearchOptions((pre) => ({ ...pre, title: e.target.value }));
            }}
            value={searchOptions?.title}
          />
          <TextInput
            value={searchOptions?.publishedBefore}
            handleChange={(e) =>
              setSearchOptions((pre) => ({
                ...pre,
                publishedBefore: e.target.value,
              }))
            }
            type="date"
          />
          <div>
            <MagnifyingGlassIcon
              onClick={(e) => {
                getData();
              }}
              className="h-5 w-5"
            />
            dfs
          </div>
        </div>
      </form>

      <div className="grid grid-cols-4 gap-x-4">
        {books?.map((book, index) => (
          <div key={index}>
            HELo{console.log(book)}
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
              className=" max-w-xl rounded-lg opacity-80 object-cover h-96 w-full"
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
