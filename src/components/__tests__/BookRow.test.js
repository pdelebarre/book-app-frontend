// src/components/BookRow.test.js
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BookRow from "../BookRow";
import { TableRow, TableCell } from "@mui/material";

// Mock the window.confirm method
const mockConfirm = jest.fn();
window.confirm = mockConfirm;

describe("BookRow Component", () => {
  const mockHandleEdit = jest.fn();
  const mockHandleDelete = jest.fn();

  const book = {
    id: "1",
    coverImage: "sampleCoverImageBase64",
    title: "Sample Book",
    author: "Sample Author",
    publicationDate: "2024-08-27",
    language: "English",
    pageCount: "200",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders book information correctly", () => {
    render(
      <TableRow>
        <BookRow
          book={book}
          handleEdit={mockHandleEdit}
          handleDelete={mockHandleDelete}
        />
      </TableRow>
    );

    // Check cover image
    const imgElement = screen.getByAltText(book.title);
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      "src",
      `data:image/jpeg;base64,${book.coverImage}`
    );

    // Check other details
    expect(screen.getByText(book.title)).toBeInTheDocument();
    expect(screen.getByText(book.author)).toBeInTheDocument();
    expect(screen.getByText(book.publicationDate)).toBeInTheDocument();
    expect(screen.getByText(book.language)).toBeInTheDocument();
    expect(screen.getByText(book.pageCount)).toBeInTheDocument();
  });

  test("triggers handleEdit when edit button is clicked", () => {
    render(
      <TableRow>
        <BookRow
          book={book}
          handleEdit={mockHandleEdit}
          handleDelete={mockHandleDelete}
        />
      </TableRow>
    );

    fireEvent.click(screen.getByLabelText("edit"));
    expect(mockHandleEdit).toHaveBeenCalledWith(book);
  });

  test("triggers handleDelete when delete button is clicked and confirmation is accepted", () => {
    mockConfirm.mockReturnValue(true); // Simulate user clicking "OK"

    render(
      <TableRow>
        <BookRow
          book={book}
          handleEdit={mockHandleEdit}
          handleDelete={mockHandleDelete}
        />
      </TableRow>
    );

    fireEvent.click(screen.getByLabelText("delete"));
    expect(mockConfirm).toHaveBeenCalledWith(
      "Are you sure you want to delete this book?"
    );
    expect(mockHandleDelete).toHaveBeenCalledWith(book.id);
  });

  test("does not trigger handleDelete when delete button is clicked and confirmation is canceled", () => {
    mockConfirm.mockReturnValue(false); // Simulate user clicking "Cancel"

    render(
      <TableRow>
        <BookRow
          book={book}
          handleEdit={mockHandleEdit}
          handleDelete={mockHandleDelete}
        />
      </TableRow>
    );

    fireEvent.click(screen.getByLabelText("delete"));
    expect(mockConfirm).toHaveBeenCalledWith(
      "Are you sure you want to delete this book?"
    );
    expect(mockHandleDelete).not.toHaveBeenCalled();
  });

  test('displays "No Cover" if no coverImage is provided', () => {
    const bookWithoutCover = { ...book, coverImage: "" };

    render(
      <TableRow>
        <BookRow
          book={bookWithoutCover}
          handleEdit={mockHandleEdit}
          handleDelete={mockHandleDelete}
        />
      </TableRow>
    );

    expect(screen.getByText("No Cover")).toBeInTheDocument();
  });
});
