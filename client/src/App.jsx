import React, { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Profile/EditProfile";
import ChatPage from "./components/Message/ChatPage";
import Layout from "./components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { baseUrl } from "./utils/baseUrl";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/chatSlice";
import { setLikeNotification } from "./redux/rtnSlice";
import ForgetPassword from "./components/ForgetPassword";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const { socket } = useSelector((store) => store.socketio);

  useEffect(() => {
    if (user) {
      const socketio = io(`${baseUrl}`, {
        query: { userId: user?._id },
        transports: ["websocket"],
      });
      console.log(socketio);

      // dispatch(setSocket(socketio));

      // Listen for socket events
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      socketio.on("notification", (notification) => {
        dispatch(setLikeNotification(notification));
      });

      // Cleanup on unmount or user logout
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
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/forget-password"
        element={!user ? <ForgetPassword /> : <Navigate to="/" />}
      />
      <Route
        path="/reset-password/:token"
        element={!user ? <ResetPassword /> : <Navigate to="/" />}
      />

      {/* Protected Routes (wrapped in Layout) */}
      <Route
        path="/"
        element={user ? <Layout /> : <Navigate to="/login" replace />}
      >
        <Route index element={<Home />} />
        <Route path="profile/edit" element={<EditProfile />} />
        <Route path="profile/:id" element={<Profile />} />
        <Route path="chat" element={<ChatPage />} />
      </Route>

      <Route
        path="*"
        element={<Navigate to={user ? "/" : "/login"} replace />}
      />
    </Routes>
  );
};

export default App;
