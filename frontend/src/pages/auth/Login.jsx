import React, { useState } from "react";
import axios from "axios";
import Logo from "../../images/Instagram.png";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";

const Login = () => {
  const { formData, handleChange } = useForm({
    email: "",
    password: "",
  });

  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:8080/api/v1/login", {
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        const token = res.data.token;
        const userData = { ...res.data.user, password: "", token };
        localStorage.setItem("user", JSON.stringify(userData));
        navigate("/");
        console.log("Login successful");
      } else {
        setLoginError("Invalid email or password. Please try again.");
        console.log("Unsuccessful login");
      }
    } catch (error) {
      console.error(error);
      setLoginError("An error occurred during login. Please try again.");
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="px-4 py-20 rounded-lg shadow-md max-w-md w-full flex flex-col items-center text-white  border border-[#262626]">
        <img src={Logo} alt="logo" className="mb-4 " />
        <form
          className="flex flex-col w-[80%] max-w-md mx-auto"
          onSubmit={handleSubmit}
        >
          <input
            className="mb-4 p-2 border-b-1 bg-inherit "
            type="text"
            id="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
          />
          <input
            className="mb-4 p-2 border-b-1 bg-inherit "
            type="password"
            id="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
          />
          <a href="/" className="text-[#3797EF] mb-4">
            Forgot Password?
          </a>
          <button className="bg-[#3797EF] text-white p-2 rounded hover:bg-blue-600 my-2">
            Log In
          </button>
          {loginError && <p className="text-red-500">{loginError}</p>}
          <div className="flex items-center mt-4 mb-4 text-gray-500">
            <div className="h-px flex-1 bg-gray-500"></div>
            <span className="mx-2">OR</span>
            <div className="h-px flex-1 bg-gray-500"></div>
          </div>
          <div className="flex justify-center mt-8 mb-4">
            <p>
              Don't have an account?{" "}
              <a href="/signup" className="text-[#3797EF]">
                Sign up
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
