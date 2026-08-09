import React, { useContext, useState } from "react";
import AppContext from "../../context/AppContext";

const AddSocialLink = () => {
  const { addSocialLinks, isAuthenticated } = useContext(AppContext);

  const [formData, setFormData] = useState({
    key: "",
    value: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.key || !formData.value) {
      alert("Please fill in both fields.");
      return;
    }

    const result = await addSocialLinks(formData.key, formData.value);
    if (result?.data.success) {
      setFormData({ key: "", value: "" }); // reset form
    }
  };

  return (
    <>
      {isAuthenticated && (
        <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-900 via-black to-gray-900 px-4 py-12">
          <div className="w-full max-w-md bg-gray-800 shadow-2xl p-8 border-t-4 border-green-500">
            <h1 className="text-2xl font-bold text-green-400 text-center mb-8">
              Add Social Link
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Key field */}
              <div>
                <label
                  htmlFor="key"
                  className="block text-sm font-semibold text-green-400 mb-2"
                >
                  Key (e.g., GitHub, LinkedIn)
                </label>
                <input
                  type="text"
                  name="key"
                  value={formData.key}
                  onChange={handleChange}
                  placeholder="Enter platform name"
                  className="w-full px-4 py-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Value field */}
              <div>
                <label
                  htmlFor="value"
                  className="block text-sm font-semibold text-green-400 mb-2"
                >
                  Value (URL)
                </label>
                <input
                  type="url"
                  name="value"
                  value={formData.value}
                  onChange={handleChange}
                  placeholder="https://example.com"
                  className="w-full px-4 py-3 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              {/* Button */}
              <div className="text-center">
                <button
                  type="submit"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 text-lg shadow-md transition duration-300"
                >
                  Add Link ➕
                </button>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default AddSocialLink;
