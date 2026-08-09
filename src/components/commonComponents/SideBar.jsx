import React, { useState, useContext } from "react";
import {
  FaFacebookF,
  FaYoutube,
  FaGithub,
  FaSignInAlt,
  FaChevronRight,
  FaChevronLeft,
  FaLinkedin,
} from "react-icons/fa";
import { motion as Motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AppContext from "../../context/AppContext";

const SideBar = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { isAuthenticated, socialLinks } = useContext(AppContext);
  const navigate = useNavigate();

  const toggleSidebar = () => setIsVisible((prev) => !prev);
  const handleLoginClick = () => {
    navigate(isAuthenticated ? "/admin/dashboard" : "/admin/login");
  };

  // Pull dynamic values from context safely
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


  // Define usable links for sidebar
  const socialLinksFixed = [
    {
      icon: <FaGithub />,
      label: "GitHub",
      link: github,
      ringColor: "from-gray-400 via-gray-600 to-white",
    },
    {
      icon: <FaLinkedin />,
      label: "linkedin",
      link: linkedin,
      ringColor: "from-blue-500 via-purple-500 to-blue-400",
    },

    {
      icon: <FaFacebookF />,
      label: "Facebook",
      link: facebook,
      ringColor: "from-blue-500 via-purple-500 to-blue-400",
    },
  ];

  return (
    <>
      {/* Toggle Button for Small Devices */}
      <button
        onClick={toggleSidebar}
        className="fixed top-1/2 left-2 transform -translate-y-1/2 z-50 bg-green-500 text-white p-2 rounded-full shadow-lg md:hidden"
      >
        {isVisible ? <FaChevronLeft /> : <FaChevronRight />}
      </button>

      {/* Sidebar - Small Devices (Toggle) */}
      {isVisible && (
        <Motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="fixed top-1/2 left-0 transform -translate-y-1/2 z-40 md:hidden"
        >
          <SidebarContent
            socialLinks={socialLinksFixed}
            handleLoginClick={handleLoginClick}
          />
        </Motion.div>
      )}

      {/* Sidebar - Medium+ Devices (Always Visible) */}
      <div className="hidden md:block fixed top-1/2 left-0 transform -translate-y-1/2 z-50">
        <SidebarContent
          socialLinks={socialLinksFixed}
          handleLoginClick={handleLoginClick}
        />
      </div>
    </>
  );
};

const SidebarContent = ({ socialLinks, handleLoginClick }) => (
  <div className="flex flex-col gap-6 bg-gray-800 p-4 rounded-r-lg shadow-2xl">
    {socialLinks.map((item, idx) => (
      <IconButton key={idx} {...item} />
    ))}
    <button onClick={handleLoginClick}>
      <IconButton
        icon={<FaSignInAlt />}
        label="Login"
        isInternal
        ringColor="from-green-400 via-yellow-400 to-green-500"
      />
    </button>
  </div>
);

// Icon Button with Rotating Ring Effect
const IconButton = ({ icon, label, link, isInternal = false, ringColor }) => {
  const ring = (
    <Motion.div
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      className={`absolute inset-0 rounded-full border-4 border-transparent bg-gradient-to-tr ${ringColor}`}
      style={{
        maskImage: "radial-gradient(circle, white 65%, transparent 70%)",
        WebkitMaskImage: "radial-gradient(circle, white 65%, transparent 70%)",
      }}
    />
  );

  const iconWrapper = (
    <div className="relative w-14 h-14">
      {ring}
      <div className="absolute inset-1 bg-gray-900 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-white text-xl">{icon}</span>
      </div>
    </div>
  );

  return isInternal ? (
    <Motion.div
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      title={label}
    >
      {iconWrapper}
    </Motion.div>
  ) : (
    <Motion.a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      title={label}
    >
      {iconWrapper}
    </Motion.a>
  );
};

export default SideBar;
