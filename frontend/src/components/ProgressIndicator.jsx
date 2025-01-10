import React, { useState, useEffect } from "react";

const ProgressIndicator = ({ totalTimeInSeconds, height = "2.5" }) => {
  // State to keep track of the time remaining
  const [timeLeft, setTimeLeft] = useState(totalTimeInSeconds);

  // Calculate the percentage of the progress bar based on time left
  const progressPercentage = ((timeLeft / totalTimeInSeconds) * 100).toFixed(2);

  // Use effect to update the time left every second
  useEffect(() => {
    // If time left reaches 0, stop the interval
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => Math.max(prevTime - 1, 0)); // Decrease by 1 second
    }, 1000);

    // Cleanup the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  // Convert seconds to hours and minutes for display
  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="w-full max-w-xs">
      <div className="relative">
        <div className="flex mb-[5px] items-center gap-2">
          <h2 className="text-xs italic">Time Left: </h2>
          <p className="text-xs font-jakarta font-bold">
            {hours}h {minutes}m {seconds}s
          </p>
        </div>
        <div className="flex mb-2 pr-4">
          <div
            className="w-full bg-gray-200 rounded-full"
            style={{ height: `${height}px` }}
          >
            <div
              className="bg-zinc-500 rounded-full"
              style={{
                width: `${progressPercentage}%`,
                height: `${height}px`,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;
