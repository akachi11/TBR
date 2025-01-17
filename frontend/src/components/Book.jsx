import React, { useEffect, useRef, useState } from "react";
import { useBookContext } from "../context/BookContext";
import axios from "axios";
import { PuffLoader } from "react-spinners";
import { useAuthContext } from "../context/AuthContext.tsx";
import img1 from "../assets/rb_4170.png";
import img2 from "../assets/rb_44889.png";

const Book = () => {
  const {
    page,
    toggleInfoModal,
    toggleBook,
    infoModal,
    toggleAllBooks,
    allBooks,
  } = useBookContext();
  const [loading, setLoading] = useState(false);
  const [loadingBooks, setLoadingBooks] = useState(false);
  const [searchVal, setSearchVal] = useState();
  const [searchResult, setSearchResult] = useState();
  const { user } = useAuthContext();
  const [filteredBooks, setFilteredBooks] = useState([]);

  const searchRef = useRef(null);

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchVal("");
    }
  };

  const getAllBooks = async () => {
    setLoadingBooks(true);
    try {
      const books = await axios
        .post(
          "http://localhost:5000/api/book/",
          {
            email: user?.email,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then((res) => {
          setLoadingBooks(false);
          toggleAllBooks(res.data);
          console.log(res);
        });
    } catch (error) {
      console.log(error);
      setLoadingBooks(false);
    }
  };

  useEffect(() => {
    if (page === "completed") {
      setFilteredBooks(allBooks?.filter((book) => book.isCompleted === true));
    } else if (page === "bookmarked") {
      setFilteredBooks(allBooks?.filter((book) => book.isFavorite === true));
    } else if (page === "home") {
      setFilteredBooks(allBooks?.filter((book) => book.toBeRead === true));
    }
  }, [page, allBooks]);

  useEffect(() => {
    getAllBooks();
  }, [user?.email]);

  useEffect(() => {
    getAllBooks();
  }, []);

  useEffect(() => {
    if (searchVal?.length > 0) {
      document.addEventListener("click", handleClickOutside);
    }
  }, [searchVal?.length]);

  const getBooks = async (text) => {
    setLoading(true);
    const formattedText = text.replace(/\s+/g, "+");

    try {
      const response = await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${formattedText}&maxResults=10`
        )
        .then((res) => {
          console.log(res);
          setLoading(false);
          const bookData = res?.data.items.map((item) => {
            const volumeInfo = item.volumeInfo;
            return {
              id: item.id,
              title: volumeInfo.title,
              subtitle: volumeInfo.subtitle,
              authors: volumeInfo.authors,
              pageCount: volumeInfo.pageCount,
              categories: volumeInfo.categories,
              averageRating: volumeInfo.averageRating,
              image: volumeInfo.imageLinks
                ? volumeInfo.imageLinks.thumbnail
                : "https://via.placeholder.com/128x200?text=No+Image",
              desc: volumeInfo.description,
            };
          });

          setSearchResult(bookData);
        });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="md:px-20 mt-4">
      <div className="ml-4 mb-2 relative">
        <input
          className="bg-zinc-700 text-xs focus:border-none focus:outline-none text-zinc-400 p-[8px] rounded-lg"
          placeholder="Find book"
          type="text"
          onChange={(e) => {
            getBooks(e.target.value);
            setSearchVal(e.target.value);
          }}
        />
        {searchVal?.length > 0 && (
          <div
            ref={searchRef}
            className="w-[70%] flex max-h-[70vh] overflow-scroll flex-col gap-2 bg-zinc-800 p-4 rounded-md absolute mt-2 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.9),0_4px_6px_rgba(0,0,0,0.25)]"
          >
            {loading ? (
              <div className="flex flex-row items-center justify-center">
                <PuffLoader
                  color={"#a1a1aa"}
                  loading={loading}
                  size={30}
                  aria-label="Loading Spinner"
                  data-testid="loader"
                />
              </div>
            ) : searchResult?.length > 0 ? (
              searchResult?.map((item, i) => (
                <div
                  key={i}
                  className="flex flex-row gap-2 text-zinc-400 items-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleBook(item);
                    toggleInfoModal(true);
                  }}
                >
                  <img
                    src={item.image}
                    alt=""
                    className="max-w-[60px] max-h-[60px] min-w-[60px] min-h-[60px] rounded-sm object-cover"
                  />
                  <div>
                    <p className="text-sm font-baskervville">{item.title}</p>
                    <p className="text-xs font-jakarta text-zinc-500">
                      {item.subtitle}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-zinc-500">No results</p>
            )}
          </div>
        )}
      </div>
      <p className="text-zinc-200 px-4 mb-2 font-baskervville text-xl">
        {page === "completed"
          ? "Completed"
          : page === "bookmarked"
          ? "Bookmarked"
          : "To be read"}
      </p>
      <div className="flex flex-wrap m-auto">
        {(filteredBooks?.length === 0  || filteredBooks === undefined)&& !loadingBooks && (
          <div className="pb-8 mt-8 w-full flex flex-col items-center justify-center">
            <img
              src={img1}
              alt=""
              className="w-[200px] h-[200px] md:h-[400px] md:w-[400px] object-cover"
            />
            <p className="text-zinc-400 text-sm font-baskervville">
              No books found
            </p>
          </div>
        )}

        {loadingBooks && (
          <div className="pb-8 mt-8 w-full flex flex-col items-center justify-center">
            <img
              src={img2}
              alt=""
              className="w-[200px] h-[200px] md:h-[400px] md:w-[400px] object-cover animate-pulseImage"
            />
            <p className="text-zinc-400 text-sm font-baskervville">
              Fetching your books...
            </p>
          </div>
        )}

        {filteredBooks?.map(
          (book, index) =>
            book.isReading === false && (
              <div
                key={index}
                className="cursor-pointer w-[calc(37%-1rem)] md:w-[calc(15%-1rem)] p-4"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBook(book);
                  toggleInfoModal(true);
                }}
              >
                <img
                  className="w-fit h-fit md:w-[100px] md:[150px] object-contain rounded-md"
                  src={book.image}
                  alt=""
                />
                <div className="text-white">
                  <p className="text-zinc-400 text-sm font-baskervville">
                    {book.authors}
                  </p>
                  <p className="font-jakarta text-xs font-bold">{book.title}</p>
                  <p className="font-jakarta text-[10px] italic text-zinc-300">
                    {book.subtitle}
                  </p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Book;
