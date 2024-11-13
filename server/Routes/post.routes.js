import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import {
  addComment,
  addPost,
  bookmarkPost,
  deletePost,
  dislikePost,
  getAllPost,
  getCommentOfPost,
  getUserPost,
  likePost,
} from "../controllers/post.controllers.js";

const router = express.Router();

router.route("/addPost").post(isAuthenticated, upload.single("image"), addPost);
router.route("/all").get(isAuthenticated, getAllPost);
router.route("/userpost/all").get(isAuthenticated, getUserPost);

router.route("/:id/like").patch(isAuthenticated, likePost);
router.route("/:id/dislike").patch(isAuthenticated, dislikePost);
router.route("/:id/comment").patch(isAuthenticated, addComment);
router.route("/:id/comment/all").get(isAuthenticated, getCommentOfPost);

router.route("/:id/delete").delete(isAuthenticated, deletePost);
router.route("/:id/bookmark").get(isAuthenticated, bookmarkPost);

export default router;
