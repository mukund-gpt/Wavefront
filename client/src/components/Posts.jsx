import React from "react";
import Post from "./Post";
import { useSelector } from "react-redux";

const Posts = () => {
  const { posts } = useSelector((store) => store.post);
  return (
    <>
      <div className="w-full">
        {/* <Post />
        <Post />
        <Post /> */}
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </>
  );
};

export default Posts;
