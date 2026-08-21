import React, { useContext } from "react";
import { motion as Motion } from "framer-motion";
import myProfile from "../assets/profile.jpeg";
import {
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaLaptopCode,
  FaGithub,
  FaHtml5,
  FaCss3Alt,
  FaFigma,
  FaLayerGroup
} from "react-icons/fa";
import {
  SiDart,
  SiPostman,
  SiInsomnia,
  SiFlutter,
  SiMongodb,
  SiExpress,
  SiJavascript,
  SiTailwindcss,
  SiSocketdotio,
} from "react-icons/si";
import { TbBoxModel2 } from "react-icons/tb";

import AppContext from "../context/AppContext";
import { useEffect } from "react";

const skills = [
  { icon: <FaReact className="text-sky-400 text-2xl" />, name: "React.js" },
  { icon: <FaNodeJs className="text-green-500 text-2xl" />, name: "Node.js" },
  {
    icon: <SiExpress className="text-gray-300 text-2xl" />,
    name: "Express.js",
  },
  { icon: <SiMongodb className="text-green-400 text-2xl" />, name: "MongoDB" },
  {
    icon: <SiJavascript className="text-yellow-400 text-2xl" />,
    name: "JavaScript",
  },
  {
    icon: <SiSocketdotio className="text-indigo-400 text-2xl" />,
    name: "WebSockets",
  },
  {
    icon: <SiTailwindcss className="text-cyan-400 text-2xl" />,
    name: "Tailwind CSS",
  },
  { icon: <FaGithub className="text-gray-300 text-2xl" />, name: "GitHub" },
  { icon: <FaHtml5 className="text-orange-500 text-2xl" />, name: "HTML5" },
  { icon: <FaCss3Alt className="text-blue-500 text-2xl" />, name: "CSS3" },
  {
    icon: <FaLaptopCode className="text-pink-400 text-2xl" />,
    name: "Full Stack Dev",
  },
  { icon: <SiFlutter className="text-cyan-400 text-2xl" />, name: "Flutter" },
  { icon: <SiDart className="text-blue-500 text-2xl" />, name: "Dart" },
  { icon: <TbBoxModel2 className="text-blue-600 text-2xl" />, name: "BLoC" },
  { icon: <FaLayerGroup className="text-purple-500 text-2xl" />, name: "GetX" },
  { icon: <FaLayerGroup className="text-blue-400 text-2xl" />, name: "Riverpod" },
  { icon: <FaFigma className="text-pink-500 text-2xl" />, name: "Figma" },
  { icon: <SiPostman className="text-orange-500 text-2xl" />, name: "Postman" },
  { icon: <SiInsomnia className="text-purple-600 text-2xl" />, name: "Insomnia" },
];

const About = () => {
  const context = useContext(AppContext);
  const profile = context?.profile || "";

  useEffect(()=>{
    window.scrollTo({top:0 , behavior:"smooth"});
  }, [])

  return (
    <section
      id="about"
      className="relative min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex items-center justify-center px-6 py-16"
    >
      <div className="max-w-6xl w-full flex flex-col md:flex-row items-center gap-12">
        {/* Left - Image */}
        <Motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center"
        >
          {profile ? (
            <img
              src={myProfile}
              alt="Profile"
              className="w-56 sm:w-72 md:w-96 drop-shadow-[0_0_25px_rgba(0,255,0,0.4)] rounded-[5%]"
            />
          ) : (
            <div className="w-56 h-56 sm:w-72 sm:h-72 border border-green-500/30 rounded-full flex items-center justify-center text-gray-500">
              Profile
            </div>
          )}
        </Motion.div>

        {/* Right - Content */}
        <Motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 space-y-6 text-center md:text-left"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold uppercase fontOne">
            About{" "}
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Me
            </span>
          </h2>

          <p className="text-gray-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto md:mx-0 fontOne">
            Hello! I’m{" "}
            <span className="text-green-400 font-semibold">Ganesh Chaudhary</span>,
            a passionate{" "}
            <span className="text-blue-400">Full Stack Web Developer as well as Flutter Developer</span>{" "}
            specializing in the{" "}
            <span className="text-yellow-400">MERN stack and Mobile application</span>. I love building
            modern, scalable, and user-friendly applications that solve
            real-world problems and deliver great experiences.
          </p>

          {/* Skills Grid: 5 columns on large screens */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-3 pt-4 cursor-pointer">
            {skills.map((skill, index) => (
              <Motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg 
                   bg-gradient-to-br from-gray-900/70 to-gray-800/60 
                   border border-green-500/30 
                   shadow-[0_0_10px_rgba(34,197,94,0.3)] 
                   hover:shadow-[0_0_18px_rgba(34,197,94,0.7)] 
                   backdrop-blur-sm transition-all"
              >
                <div className="drop-shadow-[0_0_6px_rgba(34,197,94,0.7)]">
                  {skill.icon}
                </div>
                <p className="text-xs text-green-400 font-medium text-center truncate w-full">
                  {skill.name}
                </p>
              </Motion.div>
            ))}
          </div>
        </Motion.div>
      </div>
    </section>
  );
};

export default About;