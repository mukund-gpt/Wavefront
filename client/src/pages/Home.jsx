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
    <div className="h-[90vh]">
      <div className="flex flex-col max-h-[90vh] lg:flex-row">
        <div className="flex-grow w-full overflow-auto lg:w-4/6 px-4 py-2 max-h-[90vh] scrollbar-hide">
          <Posts />
        </div>

        <div className="hidden lg:flex w-2/6 max-h-[90vh] overflow-auto">
          <RightSideBar />
        </div>
      </div>
    </div>
  );
};

export default Home;
