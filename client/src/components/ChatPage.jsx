import React from "react";
import LeftSideBar from "./LeftSideBar";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@/redux/authSlice";
import useGetAllMessages from "@/hooks/useGetAllMessages";

const ChatPage = () => {
  const { suggestedUsers, selectedUser } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const handleSelectedUser = (user) => {
    dispatch(setSelectedUser(user));

    // console.log(user);
  };
  useGetAllMessages({ chatUserId: selectedUser?._id });
  return (
    <div className="flex h-screen w-full bg-gray-100">
      <div className="w-1/5 bg-white shadow-lg hidden md:block">
        <LeftSideBar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex justify-center">
        {/* Suggested Users Section */}
        <div className="md:w-2/5 sm:w-2/5 bg-white shadow-md rounded-lg m-4 p-4 hidden sm:block">
          <h2 className="text-lg font-bold mb-4 text-center">Friends</h2>
          <div className="menu bg-base-100 w-full rounded-box">
            <div>
              {suggestedUsers?.map((user) => (
                <div
                  key={user?._id}
                  onClick={() => handleSelectedUser(user)}
                  className="flex items-center gap-4 p-2 border-b border-gray-200 hover:bg-gray-100 rounded-lg"
                >
                  <img
                    src={user?.image}
                    className="w-10 h-10 rounded-full object-cover"
                  />

                  <span className="font-medium text-gray-700">
                    {user?.username}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Chat Section */}
        <div className="w-4/5 sm:w-3/5 md:w-2/5 bg-white shadow-md rounded-lg m-4 p-4 flex flex-col">
          <div className="flex items-center gap-4 p-2 border-b border-gray-200 hover:bg-gray-100 rounded-lg">
            <img
              src={selectedUser?.image}
              className="w-10 h-10 rounded-full object-cover"
            />
            {/* {console.log(selectedUser)} */}

            <span className="font-medium text-gray-700">
              {selectedUser?.username}
            </span>
          </div>
          <div className="flex-1 overflow-y-auto">
            <div className="chat chat-start">
              <div className="chat-bubble chat-bubble-primary">Hi there!</div>
            </div>
            <div className="chat chat-end">
              <div className="chat-bubble chat-bubble-secondary">
                Hello! How are you?
              </div>
            </div>
          </div>
          <div className="mt-4">
            <input
              type="text"
              placeholder="Type your message..."
              className="input input-bordered w-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
