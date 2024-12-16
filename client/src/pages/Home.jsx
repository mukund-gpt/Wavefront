import Feed from "@/components/Feed";
import LeftSideBar from "@/components/LeftSideBar";
import RightSideBar from "@/components/RightSideBar";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  if (!user) {
    navigate("/login");
  }
  useGetUserProfile();
  useGetAllPost();
  useGetSuggestedUsers();
  return (
    <>
      <div className="flex">
        <div className=" md:flex sm:w-2/6 md:w-1/6">
          <LeftSideBar />
        </div>

        <div className="flex-grow sm:w-4/6 md:w-3/6">
          <Feed />
        </div>

        <div className="hidden lg:flex md:w-2/6">
          <RightSideBar />
        </div>
      </div>
    </>
  );
};

export default Home;
