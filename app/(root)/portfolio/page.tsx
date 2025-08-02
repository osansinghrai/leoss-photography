"use client";

import { Suspense } from "react";
import PortfolioPage from "./PortfolioPage";

import React from "react";

const page = () => {
  return (
    <Suspense fallback={<div className="text-center mt-10">Loading...</div>}>
      <PortfolioPage />
    </Suspense>
  );
};

export default page;
