import React from "react";

const Footer = () => {
  return (
    <div className=" absolute bottom-0 left-0 right-0 pb-[20px] flex justify-center items-center border-black text-gray-300 font-extrabold translate-x-4">
      <p>
        © {new Date().getFullYear()} Leoss photography. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
