import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { baseUrl } from "@/utils/baseUrl";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

const GoogleLoginButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSuccess = (response) => {
    // const decodedToken = jwtDecode(response.credential);
    // console.log("User Info:", decodedToken);

    // You can send the token to your backend for further verification
    fetch(`${baseUrl}/api/v1/auth/google-auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ google_token: response.credential }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Server Response:", data);
        if (data.success) {
          toast.success(data.message);
          dispatch(setAuthUser(data.user));
          navigate("/");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => console.error("Error:", err));
  };

  const handleError = () => {
    console.error("Google Login Failed");
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
};

export default GoogleLoginButton;
