import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "react-toastify";
import { setPosts } from "@/redux/postSlice";

const CommentDialog = ({ openComment, setOpenComment }) => {
  const { selectedPost, posts } = useSelector((store) => store.post);

  const dispatch = useDispatch();
  const commentsEndRef = useRef(null);

  const [text, setText] = useState("");
  const [comment, setComment] = useState(selectedPost?.comments);

  const changeEventHandler = (e) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
      // console.log(inputText);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await fetch(
        `${baseUrl}/api/v1/post/${selectedPost?._id}/comment`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ text }),
        }
      );
      const data = await res.json();
      if (data.success) {
        setText("");
        console.log(data);
        const updatedCommentData = [...comment, data.comment];
        setComment(updatedCommentData);

        //update in redux
        const updatedPostData = posts.map((p) =>
          p._id === selectedPost._id
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

  const handleKeys = (e) => {
    if (e.key === "Enter") {
      commentHandler();
    }
  };

  useEffect(() => {
    if (openComment) {
      document.getElementById("commentbox").checked = true;
    }
  }, [openComment]);

  useEffect(() => {
    // Scroll to the bottom when comments change
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comment]);

  return (
    <>
      <input type="checkbox" id="commentbox" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box p-0 md:max-w-4xl bg-gray-300">
          <div className="flex flex-col md:flex-row flex-1">
            {/* Image section */}
            <div className="w-full md:w-3/5 h-64 md:h-auto">
              <img
                className="rounded-sm w-full h-full object-cover"
                src={selectedPost?.image}
                alt="post_image"
              />
            </div>

            {/* Comment section */}
            <div className="w-full md:w-2/5 flex flex-col justify-between">
              {/* User info and options */}
              <div className="flex items-center justify-between bg-red-300 p-3">
                <div className="flex items-center gap-2">
                  <div className="avatar">
                    <div className="w-10 rounded-full">
                      <img
                        src={selectedPost?.author?.profilePic}
                        alt="user avatar"
                      />
                    </div>
                    <span className="mx-3 text-black">
                      {selectedPost?.author?.username}
                    </span>
                  </div>
                </div>

                <details className="dropdown dropdown-end">
                  <summary className="btn m-1 bg-transparent hover:bg-transparent border-none text-black">
                    :
                  </summary>
                  <ul className="menu dropdown-content font-bold bg-white text-black rounded-box z-[1] w-40 p-2">
                    <li>
                      <a>Unfollow</a>
                    </li>
                    <li>
                      <a>Add to favorite</a>
                    </li>
                    <li>
                      <a>Cancel</a>
                    </li>
                  </ul>
                </details>
              </div>

              {/* Comments */}
              <div className="flex-1 overflow-y-auto max-h-60 md:max-h-96 p-4">
                {comment?.map((comment) => (
                  <Comment key={comment._id} comment={comment} />
                ))}
                <div ref={commentsEndRef} />
              </div>

              {/* Add comment input */}
              <div className="flex items-center gap-2 p-3">
                <input
                  type="text"
                  value={text}
                  onChange={changeEventHandler}
                  onKeyDown={handleKeys}
                  className="w-full outline-none border-gray-300 rounded py-1 px-2"
                  placeholder="Add a comment..."
                />
                <button
                  onClick={commentHandler}
                  disabled={!text.trim()}
                  className="btn btn-success text-white"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>

        <label
          className="modal-backdrop"
          htmlFor="commentbox"
          onClick={() => setOpenComment(false)}
        ></label>
      </div>
    </>
  );
};

export default CommentDialog;
