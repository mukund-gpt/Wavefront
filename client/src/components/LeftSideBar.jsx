import React, { useState } from "react";
import {
  HomeIcon,
  LogoutIcon,
  MessagesIcon,
  NotificationIcon,
  PlusIcon,
} from "@/assests/SVG/LeftSideBarIcons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CreatePost from "./CreatePost";
import Notification from "./Notification";
import useLogout from "@/hooks/useLogout";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const [open, setOpen] = useState(false);
  const [openNotification, setOpenNotification] = useState(false);

  const { user } = useSelector((store) => store.auth);

  const sideBarItems = [
    { icon: <HomeIcon />, text: "Home" },
    { icon: <MessagesIcon />, text: "Messages" },
    { icon: <NotificationIcon />, text: "Notifications" },
    { icon: <PlusIcon />, text: "Create Post" },
    {
      icon: (
        <div className="avatar flex items-center p-1 ">
          <div className="w-10 rounded-full">
            <img src={user?.profilePic} />
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
      <div className="fixed top-0 z-10 left-0 bg-white h-full w-60">
        <div className="flex flex-col h-full">
          <h1 className="m-5 p-4 font-bold text-3xl text-orange-500 cursor-pointer">
            Wavefront
          </h1>
          <div className="flex-1 overflow-y-auto">
            {sideBarItems.map((item, index) => {
              return (
                <div
                  className="flex items-center mx-3 my-2 p-3 px-8 cursor-pointer rounded-3xl hover:bg-slate-200"
                  key={index}
                  onClick={() => sideBarHandler(item.text)}
                >
                  {item.icon}
                  <span className="ml-4">{item.text}</span>
                </div>
              );
            })}
          </div>
        </div>
        <CreatePost open={open} setOpen={setOpen} />
        <Notification open={openNotification} setOpen={setOpenNotification} />
      </div>
    </>
  );
};

export default LeftSideBar;
