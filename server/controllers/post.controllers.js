import sharp from "sharp";
import cloudinary from "../utils/cloudinary.js";
import { Post } from "../models/post.model.js";
import { User } from "../models/user.model.js";
import { Comment } from "../models/comment.model.js";
export const addPost = async (req, res) => {
  try {
    const { caption } = req.body;
    const image = req.file;
    const authorId = req.id;
    console.log(authorId);

    if (!image) return res.status(401).json({ message: "Image required" });

    //image resize
    const optimizedIamgeBuffer = await sharp(image.buffer)
      .resize({ width: 800, height: 800, fit: "inside" })
      .toFormat("jpeg", { quality: 80 })
      .toBuffer();

    //buffer to uri
    const fileUri = `data:image/jpeg;base64,${optimizedIamgeBuffer.toString(
      "base64"
    )}`;
    // console.log(fileUri);

    //upload
    const cloudResponse = await cloudinary.uploader.upload(fileUri);
    const post = await Post.create({
      caption,
      image: cloudResponse.secure_url,
      author: authorId,
    });

    //find user
    const user = await User.findById(authorId);

    if (user) {
      user.posts.push(post._id);
      await user.save();
    }

    await post.populate({ path: "author", select: "-password" });
    return res
      .status(201)
      .json({ message: "New post added", success: true, post });
  } catch (error) {
    console.log(error);
  }
};

export const getAllPost = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate({ path: "author", select: "username profilePic" })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username profilePic",
        },
      });

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error from getAllPost",
    });
  }
};

export const getUserPost = async (req, res) => {
  try {
    const authorId = req.id;
    const posts = Post.findById(authorId)
      .sort({ createdAt: -1 })
      .populate({
        path: "comments",
        sort: { createdAt: -1 },
        populate: {
          path: "author",
          select: "username, profilePic",
        },
      });

    return res.status(200).json({ success: true, posts });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error from getUserPost",
    });
  }
};

export const likePost = async (req, res) => {
  try {
    const likedUser = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post Not Found" });
    }

    await post.updateOne({ $addToSet: { likes: likedUser } });

    //implement socket io

    return res.status(200).json({ success: true, message: `Post liked` });
  } catch (error) {
    console.log(error);
  }
};

export const dislikePost = async (req, res) => {
  try {
    const likedUser = req.id;
    const postId = req.params.id;
    const post = await Post.findById(postId);

    if (!post) {
      return res
        .status(404)
        .json({ success: false, message: "Post Not Found" });
    }

    await post.updateOne({ $pull: { likes: likedUser } });

    //implement socket io

    return res.status(200).json({ success: true, message: `Post disliked` });
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res) => {
  try {
    const commentedUser = req.id;
    const postId = req.params.id;
    const { text } = req.body;
    if (!text) {
      return res
        .status(400)
        .json({ success: false, message: "text is required" });
    }

    //add comment
    const comment = Comment.create({
      text,
      author: commentedUser,
      post: postId,
    });

    await comment.populate({ path: "author", select: "username profilePic" });

    //add comment to post
    const post = Post.findById(postId);
    post.comments.push(comment._id);
    await post.save();

    return res.status(200).json({ success: true, message: `Comment added` });
  } catch (error) {
    console.log(error);
  }
};

export const getCommentOfPost = async (req, res) => {
  try {
    const postId = req.params;
    const comments = await Comment.find({ post: postId }).populate(
      "author",
      "username profilePic"
    );
    if (!comments) {
      return res
        .status(404)
        .json({ success: false, message: "No comments found" });
    }
    return res.status(200).json({ success: true, comments });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const authorId = req.id;

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "No post found" });
    }

    if (post.author.toString() !== authorId) {
      return res.status(403).json({ success: false, message: "Unauthorised" });
    }
    await Post.findByIdAndDelete(postId);

    //remove post from user
    let user = await User.findById(authorId);
    user.posts = user.posts.filter((id) => id.toString() !== postId);
    await user.save();

    //remove comments
    await Comment.deleteMany({ post: postId });
    return res.status(200).json({
      success: true,
      message: "post deleted",
    });
  } catch (error) {
    console.log(error);
  }
};

export const bookmarkPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.id;

    //find post
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ success: false, message: "No post found" });
    }

    //find user
    const user = await User.findById(userId);

    if (user.bookmarks.includes(postId)) {
      //already bookmarked -> remove
      await user.updateOne({ $pull: { bookmarks: postId } });
      await user.save();
      return res.status(200).json({
        type: "unsaved",
        success: true,
        message: "post removed from bookmarks",
      });
    } else {
      //not bookmarked -> add
      await user.updateOne({ $addToSet: { bookmarks: postId } });
      await user.save();
      return res.status(200).json({
        type: "saved",
        success: true,
        message: "post added to bookmarks",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
