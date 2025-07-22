"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";


interface sectionProps {
  title: string;
  description: string;
  image_url: string;
}

const page = () => {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

  const [sections, setSections] = React.useState<sectionProps[]>([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/portfolio`)
      .then((res) => res.json())
      .then((data) => {
        setSections(data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <p className="flex justify-center items-center text-center h-[92vh] -translate-y-30 overflow-hidden ">
        Loading...
      </p>
    );
  }

  return (
    <div>
      <div>
        <h1></h1>
      </div>
      <div>
      {sections.map((section, index) => (
        <div key={index} className="mb-8">
          <Image src="/Home.png" alt="image" width={100} height={100}></Image>
          <h1>{section.title}</h1>
          <p>{section.description}</p>
        </div>
      ))}
      </div>
    </div>
  );
};

export default page;
