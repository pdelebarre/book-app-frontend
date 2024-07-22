import React, { useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { addBook } from "../api";
import Footer from "./Footer";

const AddBook = ({ onBookAdded }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState({ message: "", type: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ title, author })
      .then((response) => {
        setStatus({ message: "Book added successfully!", type: "success" });
        onBookAdded();
        setTitle("");
        setAuthor("");
      })
      .catch((error) => {
        setStatus({ message: "Error adding book!", type: "error" });
      });
  };

  const handleClearStatus = () => {
    setStatus({ message: "", type: "" });
  };

  return (
    <>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Book
        </Button>
      </Box>
      {status.message && (
        <Footer
          message={status.message}
          type={status.type}
          onClear={handleClearStatus}
        />
      )}
    </>
  );
};

export default AddBook;
