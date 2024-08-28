import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Box,
  Typography,
} from "@mui/material";

import { Book } from "../types";

interface PopupFormProps {
  open: boolean;
  handleClose: () => void;
  handleSubmit: (book: Book) => void;
  book?: Book;
  setBook: (book: Book) => void;
}

const PopupForm: React.FC<PopupFormProps> = ({
  open,
  handleClose,
  handleSubmit,
  book,
  setBook,
}) => {
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);

  useEffect(() => {
    if (!open) {
      setSelectedBook(null);
    }
  }, [open, book]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Convert the value to the appropriate type
    const updatedValue: string | number | undefined =
      name === "pageCount" ? (value ? Number(value) : undefined) : value;

    if (book) {
      setBook({
        ...book,
        [name]: updatedValue,
      });
    }
  };



  if (!book) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md">
      <DialogTitle>{book.id ? "Edit Book" : "Add Book"}</DialogTitle>
      <DialogContent>
        
          <Box display="flex" alignItems="flex-start">
            {/* Cover Image and ISBN */}
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              mr={3}
              width={160}
            >
              {book.coverImage && (
                <Box
                  component="img"
                  src={`data:image/jpeg;base64,${book.coverImage}`}
                  alt="Cover"
                  sx={{
                    width: 120,
                    height: 180,
                    mb: 1,
                    borderRadius: 1,
                    boxShadow: 3,
                    objectFit: "cover",
                  }}
                />
              )}
              {book.isbn && (
                <Typography variant="body2" component="div">
                  ISBN: {book.isbn}
                </Typography>
              )}
            </Box>

            {/* Form Fields */}
            <Box flex={1}>
              <Box display="flex" flexDirection="column" mb={2}>
                <TextField
                  label="Title"
                  name="title"
                  value={book.title || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  InputProps={{
                    style: { fontWeight: "bold", fontSize: "1.5rem" },
                  }}
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="Author"
                  name="author"
                  value={book.author || ""}
                  onChange={handleChange}
                  fullWidth
                  margin="dense"
                  variant="outlined"
                  InputProps={{
                    style: { fontWeight: "bold", fontSize: "1.2rem" },
                  }}
                  InputLabelProps={{ shrink: true }}
                />
                <Box display="flex" mt={1}>
                  <TextField
                    label="Page Count"
                    name="pageCount"
                    value={book.pageCount || ""}
                    onChange={handleChange}
                    inputProps={{ maxLength: 4 }}
                    sx={{ width: 120, mr: 2 }}
                    margin="dense"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                  <TextField
                    label="Publication Date"
                    name="publicationDate"
                    value={book.publicationDate || ""}
                    onChange={handleChange}
                    inputProps={{ maxLength: 10 }}
                    sx={{ width: 200 }}
                    margin="dense"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                  />
                </Box>
              </Box>

            </Box>
          </Box>
        
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={() => handleSubmit(book)} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopupForm;
