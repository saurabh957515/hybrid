/** @format */

import React, { useEffect, useState } from "react";
import Layout from "../../Layout";
import TextInput from "../../Fileds/TextInput";
import ReactSelect from "../../Fileds/ReactSelect";
import _ from "lodash";

import axios from "axios";
import PrimaryButton from "../../Fileds/PrimaryButton";
import InputError from "../../Fileds/InputError";
import moment from "moment";
import Datepicker from "react-tailwindcss-datepicker";

const AddBook = ({
  authorOptions,
  editBook,
  isEdit,
  selectedBook,
  isBookAdd,
  onClose,
}) => {
  const [errors, setErrors] = useState({});
  const [book, setBook] = useState({
    title: "",
    author: "",
    publishDate: "",
    pageCount: "",
    coverImage: "",
    description: "",
  });

  useEffect(() => {
    if (isEdit) {
      setBook({
        ...selectedBook,
        publishDate: moment(selectedBook?.publishDate).format("YYYY-MM-DD"),
      });
    } else {
      setBook({
        title: "",
        author: "",
        publishDate: "",
        pageCount: "",
        coverImage: "",
        description: "",
      });
    }
  }, [selectedBook, isBookAdd]);

  const handleBook = (name, value) => {
    let newBook = _.cloneDeep(book);
    newBook[name] = value;
    setBook(newBook);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      const formData = new FormData();
      formData.append("title", book.title);
      formData.append("author", book.author);
      formData.append("publishDate", book.publishDate);
      formData.append("pageCount", book.pageCount);
      formData.append("coverImage", book.coverImage); // Append file object
      formData.append("description", book.description);
      editBook(book?._id, formData);
    } else {
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
            onClose();
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleBook("coverImage", file);
  };
  console.log(book, authorOptions);
  return (
    <div className="">
      <form onSubmit={onSubmit} className="grid w-full grid-cols-2 gap-4 p-5">
        <div>
          <label className={`block pb-1 text-sm capitalize text-gray-700`}>
            Title
          </label>
          <TextInput
             className="h-10 px-5 pr-16 text-white border-gray-300 rounded-lg C dark:border-white dark:bg-gray-800 border-1 focus:outline-none"
            value={book?.title}
            handleChange={(e) => handleBook("title", e.target.value)}
            name="title"
          />
          <InputError message={errors?.title} />
        </div>
        <div>
          <label className={`block pb-1 text-sm capitalize text-gray-700`}>
            Author
          </label>

          <ReactSelect
             className="h-10 text-white border-gray-300 rounded-lg C dark:border-white border-1 focus:outline-none"
            options={authorOptions}
            value={book?.author}
            onChange={(e) => handleBook("author", e?.value)}
            name="author"
          />
          <InputError message={errors?.author} />
        </div>

        <div className="relative">
          <label className={`block pb-1 text-sm capitalize text-gray-700`}>
            PublishedDate
          </label>
          <Datepicker
           inputClassName="border-gray-400 dark:bg-gray-800 px-3 relative border rounded-md w-full py-2 px-2 dark:text-white"
           asSingle={true}
           useRange={false}
          value={{startDate:book?.publishDate,endDate:book?.publishDate}}
            onChange={(e) => handleBook("publishDate", e.startDate)}
           />
         
          <InputError message={errors?.publishDate} />
        </div>
        <div>
          <label className={`block pb-1 text-sm capitalize text-gray-700`}>
            PageCount
          </label>
          <TextInput
             className="h-10 px-5 pr-16 text-white border-gray-300 rounded-lg C dark:border-white dark:bg-gray-800 border-1 focus:outline-none"
            value={book?.pageCount}
            handleChange={(e) => handleBook(e.target.name, e.target.value)}
            name="pageCount"
          />
          <InputError message={errors?.pageCount} />
        </div>
        {!isEdit && (
          <div>
            <label className={`block pb-1 text-sm capitalize text-gray-700  `}>
              CoverImage
            </label>
            <input
    type="file"
    className="py-1 border-gray-300 custom-border dark:bg-gray-800 dark:text-white dark:border-gray-700"
    onChange={handleFileChange} // Handle file change
    name="coverImage"
/>

            <InputError message={errors?.coverImage} />
          </div>
        )}
        <div>
          <label className={`block pb-1 text-sm capitalize text-gray-700  `}>
            Description
          </label>
          <TextInput
             className="h-10 px-5 pr-16 text-white border-gray-300 rounded-lg C dark:border-white dark:bg-gray-800 border-1 focus:outline-none"
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
