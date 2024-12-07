import React, { useState, useRef, useEffect } from "react";
import { navLinks, adminNavLink } from "../Constants/Constants";
import { Link, NavLink } from "react-router-dom";
import { getUser, removeToken, removeUser } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import logo from "../assets/surabhi.png";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(getUser());
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const navigate = useNavigate();

  const isAdmin = user?.role === "admin";
  const isAuthenticated = !!user;

  // Modify the desktop navigation section
  const navigationLinks = [...navLinks];
  if (isAdmin) {
    navigationLinks.push(adminNavLink);
  }

  // Add localStorage event listener
  useEffect(() => {
    const handleStorageChange = () => {
      setUser(getUser());
    };

    window.addEventListener("storage", handleStorageChange);

    // Check for user updates every 500ms
    const interval = setInterval(() => {
      const currentUser = getUser();
      if (JSON.stringify(currentUser) !== JSON.stringify(user)) {
        setUser(currentUser);
      }
    }, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [user]);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleLogout = () => {
    removeToken();
    removeUser();
    setUser(null);
    setIsProfileOpen(false);
    navigate("/login");
  };

  // Desktop profile dropdown
  const ProfileDropdown = () => (
    <div className="relative" ref={profileRef}>
      <button
        onClick={() => setIsProfileOpen(!isProfileOpen)}
        className="flex items-center gap-2 text-white hover:text-gray-200 transition-colors"
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
          {user?.fullName?.charAt(0) || "?"}
        </div>
        <span className="font-medium">{user?.fullName || "User"}</span>
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 mt-3 w-72 bg-black/80 backdrop-blur-lg rounded-xl shadow-2xl py-2 z-50 border border-white/10">
          <div className="px-6 py-4 border-b border-white/10">
            <p className="text-lg font-semibold text-white">{user?.fullName}</p>
            <p className="text-sm text-gray-300">{user?.email}</p>
          </div>
          <div className="px-6 py-4 border-b border-white/10">
            <p className="text-sm text-gray-300 flex justify-between">
              <span>College:</span>
              <span className="text-white">{user?.college}</span>
            </p>
            <p className="text-sm text-gray-300 flex justify-between mt-2">
              <span>ID:</span>
              <span className="text-white">{user?.collegeId}</span>
            </p>
            {user?.college !== "kluniversity" && (
              <p className="text-sm text-gray-300 flex justify-between mt-2">
                <span>Payment Status:</span>
                <span
                  className={`text-${
                    user?.paymentStatus === "approved" ? "green" : "yellow"
                  }-500`}
                >
                  {user?.paymentStatus}
                </span>
              </p>
            )}
          </div>
          <div className="px-4 py-3">
            <button
              onClick={handleLogout}
              className="w-full bg-gradient-to-r from-purple-500 to-violet-500 text-white py-2.5 rounded-lg font-medium hover:from-purple-600 hover:to-violet-600 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Logout</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const MobileProfile = () => (
    <div className="border-t border-white/10 pt-6 mt-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-lg">
          {user?.fullName?.charAt(0) || "?"}
        </div>
        <div>
          <p className="text-white font-semibold text-lg">
            {user?.fullName || "User"}
          </p>
          <p className="text-gray-300 text-sm">{user?.email}</p>
        </div>
      </div>
      <button
        onClick={handleLogout}
        className="w-full bg-gradient-to-r from-purple-500 to-violet-500 text-white py-3 rounded-lg font-medium hover:from-purple-600 hover:to-violet-600 transition-all duration-300 flex items-center justify-center gap-2"
      >
        <span>Logout</span>
      </button>
    </div>
  );

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm p-4">
      <div className="flex justify-between items-center">
        {/* Logo moved to left */}
        <Link to="/" className="flex gap-2 items-center">
          <img src={logo} alt="logo" className="w-10 h-12" />
          <div className="flex gap-2 items-center">
            <h1 className="text-2xl font-bold font-saint-carell text-white hover:text-gray-300 transition-colors">
              SURABHI
            </h1>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex gap-8 font-semibold">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.title}
              to={link.to}
              className={({ isActive }) =>
                isActive
                  ? "bg-white text-black px-4 py-1 rounded-md transition-all duration-300 ease-in-out text-lg"
                  : "text-white hover:text-gray-300 transition-all duration-300 ease-in-out text-lg"
              }
            >
              {link.title}
            </NavLink>
          ))}
        </div>

        {/* Desktop Auth Section and Hamburger Menu */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:block">
            {user ? (
              <ProfileDropdown />
            ) : (
              <div className="flex gap-4">
                <NavLink
                  to="/login"
                  className="bg-white text-black px-6 py-2 rounded-md hover:bg-gray-200 transition-colors font-medium"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className="bg-transparent text-white border-2 border-white px-6 py-2 rounded-md hover:bg-white hover:text-black transition-all font-medium"
                >
                  Register
                </NavLink>
              </div>
            )}
          </div>

          {/* Hamburger Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white focus:outline-none z-50 relative w-10 h-10 rounded-full bg-purple-500/20 backdrop-blur-sm flex items-center justify-center hover:bg-purple-500/30 transition-all duration-300"
          >
            <div className="w-5 h-4 flex flex-col justify-between relative">
              <span
                className={`block h-0.5 bg-white transform transition-all duration-300 rounded-full ${
                  isOpen ? "rotate-45 translate-y-1.5 w-5" : "w-5"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-white transition-all duration-300 rounded-full ${
                  isOpen ? "opacity-0 w-5" : "w-4 ml-1"
                }`}
              ></span>
              <span
                className={`block h-0.5 bg-white transform transition-all duration-300 rounded-full ${
                  isOpen ? "-rotate-45 -translate-y-1.5 w-5" : "w-3 ml-2"
                }`}
              ></span>
            </div>
          </button>
        </div>
      </div>

      <div
        className={`lg:hidden fixed top-0 right-0 h-screen w-screen bg-black backdrop-blur-lg transform transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } z-40 overflow-y-auto`}
      >
        <div className="flex flex-col items-center gap-8 p-8 w-full h-full">
          <div className="w-full flex flex-col gap-6 mt-16">
            {navigationLinks.map((link) => (
              <NavLink
                key={link.title}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "bg-purple-800 text-white px-6 py-3 rounded-xl transition-all duration-300 ease-in-out text-xl w-full text-center shadow-lg"
                    : "text-white hover:bg-purple-500/20 px-6 py-3 rounded-xl transition-all duration-300 ease-in-out text-xl w-full text-center"
                }
              >
                {link.title}
              </NavLink>
            ))}
          </div>

          {user ? (
            <MobileProfile />
          ) : (
            <div className="flex flex-col gap-4 w-full mt-4">
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className="bg-white text-black px-6 py-3 rounded-xl hover:bg-gray-200 transition-all font-medium text-center text-lg"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className="bg-transparent text-white border-2 border-white px-6 py-3 rounded-xl hover:bg-white hover:text-black transition-all font-medium text-center text-lg"
              >
                Register
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
