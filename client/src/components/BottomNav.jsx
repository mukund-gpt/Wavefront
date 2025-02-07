import { HomeIcon } from "@/assests/SVG/LeftSideBarIcons";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import plusIcon from "../assests/plusicon.png";
import chatIcon from "../assests/chaticon.png";
import CreatePost from "./CreatePost";

const BottomNav = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);

  const [open, setOpen] = useState(false);

  return (
    <div>
      <div className="flex flex-row justify-around items-center py-2">
        <span className="cursor-pointer" onClick={() => navigate("/")}>
          <HomeIcon />
        </span>

        <img
          src={plusIcon}
          className="h-7 w-7 cursor-pointer"
          onClick={() => setOpen(true)}
        />
        <img
          src={chatIcon}
          className="h-7 w-7 cursor-pointer"
          onClick={() => navigate("/chat")}
        />
        <div
          className="avatar flex items-center cursor-pointer"
          onClick={() => navigate(`/profile/${user?._id}`)}
        >
          <div className="w-10 rounded-full">
            <img src={user?.profilePic} alt="Profile" />
          </div>
        </div>
        <CreatePost open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default BottomNav;
