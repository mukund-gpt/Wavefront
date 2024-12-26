import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@/redux/authSlice";
import ChatSection from "./ChatSection";

const ChatPage = () => {
  const { onlineUsers } = useSelector((store) => store.chat);
  const { suggestedUsers } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleSelectedUser = (user) => {
    dispatch(setSelectedUser(user));
    // console.log(user);
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, []);

  return (
    <div className="w-full flex h-[90vh]">
      {/* Main Content */}
      <div className="flex-1 flex justify-center">
        {/* Suggested Users Section */}
        <div className="md:w-2/5 sm:w-2/5 bg-white m-4 p-4 hidden sm:block">
          <h2 className="text-lg font-bold mb-4 text-center">Friends</h2>
          <div className="menu bg-base-100 w-full rounded-box">
            <div>
              {suggestedUsers?.map((user) => {
                const isOnline = onlineUsers.includes(user?._id);
                return (
                  <div
                    key={user?._id}
                    onClick={() => handleSelectedUser(user)}
                    className="flex items-center gap-4 p-2 border-b border-gray-200 hover:bg-gray-100 rounded-lg"
                  >
                    <img
                      src={user?.profilePic}
                      alt={`${user?.username}'s profile`}
                      className="w-10 h-10 rounded-full object-cover"
                    />

                    <div className="flex-1">
                      <span className="font-medium text-gray-700">
                        {user?.username}
                      </span>
                      <div
                        className={`text-sm ${
                          isOnline ? "text-green-500" : "text-gray-500"
                        }`}
                      >
                        {isOnline ? "Online" : "Offline"}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <ChatSection />
      </div>
    </div>
  );
};

export default ChatPage;
