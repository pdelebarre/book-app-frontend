// src/components/BookTable.js
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableSortLabel,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import BookRow from "./BookRow";

const BookTable = ({ books, handleEdit, handleDelete }) => {
  const [filterTitle, setFilterTitle] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: "", direction: "asc" });
  const [anchorEl, setAnchorEl] = useState(null);
  const [filterTarget, setFilterTarget] = useState("");

  const sortedFilteredBooks = books
    .filter(
      (book) =>
        (book.title
          ? book.title.toLowerCase().includes(filterTitle.toLowerCase())
          : true) &&
        (book.author
          ? book.author.toLowerCase().includes(filterAuthor.toLowerCase())
          : true)
    )
    .sort((a, b) => {
      if (!sortConfig.key) return 0;
      const directionMultiplier = sortConfig.direction === "asc" ? 1 : -1;
      return (
        (a[sortConfig.key] > b[sortConfig.key] ? 1 : -1) * directionMultiplier
      );
    });

  const requestSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleFilterMenuOpen = (event, target) => {
    setAnchorEl(event.currentTarget);
    setFilterTarget(target);
  };

  const handleFilterMenuClose = () => {
    setAnchorEl(null);
    setFilterTarget("");
  };

  const handleFilterChange = (event) => {
    if (filterTarget === "title") {
      setFilterTitle(event.target.value);
    } else if (filterTarget === "author") {
      setFilterAuthor(event.target.value);
    }
    handleFilterMenuClose();
  };

  if (!books || books.length === 0) {
    return <p>No books available.</p>;
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cover</TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig.key === "title"}
                direction={sortConfig.direction}
                onClick={() => requestSort("title")}
              >
                Title
              </TableSortLabel>
              <IconButton onClick={(e) => handleFilterMenuOpen(e, "title")}>
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && filterTarget === "title"}
                onClose={handleFilterMenuClose}
              >
                <MenuItem>
                  <TextField
                    label="Filter by title"
                    variant="outlined"
                    fullWidth
                    value={filterTitle}
                    onChange={handleFilterChange}
                  />
                </MenuItem>
              </Menu>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig.key === "author"}
                direction={sortConfig.direction}
                onClick={() => requestSort("author")}
              >
                Author
              </TableSortLabel>
              <IconButton onClick={(e) => handleFilterMenuOpen(e, "author")}>
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && filterTarget === "author"}
                onClose={handleFilterMenuClose}
              >
                <MenuItem>
                  <TextField
                    label="Filter by author"
                    variant="outlined"
                    fullWidth
                    value={filterAuthor}
                    onChange={handleFilterChange}
                  />
                </MenuItem>
              </Menu>
            </TableCell>
            <TableCell>Publication Date</TableCell>
            <TableCell>Language</TableCell>
            <TableCell>Page Count</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedFilteredBooks.map((book, index) => (
            <BookRow
              key={index}
              book={book}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BookTable;
