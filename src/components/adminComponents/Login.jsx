import React, { useState, useContext } from "react";
import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const { login } = useContext(AppContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrUsername: "",
    password: "",
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const response = await login(formData.emailOrUsername, formData.password);

      if (response?.success) {
        navigate("/admin/dashboard");
      } else {
        console.log("Login failed!");
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 border border-green-700 shadow-2xl p-8 w-full max-w-md animate-fadeIn space-y-6"
      >
        <h2 className="text-3xl font-bold text-center text-green-400 mb-6 animate-bounce">
          Admin Login
        </h2>

        {/* Email or Username */}
        <div className="flex flex-col relative">
          <label className="mb-1 font-semibold text-green-300 flex items-center gap-2">
            <FaEnvelope /> Email or Username
          </label>
          <input
            type="text"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            placeholder="Enter Email or Username"
            className="bg-gray-900 text-green-100 border border-green-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 hover:scale-105"
          />
        </div>

        {/* Password */}
        <div className="flex flex-col relative">
          <label className="mb-1 font-semibold text-green-300 flex items-center gap-2">
            <FaLock /> Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter Password"
            className="bg-gray-900 text-green-100 border border-green-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 hover:scale-105"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className={`w-full bg-green-600 text-gray-900 py-3 font-bold text-lg shadow-lg transition transform duration-300 ${
            submitting
              ? "bg-green-400 cursor-not-allowed"
              : "hover:bg-green-700 hover:scale-105"
          }`}
        >
          {submitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
