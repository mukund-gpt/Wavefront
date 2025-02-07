import React, { useState } from "react";
import {
  HomeIcon,
  LogoutIcon,
  NotificationIcon,
} from "@/assests/SVG/LeftSideBarIcons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import Notification from "./Notification";
import useLogout from "@/hooks/useLogout";

import plusIcon from "../assests/plusicon.png";
import chatIcon from "../assests/chaticon.png";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const sideBarItems = [
    { icon: <HomeIcon />, text: "Home" },
    { icon: <img src={chatIcon} className="h-7 w-7" />, text: "Messages" },
    { icon: <NotificationIcon />, text: "Notifications" },
    { icon: <img src={plusIcon} className="h-7 w-7" />, text: "Create Post" },
    {
      icon: (
        <div className="avatar flex items-center">
          <div className="w-10 rounded-full">
            <img src={user?.profilePic} alt="Profile" />
          </div>
        </div>
      ),
      text: "Profile",
    },
    { icon: <LogoutIcon />, text: "Logout" },
  ];

  const sideBarHandler = (textType) => {
    if (textType === "Logout") {
      logout();
    } else if (textType === "Create Post") {
      setOpen(true);
    } else if (textType === "Profile") {
      navigate(`/profile/${user?._id}`);
    } else if (textType === "Messages") {
      navigate("/chat");
    } else if (textType === "Home") {
      navigate("/");
    } else if (textType === "Notifications") {
      setOpenNotification(true);
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div className="hidden bg-primary h-full w-fit md:w-45 fixed top-0 left-0 z-10 sm:flex flex-col">
        <h1
          className="sm:mx-5 my-5 p-3 md:px-5 font-bold text-3xl text-orange-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <span className="block md:hidden">W</span>
          <span className="hidden md:block">Wavefront</span>
        </h1>
        <div className="flex-1 overflow-y-auto">
          {sideBarItems.map((item, index) => (
            <div
              className="flex items-center sm:mx-3 my-2 p-3 px-4 md:px-5 cursor-pointer rounded-3xl hover:bg-slate-200"
              key={index}
              onClick={() => sideBarHandler(item.text)}
            >
              <span className="flex items-center justify-center">
                {item.icon}
              </span>
              <span className="ml-4 text-secondary font-bold hidden md:block">
                {item.text}
              </span>
            </div>
          ))}
        </div>
      </div>
      <CreatePost open={open} setOpen={setOpen} />
      <Notification open={openNotification} setOpen={setOpenNotification} />
    </>
  );
};

export default LeftSideBar;
