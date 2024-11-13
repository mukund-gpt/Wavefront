import React from "react";

const Comment = ({ comment }) => {
  return (
    <div className="flex items-start gap-3 p-2 bg-base-100 rounded-lg shadow-md border border-gray-200 mb-2">
      <img
        src={comment.author.profilePic}
        alt="Profile"
        className="w-10 h-10 rounded-full object-cover"
      />
      <div>
        <h1 className="font-semibold text-primary">
          {comment.author.username}
          <span className="text-gray-600 ml-2">{comment.text}</span>
        </h1>
      </div>
    </div>
  );
};

export default Comment;
