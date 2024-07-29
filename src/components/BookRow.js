// src/components/BookRow.js
import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";

const BookRow = ({ book, handleEdit, handleDelete }) => {
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
      <TableCell>{book.publishDate}</TableCell>
      <TableCell>{book.language}</TableCell>
      <TableCell>{book.pages}</TableCell>

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
  );
};

export default BookRow;
