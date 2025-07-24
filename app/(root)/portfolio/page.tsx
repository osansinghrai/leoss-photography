"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { motion } from "framer-motion";

interface sectionProps {
  id: number;
  title: string;
  description?: string;
  image_url: string;
  image_public_id: string;
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
    <div className="relative flex flex-col items-center justify-center">
      <div className="w-[200vw] -translate-x-40 sm:-translate-0 sm:w-full h-[93.5vh] sm:h-full overflow-hidden">
        <img
          src="portfolio-bg.jpg"
          alt="portfolio"
          className="w-full h-full object-cover"
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
            className="border-2 border-black bg-black px-6 py-2 rounded-4xl text-white cursor-pointer"
          >
            Experience
          </button>
          <button
            onClick={handleContact}
            className="border-2 px-6 py-2 rounded-4xl text-black cursor-pointer"
          >
            Contact me
          </button>
        </motion.div>
      </div>

      <div>
        {section.map((section, index) => (
          <div key={index}>
            <Image
              src={section.image_url}
              alt={section.title}
              width={40}
              height={40}
            ></Image>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
