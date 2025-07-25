"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface sectionProps {
  id: number;
  title: string;
  description?: string;
  earlier_image_url: string;
  recent_image_url: string;
}

const page = () => {
  const router = useRouter();

  const handleExperience = () => {
    router.push("/experience");
  };

  const handleContact = () => {
    router.push("/contact");
  };

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [section, setSection] = React.useState<sectionProps[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/routes/portfolio`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSection(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
        setLoading(false);
      });
    {
    }
  }, []);

  if (loading) {
    return (
      <p className="flex justify-center items-center min-h-[80vh] text-center">
        Loading...
      </p>
    );
  }

  return (
    <main className="relative flex flex-col">
      <div className="w-[200vw] -translate-x-94 sm:-translate-0 sm:w-full h-[93.5vh] sm:h-full overflow-hidden">
        <img
          src="portfolio-bg.jpg"
          alt="portfolio"
          className="w-full h-full sm:h-[93.5vh] object-cover overflow-hidden"
        />
      </div>

      <div className="absolute top-6 left-0 font-extrabold flex flex-col items-start justify-center min-h-[20rem] sm:min-h-[36rem] pl-10 sm:pl-[16rem] gap-2">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-light text-xl"
        >
          Welcome to my
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-extrabold text-4xl"
        >
          Leoss Photography
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg w-[18rem] sm:w-[40rem]"
        >
          From portraits to landscapes, over 5 years of experience has shaped my
          lens to capture elegance in its purest form.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-2"
        >
          <button
            onClick={handleExperience}
            className="border-2 border-black bg-black px-6 py-2 rounded-4xl text-white hover:transition-all hover:duration-400 hover:scale-105 cursor-pointer"
          >
            Experience
          </button>
          <button
            onClick={handleContact}
            className="border-2 px-6 py-2 rounded-4xl text-black hover:transition-all hover:duration-400 hover:scale-105  cursor-pointer"
          >
            Contact me
          </button>
        </motion.div>
      </div>

      <div className="px-10 sm:px-16 mt-8">
        {/* earlier projects */}
        <div className="relative">
          <div className="flex items-center justify-center">
            <p className="text-4xl font-extrabold mb-4">Earlier projects</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mx-30 cursor-pointer">
            {section.map((section, index) => (
              <div
                key={index}
                className="shadow-lg rounded-2xl p-4 bg-gray-100 h-[32rem] object-cover"
              >
                <img
                  src={section.earlier_image_url}
                  alt={section.title}
                  className="w-full h-100 object-cover rounded-2xl space-x-6 hover:scale-102 transition-transform duration-300 cursor-pointer"
                />
                <div className="mt-6">
                  <p className="font-bold text-xl">{section.title}</p>
                  <p>{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* recent projects */}
        <div className="relative">
          <div className="flex items-center justify-center mt-10">
            <p className="text-4xl font-extrabold mb-4">Recent projects</p>
          </div>

          <div className="grid grid-cols-4 gap-4 mx-30 cursor-pointer">
            {section.map((section, index) => (
              <div
                key={index}
                className="shadow-lg rounded-2xl p-4 bg-gray-100 h-[32rem] object-cover"
              >
                <img
                  src={section.recent_image_url}
                  alt={section.title}
                  className="w-full h-100 object-cover rounded-2xl space-x-6 hover:scale-102 transition-transform duration-300 cursor-pointer"
                />
                <div className="mt-6">
                  <p className="font-bold text-xl">{section.title}</p>
                  <p>{section.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
