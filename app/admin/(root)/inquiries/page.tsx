"use client";

import React, { useState, useEffect } from "react";
import {
  fetchMessages,
  deleteMessage,
  Message,
} from "../../../api/services/contactService";
import toast, { Toaster } from "react-hot-toast";
import { Trash2, Mail, User, Calendar, MessageSquare, Eye } from "lucide-react";

const InquiriesPage = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    loadMessages();
  }, []);

  const loadMessages = async () => {
    try {
      setLoading(true);
      const data = await fetchMessages();
      setMessages(data);
    } catch (error) {
      toast.error("Failed to load inquiries");
      console.error("Error loading inquiries:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      // Optimistic update - immediately remove from UI
      const newItems = messages.filter((msg) => msg.id !== id);
      setMessages(newItems);

      // Show success toast immediately
      toast.success("Inquiry deleted successfully");

      // Make API call in background
      await deleteMessage(id);
    } catch (error) {
      console.error("Error deleting inquiry:", error);
      // Revert optimistic update on error and show error toast
      setMessages(messages);
      toast.error("Failed to delete inquiry");
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPurposeColor = (purpose: string) => {
    switch (purpose.toLowerCase()) {
      case "booking":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "collaboration":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "general inquiry":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
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
    <main className="min-h-screen bg-gray-50">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#fff",
            color: "#000",
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
          },
          success: {
            duration: 3000,
          },
          error: {
            duration: 4000,
          },
        }}
      />

      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 mb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Contact Inquiries
              </h1>
              <p className="text-gray-600 mt-1">
                Manage all contact form submissions
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-[#569f5b] text-white px-4 py-2 rounded-lg font-medium">
                {messages.length}{" "}
                {messages.length === 1 ? "Inquiry" : "Inquiries"}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6">
        {messages.length === 0 ? (
          <div className="text-center py-16">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-12 max-w-md mx-auto">
              <Mail className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                No inquiries yet
              </h3>
              <p className="text-gray-600">
                When visitors submit contact forms, they'll appear here.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden group"
              >
                {/* Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#569f5b] rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 text-lg">
                          {message.name}
                        </h3>
                        <p className="text-gray-500 text-sm flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {message.email}
                        </p>
                      </div>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${getPurposeColor(
                        message.purpose
                      )}`}
                    >
                      {message.purpose}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {formatDate(message.createdAt)}
                    </div>
                  </div>
                </div>

                {/* Message Preview */}
                <div className="p-6">
                  <div className="flex items-start gap-2 mb-3">
                    <MessageSquare className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
                      {message.message}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedMessage(message)}
                      className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      View Full
                    </button>
                    <button
                      onClick={() => handleDelete(message.id)}
                      className="flex-1 bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSelectedMessage(null)}
          ></div>
          <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900">
                  Message Details
                </h2>
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
              <div className="space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    From
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[#569f5b] rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {selectedMessage.name}
                        </p>
                        <p className="text-gray-600 text-sm">
                          {selectedMessage.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Purpose
                  </h3>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getPurposeColor(
                      selectedMessage.purpose
                    )}`}
                  >
                    {selectedMessage.purpose}
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Date
                  </h3>
                  <p className="text-gray-900">
                    {formatDate(selectedMessage.createdAt)}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Message
                  </h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-900 whitespace-pre-wrap leading-relaxed">
                      {selectedMessage.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedMessage(null)}
                  className="flex-1 bg-white text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDelete(selectedMessage.id);
                    setSelectedMessage(null);
                  }}
                  className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default InquiriesPage;
