"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

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
  const [section, setSection] = useState<sectionProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<ImageProps | null>(null);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    title: string;
    description: string;
  }>({ title: "", description: "" });

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/routes/portfolio`)
      .then((res) => res.json())
      .then((data) => {
        setSection(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching portfolio data", error);
        setLoading(false);
      });
  }, []);

  const handleImageClick = ({ image, title, description }: ImageProps) => {
    setSelectedImage({ image, title, description });
  };
  const closeModal = () => setSelectedImage(null);

  const handleEdit = (item: sectionProps) => {
    setEditingId(item.id);
    setEditValues({ title: item.title, description: item.description || "" });
  };

  const handleSave = async (id: number) => {
    try {
      const updatedItem = {
        ...section.find((i) => i.id === id)!,
        ...editValues,
      };
      const newItems = section.map((i) => (i.id === id ? updatedItem : i));
      setSection(newItems);
      setEditingId(null);

      const response = await fetch(`${apiBaseUrl}/api/routes/portfolio`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...editValues }),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      const savedItem = await response.json();
      const finalItems = section.map((i) => (i.id === id ? savedItem : i));
      setSection(finalItems);

      console.log("Successfully saved:", savedItem);
      toast.success("Content updated successfully");
    } catch (error) {
      console.error("Error saving:", error);
      setSection(section);
      setEditingId(id);
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    try {
      const newItems = section.filter((i) => i.id !== id);
      setSection(newItems);

      const response = await fetch(`${apiBaseUrl}/api/routes/portfolio`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete portfolio");
      }

      toast.success("Content deleted successfully");
    } catch (error) {
      console.error("Error deleting:", error);
      // Revert optimistic update on error
      setSection(section);
    }
  };

  if (loading) {
    return (
      <p className="flex justify-center items-center min-h-[80vh] text-center">
        Loading...
      </p>
    );
  }

  return (
    <main>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#000",
          },
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          },
        }}
      />
      <div className="flex justify-between items-center">
        <div></div>
        <h1 className="text-2xl">Manage portfolio</h1>
        <button className="font-black border border-gray-400 px-[10px] py-1 rounded-md cursor-pointer transition-all duration-500 hover:bg-[#569f5b] hover:text-white active:scale-95">
          Create portfolio
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-4 sm:mx-10">
        {section.map((item, index) => (
          <div
            key={item.id}
            className="rounded-2xl shadow-lg p-4 bg-gray-100 h-full object-cover"
          >
            <div className="w-full h-100 overflow-hidden rounded-2xl">
              <img
                src={item.earlier_image_url || item.recent_image_url}
                alt={item.title}
                className="w-full h-100 object-cover rounded-2xl space-x-6 hover:scale-105 transition-all duration-1500 cursor-pointer"
              />
            </div>
            <div className="mt-6 ">
              {editingId === item.id ? (
                <>
                  <input
                    className="border px-2 py-1 rounded w-full mb-2"
                    value={editValues.title}
                    onChange={(e) =>
                      setEditValues((v) => ({ ...v, title: e.target.value }))
                    }
                  />
                  <input
                    className="border px-2 py-1 rounded w-full mb-2"
                    value={editValues.description}
                    onChange={(e) =>
                      setEditValues((v) => ({
                        ...v,
                        description: e.target.value,
                      }))
                    }
                  />
                  <div className="flex justify-evenly gap-2">
                    <button
                      className="bg-gray-300 px-2 py-1 rounded"
                      onClick={() => setEditingId(null)}
                    >
                      Cancel
                    </button>
                    <button
                      className="bg-green-500 text-white px-2 py-1 rounded"
                      onClick={() => handleSave(item.id)}
                    >
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <h1 className="font-bold text-xl w-60 overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.title}
                  </h1>
                  <div className="flex justify-between items-center">
                    <p className="text-left tracking-wide text-sm overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex justify-evenly items-center mt-2">
                    <div className="flex mb-2 rounded-md bg-[#64748B] text-white transition-all duration-300 active:scale-95">
                      <button
                        onClick={() =>
                          handleImageClick({
                            image: item.earlier_image_url || item.recent_image_url,
                            title: item.title,
                            description: item.description,
                          })
                        }
                        className=" text-sm relative px-4 py-2 rounded-2xl cursor-pointer "
                      >
                        View
                      </button>
                    </div>
                    <div className="flex mb-2 rounded-md bg-[#569f5b] text-white transition-all duration-300 active:scale-95">
                      <button
                        className=" text-sm relative px-4 py-2 rounded-2xl cursor-pointer"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    </div>
                    <div className="flex mb-2 rounded-md bg-[#DC2626] text-white transition-all duration-300 active:scale-95">
                      <button
                        className=" text-sm relative px-4 py-2 rounded-2xl cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
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
