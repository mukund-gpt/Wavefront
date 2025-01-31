import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import useFollowUnfollow from "@/hooks/useFollowOrUnfollow";

const SuggestedUsers = () => {
  const navigate = useNavigate();
  const { suggestedUsers } = useSelector((store) => store.auth);
  const { isFollowing, handleFollowUnfollow } = useFollowUnfollow();

  const navigateToProfile = (id) => navigate(`/profile/${id}`);

  return (
    <div className="w-full pt-4">
      <div className="text-base text-center font-bold">Suggested Users</div>

      <div className="mt-2 space-y-4">
        {suggestedUsers?.map((user) => (
          <div
            key={user._id}
            className="flex items-center p-2 bg-white rounded shadow-sm w-full"
          >
            <div className="w-12 h-12 rounded-full overflow-hidden">
              <img
                src={user?.profilePic}
                onClick={() => navigateToProfile(user?._id)}
                alt={`${user?.username}'s avatar`}
                className="object-cover w-full h-full cursor-pointer"
              />
            </div>
            <div className="ml-3">
              <div className="flex items-center gap-2">
                <span
                  onClick={() => navigateToProfile(user?._id)}
                  className="text-base font-semibold text-black cursor-pointer"
                >
                  {user?.username}
                </span>
                <button
                  onClick={() => handleFollowUnfollow(user)}
                  className={`text-sm font-bold ${
                    isFollowing(user)
                      ? "text-red-500 hover:text-red-700"
                      : "text-blue-500 hover:text-blue-700"
                  } cursor-pointer`}
                >
                  {isFollowing(user) ? "Unfollow" : "Follow"}
                </button>
              </div>
              {user?.bio && (
                <div className="text-sm text-gray-500">{user?.bio}</div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SuggestedUsers;
