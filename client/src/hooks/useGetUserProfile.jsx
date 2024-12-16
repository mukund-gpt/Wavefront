import { setUserProfile } from "@/redux/authSlice";
import { baseUrl } from "@/utils/baseUrl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const useGetUserProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      const fetchUserProfile = async () => {
        try {
          const response = await fetch(`${baseUrl}/api/v1/user/profile/${id}`, {
            method: "GET",
            credentials: "include",
          });

          const data = await response.json();
          if (data.success) {
            dispatch(setUserProfile(data.user));
            //   console.log(data.user);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error(error);
          toast.error(error.message);
        }
      };
      fetchUserProfile();
    }
  }, [id]);
};

export default useGetUserProfile;
