import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";
import { motion as Motion } from "framer-motion";

const AddProject = () => {
  const { addProject } = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    imgSrc: "",
    projectUrl: "",
    techUsed: "",
    desc: "",
    gitUrl: "",
    category: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { name, imgSrc, projectUrl, techUsed, desc, gitUrl, category } = formData;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addProject(name, imgSrc, projectUrl, techUsed, desc, gitUrl, category);
    if (result?.success) {
      setFormData({
        name: "",
        imgSrc: "",
        projectUrl: "",
        techUsed: "",
        desc: "",
        gitUrl: "",
        category: "",
      });
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900 flex items-center justify-center px-4 sm:px-6 py-12">
      <Motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl bg-gray-800 shadow-2xl p-8 sm:p-12 border-t-4 border-green-400"
      >
        {/* Heading */}
        <Motion.h1
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-3xl sm:text-4xl font-extrabold text-center text-green-400 mb-10 tracking-wide"
        >
          Add New Project
        </Motion.h1>

        {/* Form */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
          {[
            { label: "Project Name", name: "name", type: "text", placeholder: "Enter project name" },
            { label: "Image URL", name: "imgSrc", type: "text", placeholder: "https://example.com/image.jpg" },
            { label: "Project URL", name: "projectUrl", type: "text", placeholder: "https://example.com/project" },
            { label: "Technology Used", name: "techUsed", type: "text", placeholder: "React, Node.js, MongoDB" },
            { label: "GitHub Repo", name: "gitUrl", type: "text", placeholder: "https://github.com/username/repo" },
            { label: "Category", name: "category", type: "text", placeholder: "Web App, Mobile App, etc." },
          ].map((field) => (
            <Motion.div
              key={field.name}
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <label className="block text-sm font-semibold text-green-400 mb-2">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full px-4 py-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300"
              />
            </Motion.div>
          ))}

          {/* Description textarea */}
          <Motion.div
            className="md:col-span-2"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <label className="block text-sm font-semibold text-green-400 mb-2">Description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              rows="4"
              placeholder="Brief description about the project..."
              className="w-full px-4 py-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 resize-none"
            />
          </Motion.div>

          {/* Submit button */}
          <Motion.div className="md:col-span-2 text-center" whileHover={{ scale: 1.05 }} transition={{ type: "spring" }}>
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 text-lg shadow-lg transition duration-300"
            >
              Add Project 🚀
            </button>
          </Motion.div>
        </form>
      </Motion.div>
    </section>
  );
};

export default AddProject;
