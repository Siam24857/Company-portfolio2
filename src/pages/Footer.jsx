// Footer.jsx
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Code2,
  Mail,
  MapPin,
  Phone,
  ArrowUpRight,
  Sparkles,
  Heart,
  Send,
  ArrowUp,
} from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { useState } from "react";

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

// ============================================
// FOOTER DATA
// ============================================
const footerLinks = {
  Services: [
    { name: "Web Development", path: "/services/web" },
    { name: "Frontend Development", path: "/services/frontend" },
    { name: "Backend & API", path: "/services/backend" },
    { name: "AI & Automation", path: "/services/ai" },
    { name: "UI/UX Design", path: "/services/uiux" },
    { name: "Cloud & Deployment", path: "/services/cloud" },
  ],
  Company: [
    { name: "About Us", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Case Studies", path: "/case-studies" },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Careers", path: "/careers" },
  ],
  Legal: [
    { name: "Terms of Use", path: "/terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Cookie Policy", path: "/cookies" },
    { name: "Refund Policy", path: "/refund" },
  ],
};

const socialLinks = [
  { name: "LinkedIn", icon: FaLinkedin, href: "https://linkedin.com/company/ideons", color: "hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/10" },
  { name: "GitHub", icon: FaGithub, href: "https://github.com/ideons", color: "hover:text-white hover:border-white/30 hover:bg-white/10" },
  { name: "Twitter", icon: FaTwitter, href: "https://twitter.com/ideons", color: "hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/10" },
  { name: "Facebook", icon: FaFacebook, href: "https://facebook.com/ideons", color: "hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/10" },
  { name: "Instagram", icon: FaInstagram, href: "https://instagram.com/ideons", color: "hover:text-pink-400 hover:border-pink-400/30 hover:bg-pink-400/10" },
];

// ============================================
// MAIN FOOTER COMPONENT
// ============================================
const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative overflow-hidden border-t border-white/10">
      {/* ============================================ */}
      {/* DECORATIVE BACKGROUND */}
      {/* ============================================ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
        {/* Glowing orbs */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 7, repeat: Infinity, delay: 2 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      {/* ============================================ */}
      {/* TOP GRADIENT LINE */}
      {/* ============================================ */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />

      {/* ============================================ */}
      {/* MAIN CONTENT */}
      {/* ============================================ */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-12"
      >
        {/* ============================================ */}
        {/* NEWSLETTER CTA BANNER */}
        {/* ============================================ */}
        <motion.div
          variants={fadeInUp}
          className="relative mb-16 p-8 md:p-12 rounded-3xl overflow-hidden
                     bg-gradient-to-br from-white/[0.05] to-white/[0.02]
                     border border-white/10 backdrop-blur-sm"
        >
          {/* Banner decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-transparent to-purple-500/10" />
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -10, 0] }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl"
          />

          <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
                           bg-white/5 border border-white/10 backdrop-blur-sm
                           text-xs text-cyan-400 font-medium tracking-wide mb-4"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Stay Updated
              </motion.div>
              <h3 className="text-2xl md:text-4xl font-bold text-white mb-3">
                Let's Build Something{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  Great Together
                </span>
              </h3>
              <p className="text-gray-400 text-sm md:text-base max-w-lg">
                Get the latest updates on new projects, tech insights, and
                exclusive offers from IDEONS.
              </p>
            </div>

            {/* Newsletter Form */}
            <form
              onSubmit={handleSubscribe}
              className="w-full md:w-auto flex-shrink-0"
            >
              <div className="relative flex items-center gap-2 p-1.5 rounded-2xl 
                              bg-white/5 border border-white/10 backdrop-blur-sm
                              focus-within:border-cyan-500/50 transition-colors duration-300">
                <div className="pl-3 text-gray-500">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full md:w-56 bg-transparent text-white placeholder-gray-500
                             outline-none text-sm py-2.5"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="relative px-5 py-2.5 rounded-xl 
                             bg-gradient-to-r from-cyan-500 to-blue-600
                             text-white text-sm font-semibold
                             shadow-lg shadow-cyan-500/25
                             hover:shadow-cyan-500/40 transition-shadow duration-300
                             flex items-center gap-2 group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {subscribed ? "Subscribed!" : "Subscribe"}
                    <Send className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* MAIN FOOTER GRID */}
        {/* ============================================ */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12 mb-16">
          {/* Brand Column - spans 2 on lg */}
          <motion.div variants={fadeInUp} className="col-span-2 lg:col-span-2">
            {/* Logo */}
            <Link to="/" className="inline-flex items-center gap-3 mb-5 group">
              <div className="relative">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 
                                flex items-center justify-center shadow-lg shadow-cyan-500/25
                                group-hover:shadow-cyan-500/50 transition-shadow duration-300">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="absolute inset-0 rounded-xl bg-cyan-500/40 blur-md -z-10"
                />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-xl font-bold text-white tracking-tight">
                  IDE
                  <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                    ONS
                  </span>
                </span>
                <span className="text-[10px] text-gray-500 tracking-[0.2em] uppercase">
                  Software
                </span>
              </div>
            </Link>

            {/* Description */}
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Building reliable, scalable, and innovative digital products that
              help businesses solve real problems and grow.
            </p>

            {/* Contact Info */}
            <div className="space-y-2.5 mb-6">
              <a
                href="mailto:hello@ideons.com"
                className="flex items-center gap-3 text-sm text-gray-400 
                           hover:text-cyan-400 transition-colors duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 
                                flex items-center justify-center
                                group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10
                                transition-colors duration-300">
                  <Mail className="w-3.5 h-3.5" />
                </div>
                hello@ideons.com
              </a>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 
                                flex items-center justify-center">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                Dhaka, Bangladesh
              </div>
              <a
                href="tel:+8801234567890"
                className="flex items-center gap-3 text-sm text-gray-400 
                           hover:text-cyan-400 transition-colors duration-300 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 
                                flex items-center justify-center
                                group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10
                                transition-colors duration-300">
                  <Phone className="w-3.5 h-3.5" />
                </div>
                +880 1234-567890
              </a>
            </div>

            {/* Social Links */}
            <div className="flex flex-wrap gap-2">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 
                             flex items-center justify-center
                             text-gray-400 transition-all duration-300
                             ${social.color}`}
                >
                  <social.icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <motion.nav
              key={category}
              variants={fadeInUp}
              className="col-span-1"
            >
              <h6 className="text-white font-semibold text-sm mb-5 flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500" />
                {category}
              </h6>
              <ul className="space-y-3">
                {links.map((link, index) => (
                  <motion.li
                    key={index}
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  >
                    <Link
                      to={link.path}
                      className="group flex items-center gap-1.5 text-sm text-gray-400
                                 hover:text-white transition-colors duration-300"
                    >
                      <span className="relative">
                        {link.name}
                        <span className="absolute -bottom-0.5 left-0 w-0 h-px 
                                         bg-gradient-to-r from-cyan-400 to-purple-500
                                         group-hover:w-full transition-all duration-300" />
                      </span>
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-1 
                                               group-hover:opacity-100 group-hover:translate-x-0
                                               transition-all duration-300 text-cyan-400" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          ))}
        </div>

        {/* ============================================ */}
        {/* BOTTOM BAR */}
        {/* ============================================ */}
        <motion.div
          variants={fadeInUp}
          className="pt-8 border-t border-white/10 
                     flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Copyright */}
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 
                          text-sm text-gray-500 text-center md:text-left">
            <span>© {new Date().getFullYear()} IDEONS.</span>
            <span>All rights reserved.</span>
            <span className="hidden md:inline text-gray-600">•</span>
            <span className="inline-flex items-center gap-1.5">
              Made with
              <motion.span
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-flex"
              >
                <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500" />
              </motion.span>
              in Dhaka
            </span>
          </div>

          {/* Quick Links + Back to Top */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-5 text-sm">
              <Link
                to="/privacy"
                className="text-gray-500 hover:text-cyan-400 transition-colors duration-300"
              >
                Privacy
              </Link>
              <Link
                to="/terms"
                className="text-gray-500 hover:text-cyan-400 transition-colors duration-300"
              >
                Terms
              </Link>
              <Link
                to="/sitemap"
                className="text-gray-500 hover:text-cyan-400 transition-colors duration-300"
              >
                Sitemap
              </Link>
            </div>

            {/* Back to Top */}
            <motion.button
              onClick={scrollToTop}
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Back to top"
              className="group relative w-11 h-11 rounded-xl 
                         bg-white/5 border border-white/10 
                         flex items-center justify-center
                         text-gray-400 hover:text-white
                         hover:border-cyan-500/30 hover:bg-cyan-500/10
                         transition-all duration-300
                         overflow-hidden"
            >
              <ArrowUp className="w-4 h-4 relative z-10 group-hover:-translate-y-0.5 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              />
            </motion.button>
          </div>
        </motion.div>
      </motion.div>

      {/* ============================================ */}
      {/* BOTTOM GRADIENT LINE */}
      {/* ============================================ */}
      <div className="absolute bottom-0 left-0 right-0 h-px 
                      bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </footer>
  );
};

export default Footer;