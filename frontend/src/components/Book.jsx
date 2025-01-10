import React, { useEffect, useRef, useState } from "react";
import { useBookContext } from "../context/BookContext";
import axios from "axios";
import { PuffLoader } from "react-spinners";

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
  const [searchVal, setSearchVal] = useState();
  const [searchResult, setSearchResult] = useState();

  const searchRef = useRef(null);

  const handleClickOutside = (e) => {
    if (searchRef.current && !searchRef.current.contains(e.target)) {
      setSearchVal("");
    }
  };

  const getAllBooks = async () => {
    try {
      const books = await axios
        .get("http://localhost:5000/api/book/")
        .then((res) => {
          toggleAllBooks(res.data);
        });
    } catch (error) {
      console.log(error);
    }
  };

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

    console.log(formattedText);

    try {
      const response = await axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=${formattedText}&maxResults=10`
        )
        .then((res) => {
          setLoading(false);
          const bookData = res?.data.items.map((item) => {
            const volumeInfo = item.volumeInfo;
            return {
              id: item.id,
              title: volumeInfo.title,
              subtitle: volumeInfo.subtitle || "No Subtitle",
              authors: volumeInfo.authors || ["No authors available"],
              pageCount: volumeInfo.pageCount || "No page count available",
              categories: volumeInfo.categories || ["No categories available"],
              averageRating: volumeInfo.averageRating || "No rating available",
              image: volumeInfo.imageLinks
                ? volumeInfo.imageLinks.thumbnail
                : "https://via.placeholder.com/128x200?text=No+Image",
              desc: volumeInfo.description || "No description",
            };
          });

          setSearchResult(bookData);
          console.log(bookData[0])
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
          ? "Completerd"
          : page === "bookmarked"
          ? "Bookmarked"
          : "To be read"}
      </p>
      <div className="flex flex-wrap m-auto">
        {allBooks?.map(
          (book, index) =>
            book.isReading === false && (
              <div
                key={index}
                className="w-[calc(37%-1rem)] md:w-[calc(15%-1rem)] p-4"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleBook(book)
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
                  <p className="font-jakarta text-xs font-bold">
                    {book.title}
                  </p>
                  <p className="font-jakarta text-[10px] italic text-zinc-300">{book.subtitle}</p>
                </div>
              </div>
            )
        )}
      </div>
    </div>
  );
};

export default Book;
