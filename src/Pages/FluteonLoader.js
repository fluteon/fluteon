import React from "react";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import logo from "../assets/fluteon-logo.jpg";

const FluteonLoader = () => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/30 backdrop-blur-md">
      <div className="flex flex-col items-center">
        <motion.img
          src={logo}
          alt="Fluteon"
          className="mb-4 h-28 w-28 rounded-full shadow-lg"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.8,
          }}
          whileHover={{ scale: 1.1, rotate: 10 }}
          whileTap={{ scale: 0.9, rotate: -10 }}
        />
        <motion.div
          className="mt-2 text-xl font-bold text-gray-800 sm:text-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Typewriter
            words={["Welcome to Fluteon!"]}
            loop={1}
            cursor
            cursorStyle="_"
            typeSpeed={70}
            delaySpeed={1200}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default FluteonLoader;
