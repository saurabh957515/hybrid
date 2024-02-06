/** @format */

import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../Layout";

function Index() {
  const [book, setBooks] = useState({});
  const getData = () => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  };
  console.log("data here", book);
  return (
<div className="bg-backgroundLight">
      <Layout/>
      <h2 className="page-header">{book?.title}</h2>
      <div className="book-details">
        <div>
          <img
            className="book-cover w-200 h-267"
            src={`/images/${book?.coverImage}`}
            alt={book?.title}
          />
          <div className="book-details-btn-grid">
            <a className="btn btn-primary" href={`/books/${book?.id}/edit`}>
              Edit
            </a>
            {/* Assuming you have a DeleteForm component */}
            {/* <DeleteForm url={`/books/${book.id}`} /> */}
            {/* <a className="btn btn-primary book-details-author-button" href={`/authors/${book.author.id}`}>
            View Author
          </a> */}
          </div>
        </div>
        <div className="book-details-grid">
          <div className="book-details-label">Author:</div>
          <div>{book?.author?.name}</div>
          <div className="book-details-label">Publish Date:</div>
          <div>{new Date(book?.publishDate).toDateString()}</div>
          <div className="book-details-label">Page Count:</div>
          <div>{book?.pageCount}</div>
          <div className="book-details-label">Description:</div>
          <div>{book?.description}</div>
        </div>
      </div>
    </div>
  );
}

export default Index;
