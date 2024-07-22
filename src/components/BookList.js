import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Button,
  Link,
} from "@mui/material";
import { getBooks, deleteBook, updateBook } from "../api";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  const fetchBooks = () => {
    getBooks()
      .then((response) => setBooks(response.data))
      .catch((error) => console.error("Error fetching books:", error));
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = (id) => {
    deleteBook(id)
      .then(() => fetchBooks())
      .catch((error) => console.error("Error deleting book:", error));
  };

  const handleEdit = (book) => {
    setEditingBook(book);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const { id, title, author } = editingBook;
    updateBook(id, { title, author })
      .then(() => {
        setEditingBook(null);
        fetchBooks();
      })
      .catch((error) => console.error("Error updating book:", error));
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Amazon Link</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author}</TableCell>
              <TableCell>
                <Link
                  href={`https://a.co/dummy-link-for-${book.title}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Amazon Link
                </Link>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleEdit(book)}
                  variant="contained"
                  color="primary"
                >
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(book.id)}
                  variant="contained"
                  color="secondary"
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingBook && (
        <form onSubmit={handleUpdate}>
          <TextField
            label="Title"
            value={editingBook.title}
            onChange={(e) =>
              setEditingBook({ ...editingBook, title: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <TextField
            label="Author"
            value={editingBook.author}
            onChange={(e) =>
              setEditingBook({ ...editingBook, author: e.target.value })
            }
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
          <Button
            type="button"
            onClick={() => setEditingBook(null)}
            variant="contained"
          >
            Cancel
          </Button>
        </form>
      )}
    </TableContainer>
  );
};

export default BookList;
