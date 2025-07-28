"use client";

import React, { useEffect } from "react";
import { delay, motion } from "framer-motion";
import { MapPin, Camera, Palette, Zap, Trophy, Star } from "lucide-react";

interface sectionProps {
  id: number;
  year: string;
  title: string;
  description: string;
  location: string;
  category: string;
}

interface Skills {
  id: number;
  name: string;
  level: number;
  icon: React.ReactNode;
  color?: string;
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
    y: 1,
  },
};

const skillData = [
  {
    id: 1,
    name: "Portrait Photography",
    level: 95,
    icon: <Camera className="w-5 h-5" />,
  },
  {
    id: 2,
    name: "Adobe Lightroom",
    level: 90,
    icon: <Palette className="w-5 h-5" />,
    color: "from-gray-600 to-gray-800",
  },
  {
    id: 3,
    name: "Adobe Photoshop",
    level: 85,
    icon: <Zap className="w-5 h-5" />,
  },
  {
    id: 4,
    name: "Drone Photography",
    level: 80,
    icon: <Camera className="w-5 h-5" />,
  },
  {
    id: 5,
    name: "Wedding Photography",
    level: 95,
    icon: <Star className="w-5 h-5" />,
  },
  {
    id: 6,
    name: "Commercial Photography",
    level: 88,
    icon: <Trophy className="w-5 h-5" />,
  },
];

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
          className="text-4xl sm:text-6xl font-black text-gray-900 tracking-normal sm:tracking-wide"
        >
          Experience
        </motion.h1>

        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-2 text-center text-base sm:text-lg w-80 sm:w-full text-gray-700 font-semibold tracking-wide "
        >
          A journey through years of capturing life's most precious moments
        </motion.p>
      </div>

      {/* Professional Journey */}
      <div className="mx-10 mt-8">
        <div className="flex flex-col text-center justify-center items-center text-2xl sm:text-4xl font-bold">
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
          className="relative mt-6 ml-10"
        >
          {/* middle line */}
          <div className="absolute -left-14 sm:left-1/2 transform bg-gray-300 w-0.5 h-full"></div>
          {/* Experience Sections */}
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            transition={{
              delayChildren: 0.2,
              staggerChildren: 0.4,
            }}
            className="flex flex-col gap-8"
          >
            {sections.map((sections, index) => (
              <motion.div
                variants={itemVariants}
                transition={{ duration: 0.8 }}
                key={sections.id}
                className={`flex flex-col bg-white w-[23rem] sm:w-[48rem] h-full py-4 px-6 border border-gray-200 rounded-xl transform hover:transition-all hover:duration-500 hover:scale-103 ${
                  index % 2 === 0
                    ? "sm:self-start -ml-14 sm:ml-[6px]"
                    : "sm:self-end -ml-14 mr-[4px]"
                }`}
              >
                <div className="flex items-center gap-2 cursor-pointer">
                  <p className="tracking-wide"> {sections.year} </p>
                  <p className="bg-gray-200 rounded-full text-sm font-medium px-2 py-1">
                    {sections.category}
                  </p>
                </div>
                <div className="flex flex-col gap-1 mt-2">
                  <h1 className="text-xl">{sections.title}</h1>
                  <p className="tracking-wide text-left leading-snup ">
                    {sections.description}
                  </p>
                  <div className="flex items-center gap-2 mt-2 cursor-pointer ">
                    <MapPin size={16} />
                    <p className="translate-y-[1px] text-sm">
                      {sections.location}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Technical expertise */}
      <div className="mt-8 sm:mt-16 mx-10 min-h-screen">
        <div className="flex flex-col text-center justify-center items-center text-2xl sm:text-4xl font-bold">
          <motion.h1
            variants={itemVariants}
            initial="hidden"
            viewport={{ once: true }}
            whileInView="visible"
            transition={{ duration: 0.8 }}
            className="tracking-wide font-black"
          >
            Technical experitise
          </motion.h1>
        </div>
        <motion.div
          variants={itemVariants}
          initial="hidden"
          viewport={{ once: true }}
          whileInView="visible"
          transition={{
            delayChildren: 0.2,
            staggerChildren: 0.4,
          }}
          className="grid grid-cols-1 sm:grid-cols-3 mt-6 sm:mt-10 gap-6 mx-2 sm:mx-10"
        >
          {skillData.map((skill) => (
            <motion.div
              key={skill.id}
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              className="flex flex-col h-full py-6 px-6  bg-white border border-gray-200 rounded-2xl"
            >
              <div className="flex gap-2 ">
                <h1 className="bg-gray-200 py-1 px-1 items-center">
                  {skill.icon}
                </h1>
                <h1 className="translate-y-1">{skill.name}</h1>
              </div>
              <div className="flex justify-between items-center mt-4 text-sm">
                <p>Proficiency</p>
                <p>{skill.level}%</p>
              </div>
              <div className="bg-gray-200 mt-2">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 2.5, delay: 0.2 }}
                  className="bg-gray-500 h-2 rounded-full"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Awards */}
      <div>
        
      </div>
    </main>
  );
};

export default page;
