import React from "react";
import ProgressIndicator from "./ProgressIndicator";
import { useBookContext } from "../context/BookContext";

const CurrentBook = () => {
  const { allBooks } = useBookContext();

  const reading = allBooks?.filter((item) => item.isReading === true)[0];

  return (
    <>
      {reading && (
        <div className="md:px-20 md:py-10">
          <p className="text-zinc-200 px-4 mb-2 font-baskervville text-xl">
            Reading
          </p>
          <div className="px-4 flex gap-2 mb-4">
            <img
              className="w-[70px] h-[100px] object-contain rounded-md"
              src={reading.image}
              alt=""
            />
            <div className="text-white">
              <p className="text-zinc-400 text-sm font-baskervville">
                {reading.authors}
              </p>
              <p className="font-jakarta text-xs font-bold">{reading.title}</p>
              <p className="font-jakarta text-[10px] italic text-zinc-300 mb-2">{reading.subtitle}</p>
              <ProgressIndicator totalTimeInSeconds={reading.pageCount * 600} />
            </div>
          </div>
          <hr className="w-[90%] m-auto border-zinc-600" />
        </div>
      )}
    </>
  );
};

export default CurrentBook;
