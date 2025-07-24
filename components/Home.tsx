"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

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
        className="w-full h-[93.2vh] sm:h-[93.1vh] object-cover "
      />
      <div className="absolute inset-0 flex flex-col gap-4 justify-center items-center text-white text-center -translate-y-20 translate-x-2">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg sm:text-3xl w-[24rem] sm:w-[40rem] uppercase tracking-widest font-black"
        >
          Where timeless beauty meets luxury photography
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="palatino-font tracking-wide flex justify-center text-sm sm:text-base px-6 py-2 border rounded-4xl hover:transition-all hover:duration-200 hover:bg-[#4e4e4e] cursor-pointer"
          onClick={handleGetStarted}
        >
          GET STARTED
        </motion.button>
      </div>
    </div>
  );
};

export default Home;
