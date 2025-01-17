import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import Book from "../components/Book";
import CurrentBook from "../components/CurrentBook.jsx";
import BookInfoModal from "../components/BookInfoModal.jsx";
import { useBookContext } from "../context/BookContext.jsx";
import { useAuthContext } from "../context/AuthContext.tsx";
import { useNavigate } from "react-router-dom";

function App() {
    const { page, selectPage, infoModal } = useBookContext();
    const { user } = useAuthContext();
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate("/login")
        }
    }, [user])

    return (
        <div className="min-h-screen bg-zinc-900 relative">
            <Navbar />
            <p className="text-zinc-400 font-baskervville p-4 md:px-20">
                Hello {user?.firstName},
            </p>
            {page === "home" && <CurrentBook />}
            <Book />
            {infoModal && <BookInfoModal />}
        </div>
    );
}

export default App;
