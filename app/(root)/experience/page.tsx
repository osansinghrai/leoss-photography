"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { div } from "framer-motion/client";

interface sectionProps {
  id: number;
  year: string;
  title: string;
  description: string;
  location: string;
  category: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } },
};

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
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [sections, setSections] = React.useState<sectionProps[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/routes/experience`)
      .then((res) => res.json())
      .then((data) => {
        setSections(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching experience data:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="flex justify-center items-center min-h-[80vh] text-center">
        Loading...
      </p>
    );
  }

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

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative mt-10 ml-10"
        >
          {/* middle line */}
          <div className="absolute left-4 sm:left-1/2 transform bg-gray-300 w-0.5 h-full"></div>
          {/* Experience Sections */}
          <motion.div>
            <div className="flex flex-col gap-8">
              {sections.map((sections, index) => (
                <div
                  key={sections.id}
                  className={`flex flex-col bg-white w-[48rem] h-full py-4 px-6 border border-gray-200 rounded-xl ${
                    index % 2 === 0
                      ? "self-start ml-[6px]"
                      : "  self-end mr-[6px]"
                  }`}
                >
                  <div className="flex">
                    <p> {sections.year} </p>
                    <p>{sections.category}</p>
                  </div>
                  <div>
                    <h1>{sections.title}</h1>
                    <p>{sections.description}</p>
                    <div>
                      <p>{sections.location}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

export default page;
