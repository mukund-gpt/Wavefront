import { useDispatch, useSelector } from "react-redux";
import { setUserProfile } from "@/redux/authSlice";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "react-toastify";

const useFollowOrUnfollow = () => {
  const dispatch = useDispatch();
  const { userProfile } = useSelector((store) => store.auth);
  const { following = [] } = userProfile || {}; // Default to an empty array

  const isFollowing = (user) => following?.some((f) => f._id === user?._id);

  const handleFollowUnfollow = async (user) => {
    try {
      const res = await fetch(
        `${baseUrl}/api/v1/user/followOrUnfollow/${user?._id}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );

      if (!res.ok) {
        let errorMessage = "Failed to update follow status.";
        throw new Error(errorMessage);
      }

      const data = await res.json();

      const updatedFollowing = isFollowing(user)
        ? following.filter((f) => f._id !== user._id) // Unfollow
        : [
            ...following,
            {
              _id: user._id,
              username: user.username,
              profilePic: user.profilePic,
            },
          ]; // Follow

      dispatch(
        setUserProfile({
          ...userProfile,
          following: updatedFollowing,
        })
      );

      toast.info(data.message);
    } catch (error) {
      console.error("Follow/Unfollow error:", error);
      toast.error(error.message || "Something went wrong. Please try again.");
    }
  };

  return { isFollowing, handleFollowUnfollow };
};

export default useFollowOrUnfollow;
