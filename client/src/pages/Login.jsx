import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from "@/utils/baseUrl";
import GoogleSvg from "@/assests/SVG/GoogleSvg";
import OpenEye from "@/assests/SVG/OpenEye";
import CloseEye from "@/assests/SVG/CloseEye";
import { useDispatch } from "react-redux";
import { setAuthUser } from "@/redux/authSlice";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({});
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
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setLoading(true);
      console.log(formData);
      const response = await fetch(`${baseUrl}/api/v1/user/login`, {
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
        toast.success("Login Success");
        navigate("/");
      } else {
        toast.error(`Login failed: ${data.message}`);
      }
    } catch (error) {
      toast.error(`Error in Login: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="bg-gray-100 min-h-screen flex box-border justify-center items-center">
        <div className="bg-[#dfa674] rounded-2xl flex max-w-3xl p-5 items-center">
          <div className="sm:w-400 px-8">
            <h2 className="font-bold text-3xl text-[#002D74] text-center my-5">
              Login
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
                  "Login"
                )}
              </button>
            </form>

            <br />
            <hr />

            <button className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-black font-medium">
              <GoogleSvg />
              Login with Google
            </button>
            <div className="mt-10 text-sm border-b border-gray-500 py-5 playfair tooltip text-black">
              Forget password?
            </div>

            <div className="mt-4 text-sm flex justify-between items-center container-mr">
              <p className="mr-4 text-black">Not a member, Register now.</p>
              <Link to="/signup">
                <button className="hover:border register text-white bg-[#002c74c5] hover:border-gray-400 rounded-xl py-2 px-5 hover:scale-110 hover:bg-[#002D74] font-semibold duration-300">
                  Register
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
