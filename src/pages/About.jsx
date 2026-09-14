// About.jsx
import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimation, useScroll, useTransform } from 'framer-motion';
import { 
  Code2, 
  Database, 
  Cloud, 
  Brain, 
  Palette, 
  Plug, 
  Rocket, 
  Users, 
  Target, 
  Eye,
  ArrowRight,
  Sparkles,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

// ============================================
// ANIMATION VARIANTS
// ============================================

const fadeInUp = {
  hidden: { opacity: 0, y: 60 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInLeft = {
  hidden: { opacity: 0, x: -80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 80 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
  }
};

// ============================================
// REUSABLE COMPONENTS
// ============================================

const SectionWrapper = ({ children, className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={staggerContainer}
      className={`relative ${className}`}
    >
      {children}
    </motion.section>
  );
};

const GradientText = ({ children, className = "" }) => (
  <span className={`bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent ${className}`}>
    {children}
  </span>
);

const GlowingOrb = ({ className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ 
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    className={`absolute rounded-full blur-3xl ${className}`}
  />
);

// ============================================
// MAIN ABOUT COMPONENT
// ============================================

const About = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // Company stats
  const stats = [
    { value: "2-10", label: "Team Members", icon: Users },
    { value: "Dhaka", label: "Bangladesh", icon: Globe },
    { value: "2024", label: "Founded", icon: Rocket },
    { value: "∞", label: "Possibilities", icon: Sparkles },
  ];

  // Services data
  const services = [
    {
      icon: Code2,
      title: "Web & Software Development",
      description: "Business websites, web applications, custom software, and responsive interfaces built with modern full-stack technologies.",
      color: "from-cyan-400 to-blue-500",
      shadow: "shadow-cyan-500/25"
    },
    {
      icon: Zap,
      title: "Frontend Development",
      description: "Pixel-perfect interfaces using React.js, Next.js, TypeScript, and Tailwind CSS with performance-first architecture.",
      color: "from-blue-400 to-indigo-500",
      shadow: "shadow-blue-500/25"
    },
    {
      icon: Database,
      title: "Backend & API",
      description: "Robust Node.js and Express.js backends with REST APIs, authentication systems, and scalable server architecture.",
      color: "from-indigo-400 to-purple-500",
      shadow: "shadow-indigo-500/25"
    },
    {
      icon: Cloud,
      title: "Database & Cloud",
      description: "MongoDB, PostgreSQL, cloud deployment, and application infrastructure designed for reliability and scale.",
      color: "from-purple-400 to-pink-500",
      shadow: "shadow-purple-500/25"
    },
    {
      icon: Brain,
      title: "AI & Automation",
      description: "AI-powered features, workflow automation, and intelligent business solutions that drive efficiency.",
      color: "from-pink-400 to-rose-500",
      shadow: "shadow-pink-500/25"
    },
    {
      icon: Palette,
      title: "UI/UX Design",
      description: "Modern interfaces, responsive design, and user-friendly experiences that convert visitors into customers.",
      color: "from-rose-400 to-orange-500",
      shadow: "shadow-rose-500/25"
    },
    {
      icon: Plug,
      title: "API & Integration",
      description: "REST API development, third-party integrations, and connecting different business systems seamlessly.",
      color: "from-orange-400 to-amber-500",
      shadow: "shadow-orange-500/25"
    },
    {
      icon: Rocket,
      title: "Cloud & Deployment",
      description: "Production deployment, hosting, and performance-focused deployment strategies for maximum uptime.",
      color: "from-amber-400 to-yellow-500",
      shadow: "shadow-amber-500/25"
    },
  ];

  // Tech stack
  const techStack = {
    frontend: ["React.js", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Express.js", "REST APIs"],
    database: ["MongoDB", "PostgreSQL"],
    engineering: ["Git", "GitHub", "Docker", "Cloud Deployment"],
    advanced: ["AI Integration", "Automation"]
  };

  // Business model steps
  const businessSteps = [
    { step: "01", title: "Service", description: "Offer custom software development services" },
    { step: "02", title: "Client Problems", description: "Identify and solve real business challenges" },
    { step: "03", title: "Repeated Problems", description: "Recognize patterns across clients" },
    { step: "04", title: "IDEONS Product", description: "Build solutions that scale" },
    { step: "05", title: "SaaS", description: "Transform services into products" },
    { step: "06", title: "Recurring Revenue", description: "Build sustainable business growth" },
  ];

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-hidden">
      {/* ============================================ */}
      {/* ANIMATED BACKGROUND */}
      {/* ============================================ */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 z-0"
      >
        {/* Grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />
        
        {/* Glowing orbs */}
        <GlowingOrb className="w-[500px] h-[500px] bg-cyan-500/20 -top-48 -left-48" delay={0} />
        <GlowingOrb className="w-[400px] h-[400px] bg-purple-500/20 top-1/3 -right-32" delay={1} />
        <GlowingOrb className="w-[600px] h-[600px] bg-blue-500/10 bottom-0 left-1/4" delay={2} />
        <GlowingOrb className="w-[300px] h-[300px] bg-pink-500/15 top-2/3 right-1/4" delay={1.5} />
      </motion.div>

      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <SectionWrapper className="relative z-10 pt-32 pb-20 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-8">
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                         bg-white/5 border border-white/10 backdrop-blur-sm
                         text-sm text-cyan-400 font-medium tracking-wide"
            >
              <Sparkles className="w-4 h-4" />
              About IDEONS
            </motion.span>
          </motion.div>

          <motion.h1 
            variants={fadeInUp}
            className="text-5xl md:text-7xl lg:text-8xl font-bold text-center 
                       text-white leading-[1.1] tracking-tight mb-8"
          >
            Building Digital
            <br />
            <GradientText>Solutions That Drive Growth</GradientText>
          </motion.h1>

          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-400 text-center max-w-3xl mx-auto leading-relaxed"
          >
            IDEONS is a modern software company based in Dhaka, Bangladesh, 
            crafting reliable, scalable, and innovative digital products that 
            help businesses solve real problems and grow.
          </motion.p>

          {/* Stats */}
          <motion.div 
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 
                                rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative p-6 rounded-2xl bg-white/5 border border-white/10 
                                backdrop-blur-sm text-center">
                  <stat.icon className="w-6 h-6 text-cyan-400 mx-auto mb-3" />
                  <div className="text-2xl md:text-3xl font-bold text-white mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ============================================ */}
      {/* MISSION & VISION */}
      {/* ============================================ */}
      <SectionWrapper className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div variants={fadeInLeft} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 
                              rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/10 
                              backdrop-blur-sm h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 
                                flex items-center justify-center mb-6 shadow-lg shadow-cyan-500/25">
                  <Target className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Mission</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  IDEONS turns ideas into practical digital solutions through modern 
                  software engineering, thoughtful design, automation, and scalable technology.
                </p>
              </div>
            </motion.div>

            {/* Vision */}
            <motion.div variants={fadeInRight} className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 
                              rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative p-8 md:p-12 rounded-3xl bg-white/[0.03] border border-white/10 
                              backdrop-blur-sm h-full">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 
                                flex items-center justify-center mb-6 shadow-lg shadow-purple-500/25">
                  <Eye className="w-7 h-7 text-white" />
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Our Vision</h2>
                <p className="text-gray-400 text-lg leading-relaxed">
                  To build reliable, scalable, and innovative digital products that 
                  help businesses solve real problems and grow sustainably.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* ============================================ */}
      {/* SERVICES SECTION */}
      {/* ============================================ */}
      <SectionWrapper className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">What We Do</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Services & <GradientText>Expertise</GradientText>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From concept to deployment, we provide end-to-end digital solutions 
              tailored to your business needs.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                variants={scaleIn}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${service.color} 
                                rounded-2xl blur-xl opacity-0 group-hover:opacity-20 
                                transition-opacity duration-500`} />
                <div className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 
                                backdrop-blur-sm h-full group-hover:border-white/20 
                                transition-all duration-300">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} 
                                  flex items-center justify-center mb-5 
                                  shadow-lg ${service.shadow}
                                  group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-3">{service.title}</h3>
                  <p className="text-sm text-gray-400 leading-relaxed">{service.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ============================================ */}
      {/* TECH STACK SECTION */}
      {/* ============================================ */}
      <SectionWrapper className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">Technology</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              Our <GradientText>Tech Stack</GradientText>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Modern technologies powering our digital solutions.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {Object.entries(techStack).map(([category, techs], index) => (
              <motion.div
                key={category}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="p-6 rounded-2xl bg-white/[0.03] border border-white/10 
                           backdrop-blur-sm group hover:border-cyan-500/30 
                           transition-all duration-300"
              >
                <h3 className="text-lg font-semibold text-white mb-4 capitalize flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500" />
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {techs.map((tech, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="px-3 py-1.5 text-sm rounded-lg bg-white/5 border border-white/10 
                                 text-gray-300 hover:text-cyan-400 hover:border-cyan-500/30 
                                 transition-colors duration-300 cursor-default"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ============================================ */}
      {/* BUSINESS MODEL SECTION */}
      {/* ============================================ */}
      <SectionWrapper className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <span className="text-cyan-400 font-medium tracking-wider text-sm uppercase">Growth Path</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mt-4 mb-6">
              From Service to <GradientText>SaaS</GradientText>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Our journey from custom software services to building scalable products.
            </p>
          </motion.div>

          <div className="relative">
            {/* Connection line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 
                            bg-gradient-to-r from-cyan-500/0 via-cyan-500/50 to-purple-500/0 
                            -translate-y-1/2" />
            
            <motion.div 
              variants={staggerContainer}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
            >
              {businessSteps.map((item, index) => (
                <motion.div
                  key={index}
                  variants={scaleIn}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="relative group"
                >
                  <div className="relative p-5 rounded-2xl bg-white/[0.03] border border-white/10 
                                  backdrop-blur-sm text-center group-hover:border-cyan-500/30 
                                  transition-all duration-300">
                    <div className="text-3xl font-bold bg-gradient-to-br from-cyan-400 to-purple-500 
                                    bg-clip-text text-transparent mb-2">
                      {item.step}
                    </div>
                    <div className="text-sm font-semibold text-white mb-2">{item.title}</div>
                    <div className="text-xs text-gray-500">{item.description}</div>
                  </div>
                  {index < businessSteps.length - 1 && (
                    <ArrowRight className="hidden lg:block absolute -right-3 top-1/2 
                                           -translate-y-1/2 w-5 h-5 text-cyan-500/50 
                                           group-hover:text-cyan-400 transition-colors" />
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </SectionWrapper>

      {/* ============================================ */}
      {/* FOUNDER SECTION */}
      {/* ============================================ */}
      <SectionWrapper className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            variants={fadeInUp}
            className="relative p-8 md:p-16 rounded-3xl overflow-hidden"
          >
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/5 to-purple-500/10" />
            <div className="absolute inset-0 border border-white/10 rounded-3xl" />
            
            {/* Animated orbs */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl" />

            <div className="relative flex flex-col md:flex-row items-center gap-8 md:gap-12">
              {/* Avatar */}
              <motion.div 
                variants={scaleIn}
                className="relative"
              >
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-3xl bg-gradient-to-br 
                                from-cyan-400 via-blue-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-3xl bg-[#0a0a0f] flex items-center 
                                  justify-center overflow-hidden">
                    <span className="text-5xl md:text-6xl font-bold bg-gradient-to-br 
                                     from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                      SS
                    </span>
                  </div>
                </div>
                <motion.div
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full 
                             bg-gradient-to-br from-cyan-400 to-blue-500 
                             flex items-center justify-center shadow-lg shadow-cyan-500/50"
                >
                  <Sparkles className="w-4 h-4 text-white" />
                </motion.div>
              </motion.div>

              {/* Info */}
              <div className="flex-1 text-center md:text-left">
                <motion.div variants={fadeInUp}>
                  <span className="text-cyan-400 font-medium text-sm tracking-wider uppercase">
                    Founder & Full-Stack Developer
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-2 mb-4">
                    Sheikh Siam
                  </h2>
                  <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
                    Passionate about building digital solutions that make a difference. 
                    Leading IDEONS with a vision to transform ideas into practical, 
                    scalable software products that drive real business growth.
                  </p>
                </motion.div>

                <motion.div 
                  variants={fadeInUp}
                  className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start"
                >
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
                               bg-gradient-to-r from-cyan-500 to-blue-600 
                               text-white font-medium shadow-lg shadow-cyan-500/25
                               hover:shadow-cyan-500/40 transition-shadow duration-300"
                  >
                    Connect on LinkedIn
                    <ArrowRight className="w-4 h-4" />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl 
                               bg-white/5 border border-white/10 text-white font-medium
                               hover:bg-white/10 transition-colors duration-300"
                  >
                    View Portfolio
                  </motion.a>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>

      {/* ============================================ */}
      {/* CTA SECTION */}
      {/* ============================================ */}
      <SectionWrapper className="relative z-10 py-24 px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Ready to Build Something <GradientText>Great?</GradientText>
            </h2>
            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
              Let's turn your ideas into practical digital solutions. 
              Get in touch with IDEONS today.
            </p>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl 
                         bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 
                         text-white text-lg font-semibold shadow-xl shadow-cyan-500/25
                         hover:shadow-cyan-500/40 transition-all duration-300
                         relative overflow-hidden group"
            >
              <span className="relative z-10">Start Your Project</span>
              <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"
                initial={{ x: "100%" }}
                whileHover={{ x: 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          </motion.div>
        </div>
      </SectionWrapper>
    </div>
  );
};

export default About;