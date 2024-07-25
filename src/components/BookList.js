// src/components/BookList.js
import React, { useState, useEffect } from 'react';
import { Box, Button } from '@mui/material';
import { getBooks, deleteBook, updateBook, addBook } from '../api';
import Fuse from 'fuse.js';
import BookTable from './BookTable';
import SearchBar from './SearchBar';
import PopupForm from './PopupForm';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingBook, setEditingBook] = useState(null);
  const [openPopup, setOpenPopup] = useState(false);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = () => {
    getBooks()
      .then(response => {
        const booksData = response.data || [];
        setBooks(booksData);
        setFilteredBooks(booksData);
      })
      .catch(error => console.error('Error fetching books:', error));
  };

  const handleDelete = (id) => {
    deleteBook(id)
      .then(() => fetchBooks())
      .catch(error => console.error('Error deleting book:', error));
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setOpenPopup(true);
  };

  const handleAdd = () => {
    setEditingBook({ id: null, title: '', author: '' });
    setOpenPopup(true);
  };

  const handleSubmit = () => {
    if (editingBook.id) {
      updateBook(editingBook.id, editingBook)
        .then(() => {
          setOpenPopup(false);
          fetchBooks();
        })
        .catch(error => console.error('Error updating book:', error));
    } else {
      addBook(editingBook)
        .then(() => {
          setOpenPopup(false);
          fetchBooks();
        })
        .catch(error => console.error('Error adding book:', error));
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query) {
      const fuse = new Fuse(books, {
        keys: ['title', 'author'],
        threshold: 0.3,
      });
      const results = fuse.search(query).map(result => result.item);
      setFilteredBooks(results);
    } else {
      setFilteredBooks(books);
    }
  };

  return (
    <Box>
      <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
      <Button onClick={handleAdd} variant="contained" color="primary">Add Book</Button>
      <BookTable
        books={filteredBooks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      <PopupForm
        open={openPopup}
        handleClose={() => setOpenPopup(false)}
        handleSubmit={handleSubmit}
        book={editingBook}
        setBook={setEditingBook}
      />
    </Box>
  );
};

export default BookList;
