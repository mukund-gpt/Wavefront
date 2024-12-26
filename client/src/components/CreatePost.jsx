import { setPosts } from "@/redux/postSlice";
import { baseUrl } from "@/utils/baseUrl";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreatePost = ({ open, setOpen }) => {
  const [imageSrc, setImageSrc] = useState("");
  const [file, setFile] = useState(null);
  const [caption, setCaption] = useState("");
  const [loading, setLoading] = useState(false);
  const { posts } = useSelector((store) => store.post);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile); // Save the file for upload
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Set the data URI as the image source for preview
      };
      reader.readAsDataURL(selectedFile); // Convert to data URI for preview
    }
  };

  const handleClose = () => {
    setOpen(false);
    setImageSrc(""); // Clear the image preview
    setFile(null); // Reset file state
  };

  const createPostHandler = async (e) => {
    if (!file) {
      toast.error("Please select an image");
      return;
    }
    if (!caption) {
      toast.error("Please add a caption");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", file);

    try {
      setLoading(true);
      setCaption("");

      const res = await fetch(`${baseUrl}/api/v1/post/addPost`, {
        method: "POST",
        body: formData,
        credentials: "include", // Include credentials if needed (useful for cookies)
      });

      if (!res.ok) {
        throw new Error("Network Response was Not OK");
      }

      const data = await res.json();
      if (data.success) {
        dispatch(setPosts([data.posts, ...posts]));
        toast.success(data.message);
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {open && (
        <div className="modal modal-open" onClick={handleClose}>
          <div
            className="modal-box relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="font-bold text-lg text-center">Upload an Image</h3>

            {/* File Input */}
            <div className="flex justify-center items-center">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </div>

            {/* Display Selected Image */}
            {imageSrc && (
              <img
                src={imageSrc}
                alt="Selected"
                className="mt-4 w-full h-auto"
              />
            )}

            {/* Caption Input */}
            {imageSrc && (
              <div className="m-3 text-center">
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Caption"
                  className="input border-none input-info w-full max-w-xs"
                />
              </div>
            )}

            {/* Upload Button */}
            {imageSrc && (
              <div className="text-center w-48 mx-auto">
                <button className="btn btn-info">
                  {loading ? (
                    <span className="loading loading-spinner text-white"></span>
                  ) : (
                    <span onClick={createPostHandler} className="text-white">
                      Upload
                    </span>
                  )}
                </button>
              </div>
            )}

            {/* Close Button */}
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={handleClose}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
