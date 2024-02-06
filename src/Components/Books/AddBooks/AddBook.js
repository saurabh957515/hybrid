/** @format */

import React, { useState } from "react";
import Layout from "../../Layout";
import TextInput from "../../../Fileds/TextInput";
import ReactSelect from "../../../Fileds/ReactSelect";
import _ from "lodash";
import axios from "axios";
import PrimaryButton from "../../../Fileds/PrimaryButton";
import InputError from "../../../Fileds/InputError";
const AddBook = () => {
  const [errors, setErrors] = useState({});
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishDate: "",
    pageCount: "",
    coverImage: "",
    description: "",
  });

  const handleBook = (name, value) => {
    let newBook = _.cloneDeep(book);
    newBook[name] = value;
    setBook(newBook);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios.post("/book", book).then((res) => {
      if (res.data.errors) {
        setErrors(() => {
          let newErrors = {};
          _.forIn(res.data.errors, function (value, key) {
            newErrors[key] = value.message;
          });
          return newErrors;
        });
      } else {
        setBook(res.data);
      }
    });
  };

  console.log(book);

  return (
    <div>
      <Layout />
      <form onSubmit={onSubmit} className="w-full grid grid-cols-2 p-5 gap-4">
        <div>
          <label className={`block pb-1 text-sm capitalize text-gray-700  `}>
            Title
          </label>
          <TextInput
            value={book?.title}
            handleChange={(e) => handleBook("title", e.target.value)}
            name="title"
          />
          <InputError message={errors?.title} />
        </div>
        <div>
          <label className={`block pb-1 text-sm capitalize text-gray-700  `}>
            Author
          </label>
          <TextInput
            value={book?.author}
            handleChange={(e) => handleBook(e.target.name, e.target.value)}
            name="author"
          />
          <InputError message={errors?.author} />
        </div>
        <div>
          <label className={`block pb-1 text-sm capitalize text-gray-700  `}>
            PublishedDate
          </label>
          <TextInput
            handleChange={(e) => handleBook(e.target.name, e.target.value)}
            type="date"
            name="publishDate"
          />
          <InputError message={errors?.publishDate} />
        </div>
        <div>
          <label className={`block pb-1 text-sm capitalize text-gray-700  `}>
            PageCount
          </label>
          <TextInput
            value={book?.pageCount}
            handleChange={(e) => handleBook(e.target.name, e.target.value)}
            name="pageCount"
          />
          <InputError message={errors?.pageCount} />
        </div>
        <div>
          <label className={`block pb-1 text-sm capitalize text-gray-700  `}>
            CoverImage
          </label>
          <TextInput
            type="file"
            value={book?.coverImage}
            handleChange={(e) => handleBook(e.target.name, e.target.value)}
            name="coverImage"
          />
          <InputError message={errors?.coverImage} />
        </div>
        <div>
          <label className={`block pb-1 text-sm capitalize text-gray-700  `}>
            Description
          </label>
          <TextInput
            value={book?.description}
            handleChange={(e) => handleBook(e.target.name, e.target.value)}
            name="description"
          />
          <InputError message={errors?.description} />
        </div>
        <div>
          <PrimaryButton type="submit">submit</PrimaryButton>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
