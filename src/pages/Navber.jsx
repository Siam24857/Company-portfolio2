// Navbar.jsx
import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, 
  X, 
  Sparkles, 
  Home, 
  Info, 
  Mail, 
  ArrowRight,
  Code2
} from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", path: "/", icon: Home },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Mail },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0a0a0f]/80 backdrop-blur-xl border-b border-white/10 py-3"
            : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* ============================================ */}
            {/* LOGO */}
            {/* ============================================ */}
            <Link to="/" className="relative group">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3"
              >
                {/* Logo Icon */}
                <div className="relative">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 
                                  flex items-center justify-center shadow-lg shadow-cyan-500/25
                                  group-hover:shadow-cyan-500/50 transition-shadow duration-300">
                    <Code2 className="w-5 h-5 text-white" />
                  </div>
                  {/* Animated glow */}
                  <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-xl bg-cyan-500/40 blur-md -z-10"
                  />
                </div>

                {/* Logo Text */}
                <div className="flex flex-col leading-none">
                  <span className="text-xl font-bold text-white tracking-tight">
                    IDE<span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">ONS</span>
                  </span>
                  <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">
                    Software
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* ============================================ */}
            {/* DESKTOP NAVIGATION */}
            {/* ============================================ */}
            <div className="hidden md:flex items-center gap-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                     ${isActive 
                       ? "text-white" 
                       : "text-gray-400 hover:text-white"
                     }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active background */}
                      {isActive && (
                        <motion.div
                          layoutId="activeNav"
                          className="absolute inset-0 rounded-xl bg-white/5 border border-white/10"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      
                      {/* Hover background */}
                      {!isActive && (
                        <motion.div
                          className="absolute inset-0 rounded-xl bg-white/5 opacity-0 hover:opacity-100 transition-opacity duration-300"
                        />
                      )}

                      <span className="relative z-10 flex items-center gap-2">
                        {link.name}
                        {isActive && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                          />
                        )}
                      </span>
                    </>
                  )}
                </NavLink>
              ))}
            </div>

            {/* ============================================ */}
            {/* CTA BUTTON + MOBILE TOGGLE */}
            {/* ============================================ */}
            <div className="flex items-center gap-3">
              {/* CTA Button - Desktop */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="hidden md:block"
              >
                <Link to="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative group px-5 py-2.5 rounded-xl overflow-hidden
                               bg-gradient-to-r from-cyan-500 to-blue-600 
                               text-white text-sm font-semibold
                               shadow-lg shadow-cyan-500/25
                               hover:shadow-cyan-500/40 transition-shadow duration-300"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      <Sparkles className="w-4 h-4" />
                      Get Started
                    </span>
                    {/* Animated gradient overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
              </motion.div>

              {/* Mobile Menu Toggle */}
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden relative w-11 h-11 rounded-xl 
                           bg-white/5 border border-white/10 
                           flex items-center justify-center
                           text-white hover:bg-white/10 transition-colors"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="w-5 h-5" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom gradient line */}
        {scrolled && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            className="absolute bottom-0 left-0 right-0 h-px 
                       bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
          />
        )}
      </motion.nav>

      {/* ============================================ */}
      {/* MOBILE MENU */}
      {/* ============================================ */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm z-50 md:hidden
                         bg-[#0a0a0f]/95 backdrop-blur-xl 
                         border-l border-white/10
                         flex flex-col"
            >
              {/* Decorative orbs */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

              {/* Menu Header */}
              <div className="relative flex items-center justify-between p-6 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 
                                  flex items-center justify-center">
                    <Code2 className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-lg font-bold text-white">IDEONS</span>
                </div>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 
                             flex items-center justify-center text-white"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              {/* Menu Links */}
              <div className="relative flex-1 p-6 space-y-3">
                {navLinks.map((link, index) => {
                  const isActive = location.pathname === link.path;
                  return (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + index * 0.08 }}
                    >
                      <NavLink
                        to={link.path}
                        className={`flex items-center justify-between p-4 rounded-2xl
                                   transition-all duration-300 group
                                   ${isActive 
                                     ? "bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border border-cyan-500/30" 
                                     : "bg-white/5 border border-white/10 hover:bg-white/10"
                                   }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center
                                          transition-colors duration-300
                                          ${isActive 
                                            ? "bg-gradient-to-br from-cyan-400 to-purple-600" 
                                            : "bg-white/5 group-hover:bg-white/10"
                                          }`}>
                            <link.icon className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-400"}`} />
                          </div>
                          <span className={`font-medium ${isActive ? "text-white" : "text-gray-300"}`}>
                            {link.name}
                          </span>
                        </div>
                        <ArrowRight className={`w-4 h-4 transition-transform duration-300 
                                               group-hover:translate-x-1
                                               ${isActive ? "text-cyan-400" : "text-gray-500"}`} 
                        />
                      </NavLink>
                    </motion.div>
                  );
                })}
              </div>

              {/* Menu Footer - CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="relative p-6 border-t border-white/10"
              >
                <Link to="/contact" onClick={() => setIsOpen(false)}>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-4 rounded-2xl 
                               bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 
                               text-white font-semibold
                               shadow-lg shadow-cyan-500/25
                               flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-5 h-5" />
                    Get Started
                  </motion.button>
                </Link>
                <p className="text-center text-xs text-gray-500 mt-4">
                  © 2024 IDEONS. All rights reserved.
                </p>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;