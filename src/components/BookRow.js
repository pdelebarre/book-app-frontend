// src/components/BookRow.js
import React from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const BookRow = ({ book, handleEdit, handleDelete }) => {
  const confirmAndDelete = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      handleDelete(book.id);
    }
  };

  return (
    <TableRow>
      <TableCell>
        {book.coverImage ? (
          <img
            src={`data:image/jpeg;base64,${book.coverImage}`}
            alt={book.title}
            style={{ width: "50px" }}
          />
        ) : (
          "No Cover"
        )}
      </TableCell>
      <TableCell>{book.title}</TableCell>
      <TableCell>{book.author}</TableCell>
      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
        {book.publicationDate}
      </TableCell>
      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
        {book.language}
      </TableCell>
      <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
        {book.pageCount}
      </TableCell>
      <TableCell>
        <IconButton onClick={() => handleEdit(book)} color="primary">
          <EditIcon />
        </IconButton>
        <IconButton onClick={confirmAndDelete} color="secondary">
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default BookRow;
