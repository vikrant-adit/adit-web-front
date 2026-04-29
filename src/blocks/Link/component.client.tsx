"use client";

import React from "react";
import Link from "next/link";

export interface LinkBlockProps {
  text?: string;
  url?: string;
  newTab?: boolean;
  variant?: "primary" | "secondary" | "link";
}

export default function LinkBlock({
  text = "Click  Here",
  url = "#",
  newTab = false,
  variant = "link",
}: Readonly<LinkBlockProps>) {
  const baseStyle = "inline-flex items-center font-medium transition";

  const variants = {
    primary: "bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700",
    secondary:
      "bg-gray-200 text-gray-900 px-5 py-2 rounded-lg hover:bg-gray-300",
    link: "text-blue-600 hover:underline",
  };

  return (
    <Link
      href={url}
      target={newTab ? "_blank" : "_self"}
      className={`${baseStyle} ${variants[variant]}`}
    >
      {text}
    </Link>
  );
}