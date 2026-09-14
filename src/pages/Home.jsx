// pages/public/Home.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Search,
  ArrowRight,
  Star,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Users,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  Code2,
  Palette,
  Smartphone,
  Megaphone,
  PenTool,
  Video,
  BarChart3,
  Bot,
  Layers,
  Play,
  ChevronRight,
  Flame,
  Heart,
} from "lucide-react";

// ============================================
// ANIMATION VARIANTS
// ============================================
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const floatAnimation = {
  y: [0, -10, 0],
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" },
};

// ============================================
// STATIC DATA (replace with API calls later)
// ============================================
const categories = [
  { name: "Web Development", icon: Code2, gigs: "12,480", color: "from-cyan-400 to-blue-500" },
  { name: "UI/UX Design", icon: Palette, gigs: "8,230", color: "from-purple-400 to-pink-500" },
  { name: "Mobile Apps", icon: Smartphone, gigs: "5,120", color: "from-blue-400 to-indigo-500" },
  { name: "Digital Marketing", icon: Megaphone, gigs: "9,870", color: "from-orange-400 to-red-500" },
  { name: "Content Writing", icon: PenTool, gigs: "6,540", color: "from-green-400 to-emerald-500" },
  { name: "Video Editing", icon: Video, gigs: "4,320", color: "from-pink-400 to-rose-500" },
  { name: "Data Analytics", icon: BarChart3, gigs: "3,890", color: "from-indigo-400 to-purple-500" },
  { name: "AI & Automation", icon: Bot, gigs: "2,760", color: "from-violet-400 to-fuchsia-500" },
];

const featuredGigs = [
  {
    id: 1,
    title: "I will build a modern vibe coding website with React & Next.js",
    seller: "Sheikh Siam",
    sellerLevel: "Top Rated",
    avatar: "SS",
    rating: 4.9,
    reviews: 234,
    price: 80,
    deliveryDays: 3,
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&h=400&fit=crop",
    badge: "Bestseller",
    color: "from-cyan-400 to-blue-500",
  },
  {
    id: 2,
    title: "I will create a professional business website for your company",
    seller: "Ayesha Rahman",
    sellerLevel: "Level 2",
    avatar: "AR",
    rating: 5.0,
    reviews: 189,
    price: 220,
    deliveryDays: 7,
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop",
    badge: "Featured",
    color: "from-purple-400 to-pink-500",
  },
  {
    id: 3,
    title: "I will design a stunning mobile app UI/UX with Figma",
    seller: "Tanvir Ahmed",
    sellerLevel: "Top Rated",
    avatar: "TA",
    rating: 4.8,
    reviews: 412,
    price: 150,
    deliveryDays: 5,
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop",
    badge: "Hot",
    color: "from-orange-400 to-red-500",
  },
  {
    id: 4,
    title: "I will develop a custom AI chatbot for your business",
    seller: "Nadia Islam",
    sellerLevel: "Level 2",
    avatar: "NI",
    rating: 4.9,
    reviews: 156,
    price: 320,
    deliveryDays: 10,
    category: "AI & Automation",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    badge: "Rising Talent",
    color: "from-violet-400 to-fuchsia-500",
  },
  {
    id: 5,
    title: "I will create an e-commerce store with Stripe integration",
    seller: "Rakib Hasan",
    sellerLevel: "Level 1",
    avatar: "RH",
    rating: 4.7,
    reviews: 98,
    price: 180,
    deliveryDays: 6,
    category: "Web Development",
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=600&h=400&fit=crop",
    badge: "New",
    color: "from-green-400 to-emerald-500",
  },
  {
    id: 6,
    title: "I will design a modern SaaS landing page that converts",
    seller: "Farhan Khan",
    sellerLevel: "Top Rated",
    avatar: "FK",
    rating: 5.0,
    reviews: 521,
    price: 120,
    deliveryDays: 4,
    category: "UI/UX Design",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    badge: "Pro",
    color: "from-pink-400 to-rose-500",
  },
];

const topSellers = [
  { name: "Sheikh Siam", skill: "Full-Stack Developer", rating: 4.9, avatar: "SS", color: "from-cyan-400 to-blue-500" },
  { name: "Ayesha Rahman", skill: "UI/UX Designer", rating: 5.0, avatar: "AR", color: "from-purple-400 to-pink-500" },
  { name: "Tanvir Ahmed", skill: "Mobile Developer", rating: 4.8, avatar: "TA", color: "from-orange-400 to-red-500" },
  { name: "Nadia Islam", skill: "AI Engineer", rating: 4.9, avatar: "NI", color: "from-violet-400 to-fuchsia-500" },
  { name: "Rakib Hasan", skill: "E-commerce Expert", rating: 4.7, avatar: "RH", color: "from-green-400 to-emerald-500" },
  { name: "Farhan Khan", skill: "SaaS Designer", rating: 5.0, avatar: "FK", color: "from-pink-400 to-rose-500" },
];

const testimonials = [
  {
    text: "IDEONS helped us launch our SaaS product in 3 weeks. The quality was outstanding and the communication was seamless.",
    author: "Michael Chen",
    role: "CEO, TechFlow",
    avatar: "MC",
    rating: 5,
  },
  {
    text: "I've hired over 20 freelancers here. The quality is consistently high and the payment protection gives me peace of mind.",
    author: "Sarah Williams",
    role: "Founder, DesignHub",
    avatar: "SW",
    rating: 5,
  },
  {
    text: "As a seller, I've earned over $50K in 6 months. The platform is smooth and the support team is incredibly responsive.",
    author: "Sheikh Siam",
    role: "Top Rated Seller",
    avatar: "SS",
    rating: 5,
  },
];

const stats = [
  { value: "50K+", label: "Active Freelancers", icon: Users },
  { value: "120K+", label: "Projects Delivered", icon: CheckCircle2 },
  { value: "4.9/5", label: "Average Rating", icon: Star },
  { value: "180+", label: "Countries Served", icon: Globe },
];

// ============================================
// MAIN COMPONENT
// ============================================
const Home = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative pt-32 pb-24 px-6 lg:px-8 overflow-hidden">
        {/* Background decoration */}
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="absolute inset-0 pointer-events-none"
        >
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.2, 1] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute -top-48 -left-48 w-[500px] h-[500px] bg-cyan-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.3, 1] }}
            transition={{ duration: 8, repeat: Infinity, delay: 1 }}
            className="absolute top-1/4 -right-32 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-3xl"
          />
          <motion.div
            animate={{ opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 7, repeat: Infinity, delay: 2 }}
            className="absolute bottom-0 left-1/3 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative max-w-7xl mx-auto"
        >
          {/* Badge */}
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                            bg-white/5 border border-white/10 backdrop-blur-sm
                            text-sm text-gray-300 hover:border-cyan-500/30 
                            transition-colors duration-300 group cursor-pointer">
              <motion.div
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </motion.div>
              <span>Trusted by 50,000+ businesses worldwide</span>
              <ChevronRight className="w-4 h-4 text-gray-500 group-hover:translate-x-0.5 transition-transform" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-center 
                       text-white leading-[1.05] tracking-tight mb-6"
          >
            Find the perfect
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              freelance services
            </span>
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl text-gray-500">
              for your business
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-400 text-center max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Work with talented freelancers from around the world. From{" "}
            <span className="text-cyan-400 font-medium">vibe coding websites ($80)</span> to{" "}
            <span className="text-purple-400 font-medium">business platforms ($220+)</span> — 
            get your project delivered fast.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            variants={fadeInUp}
            className="max-w-3xl mx-auto mb-8"
          >
            <div className="relative group">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 
                              rounded-2xl blur-xl opacity-0 group-focus-within:opacity-100 
                              transition-opacity duration-500" />
              
              <div className="relative flex items-center gap-2 p-2 rounded-2xl 
                              bg-white/[0.05] border border-white/10 backdrop-blur-xl
                              focus-within:border-cyan-500/50 transition-colors duration-300">
                <div className="pl-4 text-gray-500">
                  <Search className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder='Try "vibe coding website" or "business website"...'
                  className="flex-1 bg-transparent text-white placeholder-gray-500 
                             outline-none py-3 text-base"
                />
                <Link to={`/browse?search=${searchQuery}`}>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="relative px-6 py-3 rounded-xl 
                               bg-gradient-to-r from-cyan-500 to-blue-600
                               text-white font-semibold text-sm
                               shadow-lg shadow-cyan-500/25
                               hover:shadow-cyan-500/40 transition-shadow duration-300
                               flex items-center gap-2 group/btn overflow-hidden"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Search
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-0.5 transition-transform" />
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.button>
                </Link>
              </div>
            </div>

            {/* Popular tags */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-5">
              <span className="text-sm text-gray-500">Popular:</span>
              {["Vibe Coding", "Business Website", "AI Chatbot", "UI/UX Design", "E-commerce"].map((tag) => (
                <motion.button
                  key={tag}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSearchQuery(tag)}
                  className="px-3 py-1.5 text-xs rounded-lg 
                             bg-white/5 border border-white/10 
                             text-gray-400 hover:text-cyan-400 
                             hover:border-cyan-500/30 hover:bg-cyan-500/5
                             transition-all duration-300"
                >
                  {tag}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap items-center justify-center gap-6 md:gap-10 mt-12"
          >
            {[
              { icon: Shield, text: "Secure Payments" },
              { icon: Clock, text: "24/7 Support" },
              { icon: Award, text: "Money-back Guarantee" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-400">
                <item.icon className="w-4 h-4 text-cyan-400" />
                {item.text}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* STATS SECTION */}
      {/* ============================================ */}
      <section className="relative py-16 px-6 lg:px-8 border-y border-white/5">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={scaleIn}
              whileHover={{ y: -5 }}
              className="relative group text-center"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 
                              rounded-2xl blur-xl opacity-0 group-hover:opacity-100 
                              transition-opacity duration-500" />
              <div className="relative p-6 rounded-2xl bg-white/[0.02] border border-white/5 
                              backdrop-blur-sm">
                <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-br from-white to-gray-400 
                                bg-clip-text text-transparent mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ============================================ */}
      {/* CATEGORIES SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <motion.div variants={fadeInUp}>
              <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">
                Explore
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-3">
                Browse by{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  category
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl">
                Discover thousands of services across every field you can imagine.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl 
                           bg-white/5 border border-white/10 text-white text-sm font-medium
                           hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300
                           group"
              >
                View All Categories
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
          >
            {categories.map((cat, i) => (
              <motion.div key={i} variants={scaleIn}>
                <Link to={`/browse?category=${cat.name}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative group cursor-pointer"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${cat.color} 
                                    rounded-2xl blur-xl opacity-0 group-hover:opacity-30 
                                    transition-opacity duration-500`} />
                    <div className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 
                                    backdrop-blur-sm group-hover:border-white/20 
                                    transition-all duration-300 h-full">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} 
                                      flex items-center justify-center mb-4 
                                      group-hover:scale-110 transition-transform duration-300
                                      shadow-lg`}>
                        <cat.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold mb-1 group-hover:text-cyan-400 
                                     transition-colors">
                        {cat.name}
                      </h3>
                      <p className="text-sm text-gray-500">{cat.gigs} gigs</p>
                      <ArrowRight className="absolute top-6 right-6 w-4 h-4 text-gray-600 
                                             opacity-0 group-hover:opacity-100 
                                             group-hover:translate-x-1 transition-all duration-300" />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FEATURED GIGS SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
          >
            <motion.div variants={fadeInUp}>
              <div className="inline-flex items-center gap-2 mb-3">
                <Flame className="w-4 h-4 text-orange-500" />
                <span className="text-orange-400 font-medium tracking-wider text-sm uppercase">
                  Trending Now
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
                Featured{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  services
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-xl">
                Handpicked gigs from our top-rated freelancers.
              </p>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <Link
                to="/browse"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl 
                           bg-white/5 border border-white/10 text-white text-sm font-medium
                           hover:bg-white/10 hover:border-cyan-500/30 transition-all duration-300
                           group"
              >
                Explore All Gigs
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featuredGigs.map((gig) => (
              <motion.div key={gig.id} variants={scaleIn}>
                <Link to={`/gig/${gig.id}`}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="relative group cursor-pointer h-full"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${gig.color} 
                                    rounded-3xl blur-xl opacity-0 group-hover:opacity-25 
                                    transition-opacity duration-500`} />
                    <div className="relative rounded-3xl bg-white/[0.03] border border-white/10 
                                    backdrop-blur-sm overflow-hidden group-hover:border-white/20 
                                    transition-all duration-300 h-full flex flex-col">
                      
                      {/* Image */}
                      <div className="relative aspect-[3/2] overflow-hidden">
                        <img
                          src={gig.image}
                          alt={gig.title}
                          className="w-full h-full object-cover 
                                     group-hover:scale-110 transition-transform duration-700"
                        />
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent" />
                        
                        {/* Badge */}
                        <div className="absolute top-4 left-4">
                          <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${gig.color}
                                          text-white text-xs font-semibold shadow-lg
                                          backdrop-blur-sm`}>
                            {gig.badge}
                          </div>
                        </div>

                        {/* Category */}
                        <div className="absolute top-4 right-4">
                          <div className="px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md
                                          text-white text-xs font-medium border border-white/10">
                            {gig.category}
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-1">
                        {/* Seller */}
                        <div className="flex items-center gap-3 mb-4">
                          <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${gig.color}
                                          flex items-center justify-center text-white 
                                          text-sm font-bold shadow-lg`}>
                            {gig.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-white">{gig.seller}</div>
                            <div className="text-xs text-cyan-400">{gig.sellerLevel}</div>
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-white font-medium leading-snug mb-4 
                                       line-clamp-2 group-hover:text-cyan-400 
                                       transition-colors duration-300">
                          {gig.title}
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                            <span className="text-sm font-semibold text-white">{gig.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">({gig.reviews} reviews)</span>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5 mt-auto">
                          <div className="flex items-center gap-1.5 text-xs text-gray-500">
                            <Clock className="w-3.5 h-3.5" />
                            {gig.deliveryDays} days delivery
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-gray-500">Starting at</div>
                            <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 
                                            bg-clip-text text-transparent">
                              ${gig.price}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">
                Simple Process
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                How it{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  works
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Get your project done in three simple steps.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-6 lg:gap-8"
          >
            {[
              {
                step: "01",
                icon: Search,
                title: "Find Your Service",
                description: "Browse thousands of gigs or post a custom request and let freelancers come to you.",
                color: "from-cyan-400 to-blue-500",
              },
              {
                step: "02",
                icon: Zap,
                title: "Order & Communicate",
                description: "Place your order, chat with your freelancer in real-time, and share requirements.",
                color: "from-blue-400 to-indigo-500",
              },
              {
                step: "03",
                icon: CheckCircle2,
                title: "Receive & Pay",
                description: "Get your project delivered. Only release payment when you're 100% satisfied.",
                color: "from-purple-400 to-pink-500",
              },
            ].map((item, i) => (
              <motion.div key={i} variants={scaleIn} className="relative group">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color} 
                                rounded-3xl blur-2xl opacity-0 group-hover:opacity-20 
                                transition-opacity duration-500`} />
                <div className="relative p-8 rounded-3xl bg-white/[0.03] border border-white/10 
                                backdrop-blur-sm h-full group-hover:border-white/20 
                                transition-all duration-300">
                  {/* Step number */}
                  <div className="absolute top-6 right-6 text-6xl font-bold text-white/5 
                                  group-hover:text-white/10 transition-colors duration-300">
                    {item.step}
                  </div>
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${item.color}
                                  flex items-center justify-center mb-6
                                  shadow-lg group-hover:scale-110 
                                  transition-transform duration-300`}>
                    <item.icon className="w-7 h-7 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TOP SELLERS SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">
                Meet the Pros
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                Top{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  freelancers
                </span>
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Work with the best talent in the industry.
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6"
          >
            {topSellers.map((seller, i) => (
              <motion.div
                key={i}
                variants={scaleIn}
                whileHover={{ y: -5 }}
                className="group cursor-pointer"
              >
                <div className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 
                                backdrop-blur-sm text-center group-hover:border-white/20 
                                transition-all duration-300">
                  {/* Avatar */}
                  <div className="relative inline-block mb-4">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${seller.color}
                                    flex items-center justify-center text-white font-bold 
                                    text-lg shadow-lg group-hover:scale-110 
                                    transition-transform duration-300`}>
                      {seller.avatar}
                    </div>
                    {/* Online dot */}
                    <motion.div
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full 
                                 bg-green-500 border-2 border-[#0a0a0f]"
                    />
                  </div>

                  <h3 className="text-white font-semibold text-sm mb-1 truncate">
                    {seller.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-3 truncate">{seller.skill}</p>
                  
                  <div className="inline-flex items-center gap-1 px-2 py-1 rounded-md 
                                  bg-yellow-500/10 border border-yellow-500/20">
                    <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                    <span className="text-xs font-semibold text-yellow-400">{seller.rating}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TESTIMONIALS SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">
                Testimonials
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4">
                Loved by{" "}
                <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                  thousands
                </span>
              </h2>
            </motion.div>
          </motion.div>

          {/* Testimonial Card */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 
                            rounded-3xl blur-2xl" />
            <div className="relative p-8 md:p-12 rounded-3xl bg-white/[0.03] 
                            border border-white/10 backdrop-blur-sm">
              {/* Quote mark */}
              <div className="text-8xl text-cyan-500/20 leading-none font-serif absolute top-4 left-8">
                "
              </div>

              <div className="relative min-h-[180px] flex items-center">
                {testimonials.map((t, i) => (
                  <motion.div
                    key={i}
                    initial={false}
                    animate={{
                      opacity: activeTestimonial === i ? 1 : 0,
                      x: activeTestimonial === i ? 0 : 40,
                      position: activeTestimonial === i ? "relative" : "absolute",
                    }}
                    transition={{ duration: 0.5 }}
                    className="w-full"
                  >
                    {/* Stars */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(t.rating)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-8 italic">
                      {t.text}
                    </p>

                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 
                                      flex items-center justify-center text-white font-bold">
                        {t.avatar}
                      </div>
                      <div>
                        <div className="text-white font-semibold">{t.author}</div>
                        <div className="text-sm text-gray-500">{t.role}</div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Navigation dots */}
              <div className="flex items-center justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveTestimonial(i)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      activeTestimonial === i
                        ? "w-8 bg-gradient-to-r from-cyan-400 to-purple-500"
                        : "w-1.5 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <section className="relative py-24 px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={scaleIn}
            className="relative p-10 md:p-16 rounded-3xl overflow-hidden"
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            <motion.div
              animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
              transition={{ duration: 12, repeat: Infinity }}
              className="absolute -top-32 -right-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
              transition={{ duration: 10, repeat: Infinity, delay: 1 }}
              className="absolute -bottom-32 -left-32 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            />

            <div className="relative grid md:grid-cols-2 gap-10 items-center">
              {/* Left: Buyer CTA */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                                bg-white/5 border border-white/10 mb-5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" />
                  <span className="text-xs text-gray-300 font-medium">For Buyers</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Need work done?{" "}
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    Find the perfect freelancer.
                  </span>
                </h3>
                <p className="text-gray-400 mb-6">
                  Post a project, receive proposals, and hire the best talent in minutes.
                </p>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl 
                               bg-gradient-to-r from-cyan-500 to-blue-600
                               text-white font-semibold shadow-lg shadow-cyan-500/25
                               hover:shadow-cyan-500/40 transition-shadow duration-300
                               group"
                  >
                    Post a Project
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>

              {/* Right: Seller CTA */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full 
                                bg-white/5 border border-white/10 mb-5">
                  <TrendingUp className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-xs text-gray-300 font-medium">For Sellers</span>
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                  Have skills?{" "}
                  <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                    Earn money doing what you love.
                  </span>
                </h3>
                <p className="text-gray-400 mb-6">
                  Join 50,000+ freelancers earning on their own schedule.
                </p>
                <Link to="/signup">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl 
                               bg-gradient-to-r from-purple-500 to-pink-600
                               text-white font-semibold shadow-lg shadow-purple-500/25
                               hover:shadow-purple-500/40 transition-shadow duration-300
                               group"
                  >
                    Become a Seller
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TRUST BADGES */}
      {/* ============================================ */}
      <section className="relative py-16 px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center"
          >
            <p className="text-sm text-gray-500 mb-8 uppercase tracking-widest">
              Trusted by teams at
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 opacity-50">
              {["Google", "Meta", "Stripe", "Shopify", "Airbnb", "Netflix"].map((brand) => (
                <motion.div
                  key={brand}
                  whileHover={{ scale: 1.1, opacity: 0.8 }}
                  className="text-2xl md:text-3xl font-bold text-gray-600 
                             hover:text-white transition-colors duration-300 cursor-pointer"
                >
                  {brand}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================ */}
      {/* FINAL CTA */}
      {/* ============================================ */}
      <section className="relative py-24 px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <motion.div
              animate={floatAnimation}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl 
                         bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 
                         shadow-2xl shadow-cyan-500/30 mb-8"
            >
              <Sparkles className="w-10 h-10 text-white" />
            </motion.div>

            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Ready to start your{" "}
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                next project?
              </span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
              Join thousands of businesses and freelancers already building amazing things together.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/signup">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative px-8 py-4 rounded-2xl 
                             bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600
                             text-white text-lg font-semibold
                             shadow-xl shadow-cyan-500/25
                             hover:shadow-cyan-500/40 transition-all duration-300
                             flex items-center gap-3 group overflow-hidden"
                >
                  <span className="relative z-10">Get Started Free</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4 }}
                  />
                </motion.button>
              </Link>

              <Link to="/browse">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl 
                             bg-white/5 border border-white/10 
                             text-white text-lg font-medium
                             hover:bg-white/10 hover:border-cyan-500/30
                             transition-all duration-300 group"
                >
                  <Play className="w-5 h-5 text-cyan-400" />
                  Browse Services
                </motion.button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                No credit card required
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Free to join
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                Cancel anytime
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;