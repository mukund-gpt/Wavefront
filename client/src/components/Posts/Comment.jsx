import React from "react";

const Comment = ({ comment }) => {
  return (
    <>
      <div className="flex items-start gap-3 p-2 bg-base-100 bg-transparent">
        <img
          src={comment.author.profilePic}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover mr-1"
        />
        <div>
          <h1 className="font-semibold text-secondary">
            {comment.author.username}
          </h1>
          <span className="text-gray-600">{comment.text}</span>
        </div>
      </div>
      <hr className="h-0.5 bg-white" />
    </>
  );
};

export default Comment;
