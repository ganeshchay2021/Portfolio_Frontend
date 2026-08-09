import React, { useState, useContext } from "react";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaHome,
  FaGraduationCap,
  FaUserTie,
  FaCalendarAlt,
  FaBriefcase,
} from "react-icons/fa";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AppContext from "../../context/AppContext";

const Register = () => {
  const { register, isAuthenticated } = useContext(AppContext);

  const [formData, setFormData] = useState({
    name: "",
    userName: "",
    profile: "",
    email: "",
    phone: "",
    password: "",
    address: "",
    fatherName: "",
    education: "",
    marital: "",
    dob: "",
    exp: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const maritalOptions = ["Single", "Married", "Divorced", "Widowed"];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validatePhone = (phone) => /^[0-9]{10}$/.test(phone);
  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/.test(
      password
    );

  const handleSubmit = async (e) => {
    e.preventDefault();

    let tempErrors = {};
    if (!validatePhone(formData.phone))
      tempErrors.phone = "Phone must be 10 digits";
    if (!validatePassword(formData.password))
      tempErrors.password =
        "Password must have 1 lowercase, 1 uppercase, 1 number, and 1 special character";
    if (!formData.marital) tempErrors.marital = "Please select marital status";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setSubmitting(true);
    try {
      const response = await register(
        formData.userName,
        formData.name,
        formData.profile,
        formData.email,
        formData.phone,
        formData.password,
        formData.address,
        formData.fatherName,
        formData.education,
        formData.marital,
        formData.dob,
        formData.exp
      );

      if (response?.success) {
        toast.success("Registered successfully 🎉");

        setFormData({
          name: "",
          userName: "",
          profile: "",
          email: "",
          phone: "",
          password: "",
          address: "",
          fatherName: "",
          education: "",
          marital: "",
          dob: "",
          exp: "",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const inputs = [
    { name: "name", label: "Full Name", icon: <FaUser /> },
    { name: "userName", label: "Username", icon: <FaUserTie /> },
    { name: "profile", label: "Profile", icon: <FaUserTie /> },
    { name: "email", label: "Email", icon: <FaEnvelope /> },
    { name: "phone", label: "Phone", icon: <FaPhone /> },
    { name: "address", label: "Address", icon: <FaHome /> },
    { name: "fatherName", label: "Father Name", icon: <FaUserTie /> },
    { name: "education", label: "Education", icon: <FaGraduationCap /> },
    {
      name: "dob",
      label: "Date of Birth",
      icon: <FaCalendarAlt />,
      type: "date",
    },
    { name: "exp", label: "Experience", icon: <FaBriefcase /> },
  ];

  return (
    <>
      {isAuthenticated && (
        <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-800 border border-green-700 shadow-2xl p-8 w-full max-w-2xl rounded-lg animate-fadeIn space-y-6"
          >
            <h2 className="text-3xl font-bold text-center text-green-400 mb-6 animate-fadeInDown">
              Admin Registration
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inputs.map((input) => (
                <div key={input.name} className="flex flex-col relative">
                  <label className="mb-1 font-semibold text-green-300 flex items-center gap-2">
                    {input.icon} {input.label}
                  </label>
                  <input
                    type={input.type || "text"}
                    name={input.name}
                    value={formData[input.name]}
                    onChange={handleChange}
                    placeholder={input.label}
                    className="bg-gray-900 text-green-100 border border-green-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 hover:scale-105"
                  />
                  {errors[input.name] && (
                    <span className="text-red-500 text-sm mt-1">
                      {errors[input.name]}
                    </span>
                  )}
                </div>
              ))}

              {/* Password with Toggle */}
              <div className="flex flex-col relative">
                <label className="mb-1 font-semibold text-green-300 flex items-center gap-2">
                  <FaLock /> Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="bg-gray-900 text-green-100 border border-green-600 px-4 py-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-green-400"
                  />
                  <span
                    className="absolute right-3 top-2 cursor-pointer text-green-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </span>
                </div>
                {errors.password && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.password}
                  </span>
                )}
              </div>

              {/* Marital Status Dropdown */}
              <div className="flex flex-col relative">
                <label className="mb-1 font-semibold text-green-300 flex items-center gap-2">
                  <FaUser /> Marital Status
                </label>
                <select
                  name="marital"
                  value={formData.marital}
                  onChange={handleChange}
                  className="bg-gray-900 text-green-100 border border-green-600 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 hover:scale-105"
                >
                  <option value="" disabled>
                    Select status
                  </option>
                  {maritalOptions.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
                {errors.marital && (
                  <span className="text-red-500 text-sm mt-1">
                    {errors.marital}
                  </span>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className={`w-full bg-green-600 text-gray-900 py-3 font-bold text-lg rounded-md shadow-lg transition transform duration-300 ${
                submitting
                  ? "bg-green-400 cursor-not-allowed"
                  : "hover:bg-green-700 hover:scale-105"
              }`}
            >
              {submitting ? "⏳ Registering..." : "Register"}
            </button>

            <p className="text-center text-green-300 mt-2">
              Already have an account?{" "}
              <span className="text-green-400 font-semibold hover:underline cursor-pointer">
                Login
              </span>
            </p>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
