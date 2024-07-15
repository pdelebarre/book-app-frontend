// src/components/AddBook.js
import React, { useState } from "react";
import { addBook } from "../api";

const AddBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ title, author })
      .then((response) => {
        console.log("Book added:", response.data);
        setTitle("");
        setAuthor("");
      })
      .catch((error) => console.error("Error adding book:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Author</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
