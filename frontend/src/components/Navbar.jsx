import React from "react";
import { MdLibraryAddCheck } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import { useBookContext } from "../context/BookContext.jsx";

const Navbar = () => {
  const { page, selectPage } = useBookContext();

  return (
    <div className="text-gray-300 font-jakarta flex flex-row items-stretch min-h-14 md:px-20">
      <div onClick={() => selectPage("home")} className="border-gray-600 border-l-0 border-[1px] basis-2/3 font-baskervville font-extrabold p-4 text-lg md:text-2xl h-full">
        TBR
      </div>
      <div className="basis-1/3 flex border-gray-600 border-[1px] border-r-0 min-h-full">
        <div
          className={`flex-1 flex hover:bg-zinc-800 gap-2 cursor-pointer md:text-xl items-center justify-center text-2xl p-2 ${
            page === "completed" ? "bg-zinc-800" : ""
          }`}
          onClick={() => selectPage("completed")}
        >
          <MdLibraryAddCheck />
          <p className="text-sm hidden md:block">Completed</p>
        </div>
        <div
          className={`flex-1 flex hover:bg-zinc-800 gap-2 cursor-pointer md:text-xl items-center justify-center text-xl p-2 ${
            page === "bookmarked" ? "bg-zinc-800" : ""
          }`}
          onClick={() => selectPage("bookmarked")}
        >
          <FaBookBookmark />
          <p className="text-sm hidden md:block">Bookmarked</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
