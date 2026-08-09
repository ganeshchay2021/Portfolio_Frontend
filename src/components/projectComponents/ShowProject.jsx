import React, { useContext, useState, useMemo } from "react";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaEdit,
  FaTrash,
  FaSearch,
} from "react-icons/fa";
import { motion, useScroll, useSpring } from "framer-motion";
import AppContext from "../../context/AppContext";
import { useNavigate } from "react-router-dom";

const ShowProject = () => {
  const { projects, deleteProject, isAuthenticated } = useContext(AppContext);
  const navigate = useNavigate();

  // progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Search & Filter states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;
    const result = await deleteProject(id);
    return result;
  };

  // Unique categories from projects
  const categories = useMemo(() => {
    if (!projects) return [];
    const allCats = projects.map((p) => p.category).filter(Boolean);
    return ["All", ...new Set(allCats)];
  }, [projects]);

  // Filter projects safely
  const filteredProjects = useMemo(() => {
    if (!projects) return [];
    return [...projects].reverse().filter((project) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        (project?.name?.toLowerCase() || "").includes(search) ||
        (project?.description?.toLowerCase() || "").includes(search) ||
        (project?.techUsed?.toLowerCase() || "").includes(search);

      const matchesCategory =
        selectedCategory === "All" ||
        (project?.category?.toLowerCase() || "") ===
          selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [projects, searchTerm, selectedCategory]);

  return (
    <main className="min-h-screen bg-gray-900 text-white px-6 py-12">
      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-green-500 origin-left z-50"
        style={{ scaleX }}
      />

      <h1 className="text-3xl font-bold text-green-400 text-center mb-10">
        My Projects
      </h1>

      {/* Search + Filter */}
      <div className="max-w-4xl mx-auto mb-10 flex flex-col md:flex-row gap-4 items-center">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-800 px-4 py-2  w-full md:w-1/2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none w-full text-white"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 justify-center md:justify-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 cursor-pointer hover:bg-green-500  text-sm ${
                selectedCategory.toLowerCase() === cat.toLowerCase()
                  ? "bg-green-600"
                  : "bg-gray-700 hover:bg-gray-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Project List */}
      <div className="space-y-16 max-w-4xl mx-auto">
        {filteredProjects && filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div
              key={project._id}
              className="grid md:grid-cols-2 gap-10 items-center border-b border-gray-700 pb-10"
            >
              {/* Left - Image */}
              <img
                src={project.imgSrc}
                alt={project.name}
                className="w-full h-72 object-cover shadow-lg"
              />

              {/* Right - Details */}
              <div>
                <h2 className="text-2xl font-bold text-green-300 mb-3">
                  {project?.name}
                </h2>
                <p className="text-gray-300 mb-3">{project?.description}</p>
                <p className="text-gray-400 mb-2">
                  <span className="font-semibold">Technology Used : </span>{" "}
                  {project?.techUsed}
                </p>
                <p className="text-gray-400 mb-2">
                  <span className="font-semibold">Category : </span>{" "}
                  {project?.category}
                </p>
                <p className="text-gray-400 mb-2">
                  <span className="font-semibold">Description : </span>{" "}
                  {project?.desc}
                </p>
                <p className="text-gray-500 mb-6 text-sm">
                  Created At:{" "}
                  {project?.createdAt
                    ? new Date(project.createdAt).toDateString()
                    : "N/A"}
                </p>

                <div className="flex flex-wrap gap-3">
                  {project?.gitUrl && (
                    <a
                      href={project.gitUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 px-4 py-2 text-sm"
                    >
                      <FaGithub /> GitHub
                    </a>
                  )}
                  {project?.projectUrl && (
                    <a
                      href={project.projectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 bg-green-600 hover:bg-green-500 px-4 py-2 text-sm"
                    >
                      <FaExternalLinkAlt /> Live
                    </a>
                  )}
                  {isAuthenticated && (
                    <>
                      <button
                        onClick={() =>
                          navigate(`/projects/edit/${project._id}`)
                        }
                        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 text-sm"
                      >
                        <FaEdit /> Edit
                      </button>
                      <button
                        onClick={() => {
                          handleDelete(project._id);
                          window.location.reload();
                        }}
                        className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 text-sm"
                      >
                        <FaTrash /> Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400">Loading Please Wait ...</p>
        )}
      </div>
    </main>
  );
};

export default ShowProject;
