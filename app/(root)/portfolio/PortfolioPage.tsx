"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowRight,
  ChevronDown,
  Feather,
  FeatherIcon,
  Search,
  SortAsc,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { select } from "framer-motion/client";

interface sectionProps {
  id: number;
  title: string;
  description?: string;
  earlier_image_url: string;
  recent_image_url: string;
}

interface ImageProps {
  image: string;
  title: string;
  description?: string;
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
  const searchParams = useSearchParams();
  const [section, setSection] = React.useState<sectionProps[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState(
    searchParams?.get("search") || ""
  );
  const [sortTitle, setSortTitle] = React.useState<"none" | "asc" | "desc">(
    "none"
  );
  const [showSearchInput, setShowSearchInput] = React.useState(false);
  const [selectedImage, setSelectedImage] = React.useState<ImageProps | null>(
    null
  );

  const filteredSections = Array.isArray(section)
    ? section.filter((item) => item.title.toLowerCase().includes(searchTerm))
    : [];
  const handleImageClick = ({ image, title, description }: ImageProps) => {
    setSelectedImage({ image, title, description });
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setSearchTerm(value);
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set("search", value);
    } else {
      params.delete("search");
    }
  };

  // background won't scroll
  useEffect(() => {
    if (selectedImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedImage]);

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
  }, []);

  if (loading) {
    return (
      <p className="flex justify-center items-center min-h-[80vh] text-center">
        Loading...
      </p>
    );
  }

  return (
    <main className="relative flex flex-col min-h-screen">
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
            className="border-2 border-black bg-black px-6 py-2 rounded-4xl text-white hover:transition-all hover:duration-400 hover:scale-105 active:scale-98 cursor-pointer"
          >
            Experience
          </button>
          <button
            onClick={handleContact}
            className="border-2 px-6 py-2 rounded-4xl text-black hover:transition-all hover:duration-400 hover:scale-105 active:scale-98 cursor-pointer"
          >
            Contact me
          </button>
        </motion.div>
      </div>

      <div className="px-10 sm:px-16 mt-8">
        {/* earlier projects */}
        <div className="relative">
          <div className="flex flex-col gap-2 sm:flex-row justify-center sm:justify-between items-center sm:mx-[15rem] ">
            <div className="hidden sm:flex sm:w-[100px] sm:h-[auto] sm:-translate-x-[7rem] sm:cursor-pointer">
              {showSearchInput ? (
                <input
                  type="text"
                  placeholder="Search"
                  autoFocus
                  width={24}
                  height={24}
                  onBlur={() => setShowSearchInput(false)}
                  onChange={handleSearch}
                  className="border-b border-gray-400 outline-none text-base sm:translate-x-[2rem]"
                />
              ) : (
                <Search
                  width={24}
                  height={24}
                  onClick={() => setShowSearchInput(true)}
                  className="w-[100px]"
                />
              )}
            </div>
            <p className="text-4xl font-extrabold sm:mb-4">Earlier projects</p>
            <div className="flex justify-between gap-14">
              <div className="flex sm:hidden">
                <input
                  type="text"
                  placeholder="Search"
                  width={24}
                  height={24}
                  onChange={handleSearch}
                  className="border-b border-gray-400 outline-none text-sm"
                />
              </div>
              <div className="flex gap-1 sm:translate-x-20">
                <label htmlFor="Sort">SORT:</label>
                <select
                  name="sort"
                  id="sort"
                  className="text-sm outline-none"
                  value={sortTitle}
                  onChange={() =>
                    setSortTitle(sortTitle === "asc" ? "desc" : "asc")
                  }
                >
                  <option value="none">none</option>
                  <option value="asc">A - Z</option>
                  <option value="desc">Z - A</option>
                </select>
              </div>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              delayChildren: 0.2,
              staggerChildren: 0.4,
            }}
            className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:mx-30"
          >
            {filteredSections
              .filter((section) => section.earlier_image_url)
              .sort((a, b) =>
                sortTitle === "asc"
                  ? a.title.localeCompare(b.title)
                  : sortTitle === "desc"
                  ? b.title.localeCompare(a.title)
                  : 0
              )
              .map((section, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  key={index}
                  className="rounded-2xl shadow-lg p-4 bg-gray-100 h-[32rem] object-cover"
                >
                  <div className="w-full h-100 overflow-hidden rounded-2xl">
                    <img
                      src={section.earlier_image_url}
                      alt={section.title}
                      className="w-full h-100 object-cover rounded-2xl space-x-6 hover:scale-105 transition-all duration-1500 cursor-pointer"
                    />
                  </div>
                  <div className="mt-6 ">
                    <h1 className="font-bold text-xl w-60 overflow-hidden text-ellipsis whitespace-nowrap">
                      {section.title}
                    </h1>
                    <div className="flex justify-between items-center">
                      <p className="text-left tracking-wide w-36 -translate-y-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                        {section.description}
                      </p>
                      <div className="flex mb-2 rounded-md bg-black text-white group">
                        <button
                          onClick={() =>
                            handleImageClick({
                              image: section.earlier_image_url,
                              title: section.title,
                              description: section.description,
                            })
                          }
                          className=" text-sm relative pl-[12px] pr-8 py-2 rounded-2xl cursor-pointer"
                        >
                          View more
                        </button>
                        <ArrowRight className="absolute translate-x-[82px] translate-y-[10px] size-4 transition-transform duration-200 group-hover:translate-x-21 " />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>

        {/* recent projects */}
        <div className="relative mb-18">
          <div className="flex items-center justify-center mt-10">
            <p className="text-4xl font-extrabold mb-4">Recent projects</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{
              delayChildren: 0.2,
              staggerChildren: 0.4,
            }}
            className="grid grid-cols-1 sm:grid-cols-4 gap-4 sm:mx-30"
          >
            {filteredSections
              .filter((section) => section.recent_image_url)
              .sort((a, b) =>
                sortTitle === "asc"
                  ? a.title.localeCompare(b.title)
                  : sortTitle === "desc"
                  ? b.title.localeCompare(a.title)
                  : 0
              )
              .map((section, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  key={index}
                  className="rounded-2xl shadow-lg p-4 bg-gray-100 h-[32rem] object-cover"
                >
                  <div className="w-full h-100 overflow-hidden rounded-2xl">
                    <img
                      src={section.recent_image_url}
                      alt={section.title}
                      className="w-full h-100 object-cover rounded-2xl space-x-6 hover:scale-105 transition-all duration-1500 cursor-pointer"
                    />
                  </div>
                  <div className="mt-6 ">
                    <h1 className="font-bold text-xl w-60 overflow-hidden text-ellipsis whitespace-nowrap">
                      {section.title}
                    </h1>
                    <div className="flex justify-between items-center">
                      <p className="text-left tracking-wide w-30 -translate-y-2 text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                        {section.description}
                      </p>
                      <div className="flex mb-2 rounded-md bg-black text-white group">
                        <button
                          onClick={() =>
                            handleImageClick({
                              image: section.recent_image_url,
                              title: section.title,
                              description: section.description,
                            })
                          }
                          className=" text-sm relative pl-[12px] pr-8 py-2 rounded-2xl cursor-pointer"
                        >
                          View more
                        </button>
                        <ArrowRight className="absolute translate-x-[82px] translate-y-[10px] size-4 transition-transform duration-200 group-hover:translate-x-21 " />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </div>
      {selectedImage && (
        <div onClick={closeModal} className="fixed inset-0 z-50">
          <div className="absolute inset-0 flex flex-col  justify-center items-center bg-black/60 backdrop-blur-[2px] px-6 sm:px-0">
            <div className="relative bg-white rounded-2xl pb-6 px-1 pt-1 max-w-xl max-h-[80vh] w-full overflow-auto ">
              <img
                src={selectedImage.image}
                alt={selectedImage.title}
                className="w-full h-auto max-h-[60vh] rounded-2xl object-cover"
              />
              <div className="px-4 mt-4">
                <h1 className=" text-2xl font-bold">{selectedImage.title}</h1>
                <p className="text-gray-700 mt-2 ">
                  {selectedImage.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default page;
