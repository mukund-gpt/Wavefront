import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "@/utils/baseUrl";
import { setUserProfile } from "@/redux/authSlice";

const BookmarkIcon = ({ post }) => {
  const bookmarks = useSelector((state) => state.auth.userProfile?.bookmarks);
  const { userProfile } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const isBookmarked = (post) => {
    return bookmarks?.some((bookmark) => bookmark?._id === post?._id);
  };

  const bookmarkHandler = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/v1/post/${post?._id}/bookmark`, {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        console.log(data);
        const updatedBookmarks = isBookmarked(post)
          ? bookmarks.filter((bookmark) => bookmark._id !== post._id)
          : [...bookmarks, post];

        const updatedUserProfile = {
          ...userProfile,
          bookmarks: updatedBookmarks,
        };
        dispatch(setUserProfile(updatedUserProfile));

        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div onClick={bookmarkHandler} className="cursor-pointer text-lg">
      {isBookmarked(post) ? (
        <FaBookmark className="text-blue-500" />
      ) : (
        <FaRegBookmark />
      )}
    </div>
  );
};

export default BookmarkIcon;
