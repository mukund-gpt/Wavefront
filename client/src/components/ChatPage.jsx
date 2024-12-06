import React, { useState } from "react";
import LeftSideBar from "./LeftSideBar";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@/redux/authSlice";
import useGetAllMessages from "@/hooks/useGetAllMessages";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "react-toastify";

const ChatPage = () => {
  const [text, setText] = useState("");
  const { user, suggestedUsers, selectedUser, chatsOfSelectedUser } =
    useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const handleSelectedUser = (user) => {
    dispatch(setSelectedUser(user));
    // console.log(user);
  };
  // console.log(chatsOfSelectedUser);

  const handleSendMessage = async () => {
    if (!text.trim()) return;
    // console.log(text);
    try {
      const res = await fetch(
        `${baseUrl}/api/v1/message/send/${selectedUser?._id}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: text }),
        }
      );
      if (res.ok) {
        const data = await res.json();
        // console.log(data);
        toast.info(data.message);
      } else {
        const err = await res.json();
        console.log(err);
        toast.error(err.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setText("");
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
                    src={user?.profilePic}
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
              src={selectedUser?.profilePic}
              className="w-10 h-10 rounded-full object-cover"
            />

            <span className="font-medium text-gray-700">
              {selectedUser?.username}
            </span>
          </div>
          <div>
            <div className="flex-1 overflow-y-auto">
              {chatsOfSelectedUser && chatsOfSelectedUser.length > 0 ? (
                chatsOfSelectedUser.map((chat) => {
                  return (
                    user && (
                      <div
                        key={chat?._id}
                        className={`chat ${
                          chat?.senderId === user._id
                            ? "chat-end"
                            : "chat-start"
                        }`}
                      >
                        <div className="chat-bubble chat-bubble-primary">
                          {chat.content}
                        </div>
                      </div>
                    )
                  );
                })
              ) : (
                <p>No chats available</p>
              )}
            </div>
            <div className="mt-4 flex bottom-0">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type your message..."
                className="input input-bordered w-full"
              />
              <button
                onClick={handleSendMessage}
                className="btn btn-circle btn-primary flex items-center justify-center"
                aria-label="Send Message"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
