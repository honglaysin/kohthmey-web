import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  logo?: string;
  navLinks?: Array<{ title: string; href: string }>;
}

const Header = ({
  logo = "/logo/logo.png",
  navLinks = [
    { title: "Home", href: "/#" },
    { title: "About Us", href: "/AboutUs" },
    { title: "Services", href: "/Services" },
    { title: "Our Produce", href: "/Brands" },
    { title: "Careers", href: "/Careers" },
    { title: "Contact", href: "/ContactForm" },
  ],
}: HeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Koh Thmey Technology" className="h-12" />
          <span
            className={`ml-2 font-bold text-xl ${
              isScrolled ? "text-gray-900" : "text-gray-900"
            }`}
          ></span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className={`font-medium hover:text-[#1E40AF] transition-colors ${
                isScrolled ? "text-gray-800" : "text-gray-900"
              }`}
            >
              {link.title}
            </Link>
          ))}
          <Link to="/ContactForm" className="hidden md:inline-block">
            <Button className="bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-white ml-4">
              Work With Us
            </Button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden ${isScrolled ? "text-gray-800" : "text-gray-900"}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.title}
                to={link.href}
                className="text-gray-900 font-medium hover:text-[#1E40AF] transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.title}
              </Link>
            ))}
            <Button
              className="bg-[#1E40AF] hover:bg-[#1E40AF]/90 text-white w-full"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Work With Us
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
