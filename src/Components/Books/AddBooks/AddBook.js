import React from "react";
import Layout from "../../Layout";

const AddBook = ({ book, authors }) => {
  return (
    <div>
      <Layout/>
      <div className="form-row">
        <div className="form-item">
          <label>Title</label>
          <input type="text" name="title" value={book?.title || ''} />
        </div>
        <div className="form-item">
          <label>Author</label>
          <select name="author">
            {authors?.map(author => (
              <option
                key={author.id}
                value={author.id}
                selected={author.id === book?.author}
              >
                {author.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-item">
          <label>Publish Date</label>
          <input
            type="date"
            name="publishDate"
            value={
              book?.publishDate
                ? new Date(book.publishDate).toISOString().split("T")[0]
                : ""
            }
          />
        </div>
        <div className="form-item">
          <label>Page Count</label>
          <input type="number" name="pageCount" min="1" value={book?.pageCount || ''} />
        </div>
      </div>

      <div className="form-row">
        <div className="form-item form-item-no-grow">
          <label>Cover</label>
          <input type="file" name="cover" className="book-cover filepond" />
        </div>
        <div className="form-item">
          <label>Description</label>
          <textarea name="description">{book?.description || ''}</textarea>
        </div>
      </div>
    </div>
  );
};

export default AddBook;
