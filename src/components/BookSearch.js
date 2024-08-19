import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  TablePagination,
  Checkbox,
  Tooltip,
} from "@mui/material";
import { searchBooks } from "../api"; // Assumes you have a function to search books

const BookSearch = ({ onBookSelect }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("title");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedBooks, setSelectedBooks] = useState({});

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const response = await searchBooks(title, author);
      setResults(response.data);
    } catch (err) {
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleLanguageFilterChange = (e) => {
    setLanguageFilter(e.target.value);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCheckboxChange = (book) => {
    setSelectedBooks((prevSelectedBooks) => {
      const newSelectedBooks = { ...prevSelectedBooks };
      const bookId = book.openLibraryId || book.title;

      if (newSelectedBooks[bookId]) {
        delete newSelectedBooks[bookId];
      } else {
        newSelectedBooks[bookId] = book; // Store the entire book object
      }

      onBookSelect(book); // Pass the full book object to the parent
      return newSelectedBooks;
    });
  };

  const isSelected = (bookId) => !!selectedBooks[bookId];

  const filteredResults = results
    .filter((book) =>
      book.language
        ? book.language.toLowerCase().includes(languageFilter.toLowerCase())
        : true
    )
    .sort((a, b) => {
      if (a[orderBy] < b[orderBy]) {
        return order === "asc" ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return order === "asc" ? 1 : -1;
      }
      return 0;
    });

  return (
    <Container>
      <Box component="form" onSubmit={handleSearch} sx={{ mt: 3 }}>
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
          Search
        </Button>
      </Box>
      {loading && <CircularProgress />}
      {error && <Typography color="error">{error}</Typography>}
      <Box sx={{ mt: 4 }}>
        <TextField
          label="Filter by Language"
          value={languageFilter}
          onChange={handleLanguageFilterChange}
          fullWidth
          margin="normal"
        />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Select</TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "title"}
                    direction={orderBy === "title" ? order : "asc"}
                    onClick={() => handleRequestSort("title")}
                  >
                    Title
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "author"}
                    direction={orderBy === "author" ? order : "asc"}
                    onClick={() => handleRequestSort("author")}
                  >
                    Author
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "language"}
                    direction={orderBy === "language" ? order : "asc"}
                    onClick={() => handleRequestSort("language")}
                  >
                    Language
                  </TableSortLabel>
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === "pageCount"}
                    direction={orderBy === "pageCount" ? order : "asc"}
                    onClick={() => handleRequestSort("pageCount")}
                  >
                    Page Count
                  </TableSortLabel>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredResults
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((book) => (
                  <Tooltip
                    key={book.openLibraryId || book.title}
                    title={book.openLibraryId || "No ID available"}
                    arrow
                  >
                    <TableRow
                      key={book.openLibraryId || book.title}
                      hover
                      selected={isSelected(book.openLibraryId || book.title)}
                    >
                      <TableCell>
                        <Checkbox
                          checked={isSelected(book.openLibraryId || book.title)}
                          onChange={() => handleCheckboxChange(book)} // Pass the full book object here
                        />
                      </TableCell>
                      <TableCell>{book.title}</TableCell>
                      <TableCell>{book.author}</TableCell>
                      <TableCell>{book.language}</TableCell>
                      <TableCell>{book.pageCount}</TableCell>
                    </TableRow>
                  </Tooltip>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredResults.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
};

export default BookSearch;
