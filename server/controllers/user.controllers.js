import { User } from "../models/user.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const getProfile = async (req, res) => {
  try {
    const userId = req.params.id;
    // console.log(userId);

    if (!userId || !userId.match(/^[0-9a-fA-F]{24}$/)) {
      return res
        .status(400)
        .json({ message: "Invalid user ID", success: false });
    }

    const user = await User.findById(userId)
      .select("-password")
      .populate({ path: "posts", options: { sort: { createdAt: -1 } } })
      .populate("bookmarks")
      .populate("followers", "username profilePic")
      .populate("following", "username profilePic");

    res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error from getProfile controller",
      success: false,
    });
  }
};

export const editProfile = async (req, res) => {
  try {
    const userId = req.id;
    const { bio, gender } = req.body;
    const profilePic = req.file;

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({
        message: "User not found.",
        success: false,
      });
    }

    if (bio) user.bio = bio;
    if (gender) user.gender = gender;

    let cloudResponse;
    if (profilePic) {
      const fileUri = getDataUri(profilePic);
      cloudResponse = await cloudinary.uploader.upload(fileUri, {
        folder: "Wavefront",
      });
      user.profilePic = cloudResponse.secure_url;
    }
    // console.log(cloudResponse);

    await user.save();

    return res.status(200).json({
      message: "Profile updated.",
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error from editProfile controller",
      success: false,
    });
  }
};

export const getSuggestedUsers = async (req, res) => {
  try {
    const suggestedUsers = await User.find({ _id: { $ne: req.id } }).select(
      "-password"
    );

    if (!suggestedUsers) {
      return res.status(400).json({
        message: "No Users Found",
        success: true,
      });
    }
    res.status(200).json({ success: true, suggestedUsers });
  } catch (error) {
    console.log(error);
  }
};

export const followOrUnfollow = async (req, res) => {
  try {
    const followKarneWala = req.id;
    const jiskoFollowKarunga = req.params.id;

    if (followKarneWala === jiskoFollowKarunga) {
      return res
        .status(400)
        .json({ success: false, message: "You can't follow yourself." });
    }

    const user = await User.findById(followKarneWala);
    const userToFollow = await User.findById(jiskoFollowKarunga);

    if (!user || !userToFollow) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }

    const isFollowing = user.following.includes(jiskoFollowKarunga);

    if (isFollowing) {
      //unfollow
      await Promise.all([
        User.updateOne(
          { _id: followKarneWala },
          { $pull: { following: jiskoFollowKarunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKarunga },
          { $pull: { followers: followKarneWala } }
        ),
      ]);
      return res
        .status(200)
        .json({ success: true, message: "Unfollowed successfully" });
    } else {
      //follow
      await Promise.all([
        User.updateOne(
          { _id: followKarneWala },
          { $push: { following: jiskoFollowKarunga } }
        ),
        User.updateOne(
          { _id: jiskoFollowKarunga },
          { $push: { followers: followKarneWala } }
        ),
      ]);
      return res
        .status(200)
        .json({ success: true, message: "Followed successfully" });
    }
  } catch (error) {
    console.log(error);
  }
};
