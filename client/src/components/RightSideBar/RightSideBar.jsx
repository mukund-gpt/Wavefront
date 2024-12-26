import React from "react";
import { useSelector } from "react-redux";
import SuggestedUsers from "./SuggestedUsers";

const RightSideBar = () => {
  const { user } = useSelector((store) => store.auth);

  return (
    <div className="flex justify-center items-start w-full">
      <div className="bg-white p-4 max-w-md rounded-lg">
        {/* User Profile Section */}
        <div className="flex items-center gap-3 mb-4">
          <div className="avatar flex items-center p-2">
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={user?.profilePic}
                alt="User Avatar"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
          <div>
            <span className="text-xl font-semibold text-black">
              {user?.username}
            </span>
            <br />
            {user?.bio && (
              <span className="text-sm text-gray-500">{user?.bio}</span>
            )}
          </div>
        </div>

        {/* Suggested Users Section */}
        <div>
          <SuggestedUsers />
        </div>
      </div>
    </div>
  );
};

export default RightSideBar;
