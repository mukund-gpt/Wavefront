import Posts from "@/components/Posts/Posts";
import RightSideBar from "@/components/RightSideBar/RightSideBar";
import useGetAllPost from "@/hooks/useGetAllPost";
import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  useGetUserProfile();
  useGetAllPost();
  useGetSuggestedUsers();

  return (
    <div className="h-[100vh] ">
      <div className="flex flex-col lg:flex-row max-h-[95vh]">
        <div className="flex-grow w-full overflow-auto px-2 md:px-4 py-2 scrollbar-hide lg:flex-[3] min-h-0">
          <Posts />
        </div>

        <div className="hidden lg:flex lg:flex-[2] overflow-auto min-h-0">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default Home;
