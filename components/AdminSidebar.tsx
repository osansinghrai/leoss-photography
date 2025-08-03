"use client";

import {
  ArrowLeft,
  Brain,
  BrainCircuit,
  BriefcaseBusiness,
  MessageCircle,
  MessageCircleCode,
  MessageCircleQuestionMark,
  VectorSquare,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";

interface navigateProps {
  label: string;
  path: string;
}
const AdminSidebar = () => {
  const router = useRouter();
  const pathName = usePathname();
  const [activeButton, setActiveButton] = React.useState("");

  const AdminNavButtons = [
    {
      icon: <BriefcaseBusiness size={18} />,
      label: "Portfolio",
      path: "/admin/portfolio",
    },
    {
      icon: <Brain size={18} />,
      label: "Experience",
      path: "/admin/experience",
    },
    {
      icon: <MessageCircleQuestionMark size={18} />,
      label: "Inquiries",
      path: "/admin/inquiries",
    },
  ];

  useEffect(() => {
    const currentNav = AdminNavButtons.find((item) => item.path === pathName);
    if (currentNav) {
      setActiveButton(currentNav.label);
    } else {
      setActiveButton("");
    }
  }, [pathName]);

  const handleClick = ({ label, path }: navigateProps) => {
    setActiveButton(label);
    router.push(path);
  };
  return (
    <main>
      <div className="fixed left-0 items-start flex flex-col tracking-wide w-64 h-full bg-[#282627]">
        {AdminNavButtons.map((item) => (
          <button
            onClick={() => handleClick(item)}
            key={item.label}
            className={`flex items-center hover:font-black hover:text-lg text-base transition-all duration-300 ease-in-out cursor-pointer w-full px-[18px] py-4 gap-2 rounded ${
              activeButton === item.label
                ? "font-black bg-gray-200 text-black"
                : " text-white"
            }`}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </main>
  );
};

export default AdminSidebar;
