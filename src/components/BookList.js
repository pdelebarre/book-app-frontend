// src/components/BookList.js
import React, { useState, useEffect } from "react";
import { Box, Button, Snackbar, Alert } from "@mui/material";
import { getBooks, deleteBook, updateBook, addBook } from "../api";
import Fuse from "fuse.js";
import BookTable from "./BookTable";
import SearchBar from "./SearchBar";
import PopupForm from "./PopupForm";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingBook, setEditingBook] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar({ ...snackbar, open: false });
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    getBooks()
      .then((response) => {
        const booksData = response.data || [];
        setBooks(booksData);
        setFilteredBooks(booksData);
      })
      .catch((error) => console.error("Error fetching books:", error));
  };

  const handleDelete = (id) => {
    deleteBook(id)
      .then(() => fetchBooks())
      .catch((error) => console.error("Error deleting book:", error));
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setOpenPopup(true);
  };

  const handleAdd = () => {
    setEditingBook({ id: null, title: "", author: "" });
    setOpenPopup(true);
  };

  const handleSubmit = () => {
    const action = editingBook.id
      ? updateBook(editingBook.id, editingBook)
      : addBook(editingBook);

    action
      .then(() => {
        setOpenPopup(false);
        fetchBooks();
        setSnackbar({
          open: true,
          message: `Book ${editingBook.id ? "updated" : "added"} successfully`,
          severity: "success",
        });
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          setSnackbar({
            open: true,
            message: "A book with this title and author already exists",
            severity: "error",
          });
        } else {
          console.error(
            `Error ${editingBook.id ? "updating" : "adding"} book:`,
            error
          );
          setSnackbar({
            open: true,
            message: `Error ${
              editingBook.id ? "updating" : "adding"
            } book. Please try again.`,
            severity: "error",
          });
        }
      });
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const fuse = new Fuse(books, {
        keys: ["title", "author"],
        threshold: 0.3,
      });
      const results = fuse.search(query).map((result) => result.item);
      setFilteredBooks(results);
    } else {
      setFilteredBooks(books);
    }
  };

  return (
    <Box>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <Button onClick={handleAdd} variant="contained" color="primary">
        Add Book
      </Button>
      <BookTable
        books={filteredBooks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <PopupForm
        open={openPopup}
        handleClose={() => setOpenPopup(false)}
        handleSubmit={handleSubmit}
        book={editingBook}
        setBook={setEditingBook}
      />
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookList;
