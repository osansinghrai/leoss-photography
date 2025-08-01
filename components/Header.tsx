"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";

interface navigateProps {
  label: string;
  path: string;
}

const Header = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [activeButton, setActiveButton] = React.useState("");
  const [showMobileNav, setShowMobileNav] = React.useState(false);

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
    setShowMobileNav(false);
  };

  return (
    <main className="sticky top-0 bottom-0 flex justify-between items-center px-10 bg-[#f6f6f6] sm:px-16 pt-4 pb-2 shadow-md z-50">
      <div>
        {/* LOGO */}
        <Link href="/">
          <h1 className="marlet-font cursor-pointer text-2xl sm:text-4xl text-shadow-font tracking-wider">
            LEOSS
          </h1>
        </Link>
      </div>
      {/* Desktop Nav */}
      <div className="hidden sm:flex sm:justify-center sm:items-center sm:gap-10 sm:ml-auto sm:mr-auto sm:tracking-wide">
        {navButtons.map((item) => (
          <button
            onClick={() => handleClick(item)}
            key={item.label}
            className={`hover:font-black hover:text-lg text-base transition-all duration-300 ease-in-out cursor-pointer pb-1 border-b-2 ${
              activeButton === item.label
                ? "font-black border-black"
                : "border-transparent"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
      {/* Mobile Nav */}
      <div className="sm:hidden">
        <div>
          <button onClick={() => setShowMobileNav(true)} aria-label="Open menu">
            <Menu size={28} />
          </button>
        </div>
        <div
          className={`fixed top-0 right-0 w-64 h-full bg-[#f6f6f6] shadow-lg transform transition-all duration-300 ease-it-out z-50 ${
            showMobileNav ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col items-start gap-4 mt-[58px] ">
            {navButtons.map((item) => (
              <button
                key={item.label}
                onClick={() => handleClick(item)}
                className={`text-base w-full text-left py-2 px-4 ${
                  activeButton === item.label
                    ? "font-bold bg-[#ececec] py-4"
                    : ""
                } `}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Header;
