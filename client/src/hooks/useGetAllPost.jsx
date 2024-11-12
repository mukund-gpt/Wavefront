import { setPosts } from "@/redux/postSlice";
import { baseUrl } from "@/utils/baseUrl";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useGetAllPost = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/v1/post/all`, {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.success) {
            console.log(data.posts);
            dispatch(setPosts(data.posts));
          }
        } else {
          console.log("Failed to fetch posts:", res.statusText);
        }
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };
    fetchAllPost();
  }, []);
};
export default useGetAllPost;
