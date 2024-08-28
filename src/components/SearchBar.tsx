// src/components/SearchBar.tsx
import React from "react";
import { TextField, Box } from "@mui/material";

// Define the types for the props
interface SearchBarProps {
  searchQuery: string;
  handleSearch: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Use the interface in the functional component
const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, handleSearch }) => {
  return (
    <Box>
      <TextField
        label="Search by Title or Author"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />
    </Box>
  );
};

export default SearchBar;
