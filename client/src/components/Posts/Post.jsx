import React, { useState } from "react";
import { IoIosSend } from "react-icons/io";
import CommentDialog from "./CommentDialog";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { baseUrl } from "@/utils/baseUrl";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import BookmarkIcon from "./BookmarkIcon";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import FillHeart from "@/assests/SVG/FillHeart";
import Heart from "@/assests/SVG/Heart";
import { CiMenuKebab } from "react-icons/ci";

const Post = ({ post }) => {
  const { user } = useSelector((store) => store.auth);
  const { posts } = useSelector((store) => store.post);

  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const [liked, setLiked] = useState(post?.likes.includes(user?._id) || false);
  const [postLikeCount, setPostLikeCount] = useState(post?.likes.length);
  const [comment, setComment] = useState(post?.comments);
  const getComment = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else setText("");
  };
  const likeOrDislikeHandler = async () => {
    const action = liked ? "dislike" : "like";
    try {
      const res = await fetch(`${baseUrl}/api/v1/post/${post?._id}/${action}`, {
        method: "PATCH",
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        const updatedLiked = liked ? postLikeCount - 1 : postLikeCount + 1;
        setLiked(!liked);
        setPostLikeCount(updatedLiked);

        //update in redux
        const updatedPostData = posts.map((p) =>
          p?._id === post?._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user?._id)
                  : [...p.likes, user?._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.info(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/v1/post/${post._id}/comment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ text }),
      });
      const data = await res.json();
      if (data.success) {
        setText("");
        console.log(data);
        const updatedCommentData = [...comment, data.comment];
        setComment(updatedCommentData);

        //update in redux
        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                comments: updatedCommentData,
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.info(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await fetch(`${baseUrl}/api/v1/post/${post?._id}/delete`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();
      if (data.success) {
        const updatedPost = posts.filter(
          (postItem) => postItem._id !== post._id
        );
        dispatch(setPosts(updatedPost));
        toast.success(data.message);
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <>
      <div className="my-6 w-full max-w-sm mx-auto">
        <div className="flex items-center justify-between bg-primary">
          <div className="flex items-center gap-2">
            <div className="avatar flex items-center p-1 ">
              <div className="w-10 rounded-full">
                <img src={post?.author?.profilePic} />
              </div>
              <span className="mx-3 text-secondary font-bold">
                {post?.author?.username}
              </span>
              {user?._id === post?.author?._id && (
                <span className="badge">Author</span>
              )}
            </div>
          </div>

          {/* dropdown */}
          {user?._id === post?.author?._id && (
            <details className=" dropdown dropdown-end">
              <summary className="btn p-2 bg-transparent hover:bg-transparent border-none text-black">
                <CiMenuKebab className="h-5 w-5" />
              </summary>
              <ul className="p-0 menu dropdown-content font-bold bg-white text-black rounded-box z-[1] w-40">
                <li
                  className="text-red bg-red-400 rounded-md"
                  onClick={deletePostHandler}
                >
                  <a>Delete</a>
                </li>
              </ul>
            </details>
          )}
        </div>

        {/* POST */}
        <img
          className="w-full aspect-square object-cover"
          src={post?.image}
          alt="post_image"
        />

        <div className="">
          <div className="flex items-center justify-between text-black">
            <div className="w-1/4 flex justify-between items-center">
              <div
                onClick={likeOrDislikeHandler}
                className="w-7 h-7 cursor-pointer"
              >
                {liked ? <FillHeart /> : <Heart />}
              </div>
              <IoChatbubbleEllipsesOutline
                className="cursor-pointer size-7"
                onClick={() => {
                  dispatch(setSelectedPost(post)), setOpenComment(!openComment);
                }}
              />
              <IoIosSend className="cursor-pointer size-7" />
            </div>

            <BookmarkIcon post={post} />
          </div>

          <div className="text-black">
            <div>{postLikeCount} likes</div>
            <div>
              <span className="font-bold mx-1">{post?.author.username}</span>
              {post?.caption}
            </div>
            <div className="text-gray-600 cursor-pointer ">
              {comment?.length > 0 && (
                <div
                  onClick={() => {
                    dispatch(setSelectedPost(post)),
                      setOpenComment(!openComment);
                  }}
                >
                  view {comment.length} comments
                </div>
              )}

              <CommentDialog
                openComment={openComment}
                setOpenComment={setOpenComment}
              />

              <div className="flex items-center justify-between">
                <input
                  type="text"
                  value={text}
                  className="outline-none bg-white w-full"
                  placeholder="Add a comment"
                  onChange={getComment}
                />
                {text && (
                  <span
                    onClick={commentHandler}
                    className="text-blue-500 font-semibold mx-1"
                  >
                    Post
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
