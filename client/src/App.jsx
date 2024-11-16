import React from "react";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/Signup";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import ChatPage from "./components/ChatPage";

const App = () => {
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
