"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [section, setSection] = React.useState<sectionProps[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [selectedImage, setSelectedImage] = React.useState<ImageProps | null>(
    null
  );

  const handleImageClick = ({ image, title, description }: ImageProps) => {
    setSelectedImage({ image, title, description });
  };
  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/routes/portfolio`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSection(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching portfolio data", error);
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
      <div className="flex justify-between items-center">
        <div></div>
        <h1 className="text-2xl">Manage portfolio</h1>
        <button className="font-black border border-gray-400 px-[10px] py-1 rounded-md cursor-pointer transition-all duration-500 hover:bg-[#569f5b] hover:text-white active:scale-95">
          Create portfolio
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4 sm:mx-10">
        {section.map((section, index) => (
          <div
            key={index}
            className="rounded-2xl shadow-lg p-4 bg-gray-100 h-[34rem] object-cover"
          >
            <div className="w-full h-100 overflow-hidden rounded-2xl">
              <img
                src={section.earlier_image_url || section.recent_image_url}
                alt={section.title}
                className="w-full h-100 object-cover rounded-2xl space-x-6 hover:scale-105 transition-all duration-1500 cursor-pointer"
              />
            </div>
            <div className="mt-6 ">
              <h1 className="font-bold text-xl w-60 overflow-hidden text-ellipsis whitespace-nowrap">
                {section.title}
              </h1>
              <div className="flex justify-between items-center">
                <p className="text-left tracking-wide text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                  {section.description}
                </p>
              </div>
              <div className="flex justify-evenly items-center mt-2">
                <div className="flex mb-2 rounded-md bg-[#64748B] text-white transition-all duration-300 active:scale-95">
                  <button
                    onClick={() =>
                      handleImageClick({
                        image: section.earlier_image_url,
                        title: section.title,
                        description: section.description,
                      })
                    }
                    className=" text-sm relative px-4 py-2 rounded-2xl cursor-pointer "
                  >
                    View
                  </button>
                </div>
                <div className="flex mb-2 rounded-md bg-[#569f5b] text-white transition-all duration-300 active:scale-95">
                  <button className=" text-sm relative px-4 py-2 rounded-2xl cursor-pointer">
                    Edit
                  </button>
                </div>
                <div className="flex mb-2 rounded-md bg-[#DC2626] text-white transition-all duration-300 active:scale-95">
                  <button className=" text-sm relative px-4 py-2 rounded-2xl cursor-pointer">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
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
