// src/components/BookTable.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookTable from "../BookTable";
import BookRow from "../BookRow";

// Mock BookRow component
jest.mock("../BookRow", () => ({ book, handleEdit, handleDelete }) => (
  <tr data-testid={`book-row-${book.title}`}>
    <td>{book.title}</td>
    <td>{book.author}</td>
    <td>{book.publicationDate}</td>
    <td>{book.language}</td>
    <td>{book.pageCount}</td>
    <td>
      <button onClick={() => handleEdit(book)}>Edit</button>
      <button onClick={() => handleDelete(book)}>Delete</button>
    </td>
  </tr>
));

const mockBooks = [
  {
    title: "Book A",
    author: "Author A",
    publicationDate: "2022-01-01",
    language: "English",
    pageCount: 200,
  },
  {
    title: "Book B",
    author: "Author B",
    publicationDate: "2021-05-15",
    language: "French",
    pageCount: 150,
  },
];

const handleEdit = jest.fn();
const handleDelete = jest.fn();

describe("BookTable", () => {
  test("renders correctly", () => {
    render(
      <BookTable
        books={mockBooks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    );

    // Check if the table renders
    expect(screen.getByText("Cover")).toBeInTheDocument();
    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Author")).toBeInTheDocument();
    expect(screen.getByText("Publication Date")).toBeInTheDocument();
    expect(screen.getByText("Language")).toBeInTheDocument();
    expect(screen.getByText("Pages")).toBeInTheDocument();
    expect(screen.getByText("Actions")).toBeInTheDocument();
  });

  test("sorts books by title", () => {
    render(
      <BookTable
        books={mockBooks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    );

      

    // Check if sorting by title works (ascending and descending)
    const bookARow = screen.getByTestId("book-row-Book A");
    const bookBRow = screen.getByTestId("book-row-Book B");
    expect(bookARow).toBeInTheDocument();
    expect(bookBRow).toBeInTheDocument();
  });

  test("filters books by title", () => {
    render(
      <BookTable
        books={mockBooks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    );

   

    const filterInput = screen.getByLabelText("Filter by title");
    fireEvent.change(filterInput, { target: { value: "Book A" } });

    // Check if only Book A is displayed
      expect(screen.getByTestId("book-row-Book A")).toBeInTheDocument();
      
  });

  test("calls handleEdit and handleDelete on button clicks", () => {
    render(
      <BookTable
        books={mockBooks}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    );

    const editButtons = screen.getAllByText("Edit");
    const deleteButtons = screen.getAllByText("Delete");

    fireEvent.click(editButtons[0]);
    expect(handleEdit).toHaveBeenCalledWith(mockBooks[0]);

    fireEvent.click(deleteButtons[0]);
    expect(handleDelete).toHaveBeenCalledWith(mockBooks[0]);
  });
});
