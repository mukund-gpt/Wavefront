import React from "react";
import { Outlet } from "react-router-dom";
import LeftSideBar from "@/components/LeftSideBar";
import BottomNav from "./BottomNav";
import TopNav from "./TopNav";

const Layout = () => {
  return (
    <div className="flex flex-row bg-primary">
      <div className="block sm:hidden absolute top-0 bg-primary w-full z-10">
        <TopNav />
      </div>
      {/* Persistent LeftSideBar */}
      <div className="md:w-1/6 h-full">
        <LeftSideBar />
      </div>

      {/* Dynamic route content */}
      <div className="w-4/6 ml-2/6 md:max-w-4/6 flex-grow">
        <Outlet />
      </div>
      <div className="block sm:hidden absolute bottom-0 bg-white w-full">
        <BottomNav />
      </div>
    </div>
  );
};

export default Layout;
