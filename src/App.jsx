import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/commonComponents/Navbar";
import SideBar from "./components/commonComponents/SideBar";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Footer from "./components/commonComponents/Footer";
import Register from "./components/adminComponents/Register";
import Login from "./components/adminComponents/Login";
import Dashboard from "./components/adminComponents/Dashboard";
import ShowProjects from "./components/projectComponents/ShowProject";
import EditProject from "./components/projectComponents/EditProject";
import AddProject from "./components/projectComponents/AddProject";
import AddSocialLink from "./components/socialLinks/AddSocialLink";
import Profile from "./components/adminComponents/Profile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <SideBar />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>

          <Route path="/admin/register" element={<Register />}></Route>
          <Route path="/admin/login" element={<Login />}></Route>
          <Route path="/admin/dashboard" element={<Dashboard />}></Route>
          <Route path="/admin/profile" element={<Profile />}></Route>

          <Route path="/projects" element={<ShowProjects />}></Route>
          <Route path="/projects/add" element={<AddProject />}></Route>
          <Route path="/projects/edit/:id" element={<EditProject />}></Route>

          <Route path="/socialLinks/add" element={<AddSocialLink />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

// export default App;

// import { useEffect } from "react";

// const App = () => {
//   useEffect(() => {
//     window.location.replace("https://niteshkumar-sage.vercel.app/");
//   }, []);

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h2>Website has moved 🚀</h2>
//       <p>
//         Redirecting to new website...
//         <br />
//         <a href="https://niteshkumar-sage.vercel.app/">
//           Click here if not redirected
//         </a>
//       </p>
//     </div>
//   );
// };

export default App;
