// src/components/Footer.tsx
import React from "react";
import { Facebook, Linkedin, Send } from "lucide-react";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-12 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <img src="/logo/small-logo.png" alt="Koh Thmey Logo" />
              </div>
              <span className="text-xl font-bold">Koh Thmey Technology</span>
            </div>
            <p className="text-blue-100 mb-4 max-w-md">
              Leading the digital future in Southeast Asia through innovation, integrity, and excellence.
            </p>

            {/* Contact Info */}
            <div className="space-y-2 mb-6">
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-blue-100">(+855) 023922788</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-blue-100">info@kohthmey.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-blue-100">
                  Lot No.358, Samdach Sothearos Blvd, Phum 8, Sangkat Tonle Bassac, Khan Chamkarmon, Phnom Penh
                </span>
              </div>
            </div>

            {/* Social Media */}
            <h4 className="text-sm font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/kohthmeykh" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors"><Facebook size={20} /></a>
              <a href="https://www.linkedin.com/company/koh-thmey-technology-co-ltd/" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors"><Linkedin size={20} /></a>
              <a href="https://t.me/kohthmey" className="bg-blue-800 hover:bg-blue-700 p-2 rounded-full transition-colors"><Send size={20} /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/aboutus" className="text-blue-100 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/services" className="text-blue-100 hover:text-white transition-colors">Services</Link></li>
              <li><Link to="/brands" className="text-blue-100 hover:text-white transition-colors">Brands</Link></li>
              <li><Link to="/careers" className="text-blue-100 hover:text-white transition-colors">Careers</Link></li>
              <li><Link to="/contactform" className="text-blue-100 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Core Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Core Services</h3>
            <ul className="space-y-2">
              <li><a href="#media" className="text-blue-100 hover:text-white transition-colors">Media Publishing</a></li>
              <li><a href="#events" className="text-blue-100 hover:text-white transition-colors">Event Planning</a></li>
              <li><a href="#video" className="text-blue-100 hover:text-white transition-colors">Video Production</a></li>
              <li><a href="#social" className="text-blue-100 hover:text-white transition-colors">Social Media</a></li>
              <li><a href="#ads" className="text-blue-100 hover:text-white transition-colors">Ads & Marketing</a></li>
            </ul>
          </div>
        </div>        

        {/* Separator */}
        <Separator className="bg-blue-800 my-6" />

        {/* Copyright */}
        <div className="text-center text-blue-200 text-sm">
          <p>© {new Date().getFullYear()} Koh Thmey Technology. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
