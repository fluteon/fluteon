import React from "react";
import { Instagram, Facebook, WhatsApp } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#fff0f0] pt-6 text-center text-gray-800">
      {/* Logo & Title */}
      <div className="flex flex-col items-center gap-2">
        <img src="/favicon.ico" alt="Fluteon Logo" className="w-10 h-12 object-contain" />
        <h2 className="text-xl font-semibold font-serif">Fluteon</h2>
      </div>

      {/* Nav Links */}
      <div className="mt-3 flex flex-col gap-3 items-center">
        <button onClick={() => navigate("/")} className="bg-gray-200 px-6 py-2 rounded-full w-52 font-medium">Home</button>
        <button onClick={() => navigate("/about-us")} className="bg-gray-200 px-6 py-2 rounded-full w-52 font-medium">About Us</button>
        <button onClick={() => navigate("/contact-us")} className="bg-gray-200 px-6 py-2 rounded-full w-52 font-medium">Contact Us</button>
      </div>

      {/* Blob-Shaped Social Section */}
      <div className="relative ">
        <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-24 -mb-1">
          <path
            d="M0,100 C150,200 350,0 500,100 L500,150 L0,150 Z"
            fill="#f94f4f"
          />
        </svg>

        <div className="bg-[#f94f4f] text-white pt-4 pb-4 px-6">
          <h4 className="text-sm font-semibold mb-4 tracking-wider uppercase">
            social media buddies!
          </h4>
          <div className="flex justify-center gap-6 text-white mb-4">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook /></a>
            <a href="https://wa.me/919000000000" target="_blank" rel="noreferrer"><WhatsApp /></a>
          </div>
          <p className="text-xs">© 2025 All rights reserved</p>
          <div className="flex justify-center gap-4 text-xs mt-1">
            <a onClick={() => navigate("/terms-condition")} className="underline">Terms</a>
            <a onClick={() => navigate("/privaciy-policy")} className="underline">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
