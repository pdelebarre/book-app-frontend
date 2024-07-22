import React, { useState } from "react";
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const handleBookAdded = () => {
    setRefresh(!refresh);
  };

  return (
    <div>
      <h1>Book Management App</h1>
      <AddBook onBookAdded={handleBookAdded} />
      <BookList key={refresh} />
    </div>
  );
};

export default App;
