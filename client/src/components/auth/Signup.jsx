import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "@/utils/baseUrl";
import OpenEye from "@/assests/SVG/OpenEye";
import CloseEye from "@/assests/SVG/CloseEye";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";
import GoogleLoginButton from "./GoogleLoginButton";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePasswordVisibilty = () => {
    setPasswordVisibility(!isPasswordVisible);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.username) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      console.log(formData);
      const response = await fetch(`${baseUrl}/api/v1/user/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network Response was Not OK");
      }

      // console.log(response);
      const data = await response.json();
      // console.log(data);

      if (data.success) {
        dispatch(setAuthUser(data.user));
        toast.success("Registration Success");
        navigate("/");
      } else {
        toast.error(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error in submitting form: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
        <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-3 m-1 items-center">
          <div className="sm:w-400 px-4">
            <h2 className="font-bold text-3xl text-[#002D74] text-center">
              New User
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="min-w-[300px] p-3 mt-8 rounded-xl border border-white bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="username"
                name="username"
                placeholder="Username"
                value={formData.username || ""}
                onChange={handleChange}
              />
              <input
                className="p-3 rounded-xl border border-white bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email || ""}
                onChange={handleChange}
              />

              <div className="relative">
                <input
                  className="p-3 rounded-xl w-full border-white bg-white text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={formData.password || ""}
                  onChange={handleChange}
                />
                <div onClick={togglePasswordVisibilty}>
                  {isPasswordVisible ? <OpenEye /> : <CloseEye />}
                </div>
              </div>

              <button
                className="bg-[#002D74] text-white py-2 rounded-xl hover:scale-105 duration-300 hover:bg-[#206ab1] font-medium"
                type="submit"
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "SignUp"
                )}
              </button>
            </form>

            <br />
            <hr />
            <GoogleLoginButton />
            <div className="mt-4 text-sm flex justify-between items-center container-mr">
              <p className="mr-3 md:mr-0 text-black">Already a member</p>
              <Link to="/login">
                <button className="hover:border register text-white bg-[#002c74c5] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002D74] font-semibold duration-300">
                  Login
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
