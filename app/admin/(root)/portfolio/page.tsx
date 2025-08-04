"use client";

import React, { useEffect } from "react";

interface sectionProps {
  id: number;
  title: string;
  description?: string;
  earlier_image_url: string;
  recent_image_url: string;
}

const page = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [section, setSection] = React.useState<sectionProps[]>([]);
  const [loading, setLoading] = React.useState(true);
  useEffect(() => {
    fetch(`{apiBaseUrl}/api/portfolio`)
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
    </main>
  );
};

export default page;
