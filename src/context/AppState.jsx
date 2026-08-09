import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = ({ children }) => {
  const url = "https://portfolio-backend-gh7i.onrender.com";
  // const url = "https://nitesh-kumar-cqn2.onrender.com/api";

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);
  const [admin, setAdmin] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [projects, setProjects] = useState([]);

  // fetch Admin
  useEffect(() => {
    const fetchAdmin = async () => {
      const mainAdmin = await axios.get(`${url}/admin/get`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log(mainAdmin.data.admins[0]);
      setAdmin(mainAdmin.data.admins[0]);
    };

    fetchAdmin();
  }, []);
  // fetch social Links
  useEffect(() => {
    const fetchSocialLinks = async () => {
      const mySocialLinks = await axios.get(`${url}/socialLinks/`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log(mySocialLinks.data.data);
      setSocialLinks(mySocialLinks.data.data);
      return mySocialLinks;
    };
    fetchSocialLinks();
  }, []);
  // fetch logo from db/
  const logo = socialLinks?.find((link) => link.key === "logo")?.value || "#";
  const profile =
    socialLinks?.find((link) => link.key === "profile")?.value || "#";

  // fetch Ptojects
  useEffect(() => {
    const fetchProjects = async () => {
      const myProjects = await axios.get(`${url}/project/`, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // console.log(myProjects.data.projects);
      setProjects(myProjects.data.projects);
    };
    fetchProjects();
  }, []);
  // Register admin
  const register = async (
    userName,
    name,
    profile,
    email,
    phone,
    password,
    address,
    fatherName,
    education,
    marital,
    dob,
    exp
  ) => {
    try {
      const res = await axios.post(`${url}/admin/register`, {
        userName,
        name,
        profile,
        email,
        phone,
        password,
        address,
        fatherName,
        education,
        marital,
        dob,
        exp,
      });

      if (res.data.success) {
        toast.success("✅ Registered successfully!");
        return res.data;
      } else {
        toast.error(res.data.message || "Registration failed");
        return res.data;
      }
    } catch (err) {
      console.error("Register error:", err);
      toast.error("Server error while registering ❌");
      return { success: false };
    }
  };
  // Login admin
  const login = async (emailOrUsername, password) => {
    try {
      const res = await axios.post(`${url}/admin/login`, {
        email: emailOrUsername,
        password,
      });

      if (res.data.success && res.data.token) {
        localStorage.setItem("token", res.data.token);
        setToken(res.data.token);
        setIsAuthenticated(true);
        toast.success(res.data.message);
      } else {
        toast.error(res.data.message || "Login failed!");
      }

      return res.data;
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong!");
      console.error(err);
    }
  };
  //logout
  const logout = async () => {
    setAdmin("");
    setIsAuthenticated(false);
    localStorage.removeItem("token");
    toast.success("Logout successfully ✅");
  };
  // addProject
  const addProject = async (
    name,
    imgSrc,
    projectUrl,
    techUsed,
    desc,
    gitUrl,
    category
  ) => {
    try {
      const res = await axios.post(
        `${url}/project/add`,
        {
          name,
          imgSrc,
          projectUrl,
          techUsed,
          desc,
          gitUrl,
          category,
        },
        {
          headers: { "Content-Type": "application/json", Auth: token },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      return res;
    } catch (error) {
      toast.error(error.res?.data?.message || "Something went wrong!");
      console.error(error);
    }
  };
  // delete project
  const deleteProject = async (id) => {
    try {
      const res = await axios.delete(`${url}/project/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res;
    } catch (error) {
      toast.error(error.res?.data?.message || "Something went wrong!");
      console.error(error);
    }
  };
  // edit project
  const editProject = async (
    id,
    name,
    imgSrc,
    projectUrl,
    techUsed,
    desc,
    gitUrl,
    category
  ) => {
    try {
      const res = await axios.put(
        `${url}/project/edit/${id}`,
        {
          name,
          imgSrc,
          projectUrl,
          techUsed,
          desc,
          gitUrl,
          category,
        },
        {
          headers: { "Content-Type": "application/json", Auth: token },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success("Project updated ✅");
      } else {
        toast.error(res.data.message || "Update failed ❌");
      }

      return res.data;
    } catch (err) {
      console.error("Update project error:", err);
      toast.error("Server error while updating project ❌");
      return { success: false };
    }
  };
  const addSocialLinks = async (key, value) => {
    try {
      const res = await axios.post(
        `${url}/socialLinks/add`,
        { key, value },
        {
          headers: { "Content-Type": "application/json", Auth: token },
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      return res;
    } catch (error) {
      toast.error(error.res?.data?.message || "Something went wrong!");
      console.error(error);
    }
  };
  const deleteSocialLinks = async (id) => {
    try {
      const res = await axios.delete(`${url}/socialLinks/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Auth: token,
        },
        withCredentials: true,
      });
      toast.success(res.data.message);
      return res;
    } catch (error) {
      toast.error(error.res?.data?.message || "Something went wrong!");
      console.error(error);
    }
  };

  const sendMessage = async (name, email, message) => {
    try {
      const res = await axios.post(`${url}/contact/send`, {
        name,
        email,
        message,
      });
      return res.data;
    } catch (error) {
      console.error("Error sending message ❌:", error);
      return { success: false, message: "Failed to send message" };
    }
  };
  return (
    <>
      <ToastContainer />
      <AppContext.Provider
        value={{
          token,
          logo,
          profile,
          isAuthenticated,
          register,
          login,
          logout,

          admin,
          setAdmin,
          socialLinks,
          setSocialLinks,
          projects,

          addProject,
          deleteProject,
          editProject,

          addSocialLinks,
          deleteSocialLinks,

          sendMessage,
        }}
      >
        {children}
      </AppContext.Provider>
    </>
  );
};

export default AppState;
