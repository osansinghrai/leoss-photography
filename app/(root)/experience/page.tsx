"use client";

import React from "react";
import { motion } from "framer-motion";

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const page = () => {
  return (
    <main className="min-h-screen">
      {/* Heading Experience */}
      <div className="bg-gray-200 w-full py-12 flex flex-col justify-center items-center">
        <motion.h1
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8 }}
          className="text-6xl font-black text-gray-900 tracking-wide"
        >
          Experience
        </motion.h1>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-2 text-lg text-gray-700 font-semibold tracking-wide "
        >
          A journey through years of capturing life's most precious moments
        </motion.p>
      </div>

      {/* Professional Journey */}
      <div className="mx-10 mt-10">
        <div className="flex flex-col justify-center items-center text-4xl font-bold">
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.8, delay: 0.4 }}
            className="tracking-wide font-black"
          >
            Professional Journey
          </motion.h1>
        </div>
      </div>
    </main>
  );
};

export default page;
