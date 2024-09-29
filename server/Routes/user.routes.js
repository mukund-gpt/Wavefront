import express from "express";
import { login, logout, register } from "../controllers/auth.controllers.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import upload from "../middlewares/multer.js";
import {
  editProfile,
  followOrUnfollow,
  getProfile,
  getSuggestedUsers,
} from "../controllers/user.controllers.js";

const router = express.Router();

//auth routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);

router
  .route("/profile/edit")
  .patch(isAuthenticated, upload.single("profilePicture"), editProfile);
router.route("/profile/:id").get(isAuthenticated, getProfile);

router.route("/suggested").get(isAuthenticated, getSuggestedUsers);
router.route("/followOrUnfollow/:id").patch(isAuthenticated, followOrUnfollow);
export default router;
