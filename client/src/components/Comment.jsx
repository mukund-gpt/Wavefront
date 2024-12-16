import React from "react";

const Comment = ({ comment }) => {
  return (
    <div className="flex items-start gap-3 p-2 bg-base-100 rounded-sm mb-1">
      <img
        src={comment.author.profilePic}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover mr-1"
      />
      <div>
        <h1 className="font-semibold text-primary">
          {comment.author.username}
        </h1>
        <span className="text-gray-600">{comment.text}</span>
      </div>
    </div>
  );
};

export default Comment;
