import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useGetUserProfile from "@/hooks/useGetUserProfile";
import { setSelectedUser } from "@/redux/authSlice";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userProfile, user } = useSelector((store) => store.auth);

  const [activeTab, setActiveTab] = useState("posts");
  const displayedPosts =
    activeTab === "posts" ? userProfile?.posts : userProfile?.bookmarks;
  const isFollowing =
    user.following.some((id) => id === userProfile?._id) || false;
  // console.log(isFollowing);

  // Handle Follow/Unfollow button click
  const handleFollowClick = () => {
    alert("Follow/Unfollow action triggered!");
  };

  const handleSendMessage = () => {
    dispatch(setSelectedUser(userProfile));
    navigate("/chat");
  };

  useGetUserProfile();

  return (
    <div className="ml-1/6 min-h-screen min-w-[350px]">
      <div className="w-full sm:w-5/6 mx-auto bg-white p-2 sm:p-4 sm:pt-8">
        {/* Profile Header */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-24 h-24 rounded-full overflow-hidden">
            <img
              src={userProfile?.profilePic}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <div className="text-2xl font-semibold flex items-center gap-2">
              {userProfile?.username}
              {user?._id === userProfile?._id ? (
                <Link
                  to="/profile/edit"
                  className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  Edit Profile
                </Link>
              ) : (
                <>
                  {!isFollowing ? (
                    <button
                      onClick={handleFollowClick}
                      className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
                    >
                      Follow
                    </button>
                  ) : (
                    <button
                      onClick={handleFollowClick}
                      className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
                    >
                      Unfollow
                    </button>
                  )}
                  <button
                    onClick={handleSendMessage}
                    className="text-sm text-blue-500 hover:text-blue-700 cursor-pointer"
                  >
                    Message
                  </button>
                </>
              )}
            </div>

            <div className="text-sm text-gray-500">{userProfile?.bio}</div>
          </div>
        </div>
        {/* Profile Tabs */}
        <div className="flex gap-4 mb-6">
          <button className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-blue-500">
            {userProfile?.posts?.length}
            <span className="ml-0.5">Posts</span>
          </button>
          <button className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-blue-500">
            {userProfile?.followers?.length}{" "}
            <span className="ml-0.5">Followers</span>
          </button>
          <button className="text-xs sm:text-sm font-semibold text-gray-700 hover:text-blue-500">
            {userProfile?.following?.length}{" "}
            <span className="ml-0.5">Following</span>
          </button>
        </div>
        {/* Posts Section */}
        <div className="flex justify-center gap-4 border-b pb-2">
          <span
            className={`cursor-pointer font-medium ${
              activeTab === "posts"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-700 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("posts")}
          >
            Posts
          </span>
          <span
            className={`cursor-pointer font-medium ${
              activeTab === "bookmarks"
                ? "text-blue-500 border-b-2 border-blue-500"
                : "text-gray-700 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab("bookmarks")}
          >
            Bookmarks
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {displayedPosts?.map((post) => (
            <div key={post?._id} className="relative group">
              <img
                src={post?.image}
                alt="Post"
                className="w-full h-full object-cover rounded-lg"
              />
              {/* Overlay with comments and likes, visible only on hover */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex space-x-4">
                  <div className="flex items-center space-x-1">
                    <span>👍</span>
                    <span>{post?.likes.length}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span>💬</span>
                    <span>{post?.comments.length}</span>
                  </div>
                </div>
              </div>
              <div className="absolute bottom-0 bg-gradient-to-t from-black text-white p-2 w-full text-sm">
                {post?.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
