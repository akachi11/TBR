import React, { useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { useBookContext } from "../context/BookContext";

const BookInfoModal = () => {
  const infoModalRef = useRef(null);
  const { toggleInfoModal, infoModal, selectedBook } = useBookContext();

  const handleClickOutside = (e) => {
    if (infoModalRef.current && !infoModalRef.current.contains(e.target)) {
      toggleInfoModal(false);
    }
  };

  const bookmark = async () => {
    console.log(selectedBook)
    // const addBookmark = await axios
  }

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
                <p className="font-jakarta text-sm">{selectedBook.subtitle}</p>
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

          <div className="flex gap-4 pr-4 pl-2 mt-2">
            <div className="flex-1 text-sm font-baskervville bg-zinc-300 text-zinc-900 text-center p-[5px] rounded-sm">
              Add to Read list
            </div>
            <div
              onClick={() => {
                bookmark();
              }}
              className="flex-1 text-sm font-baskervville bg-zinc-700 text-zinc-300 text-center p-[5px] rounded-sm"
            >
              Bookmark
            </div>
          </div>

          <div className="mt-4">
            <p className="text-zinc-200 mb-2 font-baskervville text-xl">
              Description
            </p>
            <p className="font-jakarta text-zinc-200 text-xs italic">
              {selectedBook.desc}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInfoModal;
