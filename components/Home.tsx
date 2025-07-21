"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/gallery");
  };

  return (
    <div className="relative flex flex-col justify-center z-0">
      <img
        src="Home-bg.jpg"
        alt="Home"
        className="w-full h-[94vh] object-cover "
      />
      <div className="absolute inset-0 flex flex-col gap-4 justify-center items-center text-white text-center -translate-y-20 translate-x-2">
        <p className="text-lg sm:text-3xl w-[24rem] sm:w-[40rem] uppercase tracking-widest font-black">
          Where timeless beauty meets luxury photography
        </p>
        <button
          onClick={handleGetStarted}
          className="palatino-font tracking-wide flex justify-center items-center text-sm sm:text-base px-4 py-2 border rounded-lg transition-all duration-200 hover:bg-[#4e4e4e] cursor-pointer"
        >
          GET STARTED
        </button>
      </div>
    </div>
  );
};

export default Home;
