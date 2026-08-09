import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { admin, isAuthenticated } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return (
      <p className="text-center text-red-500 mt-10">
        Please login as Admin to view profile.
      </p>
    );
  }

  return (
    <Motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-6"
    >
      <div className="max-w-4xl w-full bg-gray-800 shadow-lg  overflow-hidden">
        {/* Header with image */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between p-6 border-b border-gray-700">
          <div className="flex items-center gap-6">
            <Motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6 }}
              src={admin?.profile || "/default-profile.png"}
              alt="Profile"
              className="w-32 h-32 object-cover rounded-full border-4 border-green-500 shadow-md"
            />
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-green-400">
                {admin?.name || "Admin"}
              </h1>
              <p className="text-gray-400">Father: {admin?.fatherName}</p>
              <p className="text-sm text-gray-500 mt-1">
                Member since {new Date(admin?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            className="mt-4 sm:mt-0 px-4 py-2 bg-red-600 hover:bg-blue-500 text-white  shadow-md transition"
          >
            ⬅ Back
          </button>
        </div>

        {/* Profile Info */}
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-4  shadow-md"
          >
            <p className="text-gray-400 text-sm">Email</p>
            <p className="text-white">{admin?.email}</p>
          </Motion.div>

          <Motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-4  shadow-md"
          >
            <p className="text-gray-400 text-sm">Phone</p>
            <p className="text-white">{admin?.phone}</p>
          </Motion.div>

          {/* Password with toggle */}
          <Motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-4  shadow-md col-span-1 sm:col-span-2"
          >
            <p className="text-gray-400 text-sm">Password</p>
            <div className="flex items-center justify-between">
              <p className="text-white">
                {showPassword ? admin?.password : "••••••••"}
              </p>
              <button
                onClick={() => setShowPassword((prev) => !prev)}
                className="ml-4 px-3 py-1 text-sm bg-green-600 hover:bg-green-500  transition"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </Motion.div>

          <Motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-4  shadow-md"
          >
            <p className="text-gray-400 text-sm">Education</p>
            <p className="text-white">{admin?.education}</p>
          </Motion.div>

          <Motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-4 shadow-md"
          >
            <p className="text-gray-400 text-sm">Marital Status</p>
            <p className="text-white">{admin?.marital}</p>
          </Motion.div>

          <Motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-4 shadow-md"
          >
            <p className="text-gray-400 text-sm">Experience</p>
            <p className="text-white">{admin?.exp} years</p>
          </Motion.div>

          <Motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 p-4  shadow-md"
          >
            <p className="text-gray-400 text-sm">Address</p>
            <p className="text-white">{admin?.address}</p>
          </Motion.div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-900 text-center text-gray-400 text-sm border-t border-gray-700">
          Last Updated:{" "}
          {admin?.updatedAt
            ? new Date(admin?.updatedAt).toLocaleDateString()
            : "N/A"}
        </div>
      </div>
    </Motion.section>
  );
};

export default Profile;
