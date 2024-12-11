"use client";
import React, { useState } from "react";
import "../css/homepage.css";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavigation = (path) => {
    router.push(path);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Users", path: "/user-table" },
  ];

  return (
    <div className="header">
      <div className="logo" onClick={() => handleNavigation("/")}>
        Orca Lean
      </div>
      <div
        className={`hamburger ${menuOpen ? "active" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        &#9776;
      </div>
      <div className={`navbar ${menuOpen ? "active" : ""}`}>
        <nav>
          <ul>
            {navLinks.map((link, index) => (
              <li
                key={index}
                onClick={() => handleNavigation(link.path)}
                style={{ cursor: "pointer" }}
              >
                {link.name}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
