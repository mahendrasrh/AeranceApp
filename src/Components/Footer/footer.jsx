import React from "react";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#061728] via-[#0b2438] to-[#061728] text-gray-300 py-4">
      <div className="max-w-6xl mx-auto text-center px-6">
        <p className="text-sm">
          © {new Date().getFullYear()} Student Data Management • All Rights Reserved
        </p>
      </div>
    </footer>
  );
}
