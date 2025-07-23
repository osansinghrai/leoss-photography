"use client";

import Image from "next/image";
import React, { useEffect } from "react";

interface sectionProps {
  id: number;
  title: string;
  description?: string;
  image_url: string;
  image_public_id: string;
}

const page = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [section, setSection] = React.useState<sectionProps[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/routes/portfolio`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setSection(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching portfolio data:", error);
        setLoading(false);
      });
      {}
  }, []);

  if (loading) {
    return (
      <p className="flex justify-center items-center min-h-[80vh] text-center">
        Loading...
      </p>
    );
  }

  return <div>
    <div>
      {section.map((section, index) => (
        <div key={index}>
          <Image src={section.image_url} alt={section.title} width={40} height={40}></Image>
        </div>
      ))}
    </div>
  </div>;
};

export default page;
