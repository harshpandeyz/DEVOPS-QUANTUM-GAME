import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Gamepad2, ShoppingCart, User } from "lucide-react";

export default function Navbar() {

  // ✅ Safe debug log (Commit 11)
  console.log("Navbar component rendered");

  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("gameHubLoggedIn") === "true"
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem("gameHubLoggedIn") === "true");
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const logout = () => {
    localStorage.removeItem("gameHubLoggedIn");
    alert("👋 Logged out successfully!");
    setIsLoggedIn(false);
    window.location.href = "/login";
  };

  return (
    <nav className="navbar-container">
      <div className="nav-inner container">

        {/* Logo */}
        <Link to="/" className="nav-logo" title="Go to Game Hub Home">
          <Gamepad2 size={28} /> <span>Game Hub</span>
        </Link>

        <div className="menu-toggle" onClick={() => setOpen(!open)}>
          ☰
        </div>

        <div className={`nav-links ${open ? "active" : ""}`}>
          <NavLink to="/" className="nav-item">Home</NavLink>
          <NavLink to="/games" className="nav-item">Games</NavLink>
          <NavLink to="/about" className="nav-item">About</NavLink>
          <NavLink to="/contact" className="nav-item">Contact</NavLink>
          <NavLink to="/cart" className="nav-item cart-btn">
            <ShoppingCart size={18} /> Cart
          </NavLink>
        </div>

        <div className={`auth-section ${open ? "active" : ""}`}>
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="nav-login">
                <User size={15}/> Login
              </Link>
              <Link to="/register" className="nav-register">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" className="nav-login">Profile</Link>
              <button
                onClick={logout}
                className="nav-register"
                style={{ border:"none", background:"none" }}
              >
                Logout
              </button>
            </>
          )}
        </div>

      </div>
    </nav>
  );
}