import { LogoutIcon, NotificationIcon } from "@/assests/SVG/LeftSideBarIcons";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import useLogout from "@/hooks/useLogout";

const TopNav = () => {
  const navigate = useNavigate();
  const logout = useLogout();

  const [open, setOpen] = useState(false);
  return (
    <div>
      <div className="flex flex-row py-4 justify-between">
        <span
          className="font-bold text-3xl ml-5 text-orange-500 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Wavefront
        </span>
        <div className="flex flex-row gap-4 mr-5">
          <span className="cursor-pointer" onClick={() => setOpen(true)}>
            <NotificationIcon />
          </span>
          <span className="cursor-pointer" onClick={() => logout()}>
            <LogoutIcon />
          </span>
        </div>
      </div>
      <Notification open={open} setOpen={setOpen} />
    </div>
  );
};

export default TopNav;
