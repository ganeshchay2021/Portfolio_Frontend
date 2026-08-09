import React, { useState, useEffect, useContext, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { FaVolumeUp, FaVolumeMute } from "react-icons/fa";
import { motion as Motion, AnimatePresence } from "framer-motion";
import myProfile from "../../assets/logo.png";
import AppContext from "../../context/AppContext";
import audio from "../../assets/sad.mp3";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mousePercent, setMousePercent] = useState(0);

  // Audio state and ref
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Audio play blocked:", err));
    }
  };

 
  // Track mouse X position and calculate percentage
  useEffect(() => {
    const handleMouseMove = (e) => {
      const percent = (e.clientX / window.innerWidth) * 100;
      setMousePercent(percent);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const { logo } = useContext(AppContext);

  return (
    <Motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="sticky top-0 z-50 bg-gray-900 flex flex-col text-white shadow-lg"
    >
      {/* Navbar Main */}
      <div className="flex justify-between items-center w-full px-6 md:px-12 h-16">
        {/* Logo */}
        <Motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 200 }}
          className="flex items-center cursor-pointer"
        >
          <img className="w-10 mr-3 rounded-[50%]" src={myProfile} alt="Logo" />
          <Link to="/" className="text-lg sm:text-xl font-bold tracking-wide">
            Ganesh Chaudhary
          </Link>
        </Motion.div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-8 text-lg font-medium">
            {["Home", "About", "Contact", "Projects"].map((link) => (
              <li key={link} className="relative group">
                <NavLink
                  to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                  className={({ isActive }) =>
                    `transition duration-300 ${
                      isActive ? "text-green-400" : "hover:text-green-400"
                    }`
                  }
                >
                  {link}
                </NavLink>
                {/* underline animation */}
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-400 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}

            {/* Hidden audio element */}
            <audio ref={audioRef} src={audio} loop preload="auto" />

            {/* Custom Clickable Audio Icon Button */}
            <button
              onClick={toggleAudio}
              className="p-3 bg-white/10 hover:bg-white/20 rounded-full transition cursor-pointer text-white flex items-center justify-center"
              aria-label="Toggle Audio"
            >
              {isPlaying ? <FaVolumeUp size={22} /> : <FaVolumeMute size={22} />}
            </button>
          </ul>
        </nav>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mouse Position Slider */}
      <div className="h-1 w-full bg-gray-700">
        <Motion.div
          className="h-1 bg-gradient-to-r from-green-300 via-green-400 to-green-500"
          animate={{ width: `${mousePercent}%` }}
          transition={{ type: "spring", stiffness: 200, damping: 30 }}
        />
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <Motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-16 left-0 w-full bg-gray-800 shadow-lg md:hidden z-40"
          >
            <ul className="flex flex-col gap-4 text-lg font-medium px-6 py-6">
              {["Home", "About", "Contact", "Projects"].map((link) => (
                <Motion.li
                  key={link}
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <NavLink
                    to={link === "Home" ? "/" : `/${link.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `block w-full transition duration-300 ${
                        isActive ? "text-green-400" : "hover:text-green-400"
                      }`
                    }
                  >
                    {link}
                  </NavLink>
                </Motion.li>
              ))}
            </ul>
          </Motion.nav>
        )}
      </AnimatePresence>
    </Motion.header>
  );
};

export default Navbar;