import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const SuggestedUsers = () => {
  const navigate = useNavigate();
  const { suggestedUsers } = useSelector((store) => store.auth);

  const handleFollowUnfollow = () => {
    alert("follow click");
  };

  const navigateToProfile = (id) => {
    navigate(`/profile/${id}`);
  };

  return (
    <div className="w-full p-4 bg-gray-100 rounded-lg shadow-md">
      <div className="text-base text-center font-bold">Suggested Users</div>

      <div className="mt-4 space-y-4">
        {suggestedUsers?.map((user) => (
          <div
            key={user._id}
            className="flex items-center p-3 bg-white rounded-lg shadow-sm w-full"
          >
            <div className="w-12 h-12 avatar rounded-full overflow-hidden">
              <img
                src={user?.profilePic}
                onClick={() => navigateToProfile(user?._id)}
                alt="User Avatar"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="ml-3">
              <div className="flex items-center gap-2">
                <span
                  onClick={() => navigateToProfile(user?._id)}
                  className="text-base font-semibold text-black"
                >
                  {user?.username}
                </span>
                {/* Follow Button */}
                <button
                  onClick={handleFollowUnfollow}
                  className="text-sm font-bold text-blue-500 hover:text-blue-700 cursor-pointer"
                >
                  Follow
                </button>
              </div>
              <h1>bio here</h1>
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
