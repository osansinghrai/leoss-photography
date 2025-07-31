"use client";

import React from "react";
import { motion } from "framer-motion";
import { Facebook, Github, Instagram, Linkedin } from "lucide-react";

const page = () => {
  const handleScrollContact = () => {
    window.scrollTo({ top: 1000, behavior: "smooth" });
  };
  return (
    <main>
      <div className="relative flex w-full h-[54rem]">
        <div className="flex mx-18 mt-60 content-center items-center">
          <img
            src="contact2.jpg"
            alt="gallery1"
            className="absolute w-[42rem] h-auto -translate-x-[10px] -translate-y-[38px] rounded-xl object-cover z-20"
          />
          <img
            src="contact.jpeg"
            alt="gallery2"
            className="absolute w-[58rem] translate-x-[20rem] -translate-y-[6rem] h-auto rounded-xl object-cover z-30"
          />
          <img
            src="contact3.jpeg"
            alt="gallery3"
            className="absolute w-[48rem] h-auto translate-x-[49rem] -translate-y-[42px] rounded-xl object-cover z-10"
          />
        </div>

        <div className="absolute flex flex-col justify-center items-center translate-x-[40rem] gap-2 text-white z-50">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 1 }}
            transition={{ duration: 0.8 }}
            className="times-new-roman text-black text-9xl tracking-wider mt-[84px]"
          >
            DEPTH
          </motion.h1>
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            onClick={handleScrollContact}
            className=" border-2 border-gray-200 mt-[12rem] px-8 py-[10px] rounded-lg tracking-widest text-sm text-white hover:transition-all hover:duration-500 hover:scale-105 hover:bg-white hover:text-black active:scale-98 cursor-pointer"
          >
            Approach
          </motion.button>
        </div>
      </div>
      <div className="flex min-h-screen justify-center gap-[10rem] items-center">
        <div className="flex flex-col">
          <h1 className="text-4xl font-black">Contact Us</h1>
          <div className="flex flex-col mt-2 text-gray-700">
            <p>Phone: +977 9800829691</p>
            <p>osanbantawarai@gmail.com</p>
            <p>Tinkune, Kathmandu</p>
          </div>
          <div className="flex gap-4 text-gray-800 mt-4">
            <Facebook className="transition-color duration-300 hover:text-[#007CF7] cursor-pointer" />
            <Instagram className="transition-color duration-300 hover:text-[#92379D] cursor-pointer" />
            <Github className="transition-color duration-300 hover:text-[#0D2535] cursor-pointer" />
            <Linkedin className="transition-color duration-300 hover:text-[#2764AB] cursor-pointer" />
          </div>
        </div>
        <div className="flex flex-col">
          <p className="text-gray-700">
            Great vision without great people is irrelevant.
          </p>
          <p className="text-gray-700">Let's work together!</p>
          <div className="flex flex-col gap-[10px] mt-2 w-[26vw]">
            <input
              type="text"
              aria-label="name"
              placeholder="Enter your name"
              className="border border-gray-400 text-gray-600 placeholder:text-gray-400 bg-white py-[6px] px-[10px] rounded-md focus:outline-none focus:ring-1 transition-all duration-300"
            />
            <input
              type="text"
              aria-label="email"
              placeholder="Enter a valid email address"
              className="border border-gray-400 text-gray-600 placeholder:text-gray-400 bg-white py-[6px] px-[10px] rounded-md focus:outline-none focus:ring-1 transition-all duration-300"
            />
            <textarea
              rows={3}
              aria-label="message"
              placeholder="Enter your message"
              className="border border-gray-400 text-gray-600 placeholder:text-gray-400 bg-white py-1 px-[10px] rounded-md focus:outline-none focus:ring-1 transition-all duration-300"
            />
            <div className="mt-2">
              <button className="border-2 border-black bg-black px-6 py-[8px] rounded-lg text-sm text-white hover:transition-all hover:duration-400 hover:scale-105 active:scale-98 cursor-pointer">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
