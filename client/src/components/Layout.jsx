import React from "react";
import { Outlet } from "react-router-dom";
import LeftSideBar from "@/components/LeftSideBar";

const Layout = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Persistent LeftSideBar */}
      <div className="hidden md:block md:w-1/6 h-full bg-gray-100">
        <LeftSideBar />
      </div>

      {/* Dynamic route content */}
      <div className="w-full md:ml-1/6 md:max-w-5/6 flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
