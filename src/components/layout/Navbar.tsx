
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, User, Sun } from "lucide-react";
import { WeatherWidget } from "./WeatherWidget";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 60) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={closeMenu}>
          <h1 className="text-2xl font-bold text-ducati-red">V4S.CH</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link
            to="/"
            className={isActive("/") ? "nav-link-active" : "nav-link"}
          >
            Startseite
          </Link>
          <Link
            to="/about"
            className={isActive("/about") ? "nav-link-active" : "nav-link"}
          >
            Über Uns
          </Link>
          <Link
            to="/gallery"
            className={isActive("/gallery") ? "nav-link-active" : "nav-link"}
          >
            Galerie
          </Link>
          <Link to="/login" className="btn-primary flex items-center">
            <User className="h-4 w-4 mr-2" />
            Login
          </Link>
          <WeatherWidget />
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden space-x-4">
          <WeatherWidget mobile={true} />
          <button
            onClick={toggleMenu}
            className="text-ducati-black hover:text-ducati-red transition-colors"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden pt-20`}
      >
        <nav className="flex flex-col items-center space-y-6 p-8">
          <Link
            to="/"
            className={`text-xl ${isActive("/") ? "nav-link-active" : "nav-link"}`}
            onClick={closeMenu}
          >
            Startseite
          </Link>
          <Link
            to="/about"
            className={`text-xl ${isActive("/about") ? "nav-link-active" : "nav-link"}`}
            onClick={closeMenu}
          >
            Über Uns
          </Link>
          <Link
            to="/gallery"
            className={`text-xl ${isActive("/gallery") ? "nav-link-active" : "nav-link"}`}
            onClick={closeMenu}
          >
            Galerie
          </Link>
          <Link
            to="/login"
            className="btn-primary w-full text-center flex items-center justify-center"
            onClick={closeMenu}
          >
            <User className="h-5 w-5 mr-2" />
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
