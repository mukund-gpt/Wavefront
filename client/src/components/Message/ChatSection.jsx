import useGetAllMessages from "@/hooks/useGetAllMessages";
import useGetRTM from "@/hooks/useGetRTM";
import { setMessages } from "@/redux/chatSlice";
import { baseUrl } from "@/utils/baseUrl";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const ChatSection = () => {
  useGetAllMessages();
  useGetRTM();
  const { messages: chatsOfSelectedUser } = useSelector((store) => store.chat);
  const { user, selectedUser } = useSelector((store) => store.auth);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);
  const dispatch = useDispatch();

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
        console.log(data);
        // console.log(chatsOfSelectedUser);
        // console.log(text);
        dispatch(setMessages([...chatsOfSelectedUser, data.newMessage]));
        toast.info(data.message);
      } else {
        const err = await res.json();
        console.log(err);
        toast.error(err.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setText("");
    }
  };

  useEffect(() => {
    // Scroll to the bottom whenever new chats are available or messages are updated
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatsOfSelectedUser]); // Dependency array ensures it runs when chats change

  return (
    <div className="w-4/5 sm:w-3/5 md:w-2/5 bg-white p-4 sm:p-6 flex flex-col h-full">
      {selectedUser ? (
        <>
          {/* User Header */}
          <div className="flex items-center gap-4 p-2 border-b border-gray-200 hover:bg-gray-100 rounded-lg">
            <img
              src={selectedUser?.profilePic}
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="font-medium text-gray-700">
              {selectedUser?.username}
            </span>
          </div>

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
            {chatsOfSelectedUser && chatsOfSelectedUser.length > 0 ? (
              chatsOfSelectedUser.map(
                (chat) =>
                  user && (
                    <div
                      key={chat?._id}
                      className={`chat ${
                        chat?.senderId === user._id ? "chat-end" : "chat-start"
                      }`}
                    >
                      <div className="chat-bubble chat-bubble-primary">
                        {chat.content}
                      </div>
                    </div>
                  )
              )
            ) : (
              <div className="w-full h-full flex items-center justify-center text-lg">
                No chats available
              </div>
            )}

            {/* Scroll to the bottom */}
            <div ref={bottomRef} />
          </div>

          {/* Input Section */}
          <div className="mt-4 flex">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Type your message..."
              className="input input-bordered w-full"
            />
            <button
              onClick={handleSendMessage}
              className="btn btn-circle btn-primary flex items-center justify-center ml-2"
              aria-label="Send Message"
            >
              Send
            </button>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex items-center justify-center text-lg">
          No Chats Selected
        </div>
      )}
    </div>
  );
};

export default ChatSection;
