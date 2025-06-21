import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@/redux/authSlice";
import ChatSection from "./ChatSection";

const ChatPage = () => {
  const { onlineUsers } = useSelector((store) => store.chat);
  const { suggestedUsers } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [showChat, setShowChat] = useState(false);

  const handleSelectedUser = (user) => {
    dispatch(setSelectedUser(user));
    setShowChat(true);
  };

  return (
    <div className="w-full pt-10 sm:pt-0 flex h-[85vh] justify-center items-center">
      <div className="flex-1 flex sm:justify-end h-full">
        {/* Friends List */}
        <div
          className={`w-full sm:w-4/5 bg-white p-4 sm:py-6 sm:block h-full ${
            showChat ? "hidden sm:block" : ""
          }`}
        >
          <h2 className="text-lg font-bold p-4 text-center">Friends</h2>
          <div className="menu bg-base-100 w-full rounded-box h-full overflow-auto">
            <div>
              {suggestedUsers?.map((user) => {
                const isOnline = onlineUsers.includes(user?._id);
                return (
                  <div
                    key={user?._id}
                    onClick={() => handleSelectedUser(user)}
                    className="flex items-center gap-4 p-2 border-b border-gray-200 hover:bg-gray-100 rounded-lg cursor-pointer"
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

        {/* Chat Section */}
        <div
          className={`w-full sm:block relative flex justify-center items-center h-full ${
            showChat ? "" : "hidden sm:block"
          }`}
        >
          <ChatSection setShowChat={setShowChat} />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
