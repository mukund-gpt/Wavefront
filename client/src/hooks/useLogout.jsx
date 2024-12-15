import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  setAuthUser,
  setSelectedUser,
  setSuggestedUsers,
  setUserProfile,
} from "@/redux/authSlice";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import { toast } from "react-toastify";
import { baseUrl } from "@/utils/baseUrl";

const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/v1/user/logout`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await res.json();
      toast.success(data.message);

      // Clear user-related state
      dispatch(setAuthUser(null));
      dispatch(setPosts([]));
      dispatch(setSelectedPost(null));
      dispatch(setSuggestedUsers([]));
      dispatch(setUserProfile(null));
      dispatch(setSelectedUser(null));

      // Navigate to login page
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return logout;
};

export default useLogout;
