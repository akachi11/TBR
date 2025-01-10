import React, { createContext, useState, useContext, ReactNode } from 'react';

const BookContext = createContext(undefined);

export const BookContextProvider= ({ children }) => {
  const [page, setPage] = useState("home");
  const [infoModal, setInfoModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState();
  const [allBooks, setAllBooks] = useState()

  const selectPage = (page) => setPage(page);
  const toggleInfoModal = (state) => setInfoModal(state)
  const toggleBook = (book) => setSelectedBook(book)
  const toggleAllBooks = (books) => setAllBooks(books)

  return (
    <BookContext.Provider value={{ allBooks, toggleAllBooks, page, selectPage, infoModal, toggleInfoModal, selectedBook, toggleBook}}>
      {children}
    </BookContext.Provider>
  );
};

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useMyContext must be used within a MyContextProvider');
  }
  return context;
};
