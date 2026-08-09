import React, { useContext, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import {
  FaEnvelope,
  FaLinkedin,
  FaGithub,
  FaPhoneAlt,
  FaFacebook,
} from "react-icons/fa";
import { FiAlertCircle, FiCheckCircle, FiX } from "react-icons/fi";
import AppContext from "../context/AppContext";

const Contact = () => {
  const { admin, socialLinks, sendMessage } = useContext(AppContext);

  // Extract social links safely
  const getLink = (platform, defaultUrl) => {
    if (!socialLinks || !Array.isArray(socialLinks)) return defaultUrl;

    const found = socialLinks.find(
      (link) =>
        link?.platform?.toLowerCase() === platform ||
        link?.key?.toLowerCase() === platform ||
        link?.name?.toLowerCase() === platform ||
        link?.key === defaultUrl
    );

    return found?.value || found?.url || defaultUrl;
  };

  const github = getLink("github", "https://github.com/ganeshchay2021");
  const linkedin = getLink("linkedin", "https://www.linkedin.com/in/ganesh-chaudhary-10b8a4265/");
  const facebook = getLink("facebook", "https://www.facebook.com/ganish.chaykalya.7");

  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Modern Dialog State
  const [dialog, setDialog] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "success", // "success" or "error"
  });

  const showDialog = (title, message, type = "success") => {
    setDialog({ isOpen: true, title, message, type });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      showDialog("Incomplete Fields", "Please fill in all fields before submitting.", "error");
      return;
    }

    setLoading(true);
    try {
      // Wrap setTimeout in a Promise so 'await' can pause execution correctly
      await new Promise((resolve) => setTimeout(resolve, 2000));

      showDialog("Success!", "✅ Your message has been sent successfully!", "success");
    } catch (err) {
      console.error("Error sending message:", err);
      showDialog("Error", `❌ Error: ${err.message || "Something went wrong."}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative fontOne min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white px-6 py-16"
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row gap-12 items-center md:items-start">
        {/* Left Side */}
        <Motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6 text-center md:text-left"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase tracking-wide">
            Get in{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-lg mx-auto md:mx-0">
            Have a project in mind or just want to say hello? Fill out the form
            or reach me directly through the platforms below.
          </p>

          <div className="space-y-4 text-sm sm:text-base">
            <p className="flex justify-center md:justify-start items-center gap-3 text-gray-300 hover:text-green-400 transition">
              <FaEnvelope className="text-green-400" /> {admin.email || "your@email.com"}
            </p>
            <p className="flex justify-center md:justify-start items-center gap-3 text-gray-300 hover:text-green-400 transition">
              <FaPhoneAlt className="text-green-400" /> {admin.phone || "**********"}
            </p>

            {/* Social Icons */}
            <div className="flex justify-center md:justify-start gap-6 text-2xl pt-2 flex-wrap">
              <a href={linkedin} target="_blank" rel="noreferrer" className="hover:text-blue-400 transition">
                <FaLinkedin />
              </a>
              <a href={github} target="_blank" rel="noreferrer" className="hover:text-gray-400 transition">
                <FaGithub />
              </a>
              <a href={facebook} target="_blank" rel="noreferrer" className="hover:text-pink-500 transition">
                <FaFacebook />
              </a>
            </div>
          </div>
        </Motion.div>

        {/* Right Side - Form */}
        <Motion.form
          onSubmit={handleSubmit}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 w-full bg-gray-800/60 backdrop-blur-lg shadow-xl p-6 sm:p-8 space-y-6 rounded-2xl border border-gray-700/50"
        >
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-white text-sm sm:text-base rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-white text-sm sm:text-base rounded-xl"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              rows="5"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              className="w-full px-4 py-2 bg-gray-900 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 text-white resize-none text-sm sm:text-base rounded-xl"
            ></textarea>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full cursor-pointer bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 px-6 py-3 font-semibold text-base sm:text-lg transition shadow-lg rounded-xl"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </Motion.form>
      </div>

      {/* Modern Custom Alert Dialog Modal */}
      <AnimatePresence>
        {dialog.isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setDialog({ ...dialog, isOpen: false });
                if (dialog.type === "success") {
                  setName("");
                  setEmail("");
                  setMessage("");
                }
              }}
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <Motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0.2 }}
              className="relative w-full max-w-md bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-6 text-white z-10 overflow-hidden"
            >
              {/* Top accent gradient line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${dialog.type === "success"
                  ? "from-green-400 to-blue-500"
                  : "from-red-500 to-orange-500"
                  }`}
              />

              {/* Close Button */}
              <button
                onClick={() => {
                  setDialog({ ...dialog, isOpen: false });
                  if (dialog.type === "success") {
                    setName("");
                    setEmail("");
                    setMessage("");
                  }
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition cursor-pointer"
              >
                <FiX size={20} />
              </button>

              {/* Content Header */}
              <div className="flex items-start gap-4 mt-2">
                <div
                  className={`p-3 rounded-xl ${dialog.type === "success"
                    ? "bg-green-500/10 text-green-400"
                    : "bg-red-500/10 text-red-400"
                    }`}
                >
                  {dialog.type === "success" ? (
                    <FiCheckCircle size={24} />
                  ) : (
                    <FiAlertCircle size={24} />
                  )}
                </div>
                <div className="flex-1 pr-6">
                  <h3 className="text-xl font-bold tracking-wide">{dialog.title}</h3>
                  <p className="text-gray-300 text-sm mt-1.5 leading-relaxed">
                    {dialog.message}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-gray-800">
                <button
                  onClick={() => {
                    setDialog({ ...dialog, isOpen: false });
                    if (dialog.type === "success") {
                      setName("");
                      setEmail("");
                      setMessage("");
                    }
                  }}
                  className="px-5 py-2 text-sm font-semibold bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 rounded-xl shadow-lg transition cursor-pointer w-full sm:w-auto text-center"
                >
                  Okay
                </button>
              </div>
            </Motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;