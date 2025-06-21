import React, { useEffect, Suspense, lazy } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { io } from "socket.io-client";
import { baseUrl } from "./utils/baseUrl";
import { setSocket } from "./redux/socketSlice";
import { setOnlineUsers } from "./redux/chatSlice";
import { setLikeNotification } from "./redux/rtnSlice";
import { FaSpinner } from "react-icons/fa";

// Lazy-loaded components
const SignUp = lazy(() => import("./components/auth/Signup"));
const Login = lazy(() => import("./components/auth/Login"));
const ForgetPassword = lazy(() => import("./components/auth/ForgetPassword"));
const ResetPassword = lazy(() => import("./components/auth/ResetPassword"));

const Layout = lazy(() => import("./components/Layout"));
const Home = lazy(() => import("./components/Home"));
const Profile = lazy(() => import("./components/Profile/Profile"));
const EditProfile = lazy(() => import("./components/Profile/EditProfile"));
const ChatPage = lazy(() => import("./components/Message/ChatPage"));

const App = () => {
  const dispatch = useDispatch();

  const { user } = useSelector((store) => store.auth);
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
    <Suspense
      fallback={
        <div className="flex justify-center items-center h-screen w-full bg-white z-50">
          <FaSpinner className="text-blue-500 text-5xl animate-spin" />
        </div>
      }
    >
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
    </Suspense>
  );
};

export default App;
