/** @format */

import React, { useState } from "react";
import Layout from "../../Layout";
import TextInput from "../../Fileds/TextInput";
import ReactSelect from "../../Fileds/ReactSelect";
import _ from "lodash";
import axios from "axios";
import PrimaryButton from "../../Fileds/PrimaryButton";
import InputError from "../../Fileds/InputError";
const AddBook = ({ authorOptions }) => {
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
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("publishDate", book.publishDate);
    formData.append("pageCount", book.pageCount);
    formData.append("coverImage", book.coverImage); // Append file object
    formData.append("description", book.description);

    axios
      .post("/book", formData)
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
          // Handle successful response
          setBook(res.data);
          setErrors({});
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleBook("coverImage", file);
  };
  console.log(book);

  return (
    <div>
      <form onSubmit={onSubmit} className="grid w-full grid-cols-2 gap-4 p-5">
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
          <ReactSelect
            options={authorOptions}
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
            value={book?.publishDate}
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
          <input
            type="file"
            onChange={handleFileChange} // Handle file change
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
