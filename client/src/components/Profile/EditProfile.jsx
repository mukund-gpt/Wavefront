import { setAuthUser } from "@/redux/authSlice";
import { baseUrl } from "@/utils/baseUrl";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const [file, setFile] = useState(null);
  const [avatar, setAvatar] = useState(user.profilePic);
  const [gender, setGender] = useState(user.gender || "");
  const [bio, setBio] = useState(user.bio || "");
  const [isLoading, setisLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      const imageURL = URL.createObjectURL(file);
      setAvatar(imageURL);
    }
  };

  const handleSubmit = async (e) => {
    setisLoading(true);
    e.preventDefault();
    const formData = new FormData();
    if (file) formData.append("profilePic", file);
    formData.append("gender", gender);
    formData.append("bio", bio);

    try {
      const response = await fetch(`${baseUrl}/api/v1/user/profile/edit`, {
        method: "PATCH",
        body: formData,
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        dispatch(setAuthUser(data.user));
        navigate(`/profile/${user?._id}`);
        toast.success(data.message);
      } else {
        const error = await response.json();
        console.log(error);
        toast.error(error.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <div className="ml-1/6 w-5/6 mx-auto p-6 rounded-md mt-2">
      <h1 className="text-3xl font-extrabold mb-8 text-center text-purple-700">
        Edit Profile
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Avatar Upload */}
        <div className="mb-8">
          <label
            htmlFor="avatar"
            className="block text-lg font-medium text-purple-600 mb-3"
          >
            Avatar
          </label>
          <div className="flex items-center space-x-6">
            <img
              src={avatar}
              alt="Uploaded Avatar"
              className="w-24 h-24 rounded-full border-purple-400 shadow-lg"
            />
            <input
              type="file"
              id="avatar"
              accept="image/*"
              onChange={handleImageChange}
              className="text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-purple-400 file:to-pink-400 file:text-white file:font-semibold file:shadow-lg hover:file:opacity-90"
            />
          </div>
        </div>

        {/* Choose Gender */}
        <div className="mb-8">
          <label
            htmlFor="gender"
            className="block text-lg font-medium text-purple-600 mb-3"
          >
            Gender
          </label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="w-1/6 p-1 border-purple-300 rounded-md shadow-md focus:ring-purple-500 focus:border-purple-500 text-gray-700"
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Bio */}
        <div className="mb-8">
          <label
            htmlFor="bio"
            className="block text-lg font-medium text-purple-600 mb-3"
          >
            Bio
          </label>
          <textarea
            id="bio"
            rows="4"
            maxLength={50}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full p-3 border-purple-300 rounded-md shadow-md focus:ring-purple-500 focus:border-purple-500 text-gray-700 resize-none"
            placeholder="Tell us something about yourself..."
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className={`px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-lg shadow-lg hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-purple-300 flex items-center justify-center ${
              isLoading && "cursor-not-allowed opacity-80"
            }`}
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loading loading-spinner loading-md text-white mr-2"></div>
            ) : null}
            {isLoading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
