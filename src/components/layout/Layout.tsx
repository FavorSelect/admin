"use client";
import React from "react";
import {
  toggleAppSlidebar,
  toggleMobileMenu,
  setMobileMenuOpen,
} from "@/store/slices/toggleSidebarSlice";
import { RootState } from "@/store/store";
import Sidebar from "@/components/organisms/sidebar/Sidebar";
import Header from "@/components/organisms/header/Header";
import { useAppDispatch, useAppSelector } from "@/store/hook";

function Layout({ children }: { children: React.ReactNode }) {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state: RootState) => state.toggleSidebar.isOpen
  );
  const isMobileMenuOpen = useAppSelector(
    (state: RootState) => state.toggleSidebar.isMobileMenuOpen
  );

  const handleToggleAppSlidebar = () => {
    dispatch(toggleAppSlidebar());
  };

  const handleHamburgerClick = () => {
    dispatch(toggleMobileMenu());
  };

  return (
    <div className="flex flex-col md:flex-row w-full">
      <Sidebar
        toggleAppSlidebar={handleToggleAppSlidebar}
        isOpen={isOpen}
        isMobileMenuOpen={isMobileMenuOpen}
        handleHamburgerClick={handleHamburgerClick}
        setIsMobileMenuOpen={(value) => dispatch(setMobileMenuOpen(value))}
      />
      <div
        className={`flex-1 flex flex-col space-y-0 md:space-y-5 transition-all duration-300 w-full h-screen ${
          isOpen ? "lg:pl-56" : "lg:pl-20"
        }`}
      >
        <div className="flex flex-col h-full">
          <Header />
          <main className="flex-grow overflow-y-auto rounded-md space-y-5 px-4 py-2.5">
            <div>{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
