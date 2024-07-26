// src/App.js
import React, { useState } from "react";
import { Container, Typography } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import BookList from "./components/BookList";
 
const theme = createTheme();

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleBookAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h2" component="h1" gutterBottom>
          Mylib
        </Typography>
        <BookList key={refresh} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
