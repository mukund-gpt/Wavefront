import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const Posts = () => {
  const { posts } = useSelector((store) => store.post);
  return (
    <>
      <div className="w-full bg-primary min-w-[350px]">
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </>
  );
};

export default Posts;
