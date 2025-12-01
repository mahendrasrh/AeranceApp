import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogOut, Menu, X, User } from "lucide-react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const username = localStorage.getItem("username") || "User";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("tenant_id");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#061728] via-[#0b2438] to-[#061728] py-4 shadow-lg">
      <div className="mx-auto px-6 text-white flex items-center justify-between">

        {/* LEFT - Title */}
        <h1 className="text-lg font-semibold tracking-wide whitespace-nowrap">
          Employee Data Portal
        </h1>

        {/* MOBILE MENU BUTTON */}
        <button 
          className="md:hidden p-2 text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-6">
          {/* <Link
            to="/form"
            className="px-5 py-2 rounded-full bg-[#0d273b] hover:bg-[#12344b] transition duration-300"
          >
            Employee Data
          </Link> */}

          <Link
            to="/employee-information"
            className="px-5 py-2 rounded-full bg-[#0d273b] hover:bg-[#12344b] transition duration-300"
          >
            Employee Information
          </Link>

          <Link
            to="/dashboard"
            className="px-5 py-2 rounded-full bg-[#0d273b] hover:bg-[#12344b] transition duration-300"
          >
            Payslip Generator
          </Link>
        </nav>

        {/* RIGHT - User + Logout */}
        <div className="hidden md:flex items-center gap-3">
          <span className="font-medium">{username}</span>

          <Tippy content="Logout">
            <button
              onClick={handleLogout}
              className="p-2 rounded-full hover:bg-[#12344b] transition duration-300"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </Tippy>
        </div>
      </div>

      {/* MOBILE NAV DROPDOWN */}
      {menuOpen && (
        <div className="md:hidden bg-[#0d273b] mt-2 px-6 py-4 rounded-lg space-y-3 text-white">

          <Link
            onClick={() => setMenuOpen(false)}
            to="/form"
            className="block px-4 py-2 bg-[#12344b] rounded-lg hover:bg-[#0f2f45] transition"
          >
            Form Data Page
          </Link>

          <Link
            onClick={() => setMenuOpen(false)}
            to="/display"
            className="block px-4 py-2 bg-[#12344b] rounded-lg hover:bg-[#0f2f45] transition"
          >
            Display Data Page
          </Link>

          <Link
            onClick={() => setMenuOpen(false)}
            to="/user-management"
            className="block px-4 py-2 bg-[#12344b] rounded-lg hover:bg-[#0f2f45] transition"
          >
            User Management
          </Link>

          <div className="flex items-center justify-between mt-4">
            <span className="font-medium">{username}</span>

            <Tippy content="Logout">
              <button
                onClick={handleLogout}
                className="p-2 rounded-full hover:bg-[#12344b] transition duration-300"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </Tippy>
          </div>
        </div>
      )}
    </header>
  );
}
