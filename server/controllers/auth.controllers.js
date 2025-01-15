import { User } from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Post } from "../models/post.model.js";
import nodemailer from "nodemailer";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ message: "Please fill in all fields", success: false });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "Email Already exists",
        success: false,
      });
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    user = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    //populate each post
    const populatedPosts = await Promise.all(
      user.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post.author.equals(user._id)) return post;
        return null;
      })
    );
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
        posts: populatedPosts,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error from register controllers",
      success: false,
    });
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

    // console.log(user);
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    //populate each post
    const populatedPosts = await Promise.all(
      user.posts.map(async (postId) => {
        const post = await Post.findById(postId);
        if (post.author.equals(user._id)) return post;
        return null;
      })
    );

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
        posts: populatedPosts,
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error from login controllers",
      success: false,
    });
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

export const resetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      port: 465,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ message: "User not found", success: false });
    }
    const resetToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Password Reset Request",
      text: `To reset your password, click the following link: ${resetUrl}`,
    };
    await transporter.sendMail(mailOptions);
    return res.json({
      message: "Password reset link sent to your email",
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
export const verifyToken = async (req, res) => {
  try {
    const { password, token } = req.body;
    if (!token || !password) {
      return res.json({
        message: "token and password not found🤦‍♂️",
        success: false,
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    const hashedPassword = await bcryptjs.hash(password, 10);
    // Update the user's password
    user.password = hashedPassword;
    await user.save();
    res
      .status(200)
      .json({ message: "Password reset successfully", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message, success: false });
  }
};
