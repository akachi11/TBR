import React from "react";
import { MdLibraryAddCheck } from "react-icons/md";
import { FaBookBookmark } from "react-icons/fa6";
import { IoLogOutSharp } from "react-icons/io5";
import { useBookContext } from "../context/BookContext.jsx";
import {useNavigate} from "react-router-dom"

const Navbar = () => {
  const { page, selectPage } = useBookContext();
  const navigate = useNavigate()

  const logout = () => {
    navigate("/login")
    localStorage.removeItem("token")
    localStorage.removeItem("user")
  }

  return (
    <div className="text-gray-300 font-jakarta flex flex-row items-stretch min-h-14 md:px-20">
      <div onClick={() => selectPage("home")} className="cursor-pointer border-gray-600 border-l-0 border-[1px] basis-2/3 font-baskervville font-extrabold p-4 text-lg md:text-2xl h-full">
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
        <div
          className={`flex-1 flex hover:bg-zinc-800 gap-2 cursor-pointer md:text-3xl items-center justify-center text-3xl p-2 ${
            page === "bookmarked" ? "bg-zinc-800" : ""
          }`}
          onClick={logout}
        >
          <IoLogOutSharp />
          <p className="text-sm hidden md:block">Logout</p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
