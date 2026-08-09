import React from "react";
import { motion as Motion } from "framer-motion";
import { FaGraduationCap, FaTrophy } from "react-icons/fa";

const ACHIEVEMENTS = [
   {
    title: "Successfully completing Flutter Framework Training",
    organization: "Broadway Infosys",
    year: "15th Oct, 2023",
    details:
      "The program covered the fundamentals of cross-platform mobile development using the Flutter framework and the Dart programming language. It focused on UI design using material widgets, efficient state management strategies, consuming REST APIs, implementing secure storage, and advanced performance optimization techniques for seamless Android and iOS deployment.",
  },
  {
    title: "Successfully completed the Web Design Course",
    organization: "Conducted by Code IT",
    year: "04 Oct 2025",
    details:
      "The program covered Web Design fundamentals, HTML, CSS, Tailwind CSS, JavaScript, ES6, DOM manipulation, semantic coding practices, and web hosting deployment.",
  },
   {
    title: "Database Management System (SQL) Course",
    organization: "Conducted by Code IT",
    year: "24 Apr 2026",
    details:
      "During the course, the participant demonstrated practical skills in writing SQL queries, managing databases, creating tables, performing joins, and handling real-world data operations using MySQL.",
  },
];

const EDUCATION = [
  {
    degree: "Bachelor of Science in Information Technology (Bsc.IT)",
    institution: "University of Sunderland (U.K.)",
    year: "2019 - 2023",
    details: "Focused on core computer science subjects and web technologies.",
  },
];

const Education = () => {
  return (
    <section className="relative w-screen min-h-screen bg-gray-900 z-20 py-20">
      <div className="max-w-5xl mx-auto px-6">

        {/* ================= ACHIEVEMENTS ================= */}
        <Motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 
                     text-green-400 drop-shadow-[0_0_15px_rgba(0,255,0,0.7)]"
        >
          Achievements
        </Motion.h2>

        <div className="relative border-l-4 border-green-500/30 ml-6 space-y-16 mb-28">
          <span className="absolute left-[-2px] top-0 h-full w-[4px] bg-green-500 animate-pulse blur-sm opacity-50"></span>

          {ACHIEVEMENTS.map((ach, i) => (
            <Motion.div
              key={i}
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              viewport={{ once: true }}
              className="relative pl-12"
            >
              <Motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
                viewport={{ once: true }}
                className="absolute -left-[35px] top-2 flex items-center justify-center 
                           w-14 h-14 rounded-full bg-black border border-green-400/40 
                           shadow-[0_0_25px_rgba(0,255,0,0.6)]"
              >
                <FaTrophy className="text-green-400 text-2xl" />
              </Motion.div>

              <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 
                              border border-green-400/20 p-6 
                              shadow-lg hover:shadow-green-500/40 transition 
                              transform hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-white">
                  {ach.title}
                </h3>
                <p className="text-gray-300">{ach.organization}</p>
                <p className="text-sm text-green-400 font-medium mt-1">
                  {ach.year}
                </p>
                <p className="mt-3 text-gray-200">{ach.details}</p>
              </div>
            </Motion.div>
          ))}
        </div>

        {/* ================= EDUCATION ================= */}
        <Motion.h2
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-16 
                     text-green-400 drop-shadow-[0_0_15px_rgba(0,255,0,0.7)]"
        >
          My Education
        </Motion.h2>

        <div className="relative border-l-4 border-green-500/30 ml-6 space-y-16">
          <span className="absolute left-[-2px] top-0 h-full w-[4px] bg-green-500 animate-pulse blur-sm opacity-50"></span>

          {EDUCATION.map((edu, i) => (
            <Motion.div
              key={i}
              initial={{ opacity: 0, x: i % 2 === 0 ? -80 : 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="relative pl-12"
            >
              <Motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120, delay: i * 0.2 }}
                viewport={{ once: true }}
                className="absolute -left-[35px] top-2 flex items-center justify-center 
                           w-14 h-14 rounded-full bg-black border border-green-400/40 
                           shadow-[0_0_25px_rgba(0,255,0,0.6)]"
              >
                <FaGraduationCap className="text-green-400 text-2xl" />
              </Motion.div>

              <div className="bg-gradient-to-r from-gray-900/90 to-gray-800/90 
                              border border-green-400/20 p-6 
                              shadow-lg hover:shadow-green-500/40 transition 
                              transform hover:-translate-y-1">
                <h3 className="text-xl font-semibold text-white">
                  {edu.degree}
                </h3>
                <p className="text-gray-300">{edu.institution}</p>
                <p className="text-sm text-green-400 font-medium mt-1">
                  {edu.year}
                </p>
                <p className="mt-3 text-gray-200">{edu.details}</p>
              </div>
            </Motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Education;
