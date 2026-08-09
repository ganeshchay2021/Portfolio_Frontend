import React, { useContext } from "react";
import { motion as Motion } from "framer-motion";
import { FaGithub, FaExternalLinkAlt, FaEdit, FaTrash } from "react-icons/fa";
import AppContext from "../../context/AppContext"; // adjust path

const ShowProjects = () => {
  const { projects } = useContext(AppContext);

  // Dummy handlers
  const handleEdit = (project) => {
    console.log("Edit clicked:", project);
    // you can open a modal or redirect to edit page
  };

  const handleDelete = (project) => {
    console.log("Delete clicked:", project);
    // call API or context delete function
  };

  return (
    <section
      id="projects"
      className="relative min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 text-white px-6 py-16"
    >
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <Motion.h2
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center uppercase"
        >
          My{" "}
          <span className="bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            Projects
          </span>
        </Motion.h2>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {projects && projects.length > 0 ? (
            [...projects].reverse().map((project, i) => (
              <Motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                className="relative group bg-gray-800/30 border border-gray-700 backdrop-blur-sm shadow-lg overflow-hidden hover:shadow-green-500/20 transition-all duration-500 flex flex-col"
              >
                {/* Image */}
                <div className="overflow-hidden">
                  <img
                    src={project.imgSrc}
                    alt={project.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-4 flex-1">
                  <h3 className="text-lg font-semibold text-green-400">
                    {project.name}
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    {project.technology}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {new Date(project.createdAt).toDateString()}
                  </p>
                </div>

                {/* Footer actions */}
                <div className="flex justify-between items-center px-4 py-3 border-t border-gray-700 text-sm">
                  <div className="flex gap-3">
                    <a
                      href={project.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-gray-700 hover:bg-gray-600 px-3 py-1 transition"
                    >
                      <FaGithub /> Code
                    </a>
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-green-600 hover:bg-green-500 px-3 py-1 transition"
                    >
                      <FaExternalLinkAlt /> Live
                    </a>
                  </div>

                  {/* Edit / Delete buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="flex items-center gap-1 bg-blue-600 hover:bg-blue-500 px-3 py-1 transition"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project)}
                      className="flex items-center gap-1 bg-red-600 hover:bg-red-500 px-3 py-1 transition"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </Motion.div>
            ))
          ) : (
            <p className="text-center text-gray-400">No projects found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default ShowProjects;
