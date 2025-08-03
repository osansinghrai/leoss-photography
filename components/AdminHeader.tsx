"use client";

import React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";

const AdminHeader = () => {
  return (
    <main className="sticky top-0 bottom-0 flex justify-between items-center px-10 bg-[#f6f6f6] sm:px-16 pt-4 pb-2 shadow-md z-50">
      <div className="flex justify-between items-center w-full">
        {/* LOGO */}
        <Link href="/admin">
          <h1 className="marlet-font cursor-pointer text-2xl sm:text-4xl text-shadow-font tracking-wider">
            LEOSS
          </h1>
        </Link>
        <p className="text-2xl font-black tracking-wider">Admin Panel</p>
        <a
          href="https://github.com/osansinghrai"
          target="_black"
          rel="noopener noreferrer"
        >
          <Image
            src="/adminPanel.png"
            alt="user"
            width={40}
            height={40}
            className="rounded-full cursor-pointer"
          />
        </a>
      </div>
    </main>
  );
};

export default AdminHeader;
