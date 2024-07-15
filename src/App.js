import React from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

const App = () => {
  return (
    <div>
      <h1>Book Management App</h1>
      <AddBook />
      <BookList />
    </div>
  );
};

export default App;
