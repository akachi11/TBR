import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useBookContext } from "../context/BookContext";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext.tsx";

const BookInfoModal = () => {
  const infoModalRef = useRef(null);
  const { toggleInfoModal, infoModal, selectedBook } = useBookContext();
  const { user } = useAuthContext();
  const { allBooks, toggleAllBooks } = useBookContext();
  const [favorite, setFavorite] = useState(false);
  const [isOnReadList, setIsOnReadList] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const book = allBooks.find((book) => book.id === selectedBook.id);
    if (book) {
      setFavorite(book.isFavorite);
      setIsOnReadList(book.toBeRead);
      setIsReading(book.isReading);
      setIsCompleted(book.isCompleted);
    }
  }, [allBooks, selectedBook]);

  const handleClickOutside = (e) => {
    if (infoModalRef.current && !infoModalRef.current.contains(e.target)) {
      toggleInfoModal(false);
    }
  };

  const bookmark = async () => {
    if (!favorite) {
      toggleAllBooks(
        allBooks.map((book) => {
          if (book.id === selectedBook.id) {
            return {
              ...book,
              isFavorite: true,
            };
          }
          return book;
        })
      );
      try {
        const res = await axios
          .patch(
            "https://tbr-backend-73lw.onrender.com/api/book/addFavorites",
            {
              email: user?.email,
              id: selectedBook.id,
              authors: selectedBook.authors,
              title: selectedBook.title,
              subtitle: selectedBook.subtitle,
              pageCount: selectedBook.pageCount,
              categories: selectedBook.categories,
              averageRating: selectedBook.averageRating,
              image: selectedBook.image,
              isFavorite: true,
              isReading: selectedBook.isReading,
              toBeRead: selectedBook.toBeRead,
              desc: selectedBook.desc,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
      } catch (error) {
        console.log(error);
      }
    } else {
      toggleAllBooks(
        allBooks.map((book) => {
          if (book.id === selectedBook.id) {
            return {
              ...book,
              isFavorite: false,
            };
          }
          return book;
        })
      );
      try {
        const res = await axios
          .patch(
            "https://tbr-backend-73lw.onrender.com/api/book/removeFavorites",
            {
              email: user?.email,
              id: selectedBook.id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
      } catch (error) {
        console.log(error);
      }
    }
  };

  const addtoReadList = async () => {
    if (isOnReadList) {
      toggleAllBooks(
        allBooks.map((book) => {
          if (book.id === selectedBook.id) {
            return {
              ...book,
              toBeRead: false,
            };
          }
          return book;
        })
      );
      try {
        const res = await axios
          .patch(
            "https://tbr-backend-73lw.onrender.com/api/book/removeFromReadlist",
            {
              email: user?.email,
              id: selectedBook.id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
      } catch (error) {
        console.log(error);
      }
    } else {
      toggleAllBooks(
        allBooks.map((book) => {
          if (book.id === selectedBook.id) {
            return {
              ...book,
              toBeRead: true,
            };
          }
          return book;
        })
      );
      try {
        const res = await axios
          .patch(
            "https://tbr-backend-73lw.onrender.com/api/book/addToReadlist",
            {
              email: user?.email,
              id: selectedBook.id,
              authors: selectedBook.authors,
              title: selectedBook.title,
              subtitle: selectedBook.subtitle,
              pageCount: selectedBook.pageCount,
              categories: selectedBook.categories,
              averageRating: selectedBook.averageRating,
              image: selectedBook.image,
              isFavorite: selectedBook.isFavorite,
              isReading: selectedBook.isReading,
              toBeRead: true,
              desc: selectedBook.desc,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleReadBook = async () => { 
    if(isReading) {
      toggleAllBooks(
        allBooks.map((book) => {
          if (book.id === selectedBook.id) {
            return {
              ...book,
              isReading: false,
            };
          }
          return book;
        })
      );
      try {
        const res = await axios
          .patch(
            "https://tbr-backend-73lw.onrender.com/api/book/stopReading",
            {
              email: user?.email,
              id: selectedBook.id,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
      } catch (error) {
        console.log(error);
      }
    } else {
      toggleAllBooks(
        allBooks.map((book) => {
          if (book.id === selectedBook.id) {
            return {
              ...book,
              isReading: true,
            };
          }
          return book;
        })
      );
      try {
        const res = await axios
          .patch(
            "https://tbr-backend-73lw.onrender.com/api/book/startReading",
            {
              email: user?.email,
              id: selectedBook.id,
              authors: selectedBook.authors,
              title: selectedBook.title,
              subtitle: selectedBook.subtitle,
              pageCount: selectedBook.pageCount,
              categories: selectedBook.categories,
              averageRating: selectedBook.averageRating,
              image: selectedBook.image,
              isFavorite: selectedBook.isFavorite,
              isReading: true,
              toBeRead: selectedBook.toBeRead,
              desc: selectedBook.desc,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          )
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleCompleteBook = async () => {
    toggleAllBooks(
      allBooks.map((book) => {
        if (book.id === selectedBook.id) {
          return {
            ...book,
            isReading: false, // Ensure it's not marked as reading anymore
            isCompleted: true, // Mark it as completed
          };
        }
        return book;
      })
    );
  
    try {
      const res = await axios.patch(
        "https://tbr-backend-73lw.onrender.com/api/book/markAsCompleted",
        {
          email: user?.email,
          id: selectedBook.id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
    } catch (error) {
      console.error("Error marking book as completed:", error);
    }
  };
  

  useEffect(() => {
    if (infoModal) {
      document.addEventListener("click", handleClickOutside);
    }
  }, [infoModal]);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 h-screen w-screen flex items-center justify-center">
      <div class="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-10"></div>
      <div
        ref={infoModalRef}
        className="w-[80vw] pb-10 border-[1px] border-zinc-600 h-[70vh] overflow-scroll bg-zinc-900 rounded-md text-white z-20 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.9),0_4px_6px_rgba(0,0,0,0.25)]"
      >
        <div className="flex border-b-[1px] border-zinc-600">
          <div className="border-zinc-600 basis-5/6 text-sm p-2">
            {selectedBook.title}
          </div>
          <div
            onClick={() => toggleInfoModal(false)}
            className="border-l-[1px] border-zinc-600 basis-1/6 text-center flex items-center justify-center hover:bg-zinc-800"
          >
            <IoMdClose />
          </div>
        </div>
        <div className="pl-2">
          <div className="flex items-start gap-4 mt-4">
            <img className="rounded-md" src={selectedBook.image} alt="" />
            <div className="flex flex-col gap-2 text-zinc-200">
              <div>
                <p className="font-baskervville text-xs">Author</p>
                <p className="font-jakarta text-sm">{selectedBook.authors}</p>
              </div>
              <div>
                <p className="font-baskervville text-xs">Title</p>
                <p className="font-jakarta text-sm">{selectedBook.title}</p>
              </div>
              <div>
                <p className="font-baskervville text-xs">Subtitle</p>
                <p className="font-jakarta text-sm">
                  {selectedBook.subtitle ?? "No subtitle"}
                </p>
              </div>
              <div>
                <p className="font-baskervville text-xs">Pages</p>
                <p className="font-jakarta text-sm">{selectedBook.pageCount}</p>
              </div>
              <div>
                <p className="font-baskervville text-xs">Est. read time</p>
                <p className="font-jakarta text-sm">
                  {Number(selectedBook.pageCount) * 0.25} Hours
                </p>
              </div>
              <div>
                <p className="font-baskervville text-xs">Category</p>
                <p className="font-jakarta text-sm">
                  {selectedBook.categories}
                </p>
              </div>
            </div>
          </div>

          <div className="flex gap-4 flex-wrap pr-4 pl-2 mt-2">
            <div
              onClick={() => {
                addtoReadList();
              }}
              className="flex-1 min-w-[150px] text-sm font-baskervville bg-zinc-300 text-zinc-900 text-center p-[5px] rounded-sm"
            >
              {isOnReadList ? "Remove from Readlist" : "Add to Read list"}
            </div>
            <div
              onClick={() => {
                bookmark();
              }}
              className="flex-1 min-w-[150px] text-sm font-baskervville bg-zinc-700 text-zinc-300 text-center p-[5px] rounded-sm"
            >
              {favorite ? "Remove from Favorites" : "Add to Favorites"}
            </div>
            <div onClick={handleReadBook} className="cursor-pointer flex-1 min-w-[150px] text-sm font-baskervville bg-zinc-300 text-zinc-900 text-center p-[5px] rounded-sm">
              {isReading ? "Stop Reading" : "Read this book"}
            </div>
            {isReading && (
              <div onClick={handleCompleteBook} className="cursor-pointer flex-1 min-w-[150px] text-sm font-baskervville bg-zinc-700 text-zinc-300 text-center p-[5px] rounded-sm">
                Mark as completed
              </div>
            )}
          </div>

          <div className="mt-4">
            <p className="text-zinc-200 mb-2 font-baskervville text-xl">
              Description
            </p>
            <p className="font-jakarta text-zinc-200 text-xs italic">
              {selectedBook.desc ?? "No description available"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfoModal;
