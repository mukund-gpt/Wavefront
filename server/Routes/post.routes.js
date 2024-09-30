import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import {
  addComment,
  addPost,
  bookmarkPost,
  deletePost,
  dilikePost,
  getAllPost,
  getCommentOfPost,
  getUserPost,
  likePost,
} from "../controllers/post.controllers.js";

const router = express.Router();

router.route("/addPost").post(isAuthenticated, upload.single("image"), addPost);
router.route("/all").get(isAuthenticated, getAllPost);
router.route("/userpost/all").get(isAuthenticated, getUserPost);

router.route("/:id/like").get(isAuthenticated, likePost);
router.route("/:id/dislike").get(isAuthenticated, dilikePost);
router.route("/:id/comment").get(isAuthenticated, addComment);
router.route("/:id/comment/all").get(isAuthenticated, getCommentOfPost);

router.route("/:id/delete").get(isAuthenticated, deletePost);
router.route("/:id/bookmark").get(isAuthenticated, bookmarkPost);

export default router;
