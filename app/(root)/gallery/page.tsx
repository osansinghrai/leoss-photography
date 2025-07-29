"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

interface GalleryProps {
  int: number;
  image_url: string;
}

const page = () => {
  const router = useRouter();
  const [section, setSection] = React.useState<GalleryProps[]>([]);
  const [loading, setLoading] = React.useState(true);

  const date = new Date();
  const year = date.getFullYear();

  const getStarted = () => {
    window.scrollTo({ top: 10, behavior: "smooth" });
  };

  const handleContact = () => {
    router.push("/contact");
  };

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/routes/portfolio`)
      .then((res) => res.json())
      .then((data) => {
        setSection(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
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
    <main>
      <div className="relative flex justify-end overflow-hidden">
        <img
          src="gallery_bg.png"
          alt="gallery_bg"
          className="object-cover object-top h-[76vh] translate-x-20 sm:translate-x-0 sm:w-[90vw]"
        />
      </div>
      <div className="absolute top-[12rem] sm:top-[16rem] left-[2rem] sm:left-[14rem] z-50">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.8 }}
          className="text-sm tracking-[3px] sm:tracking-[6px] text-gray-600"
        >{`LAUNCHING SUMMER ${year}`}</motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="pt-2 text-5xl sm:text-7xl times-new-roman font-light"
        >
          ART GALLERY
        </motion.h1>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4 mt-4 -translate-x-18 sm:-translate-x-0"
        >
          <button
            onClick={getStarted}
            className="border-2 border-black bg-black mx-[5rem] sm:mx-0 sm:px-6 py-2 rounded-4xl text-white hover:transition-all hover:duration-400 hover:scale-105 active:scale-98 cursor-pointer"
          >
            Get Started
          </button>
          <button
            onClick={handleContact}
            className="border-2 mx-[5rem] sm:mx-0 px-6 py-2 rounded-4xl text-black hover:transition-all hover:duration-400 hover:scale-105 active:scale-98 cursor-pointer"
          >
            Contact me
          </button>
        </motion.div>
      </div>
    </main>
  );
};

export default page;
