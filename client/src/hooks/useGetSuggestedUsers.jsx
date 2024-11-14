import { setSuggestedUsers } from "@/redux/authSlice";
import { baseUrl } from "@/utils/baseUrl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/v1/user/suggested`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            // console.log(data.suggestedUsers);
            dispatch(setSuggestedUsers(data.suggestedUsers));
          }
        } else {
          console.log("Failed to fetch users:", res.statusText);
        }
      } catch (error) {
        console.log("Error fetching users:", error);
      }
    };
    fetchSuggestedUsers();
  }, []);
};
export default useGetSuggestedUsers;
