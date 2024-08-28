import React from "react";
import { TableRow, TableCell, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Book } from "../types";

// Define the types for the props
interface BookRowProps {
  book: Book;
  handleEdit: (book: Book) => void;
  handleDelete: (id: number | null) => void;
}

const BookRow: React.FC<BookRowProps> = ({
  book,
  handleEdit,
  handleDelete,
}) => {
  const confirmAndDelete = () => {
    if (window.confirm("Are you sure you want to delete this book?")) {
      book.id && handleDelete(book.id);
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
        <IconButton
          onClick={() => handleEdit(book)}
          color="primary"
          aria-label="edit"
        >
          <EditIcon />
        </IconButton>
        <IconButton
          onClick={confirmAndDelete}
          color="secondary"
          aria-label="delete"
        >
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default BookRow;
