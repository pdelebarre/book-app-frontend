import axios from "axios";

// Use environment variables for the baseURL
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}/api`,
});

export const getBooks = () => api.get("/books/all");
export const addBook = (olid) => {
  console.log("olid :>> ", olid);
  api.post(`/books?olid=${olid}`);
};
export const updateBook = (id, book) => api.put(`/books?id=${id}`, book);
export const deleteBook = (id) => api.delete(`/books?id=${id}`);
export const searchBooks = (title, author) =>
  api.get(`/books/search?title=${title}&author=${author}`);
