// src/__mocks__/api.js

export const getBooks = jest.fn().mockResolvedValue({
  data: [
    {
      id: 1,
      title: "Book 1",
      author: "Author 1",
      publicationDate: "2023-01-01",
      language: "English",
      pageCount: 100,
    },
    {
      id: 2,
      title: "Book 2",
      author: "Author 2",
      publicationDate: "2023-01-02",
      language: "Spanish",
      pageCount: 200,
    },
  ],
});

export const deleteBook = jest.fn().mockResolvedValue({});

export const updateBook = jest.fn().mockResolvedValue({});

export const addBook = jest.fn().mockResolvedValue({});
