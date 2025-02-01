import React from "react";
import { Outlet } from "react-router-dom";
import LeftSideBar from "@/components/LeftSideBar";

const Layout = () => {
  return (
    <div className="flex flex-row bg-primary">
      {/* Persistent LeftSideBar */}
      <div className="w-1/6 md:w-1/6 h-full">
        <LeftSideBar />
      </div>

      {/* Dynamic route content */}
      <div className="w-4/6 ml-2/6 md:max-w-4/6 flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
