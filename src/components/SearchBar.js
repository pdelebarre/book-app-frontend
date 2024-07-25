// src/components/SearchBar.js
import React from "react";
import { TextField, Box } from "@mui/material";

const SearchBar = ({ searchQuery, handleSearch }) => {
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
