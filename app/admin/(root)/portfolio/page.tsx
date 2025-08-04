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
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    title: "",
    description: "",
    earlier_image: null as File | null,
    recent_image: null as File | null,
  });
  const [isCreating, setIsCreating] = useState(false);

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
      // Optimistic update - immediately remove from UI
      const newItems = section.filter((i) => i.id !== id);
      setSection(newItems);

      // Show success toast immediately
      toast.success("Content deleted successfully");

      // Make API call in background
      const response = await fetch(`${apiBaseUrl}/api/routes/portfolio`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete portfolio");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      // Revert optimistic update on error and show error toast
      setSection(section);
      toast.error("Failed to delete portfolio");
    }
  };

  // Create portfolio
  const handleCreatePortfolio = async () => {
    if (!createForm.title || !createForm.description) {
      toast.error("Title and description are required");
      return;
    }

    if (!createForm.earlier_image && !createForm.recent_image) {
      toast.error("At least one image is required");
      return;
    }

    setIsCreating(true);
    try {
      const formData = new FormData();
      formData.append("title", createForm.title);
      formData.append("description", createForm.description);

      if (createForm.earlier_image) {
        formData.append("earlier_image_url", createForm.earlier_image);
      }
      if (createForm.recent_image) {
        formData.append("recent_image_url", createForm.recent_image);
      }

      const response = await fetch(`${apiBaseUrl}/api/routes/portfolio`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create portfolio");
      }

      const newPortfolio = await response.json();
      setSection([...section, newPortfolio]);

      // Reset form
      setCreateForm({
        title: "",
        description: "",
        earlier_image: null,
        recent_image: null,
      });
      setShowCreateModal(false);

      toast.success("Portfolio created successfully");
    } catch (error) {
      console.error("Error creating portfolio:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create portfolio"
      );
    } finally {
      setIsCreating(false);
    }
  };

  const handleFileChange = (
    field: "earlier_image" | "recent_image",
    file: File | null
  ) => {
    setCreateForm((prev) => ({
      ...prev,
      [field]: file,
    }));
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
        <button
          onClick={() => setShowCreateModal(true)}
          className="font-black border border-gray-400 px-[10px] py-1 rounded-md cursor-pointer transition-all duration-500 hover:bg-[#569f5b] hover:text-white active:scale-95"
        >
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
                            image:
                              item.earlier_image_url || item.recent_image_url,
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

      {/* Create Portfolio Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/60 backdrop-blur-[2px] px-6 sm:px-0">
            <div className="relative bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Create New Portfolio</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCreatePortfolio();
                }}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title *
                  </label>
                  <input
                    type="text"
                    value={createForm.title}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#569f5b]"
                    placeholder="Enter portfolio title"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description *
                  </label>
                  <textarea
                    value={createForm.description}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#569f5b]"
                    placeholder="Enter portfolio description"
                    rows={3}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Earlier Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange(
                          "earlier_image",
                          e.target.files?.[0] || null
                        )
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#569f5b] file:hidden"
                      id="earlier-image-input"
                    />
                    <label
                      htmlFor="earlier-image-input"
                      className="absolute inset-0 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600"
                    >
                      {createForm.earlier_image
                        ? createForm.earlier_image.name
                        : "Choose file"}
                    </label>
                    {createForm.earlier_image && (
                      <button
                        type="button"
                        onClick={() => handleFileChange("earlier_image", null)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 text-sm"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Recent Image
                  </label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleFileChange(
                          "recent_image",
                          e.target.files?.[0] || null
                        )
                      }
                      className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#569f5b] file:hidden"
                      id="recent-image-input"
                    />
                    <label
                      htmlFor="recent-image-input"
                      className="absolute inset-0 flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600"
                    >
                      {createForm.recent_image
                        ? createForm.recent_image.name
                        : "Choose file"}
                    </label>
                    {createForm.recent_image && (
                      <button
                        type="button"
                        onClick={() => handleFileChange("recent_image", null)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700 text-sm"
                      >
                        ×
                      </button>
                    )}
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isCreating}
                    className="px-4 py-2 bg-[#569f5b] text-white rounded-md hover:bg-[#4a8a4f] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isCreating ? "Creating..." : "Create Portfolio"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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
