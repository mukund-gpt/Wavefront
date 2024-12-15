import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ChatPage from "./components/ChatPage";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { baseUrl } from "./utils/baseUrl";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/chatSlice";
import { setLikeNotification } from "./redux/rtnSlice";

const App = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { socket } = useSelector((store) => store.socketio);
  useEffect(() => {
    if (user) {
      const socketio = io(`${baseUrl}`, {
        query: {
          userId: user?._id,
        },
        transports: ["websocket"],
      });
      console.log(socketio);

      dispatch(setSocket(socketio));

      //Listen all the events
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on("notification", (notification) => {
        dispatch(setLikeNotification(notification));
      });

      return () => {
        socketio.off("getOnlineUsers");
        socketio.off("notification");
        socketio.close();
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);

  return (
    <>
      <Routes>
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/edit" element={<EditProfile />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
};

export default App;
