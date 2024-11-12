import React, { useState } from "react";
import {
  ExploreIcon,
  HomeIcon,
  LogoutIcon,
  MessagesIcon,
  NotificationIcon,
  PlusIcon,
  SearchIcon,
  WavesIcon,
} from "@/assests/SVG/LeftSideBarIcons";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import CreatePost from "./CreatePost";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);

  const { user } = useSelector((store) => store.auth);
  const sideBarItems = [
    { icon: <HomeIcon />, text: "Home" },
    { icon: <SearchIcon />, text: "Search" },
    { icon: <ExploreIcon />, text: "Explore" },
    { icon: <WavesIcon />, text: "Waves" },
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

  const logoutHandler = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/v1/user/logout`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      toast.success(data.message);
      dispatch(setAuthUser(null));
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const sideBarHandler = (textType) => {
    if (textType === "Logout") {
      logoutHandler();
    } else if (textType === "Create Post") {
      setOpen(true);
    }
  };
  return (
    <>
      <div className="fixed top-0 z-10 left-0 bg-white h-full w-60">
        <div className="flex flex-col">
          <h1 className="m-5 p-4 font-bold text-3xl text-orange-500">
            Wavefront
          </h1>
          <div className="">
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
      </div>
    </>
  );
};

export default LeftSideBar;
