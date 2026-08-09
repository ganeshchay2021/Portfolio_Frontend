import React, { useContext } from "react";
import {
  FaGithub,
  FaLinkedin,
  FaFacebook,
} from "react-icons/fa";
import AppContext from "../../context/AppContext";
import { Link } from "react-router-dom";

const Footer = () => {
  const { socialLinks } = useContext(AppContext);

  // Helper function to safely extract URLs by key/platform name, falling back to direct URLs
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

  return (
    <footer className="relative bg-black text-gray-300">
      <div className="absolute inset-0 bg-gradient-to-t from-green-900/40 via-black/90 to-black" />

      <div className="relative max-w-7xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 text-center sm:text-left">
          {/* Left - Brand */}
          <div>
            <h2 className="text-3xl font-extrabold bg-gradient-to-r from-white to-white bg-clip-text text-transparent">
              Ganesh Chaudhary
            </h2>
            <p className="mt-3 text-gray-400 text-sm leading-relaxed">
              Flutter Developer and MERN Stack Developer crafting modern, responsive, and
              user-friendly applications. Always learning, always building.
            </p>
          </div>

          {/* Middle - Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-green-400 inline-block">
              Quick Links
            </h3>
            <ul className="space-y-2 mt-3">
              <li>
                <Link to={"/about"} className="hover:text-green-400 transition">
                  About
                </Link>
              </li>
              <li>
                <Link
                  to={"/projects"}
                  className="hover:text-green-400 transition"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to={"/contact"}
                  className="hover:text-green-400 transition"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Right - Socials */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b-2 border-green-400 inline-block">
              Follow Me
            </h3>
            <div className="flex justify-center sm:justify-start gap-6 text-2xl mt-3">
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:scale-125 hover:text-white hover:drop-shadow-[0_0_8px_#fff]"
              >
                <FaGithub />
              </a>
              <a
                href={linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:scale-125 hover:text-blue-400 hover:drop-shadow-[0_0_8px_#60a5fa]"
              >
                <FaLinkedin />
              </a>
              <a
                href={facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="transition hover:scale-125 hover:text-blue-500 hover:drop-shadow-[0_0_8px_#3b82f6]"
              >
                <FaFacebook />
              </a>
            </div>
          </div>
        </div>

        <div className="my-10 border-t border-gray-700"></div>

        <div className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()}{" "}
          <span className="text-green-400 font-medium">Ganesh Chaudhary</span>. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;