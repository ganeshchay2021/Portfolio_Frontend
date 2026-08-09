import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion as Motion } from "framer-motion";
import AppContext from "../../context/AppContext";

const Dashboard = () => {
  const {
    logout,
    admin,
    projects,
    setProjects,
    deleteProject,
    socialLinks,
    setSocialLinks,
    deleteSocialLinks,
    isAuthenticated,
  } = useContext(AppContext);

  const navigate = useNavigate();

  // delete project
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (!confirmDelete) return;
    const result = await deleteProject(id);
    if (result?.success) {
      setProjects((prev) => prev.filter((p) => p._id !== id));
    }
  };

  // delete social link
  const handleDeleteSocialLinks = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this Link?"
    );
    if (!confirmDelete) return;
    const result = await deleteSocialLinks(id);
    if (result?.success) {
      setSocialLinks((prev) => prev.filter((link) => link._id !== id));
    }
  };

  // logout
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      {isAuthenticated ? (
        <section className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
          {/* Header */}
          <Motion.header
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-800 p-4 text-center shadow-md"
          >
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <h2 className="text-sm mt-1 text-green-400">
              Welcome, {admin?.name || "Admin"} 👋
            </h2>
          </Motion.header>

          {/* Main Content */}
          <section className="flex flex-col md:flex-row flex-1 overflow-hidden">
            {/* Left Sidebar */}
            <Motion.div
              initial={{ x: -80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full md:w-1/4 bg-gray-800 p-6 flex flex-col items-center border-r border-gray-700"
            >
              <div className="w-24 h-24 overflow-hidden border-2 border-green-500 mb-4">
                <img
                  src={admin?.profile || "/default-profile.png"}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Link
                  to={"/admin/profile"}
                  className="bg-blue-600 hover:bg-blue-500 text-center text-white py-2"
                >
                  Profile
                </Link>
                <Link
                  to={"/"}
                  className="bg-green-600 hover:bg-green-500 py-2 text-center text-white"
                >
                  Home
                </Link>
                <Link
                  to={"/admin/register"}
                  className="bg-yellow-500 hover:bg-yellow-400 text-center text-white py-2"
                >
                  Create New Admin
                </Link>
                <button
                  className="bg-red-600 hover:bg-red-500 py-2 text-white"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            </Motion.div>

            {/* Center Column - Projects */}
            <Motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full md:w-2/4 p-6"
            >
              <h2 className="text-xl font-semibold mb-4">My Projects</h2>

              {projects?.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...projects].reverse().map((project, i) => (
                    <Motion.div
                      key={project._id}
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.5, delay: i * 0.15 }}
                      className="relative bg-gray-800 p-4 shadow-md hover:shadow-lg transition"
                    >
                      {/* Edit/Delete buttons */}
                      <div className="absolute top-2 right-2 flex gap-2">
                        <button
                          onClick={() =>
                            navigate(`/projects/edit/${project._id}`)
                          }
                          className="text-xs px-2 py-1 bg-yellow-500 hover:bg-yellow-400"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(project._id)}
                          className="text-xs px-2 py-1 bg-red-600 hover:bg-red-500"
                        >
                          🗑️
                        </button>
                      </div>
                      <h3 className="font-bold text-lg text-green-400">
                        {project.name}
                      </h3>
                      <p className=" text-red-400 text-sm">
                        id : {project._id}
                      </p>
                      <p className="text-blue-300 text-sm">
                        Technology : {project.techUsed}
                      </p>
                      <p className="text-purple-400 text-sm">
                        Category : {project.category}
                      </p>
                      <p className="text-yellow-300 text-sm">{project.desc}</p>
                    </Motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400">No projects found.</p>
              )} : (
              <p className="text-gray-400">No projects found.</p>
              )
            </Motion.div>

            {/* Right Column - Social Links & Actions */}
            <Motion.div
              initial={{ x: 80, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full md:w-1/4 bg-gray-800 p-6 flex flex-col gap-3 border-l border-gray-700"
            >
              <Link
                className="bg-green-600 py-2 text-center hover:bg-green-500"
                to={"/projects/add"}
              >
                ➕ Add Project
              </Link>
              <Link
                className="bg-blue-600 py-2 text-center hover:bg-blue-500"
                to={"/projects"}
              >
                👀 View All Projects
              </Link>
              <Link
                className="bg-green-600 py-2 text-center hover:bg-green-500"
                to={"/socialLinks/add"}
              >
                ➕ Add Social Links
              </Link>
              <Link
                className="bg-blue-600 py-2 text-center hover:bg-blue-500"
                to={"/socialLinks"}
              >
                👀 View Social Links
              </Link>

              {/* Social Links */}
              <div className="w-full border border-green-600 rounded-md overflow-hidden shadow-md">
                {socialLinks?.length > 0 ? (
                  socialLinks.map((links) => (
                    <div
                      key={links._id}
                      className="flex flex-col sm:flex-row justify-between items-start sm:items-center px-4 py-3 gap-2 bg-gray-900 hover:bg-gray-800 transition duration-300 border-b border-green-700 last:border-b-0"
                    >
                      {/* Key */}
                      <p className="font-semibold text-green-400 uppercase tracking-wide text-sm">
                        {links.key}
                      </p>

                      {/* Value */}
                      <a
                        href={links.value}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-300 hover:text-blue-400 truncate max-w-full sm:max-w-[60%] text-sm"
                      >
                        {links.value}
                      </a>

                      {/* Delete button */}
                      <button
                        onClick={() => handleDeleteSocialLinks(links._id)}
                        className="px-3 py-1 text-xs sm:text-sm font-semibold text-white bg-red-600 hover:bg-red-500 transition"
                      >
                        Delete
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400 text-center py-4">
                    No social links added yet.
                  </p>
                )}
              </div>
            </Motion.div>
          </section>
        </section>
      ) : (
        <p className="text-center text-red-500 mt-10">
          Please login as Admin to access.
        </p>
      )}
    </>
  );
};

export default Dashboard;
