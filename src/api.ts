import axios, { AxiosResponse } from "axios";
import { Book } from "./types";

// Use environment variables for the baseURL
const api = axios.create({
  baseURL: `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}/api`,
});

// Fetch all books
export const getBooks = (): Promise<AxiosResponse<Book[]>> =>
  api.get("/books/all");

// Add a new book
export const addBook = (olid: string): Promise<AxiosResponse<void>> => {
  console.log("olid :>> ", olid);
  return api.post(`/books?olid=${olid}`);
};

// Update an existing book
export const updateBook = (
  id: number,
  book: Book
): Promise<AxiosResponse<void>> => {
  return api.put(`/books?id=${id}`, book);
};

// Delete a book
export const deleteBook = (id: number): Promise<AxiosResponse<void>> => {
  return api.delete(`/books?id=${id}`);
};

// Search for books
export const searchBooks = (
  title: string,
  author: string
): Promise<AxiosResponse<Book[]>> => {
  return api.get(`/books/search?title=${title}&author=${author}`);
};
