import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import "./App.css";
import { use, useState } from "react";
import LoginForm from "./pages/LoginForm";
import Register from "./pages/Register";
import AdminDashboard from "./pages/AdminDashboard";
import { SsgCandidacy } from "./pages/candidacy/SsgCandidacy";
import AdminSidebar from "./components/AdminSidebar";
import { FaBars } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { BsitCandidacy } from "./pages/candidacy/BsitCandidacy";
import { SsgElection } from "./pages/election/SsgElection";

function App() {
  const location = useLocation();
  const hideSidebar = ["/login", "/register"].includes(location.pathname);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleBurgerClick = () => {
    if (mobileOpen) {
      setMobileOpen(false);
    } else {
      setMobileOpen(true);
    }
  };
  return (
    <div className="bg-base-200 min-h-screen">
      {/* Hamburger for mobile */}
      {!hideSidebar && (
        <div className="md:hidden fixed top-4 left-4 z-50">
          {mobileOpen ? (
            <FaXmark
              className="transition-all duration-300 opacity-100 scale-100 btn btn-square btn-ghost"
              onClick={handleBurgerClick}
            />
          ) : (
            <FaBars
              className="transition-all duration-300 opacity-100 scale-100 btn btn-square btn-ghost"
              onClick={handleBurgerClick}
            />
          )}
        </div>
      )}
      {!hideSidebar && (
        <AdminSidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
      )}
      <div className={hideSidebar ? "" : "md:ml-64"}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/candidacy/ssg" element={<SsgCandidacy />} />
          <Route path="/admin/candidacy/bsit" element={<BsitCandidacy />} />
          <Route path="/admin/election/ssg" element={<SsgElection />} />

          {/* Add more routes here */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
