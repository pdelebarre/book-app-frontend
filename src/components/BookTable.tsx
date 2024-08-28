// src/components/BookTable.tsx
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TableSortLabel,
  IconButton,
  Menu,
  MenuItem,
  TextField,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import BookRow from "./BookRow";
import { Book } from "../types";


interface BookTableProps {
  books: Book[];
  handleEdit: (book: Book) => void;
  handleDelete: (id: number | null) => void;
}

// Define types for state
interface SortConfig {
  key: keyof Book | "";
  direction: "asc" | "desc";
}

interface FilterConfig {
  title: string;
  author: string;
  publicationDate: string;
  language: string;
  pageCount: string;
}

const BookTable: React.FC<BookTableProps> = ({
  books,
  handleEdit,
  handleDelete,
}) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "",
    direction: "asc",
  });
  const [filterConfig, setFilterConfig] = useState<FilterConfig>({
    title: "",
    author: "",
    publicationDate: "",
    language: "",
    pageCount: "",
  });
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [filterTarget, setFilterTarget] = useState<"" | keyof FilterConfig>("");

  const handleSort = (columnKey: keyof Book) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === columnKey && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: columnKey, direction });
  };

  const handleFilterMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    columnKey: keyof FilterConfig
  ) => {
    setAnchorEl(event.currentTarget);
    setFilterTarget(columnKey);
  };

  const handleFilterMenuClose = () => {
    setAnchorEl(null);
    setFilterTarget("");
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterConfig((prevConfig) => ({
      ...prevConfig,
      [filterTarget]: event.target.value,
    }));
    handleFilterMenuClose();
  };

  const filteredBooks = books.filter((book) => {
    return (
      (filterConfig.title === "" ||
        book.title.toLowerCase().includes(filterConfig.title.toLowerCase())) &&
      (filterConfig.author === "" ||
        book.author
          .toLowerCase()
          .includes(filterConfig.author.toLowerCase())) &&
      (filterConfig.publicationDate === "" ||
        book.publicationDate?.toLowerCase()
          .includes(filterConfig.publicationDate.toLowerCase())) &&
      (filterConfig.language === "" ||
        book.language?.toLowerCase()
          .includes(filterConfig.language.toLowerCase())) &&
      (filterConfig.pageCount === "" ||
        book.pageCount?.toString().includes(filterConfig.pageCount))
    );
  });

  const sortedBooks = filteredBooks.sort((a, b) => {
    if (sortConfig.key === "") return 0;
    const orderMultiplier = sortConfig.direction === "asc" ? 1 : -1;
    const aValue = a[sortConfig.key];
    const bValue = b[sortConfig.key];
    // Use default value if undefined
    return (
      (aValue ?? "").toString().localeCompare((bValue ?? "").toString()) *
      orderMultiplier
    );
  });

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead
          style={{
            position: "sticky",
            top: 0,
            backgroundColor: "#fff",
            zIndex: 1,
          }}
        >
          <TableRow>
            <TableCell>Cover</TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig.key === "title"}
                direction={sortConfig.direction}
                onClick={() => handleSort("title")}
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
                    value={filterConfig.title}
                    onChange={handleFilterChange}
                  />
                </MenuItem>
              </Menu>
            </TableCell>
            <TableCell>
              <TableSortLabel
                active={sortConfig.key === "author"}
                direction={sortConfig.direction}
                onClick={() => handleSort("author")}
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
                    value={filterConfig.author}
                    onChange={handleFilterChange}
                  />
                </MenuItem>
              </Menu>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
              <TableSortLabel
                active={sortConfig.key === "publicationDate"}
                direction={sortConfig.direction}
                onClick={() => handleSort("publicationDate")}
              >
                Publication Date
              </TableSortLabel>
              <IconButton
                onClick={(e) => handleFilterMenuOpen(e, "publicationDate")}
              >
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && filterTarget === "publicationDate"}
                onClose={handleFilterMenuClose}
              >
                <MenuItem>
                  <TextField
                    label="Filter by date"
                    variant="outlined"
                    fullWidth
                    value={filterConfig.publicationDate}
                    onChange={handleFilterChange}
                  />
                </MenuItem>
              </Menu>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
              <TableSortLabel
                active={sortConfig.key === "language"}
                direction={sortConfig.direction}
                onClick={() => handleSort("language")}
              >
                Language
              </TableSortLabel>
              <IconButton onClick={(e) => handleFilterMenuOpen(e, "language")}>
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && filterTarget === "language"}
                onClose={handleFilterMenuClose}
              >
                <MenuItem>
                  <TextField
                    label="Filter by language"
                    variant="outlined"
                    fullWidth
                    value={filterConfig.language}
                    onChange={handleFilterChange}
                  />
                </MenuItem>
              </Menu>
            </TableCell>
            <TableCell sx={{ display: { xs: "none", md: "table-cell" } }}>
              <TableSortLabel
                active={sortConfig.key === "pageCount"}
                direction={sortConfig.direction}
                onClick={() => handleSort("pageCount")}
              >
                Pages
              </TableSortLabel>
              <IconButton onClick={(e) => handleFilterMenuOpen(e, "pageCount")}>
                <FilterListIcon />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl) && filterTarget === "pageCount"}
                onClose={handleFilterMenuClose}
              >
                <MenuItem>
                  <TextField
                    label="Filter by pages"
                    variant="outlined"
                    fullWidth
                    value={filterConfig.pageCount}
                    onChange={handleFilterChange}
                  />
                </MenuItem>
              </Menu>
            </TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedBooks.map((book, index) => (
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
