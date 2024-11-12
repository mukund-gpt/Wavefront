import React, { useState } from "react";
import { FaRegHeart, FaCommentAlt, FaRegBookmark } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import CommentDialog from "./CommentDialog";

const Post = ({ post }) => {
  const [text, setText] = useState("");
  const [openComment, setOpenComment] = useState(false);
  const getComment = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else setText("");
  };
  return (
    <>
      <div className="my-6 w-full max-w-sm mx-auto">
        <div className="flex items-center justify-between bg-red-300">
          <div className="flex items-center gap-2">
            <div className="avatar flex items-center p-1 ">
              <div className="w-10 rounded-full">
                <img src={post.author.profilePic} />
              </div>
              <span className="mx-3 text-black">{post.author.username}</span>
            </div>
          </div>

          {/* dropdown */}
          <details className=" dropdown dropdown-end">
            <summary className="btn m-1 bg-transparent hover:bg-transparent border-none text-black">
              :
            </summary>
            <ul className="menu dropdown-content font-bold bg-white text-black rounded-box z-[1] w-40 p-2">
              <li>
                <a>Unfollow</a>
              </li>
              <li>
                <a>Add to favourite</a>
              </li>
              <li>
                <a>Cancel</a>
              </li>
            </ul>
          </details>
        </div>

        {/* POST */}
        <img
          className="py-2 rounded-sm w-full aspect-square object-cover"
          src={post.image}
          alt="post_image"
        />

        <div className="">
          <div className="flex items-center justify-between text-black">
            <div className="w-1/4 flex justify-between items-center">
              <FaRegHeart className="cursor-pointer size-6 " />
              <FaCommentAlt
                className="cursor-pointer size-6"
                onClick={() => setOpenComment(true)}
              />
              <IoIosSend className="cursor-pointer size-7" />
            </div>
            <FaRegBookmark className="cursor-pointer size-6" />
          </div>

          <div className="text-black">
            <div>5k likes</div>
            <div>
              <span className="font-bold mx-1">{post.author.username}</span>
              {post.caption}
            </div>
            <div className="text-gray-600 cursor-pointer ">
              <div onClick={() => setOpenComment(true)}>view all comment</div>

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
                  <span className="text-blue-500 font-semibold mx-1">Post</span>
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
