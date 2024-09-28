import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Email Already exists",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    await User.create({
      username,
      email,
      hashedPassword,
    });

    return res.status(201).json({
      message: "Registration Successful",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Email not exists",
        success: false,
      });
    }

    const isHashedPassword = await bcryptjs.compare(password, user.password);
    if (!isHashedPassword) {
      return res.status(401).json({
        message: "Wrong password",
        success: false,
      });
    }

    user = {
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePic: user.profilePic,
      bio: user.bio,
      gender: user.gender,
      followers: user.followers,
      following: user.following,
      posts: user.posts,
    };

    const token = jwt.token({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    return res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 1 * 24 * 3600 * 1000,
      })
      .json({
        message: `Welcome ${user.username}`,
        success: true,
        user,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "Logout Successfully",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.is;
    let user = await User.findById(userId)
      .populate({ path: "posts", createdAt: -1 })
      .populate("bookmarks");
  } catch (error) {
    console.log(error);
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender } = req.body;
    const profilePic = req.file;

    let cloudResponse;
    if (profilePic) {
      const fileUri = getDataUri(profilePic);
      cloudResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "Wavefront",
      });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    if (bio) user.bio = bio;
    if (gender) user.gender = gender;
    if (profilePic) user.profilePic = profilePic;

    await user.save();

    return res.status(200).json({
      message: "Profile updated.",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
  }
};
