import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Book from "../components/Book";
import CurrentBook from "../components/CurrentBook.jsx";
import BookInfoModal from "../components/BookInfoModal.jsx";
import { useBookContext } from "../context/BookContext.jsx";

function App() {
    const { page, selectPage, infoModal } = useBookContext();

    return (
        <div className="min-h-screen bg-zinc-900 relative">
            <Navbar />
            {page === "home" && <CurrentBook />}
            <Book />
            {infoModal && <BookInfoModal />}
        </div>
    );
}

export default App;
