"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

interface navigateProps {
  label: string;
  path: string;
}

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [activeButton, setActiveButton] = React.useState("");
  const [showSearchInput, setShowSearchInput] = React.useState(false);

  const navButtons = [
    { label: "Home", path: "/" },
    { label: "Portfolio", path: "/portfolio" },
    { label: "Experience", path: "/experience" },
    { label: "Gallery", path: "/gallery" },
    { label: "Contact", path: "/contact" },
  ];

  useEffect(() => {
    const currentNav = navButtons.find((item) => item.path === pathName);
    if (currentNav) setActiveButton(currentNav.label);
  }, [pathName]);

  const handleClick = ({ label, path }: navigateProps) => {
    setActiveButton(label);
    router.push(path);
  };

  const handleBlur = () => {
    setShowSearchInput(false);
  };

  return (
    <main className="flex flex-row justify-center items-center pl-16 pt-4 pr-16 pb-2 shadow-md">
      <div>
        <Link href="/">
          <h1 className="marlet-font text-4xl cursor-pointer text-shadow-font ">
            LEOSS
          </h1>
        </Link>
      </div>
      <div className="flex  justify-center items-center gap-10 ml-auto mr-auto">
        {navButtons.map((item) => (
          <button
            onClick={() => handleClick(item)}
            key={item.label}
            className={`hover:font-black hover:text-xl text-lg transition-all duration-300 ease-in-out cursor-pointer pb-1 border-b-2 ${activeButton === item.label
              ? "font-black border-black"
              : "border-transparent"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className="w-[100px] h-[32px] cursor-pointer">
        {showSearchInput ? (
          <input
            type="text"
            placeholder="Search"
            autoFocus
            width={24}
            height={24}
            onBlur={handleBlur}
            className="border-b-2 border-black outline-none text-base pl-1 pr-2 -translate-x-10"
          />
        ) : (
          <Image
            src="/search.png"
            alt="search"
            width={28}
            height={28}
            onClick={() => setShowSearchInput(true)}
          ></Image>
        )}
      </div>
    </main>
  );
};

export default Header;
