// src/App.tsx
import React from "react";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";
import  Container  from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import BookList from "./components/BookList";

const theme: Theme = createTheme();

const App: React.FC = () => {
  // const [refresh, setRefresh] = useState < boolean > false;

  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Typography variant="h3" component="h1" gutterBottom>
          Mylib
        </Typography>
        <BookList />
      </Container>
    </ThemeProvider>
  );
};

export default App;
