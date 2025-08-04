"use client";

import React, { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

interface ExperienceProps {
  id: number;
  year: string;
  title: string;
  description: string;
  location: string;
  category: string;
}

const page = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  
  const [experiences, setExperiences] = useState<ExperienceProps[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    year: "",
    title: "",
    description: "",
    location: "",
    category: ""
  });
  const [isCreating, setIsCreating] = useState(false);

  const [editingId, setEditingId] = useState<number | null>(null);
  const [editValues, setEditValues] = useState<{
    year: string;
    title: string;
    description: string;
    location: string;
    category: string;
  }>({ year: "", title: "", description: "", location: "", category: "" });

  // Fetch experiences from database
  useEffect(() => {
    fetch(`${apiBaseUrl}/api/routes/experience`)
      .then((res) => res.json())
      .then((data) => {
        setExperiences(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching experience data", error);
        setLoading(false);
      });
  }, [apiBaseUrl]);

  const handleEdit = (item: ExperienceProps) => {
    setEditingId(item.id);
    setEditValues({ 
      year: item.year, 
      title: item.title, 
      description: item.description, 
      location: item.location, 
      category: item.category 
    });
  };

  const handleSave = async (id: number) => {
    try {
      const updatedItem = {
        ...experiences.find((i) => i.id === id)!,
        ...editValues,
      };
      const newItems = experiences.map((i) => (i.id === id ? updatedItem : i));
      setExperiences(newItems);
      setEditingId(null);

      const response = await fetch(`${apiBaseUrl}/api/routes/experience`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, ...editValues }),
      });

      if (!response.ok) {
        throw new Error("Failed to save changes");
      }

      const savedItem = await response.json();
      const finalItems = experiences.map((i) => (i.id === id ? savedItem : i));
      setExperiences(finalItems);

      console.log("Successfully saved:", savedItem);
      toast.success("Experience updated successfully");
    } catch (error) {
      console.error("Error saving:", error);
      setExperiences(experiences);
      setEditingId(id);
    }
  };

  // Delete
  const handleDelete = async (id: number) => {
    try {
      // Optimistic update - immediately remove from UI
      const newItems = experiences.filter((i) => i.id !== id);
      setExperiences(newItems);

      // Show success toast immediately
      toast.success("Experience deleted successfully");

      const response = await fetch(`${apiBaseUrl}/api/routes/experience`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error("Failed to delete experience");
      }
    } catch (error) {
      console.error("Error deleting:", error);
      // Revert optimistic update on error and show error toast
      setExperiences(experiences);
      toast.error("Failed to delete experience");
    }
  };

  // Create experience
  const handleCreateExperience = async () => {
    if (!createForm.year || !createForm.title || !createForm.description || !createForm.location || !createForm.category) {
      toast.error("All fields are required");
      return;
    }

    setIsCreating(true);
    try {
      const formData = new FormData();
      formData.append("date", createForm.year);
      formData.append("title", createForm.title);
      formData.append("description", createForm.description);
      formData.append("location", createForm.location);
      formData.append("category", createForm.category);

      const response = await fetch(`${apiBaseUrl}/api/routes/experience`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create experience");
      }

      const newExperience = await response.json();
      
      setExperiences([...experiences, newExperience]);

      // Reset form
      setCreateForm({
        year: "",
        title: "",
        description: "",
        location: "",
        category: ""
      });
      setShowCreateModal(false);

      toast.success("Experience created successfully");
    } catch (error) {
      console.error("Error creating experience:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to create experience"
      );
    } finally {
      setIsCreating(false);
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
      <div className="flex justify-between items-center mb-6">
        <div></div>
        <h1 className="text-2xl font-bold text-gray-800">Manage Experience</h1>
        <button
          onClick={() => setShowCreateModal(true)}
          className="font-black border border-gray-400 px-[10px] py-1 rounded-md cursor-pointer transition-all duration-500 hover:bg-[#569f5b] hover:text-white active:scale-95"
        >
          Create Experience
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-4 sm:px-6">
        {experiences
          .sort((a, b) => parseInt(b.year) - parseInt(a.year))
          .map((item) => (
          <div
            key={item.id}
            className="rounded-xl shadow-md p-5 bg-white border border-gray-200 h-full hover:shadow-lg transition-all duration-300"
          >
            <div>
              {editingId === item.id ? (
                                  <>
                    <input
                      className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#569f5b] focus:border-transparent"
                      value={editValues.year}
                      onChange={(e) =>
                        setEditValues((v) => ({ ...v, year: e.target.value }))
                      }
                      placeholder="Year"
                    />
                    <input
                      className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#569f5b] focus:border-transparent"
                      value={editValues.title}
                      onChange={(e) =>
                        setEditValues((v) => ({ ...v, title: e.target.value }))
                      }
                      placeholder="Title"
                    />
                    <textarea
                      className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#569f5b] focus:border-transparent resize-none"
                      value={editValues.description}
                      onChange={(e) =>
                        setEditValues((v) => ({ ...v, description: e.target.value }))
                      }
                      placeholder="Description"
                      rows={3}
                    />
                    <input
                      className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#569f5b] focus:border-transparent"
                      value={editValues.location}
                      onChange={(e) =>
                        setEditValues((v) => ({ ...v, location: e.target.value }))
                      }
                      placeholder="Location"
                    />
                    <input
                      className="border border-gray-300 px-3 py-2 rounded-lg w-full mb-3 focus:outline-none focus:ring-2 focus:ring-[#569f5b] focus:border-transparent"
                      value={editValues.category}
                      onChange={(e) =>
                        setEditValues((v) => ({ ...v, category: e.target.value }))
                      }
                      placeholder="Category"
                    />
                    <div className="flex gap-2 mt-4">
                      <button
                        className="flex-1 bg-gray-200 text-gray-700 px-3 py-2 rounded-lg font-medium hover:bg-gray-300 transition-colors cursor-pointer"
                        onClick={() => setEditingId(null)}
                      >
                        Cancel
                      </button>
                      <button
                        className="flex-1 bg-[#569f5b] text-white px-3 py-2 rounded-lg font-medium hover:bg-[#4a8a4f] transition-colors cursor-pointer"
                        onClick={() => handleSave(item.id)}
                      >
                        Save
                      </button>
                    </div>
                  </>
                              ) : (
                  <>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-[#569f5b] text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {item.year}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-xs font-medium">
                        {item.category}
                      </span>
                    </div>
                    <h1 className="font-bold text-lg mb-2 text-gray-800 line-clamp-1">
                      {item.title}
                    </h1>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex items-center gap-1 mb-4">
                      <span className="text-gray-500 text-sm">📍 {item.location}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="flex-1 bg-[#569f5b] text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-[#4a8a4f] transition-colors cursor-pointer"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                      <button
                        className="flex-1 bg-red-500 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-red-600 transition-colors cursor-pointer"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Experience Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-black/60 backdrop-blur-[2px] px-6 sm:px-0">
            <div className="relative bg-white rounded-2xl p-6 max-w-md w-full max-h-[80vh] overflow-auto">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">Create New Experience</h2>
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
                  handleCreateExperience();
                }}
              >
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year *
                  </label>
                  <input
                    type="text"
                    value={createForm.year}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        year: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#569f5b]"
                    placeholder="e.g., 2023"
                    required
                  />
                </div>

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
                    placeholder="Enter experience title"
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
                    placeholder="Enter experience description"
                    rows={3}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={createForm.location}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        location: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#569f5b]"
                    placeholder="e.g., New York, NY"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={createForm.category}
                    onChange={(e) =>
                      setCreateForm((prev) => ({
                        ...prev,
                        category: e.target.value,
                      }))
                    }
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#569f5b]"
                    placeholder="e.g., Commercial, Wedding, Portrait"
                    required
                  />
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
                    {isCreating ? "Creating..." : "Create Experience"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default page;