import React, { useEffect, useState } from "react";
import axios from "axios";
import Logo from "../../images/InstagramBlack.png";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";

const SignUp = () => {
  const navigate = useNavigate();
  const { formData, handleChange } = useForm({
    name: "",
    email: "",
    password: "",
  });

  const [signupError, setSignupError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/api/v1/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (res.data.success) {
        navigate("/login");
        console.log("Signup successful");
      } else {
        setSignupError("Registration failed. Please try again.");
        console.log("Unsuccessful signup");
      }
    } catch (error) {
      console.error(error);
      setSignupError(
        "An error occurred during registration. Please try again."
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-4 rounded-lg shadow-md max-w-md w-full flex flex-col items-center">
        <img src={Logo} alt="logo" className="mb-4" />
        <form className="flex flex-col w-[80%]" onSubmit={handleSubmit}>
          <input
            className="mb-4 p-2 border border-gray-300 rounded"
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            className="mb-4 p-2 border border-gray-300 rounded"
            type="text"
            name="name"
            placeholder="Username"
            onChange={handleChange}
            required
          />
          <input
            className="mb-4 p-2 border border-gray-300 rounded"
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            required
          />
          <button className="bg-[#3797EF] text-white p-2 rounded hover:bg-blue-600">
            Sign Up
          </button>
          {signupError && <p className="text-red-500">{signupError}</p>}
          <div className="flex items-center mt-4 mb-4 text-gray-500">
            <div className="h-px flex-1 bg-gray-500"></div>
            <span className="mx-2">OR</span>
            <div className="h-px flex-1 bg-gray-500"></div>
          </div>

          <div className="flex justify-center mt-8 mb-4">
            <p>
              Already have an account?{" "}
              <a href="/" className="text-[#3797EF]">
                Log In
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
