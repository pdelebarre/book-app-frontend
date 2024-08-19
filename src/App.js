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
        <Typography variant="h3" component="h1" gutterBottom>
          Mylib
        </Typography>
        <Typography variant="h5" component="h5">
          {process.env.REACT_APP_API_BASE_URL}:{process.env.REACT_APP_API_PORT}
        </Typography>
        <BookList key={refresh} />
      </Container>
    </ThemeProvider>
  );
};

export default App;
