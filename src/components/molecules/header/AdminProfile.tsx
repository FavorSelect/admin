"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { LogOut, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { useLogoutMutation } from "@/store/api/authApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { logout } from "@/store/slices/adminSlice";

const AdminProfile = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const dispatch = useDispatch();
  const router = useRouter();
  const [logoutApi] = useLogoutMutation();

  const adminInfo = useSelector((state: RootState) => state.admin.adminInfo);

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      setIsOpen(false);
      toast.success("You have been logged out.");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
      toast.error("Failed to logout. Please try again.");
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative text-sm cursor-pointer">
      {/* Profile Avatar */}
      <div
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="bg-gray-100 w-9 h-9 flex justify-center items-center rounded-full"
      >
        {adminInfo?.profileImage ? (
          <Image
            src={adminInfo.profileImage}
            alt="Admin Avatar"
            className="w-9 h-9 rounded-full object-cover"
            width={36}
            height={36}
          />
        ) : (
          <User className="w-5 h-5 text-gray-700" />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 z-50 bg-white border border-gray-200 rounded-lg shadow-lg">
          <li className="px-4 py-2 text-sm font-semibold text-gray-700 border-b border-gray-100">
            {adminInfo?.name}
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-4 py-2 text-red-600 hover:bg-gray-100 hover:text-red-700 text-sm"
            >
              <LogOut className="mr-2 w-4 h-4" />
              Logout
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default AdminProfile;
