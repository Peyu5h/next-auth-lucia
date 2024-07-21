"use client";

import React, { useState, useEffect, useRef } from "react";
import { logout } from "@/app/(auth)/actions";

interface UserButtonProps {
  id: string;
  name: string;
  email: string | null;
  avatarUrl: string;
  googleId: string | null;
  githubId: string | null;
}

export const UserButton: React.FC<{ user: UserButtonProps }> = ({ user }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState<string>("left-0");

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (dropdownRef.current) {
      const rect = dropdownRef.current.getBoundingClientRect();
      if (rect.right > window.innerWidth) {
        setDropdownPosition("right-0");
      } else {
        setDropdownPosition("left-0");
      }
    }
  }, [showDropdown]);

  return (
    <div className="relative h-12 w-12 cursor-pointer">
      <img
        onClick={toggleDropdown}
        className="h-12 w-12 rounded-full hover:border"
        src={user.avatarUrl}
        alt={user.name}
      />
      {showDropdown && (
        <div
          ref={dropdownRef}
          className={`absolute top-16 ${dropdownPosition} w-40 bg-white rounded-lg shadow-lg transition-transform transform ${
            showDropdown ? "scale-100 opacity-100" : "scale-90 opacity-0"
          }`}
          style={{ transition: "all 0.3s ease" }}
        >
          <ul className="p-2">
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Profile</li>
            <li className="p-2 hover:bg-gray-100 cursor-pointer">Settings</li>
            <li
              onClick={()=> logout()}
              className="p-2 hover:bg-gray-100 cursor-pointer"
            >
              Logout
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
