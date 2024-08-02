import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:6868/api",
});

export const getBooks = () => api.get("/books/all");
export const addBook = (book) => api.post("/books", book);
export const updateBook = (id, book) => api.put(`/books/${id}`, book);
export const deleteBook = (id) => api.delete(`/books/${id}`);
