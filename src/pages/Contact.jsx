// pages/public/Contact.jsx
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  User,
  Building2,
  FileText,
  Paperclip,
  X,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Zap,
  Shield,
  Globe,
  Headphones,
  ArrowRight,
  Calendar,
  DollarSign,
  Briefcase,
  Bug,
  Lightbulb,
  Heart,
  Users,
} from "lucide-react";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

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

const fadeInLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const fadeInRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
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

// ============================================
// STATIC DATA
// ============================================
const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "We reply within 2 hours",
    value: "hello@ideons.com",
    href: "mailto:hello@ideons.com",
    color: "from-cyan-400 to-blue-500",
    shadow: "shadow-cyan-500/25",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon–Fri, 9AM–6PM (GMT+6)",
    value: "+880 1234-567890",
    href: "tel:+8801234567890",
    color: "from-purple-400 to-pink-500",
    shadow: "shadow-purple-500/25",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Average wait: 30 seconds",
    value: "Start a conversation",
    href: "#chat",
    color: "from-green-400 to-emerald-500",
    shadow: "shadow-green-500/25",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Our office location",
    value: "Dhaka, Bangladesh",
    href: "#map",
    color: "from-orange-400 to-red-500",
    shadow: "shadow-orange-500/25",
  },
];

const inquiryTypes = [
  { id: "project", label: "New Project", icon: Briefcase, description: "Start a new project with us" },
  { id: "support", label: "Support", icon: Headphones, description: "Get help with existing work" },
  { id: "bug", label: "Report a Bug", icon: Bug, description: "Report an issue you found" },
  { id: "idea", label: "Share an Idea", icon: Lightbulb, description: "Suggest features or improvements" },
  { id: "partnership", label: "Partnership", icon: Heart, description: "Explore business partnerships" },
  { id: "other", label: "Something Else", icon: Sparkles, description: "Any other inquiry" },
];

const budgets = [
  { id: "1", label: "Less than $500", range: "$0 – $500" },
  { id: "2", label: "$500 – $1,000", range: "$500 – $1,000" },
  { id: "3", label: "$1,000 – $5,000", range: "$1,000 – $5,000" },
  { id: "4", label: "$5,000 – $10,000", range: "$5,000 – $10,000" },
  { id: "5", label: "$10,000+", range: "$10,000+" },
  { id: "6", label: "Not sure yet", range: "To be discussed" },
];

const timelines = [
  { id: "urgent", label: "Urgent (24-48 hours)" },
  { id: "fast", label: "Fast (1 week)" },
  { id: "normal", label: "Normal (2-4 weeks)" },
  { id: "flexible", label: "Flexible (1-3 months)" },
  { id: "planning", label: "Just planning" },
];

const socialLinks = [
  { icon: FaLinkedin, href: "https://linkedin.com/company/ideons", label: "LinkedIn", color: "hover:text-blue-400 hover:border-blue-400/30 hover:bg-blue-400/10" },
  { icon: FaTwitter, href: "https://twitter.com/ideons", label: "Twitter", color: "hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/10" },
  { icon: FaFacebook, href: "https://facebook.com/ideons", label: "Facebook", color: "hover:text-blue-500 hover:border-blue-500/30 hover:bg-blue-500/10" },
  { icon: FaInstagram, href: "https://instagram.com/ideons", label: "Instagram", color: "hover:text-pink-400 hover:border-pink-400/30 hover:bg-pink-400/10" },
  { icon: FaGithub, href: "https://github.com/ideons", label: "GitHub", color: "hover:text-white hover:border-white/30 hover:bg-white/10" },
];

const faqs = [
  {
    q: "How quickly do you respond to inquiries?",
    a: "We typically respond within 2-4 business hours. For urgent matters, use our live chat for immediate assistance during business hours.",
  },
  {
    q: "Do you work with international clients?",
    a: "Absolutely! We work with clients from over 180 countries. We handle time zones efficiently and communicate in English and Bengali.",
  },
  {
    q: "What information should I include in my message?",
    a: "Include your project goals, timeline, budget range, and any specific requirements. The more details, the faster we can help.",
  },
  {
    q: "Do you offer free consultations?",
    a: "Yes! We offer a free 30-minute consultation call to discuss your project requirements and provide expert guidance.",
  },
  {
    q: "What are your payment terms?",
    a: "We work with Stripe for secure payments. Typical terms are 50% upfront and 50% on delivery, but we're flexible for long-term projects.",
  },
];

// ============================================
// HELPER COMPONENTS
// ============================================
const FloatingOrb = ({ className, delay = 0 }) => (
  <motion.div
    animate={{
      opacity: [0.3, 0.6, 0.3],
      scale: [1, 1.2, 1],
    }}
    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
  />
);

const SectionHeader = ({ label, title, description, gradient = "from-cyan-400 to-purple-500" }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, margin: "-100px" }}
    variants={staggerContainer}
    className="text-center mb-12"
  >
    <motion.span
      variants={fadeInUp}
      className="text-cyan-400 font-medium tracking-wider text-sm uppercase"
    >
      {label}
    </motion.span>
    <motion.h2
      variants={fadeInUp}
      className="text-4xl md:text-5xl font-bold text-white mt-3 mb-4"
    >
      {title}{" "}
      <span className={`bg-gradient-to-r ${gradient} bg-clip-text text-transparent`}>
        {description}
      </span>
    </motion.h2>
  </motion.div>
);

// ============================================
// MAIN COMPONENT
// ============================================
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    inquiryType: "",
    budget: "",
    timeline: "",
    subject: "",
    message: "",
    files: [],
    newsletter: false,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const formRef = useRef(null);

  // ============================================
  // VALIDATION
  // ============================================
  const validateField = (name, value) => {
    const newErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) newErrors.name = "Name is required";
        else if (value.trim().length < 2) newErrors.name = "Name must be at least 2 characters";
        else delete newErrors.name;
        break;
      case "email":
        if (!value.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          newErrors.email = "Please enter a valid email";
        else delete newErrors.email;
        break;
      case "message":
        if (!value.trim()) newErrors.message = "Message is required";
        else if (value.trim().length < 20)
          newErrors.message = "Message must be at least 20 characters";
        else delete newErrors.message;
        break;
      case "subject":
        if (!value.trim()) newErrors.subject = "Subject is required";
        else delete newErrors.subject;
        break;
      default:
        break;
    }

    setErrors(newErrors);
    return !newErrors[name];
  };

  const validateForm = () => {
    const required = ["name", "email", "subject", "message"];
    let valid = true;
    required.forEach((field) => {
      if (!validateField(field, formData[field])) valid = false;
    });
    return valid;
  };

  // ============================================
  // HANDLERS
  // ============================================
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));

    // Live validation on blur only for text fields
    if (type !== "checkbox" && errors[name]) {
      validateField(name, newValue);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter((file) => file.size <= 10 * 1024 * 1024); // 10MB
    setFormData((prev) => ({
      ...prev,
      files: [...prev.files, ...validFiles].slice(0, 5),
    }));
  };

  const removeFile = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call (replace with actual API)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // await axios.post('/api/contact', formData);
      setIsSuccess(true);
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          inquiryType: "",
          budget: "",
          timeline: "",
          subject: "",
          message: "",
          files: [],
          newsletter: false,
        });
        setIsSuccess(false);
      }, 5000);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden pt-32 pb-24">
      {/* ============================================ */}
      {/* BACKGROUND */}
      {/* ============================================ */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <FloatingOrb className="w-[500px] h-[500px] bg-cyan-500/20 -top-48 -left-48" delay={0} />
        <FloatingOrb className="w-[400px] h-[400px] bg-purple-500/20 top-1/3 -right-32" delay={1} />
        <FloatingOrb className="w-[600px] h-[600px] bg-blue-500/10 bottom-0 left-1/4" delay={2} />
        <FloatingOrb className="w-[300px] h-[300px] bg-pink-500/15 top-2/3 right-1/4" delay={1.5} />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* ============================================ */}
        {/* HERO HEADER */}
        {/* ============================================ */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.div variants={fadeInUp} className="flex justify-center mb-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                            bg-white/5 border border-white/10 backdrop-blur-sm
                            text-sm text-cyan-400 font-medium tracking-wide">
              <MessageSquare className="w-4 h-4" />
              Let's Talk
            </div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold text-white leading-[1.1] 
                       tracking-tight mb-6"
          >
            Get in{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              touch
            </span>{" "}
            with us
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
          >
            Have a project in mind? We'd love to hear from you. Our team is here to help 
            you turn your ideas into reality.
          </motion.p>

          {/* Response time badge */}
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full 
                       bg-green-500/10 border border-green-500/20"
          >
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-green-500"
            />
            <span className="text-sm text-green-400 font-medium">
              Online now · Average response: 2 hours
            </span>
          </motion.div>
        </motion.div>

        {/* ============================================ */}
        {/* CONTACT METHOD CARDS */}
        {/* ============================================ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-16"
        >
          {contactMethods.map((method, i) => (
            <motion.a
              key={i}
              href={method.href}
              variants={scaleIn}
              whileHover={{ y: -8 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="relative group cursor-pointer"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${method.color} 
                              rounded-2xl blur-xl opacity-0 group-hover:opacity-30 
                              transition-opacity duration-500`} />
              <div className="relative p-6 rounded-2xl bg-white/[0.03] border border-white/10 
                              backdrop-blur-sm group-hover:border-white/20 
                              transition-all duration-300 h-full">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${method.color} 
                                flex items-center justify-center mb-4
                                shadow-lg ${method.shadow}
                                group-hover:scale-110 transition-transform duration-300`}>
                  <method.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-white font-semibold mb-1">{method.title}</h3>
                <p className="text-xs text-gray-500 mb-3">{method.description}</p>
                <div className="text-sm text-cyan-400 font-medium truncate">{method.value}</div>
                <ArrowRight className="absolute top-6 right-6 w-4 h-4 text-gray-600 
                                       group-hover:text-cyan-400 group-hover:translate-x-1 
                                       transition-all duration-300" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* ============================================ */}
        {/* MAIN FORM + INFO GRID */}
        {/* ============================================ */}
        <div className="grid lg:grid-cols-5 gap-8 mb-24">
          {/* ============================================ */}
          {/* CONTACT FORM */}
          {/* ============================================ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInLeft}
            className="lg:col-span-3"
          >
            <div className="relative p-8 md:p-10 rounded-3xl 
                            bg-white/[0.03] border border-white/10 backdrop-blur-sm">
              {/* Success overlay */}
              <AnimatePresence>
                {isSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-20 rounded-3xl 
                               bg-[#0a0a0f]/95 backdrop-blur-md
                               flex flex-col items-center justify-center p-8 text-center"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-20 h-20 rounded-full 
                                 bg-gradient-to-br from-green-400 to-emerald-500 
                                 flex items-center justify-center mb-6
                                 shadow-2xl shadow-green-500/40"
                    >
                      <CheckCircle2 className="w-10 h-10 text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-white mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-gray-400 max-w-md">
                      Thank you for reaching out. Our team will get back to you within 
                      2 business hours.
                    </p>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 px-6 py-3 rounded-xl 
                                 bg-white/5 border border-white/10 text-white
                                 hover:bg-white/10 transition-colors"
                    >
                      Send Another Message
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Form header */}
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  Send us a message
                </h2>
                <p className="text-gray-400 text-sm">
                  Fill out the form below and we'll get back to you shortly.
                </p>
              </div>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                {/* Name + Email row */}
                <div className="grid md:grid-cols-2 gap-5">
                  <FormInput
                    label="Full Name"
                    name="name"
                    icon={User}
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.name}
                    required
                  />
                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    icon={Mail}
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.email}
                    required
                  />
                </div>

                {/* Company + Phone row */}
                <div className="grid md:grid-cols-2 gap-5">
                  <FormInput
                    label="Company"
                    name="company"
                    icon={Building2}
                    placeholder="Acme Inc. (optional)"
                    value={formData.company}
                    onChange={handleChange}
                  />
                  <FormInput
                    label="Phone"
                    name="phone"
                    type="tel"
                    icon={Phone}
                    placeholder="+880 1234-567890 (optional)"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Inquiry Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    What can we help you with? <span className="text-red-400">*</span>
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {inquiryTypes.map((type) => (
                      <motion.button
                        key={type.id}
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, inquiryType: type.id }))
                        }
                        className={`relative p-3 rounded-xl border text-left
                                   transition-all duration-300 group
                                   ${
                                     formData.inquiryType === type.id
                                       ? "bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border-cyan-500/50"
                                       : "bg-white/[0.02] border-white/10 hover:border-white/20"
                                   }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <type.icon
                            className={`w-4 h-4 transition-colors ${
                              formData.inquiryType === type.id
                                ? "text-cyan-400"
                                : "text-gray-500 group-hover:text-gray-400"
                            }`}
                          />
                          <span
                            className={`text-xs font-semibold ${
                              formData.inquiryType === type.id
                                ? "text-white"
                                : "text-gray-300"
                            }`}
                          >
                            {type.label}
                          </span>
                        </div>
                        <p className="text-[10px] text-gray-500 line-clamp-2">
                          {type.description}
                        </p>
                        {formData.inquiryType === type.id && (
                          <motion.div
                            layoutId="inquiry-check"
                            className="absolute top-2 right-2"
                          >
                            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Budget + Timeline row */}
                <div className="grid md:grid-cols-2 gap-5">
                  <FormSelect
                    label="Project Budget"
                    name="budget"
                    icon={DollarSign}
                    value={formData.budget}
                    onChange={handleChange}
                    options={budgets}
                    placeholder="Select your budget"
                  />
                  <FormSelect
                    label="Project Timeline"
                    name="timeline"
                    icon={Calendar}
                    value={formData.timeline}
                    onChange={handleChange}
                    options={timelines}
                    placeholder="When do you need it?"
                  />
                </div>

                {/* Subject */}
                <FormInput
                  label="Subject"
                  name="subject"
                  icon={FileText}
                  placeholder="Brief summary of your inquiry"
                  value={formData.subject}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={errors.subject}
                  required
                />

                {/* Message */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message <span className="text-red-400">*</span>
                  </label>
                  <div
                    className={`relative rounded-xl border transition-colors duration-300
                                bg-white/[0.02] backdrop-blur-sm
                                ${
                                  errors.message
                                    ? "border-red-500/50"
                                    : "border-white/10 focus-within:border-cyan-500/50"
                                }`}
                  >
                    <div className="absolute top-3.5 left-3.5 text-gray-500">
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Tell us about your project, goals, and any specific requirements..."
                      rows={6}
                      className="w-full bg-transparent text-white placeholder-gray-500 
                                 outline-none text-sm pl-10 pr-4 py-3.5 resize-none"
                    />
                    <div className="absolute bottom-3 right-3 text-xs text-gray-500">
                      {formData.message.length} / 2000
                    </div>
                  </div>
                  {errors.message && (
                    <motion.p
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-400 mt-2 flex items-center gap-1.5"
                    >
                      <AlertCircle className="w-3.5 h-3.5" />
                      {errors.message}
                    </motion.p>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Attachments (optional, max 5 files, 10MB each)
                  </label>
                  <label className="relative flex items-center gap-3 p-4 rounded-xl 
                                    border border-dashed border-white/20 
                                    bg-white/[0.02] hover:border-cyan-500/40 
                                    hover:bg-cyan-500/5 transition-all duration-300
                                    cursor-pointer group">
                    <input
                      type="file"
                      multiple
                      onChange={handleFileUpload}
                      accept=".pdf,.doc,.docx,.png,.jpg,.jpeg,.zip"
                      className="hidden"
                    />
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 
                                    flex items-center justify-center
                                    group-hover:border-cyan-500/30 group-hover:bg-cyan-500/10
                                    transition-colors duration-300">
                      <Paperclip className="w-4 h-4 text-gray-400 group-hover:text-cyan-400" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-gray-300 font-medium">
                        Click to upload files
                      </p>
                      <p className="text-xs text-gray-500">
                        PDF, DOC, PNG, JPG, ZIP up to 10MB
                      </p>
                    </div>
                  </label>

                  {/* File previews */}
                  {formData.files.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {formData.files.map((file, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          className="flex items-center gap-3 p-3 rounded-xl 
                                     bg-white/[0.03] border border-white/10"
                        >
                          <FileText className="w-4 h-4 text-cyan-400" />
                          <span className="flex-1 text-sm text-gray-300 truncate">
                            {file.name}
                          </span>
                          <span className="text-xs text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                          <button
                            type="button"
                            onClick={() => removeFile(i)}
                            className="w-6 h-6 rounded-md bg-white/5 border border-white/10 
                                       flex items-center justify-center
                                       hover:bg-red-500/20 hover:border-red-500/30
                                       transition-colors duration-200"
                          >
                            <X className="w-3 h-3 text-gray-400 hover:text-red-400" />
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Newsletter + Submit */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer group flex-1">
                    <div className="relative">
                      <input
                        type="checkbox"
                        name="newsletter"
                        checked={formData.newsletter}
                        onChange={handleChange}
                        className="sr-only peer"
                      />
                      <div className="w-5 h-5 rounded-md border-2 border-white/20 
                                      peer-checked:bg-gradient-to-br peer-checked:from-cyan-400 peer-checked:to-blue-500
                                      peer-checked:border-transparent
                                      flex items-center justify-center
                                      group-hover:border-cyan-500/50 transition-colors">
                        {formData.newsletter && (
                          <CheckCircle2 className="w-3 h-3 text-white" />
                        )}
                      </div>
                    </div>
                    <span className="text-sm text-gray-400 group-hover:text-gray-300">
                      Send me updates about IDEONS news and offers
                    </span>
                  </label>
                </div>

                {/* Submit button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="relative w-full py-4 rounded-xl 
                             bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600
                             text-white font-semibold text-base
                             shadow-lg shadow-cyan-500/25
                             hover:shadow-cyan-500/40 transition-all duration-300
                             disabled:opacity-60 disabled:cursor-not-allowed
                             flex items-center justify-center gap-3 group overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        Send Message
                      </>
                    )}
                  </span>
                  {!isSubmitting && (
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"
                      initial={{ x: "100%" }}
                      whileHover={{ x: 0 }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </motion.button>

                {/* Privacy note */}
                <p className="text-xs text-gray-500 text-center">
                  By submitting, you agree to our{" "}
                  <a href="/terms" className="text-cyan-400 hover:underline">
                    Terms
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-cyan-400 hover:underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>
            </div>
          </motion.div>

          {/* ============================================ */}
          {/* SIDEBAR INFO */}
          {/* ============================================ */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInRight}
            className="lg:col-span-2 space-y-5"
          >
            {/* Why choose us */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 
                            backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 
                                flex items-center justify-center shadow-lg shadow-cyan-500/25">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Why IDEONS?</h3>
              </div>
              <ul className="space-y-4">
                {[
                  { icon: Zap, text: "Fast 2-hour average response time" },
                  { icon: Shield, text: "100% secure & confidential" },
                  { icon: Users, text: "Dedicated project manager" },
                  { icon: Globe, text: "Serving 180+ countries" },
                  { icon: Heart, text: "Free consultation included" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 
                                    flex items-center justify-center flex-shrink-0 mt-0.5">
                      <item.icon className="w-4 h-4 text-cyan-400" />
                    </div>
                    <span className="text-sm text-gray-300 leading-relaxed pt-1.5">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Office hours */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 
                            backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 
                                flex items-center justify-center shadow-lg shadow-purple-500/25">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold text-white">Office Hours</h3>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  { day: "Monday – Friday", time: "9:00 AM – 6:00 PM" },
                  { day: "Saturday", time: "10:00 AM – 4:00 PM" },
                  { day: "Sunday", time: "Closed" },
                ].map((row, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between py-2 border-b border-white/5 last:border-0"
                  >
                    <span className="text-gray-400">{row.day}</span>
                    <span className="text-white font-medium">{row.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20">
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-2 h-2 rounded-full bg-green-500"
                  />
                  <span className="text-xs text-green-400 font-medium">
                    Currently open (GMT+6)
                  </span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="p-6 rounded-3xl bg-white/[0.03] border border-white/10 
                            backdrop-blur-sm">
              <h3 className="text-lg font-bold text-white mb-4">Follow Us</h3>
              <div className="flex flex-wrap gap-2">
                {socialLinks.map((social, i) => (
                  <motion.a
                    key={i}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    whileHover={{ y: -3, scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 
                               flex items-center justify-center text-gray-400 
                               transition-all duration-300 ${social.color}`}
                  >
                    <social.icon className="w-4 h-4" />
                  </motion.a>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Follow us for updates, tips, and behind-the-scenes content.
              </p>
            </div>

            {/* Emergency contact */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-orange-500/10 to-red-500/10 
                            border border-orange-500/20 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 
                                flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-base font-bold text-white">Urgent Issue?</h3>
              </div>
              <p className="text-sm text-gray-400 mb-4">
                For critical production issues, use our emergency hotline.
              </p>
              <a
                href="tel:+8809999888877"
                className="inline-flex items-center gap-2 text-sm font-semibold 
                           text-orange-400 hover:text-orange-300 transition-colors"
              >
                <Phone className="w-4 h-4" />
                +880 9999-888877
              </a>
            </div>
          </motion.div>
        </div>

        {/* ============================================ */}
        {/* MAP SECTION */}
        {/* ============================================ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={scaleIn}
          className="mb-24"
        >
          <SectionHeader
            label="Our Location"
            title="Visit our"
            description="office"
          />
          <div className="relative rounded-3xl overflow-hidden border border-white/10 
                          backdrop-blur-sm h-[400px] md:h-[500px]">
            {/* Map placeholder — replace with actual Google Maps embed */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0f] via-[#0f0f1a] to-[#0a0a0f]" />
            <div
              className="absolute inset-0 opacity-[0.05]"
              style={{
                backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                backgroundSize: "40px 40px",
              }}
            />
            
            {/* Address card overlay */}
            <div className="absolute inset-0 flex items-center justify-center p-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="max-w-md w-full p-8 rounded-2xl 
                           bg-[#0a0a0f]/90 backdrop-blur-xl 
                           border border-white/10 shadow-2xl"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 
                                  flex items-center justify-center shadow-lg shadow-cyan-500/30 flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">IDEONS HQ</h3>
                    <p className="text-sm text-gray-400">
                      Level 8, Tech Tower<br />
                      Banani, Dhaka 1213<br />
                      Bangladesh
                    </p>
                  </div>
                </div>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold 
                             text-cyan-400 hover:text-cyan-300 transition-colors group"
                >
                  Get Directions
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </motion.div>
            </div>

            {/* Decorative orbs */}
            <FloatingOrb className="w-64 h-64 bg-cyan-500/20 top-1/4 left-1/4" delay={0} />
            <FloatingOrb className="w-64 h-64 bg-purple-500/20 bottom-1/4 right-1/4" delay={1} />
          </div>
        </motion.div>

        {/* ============================================ */}
        {/* FAQ SECTION */}
        {/* ============================================ */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto mb-24"
        >
          <SectionHeader
            label="FAQ"
            title="Frequently asked"
            description="questions"
          />

          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openFaq === i;
              return (
                <motion.div
                  key={i}
                  variants={fadeInUp}
                  className="relative rounded-2xl overflow-hidden 
                             bg-white/[0.03] border border-white/10 
                             backdrop-blur-sm transition-colors duration-300
                             hover:border-white/20"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? -1 : i)}
                    className="w-full flex items-center justify-between 
                               gap-4 p-5 md:p-6 text-left
                               hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="flex items-center gap-4 flex-1">
                      <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 
                                      flex items-center justify-center flex-shrink-0
                                      text-xs font-bold text-cyan-400">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      <span className="text-white font-medium text-sm md:text-base">
                        {faq.q}
                      </span>
                    </div>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    </motion.div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 md:px-6 pb-5 md:pb-6 pl-16 md:pl-20">
                          <p className="text-sm text-gray-400 leading-relaxed">
                            {faq.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Still have questions */}
          <motion.div
            variants={fadeInUp}
            className="mt-10 text-center p-8 rounded-2xl 
                       bg-gradient-to-br from-cyan-500/10 to-purple-500/10
                       border border-white/10"
          >
            <h3 className="text-xl font-bold text-white mb-2">
              Still have questions?
            </h3>
            <p className="text-gray-400 text-sm mb-5">
              Can't find the answer you're looking for? Our team is happy to help.
            </p>
            <a
              href="mailto:hello@ideons.com"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl 
                         bg-gradient-to-r from-cyan-500 to-blue-600
                         text-white font-semibold text-sm
                         shadow-lg shadow-cyan-500/25
                         hover:shadow-cyan-500/40 transition-shadow duration-300
                         group"
            >
              <Mail className="w-4 h-4" />
              Email Support
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

// ============================================
// FORM INPUT COMPONENT
// ============================================
const FormInput = ({
  label,
  name,
  type = "text",
  icon: Icon,
  placeholder,
  value,
  onChange,
  onBlur,
  error,
  required,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div
        className={`relative rounded-xl border transition-colors duration-300
                    bg-white/[0.02] backdrop-blur-sm
                    ${
                      error
                        ? "border-red-500/50"
                        : "border-white/10 focus-within:border-cyan-500/50"
                    }`}
      >
        {Icon && (
          <div className="absolute top-1/2 -translate-y-1/2 left-3.5 text-gray-500">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full bg-transparent text-white placeholder-gray-500 
                     outline-none text-sm py-3.5 ${Icon ? "pl-10" : "pl-4"} pr-4`}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            className="text-xs text-red-400 mt-2 flex items-center gap-1.5"
          >
            <AlertCircle className="w-3.5 h-3.5" />
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// ============================================
// FORM SELECT COMPONENT
// ============================================
const FormSelect = ({
  label,
  name,
  icon: Icon,
  value,
  onChange,
  options,
  placeholder,
}) => {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      <div className="relative rounded-xl border border-white/10 focus-within:border-cyan-500/50 
                      transition-colors duration-300 bg-white/[0.02] backdrop-blur-sm">
        {Icon && (
          <div className="absolute top-1/2 -translate-y-1/2 left-3.5 text-gray-500 pointer-events-none">
            <Icon className="w-4 h-4" />
          </div>
        )}
        <select
          name={name}
          value={value}
          onChange={onChange}
          className={`w-full bg-transparent text-white 
                     outline-none text-sm py-3.5 appearance-none
                     ${Icon ? "pl-10" : "pl-4"} pr-10 cursor-pointer
                     [&>option]:bg-[#0a0a0f] [&>option]:text-white`}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute top-1/2 -translate-y-1/2 right-3.5 
                                w-4 h-4 text-gray-500 pointer-events-none" />
      </div>
    </div>
  );
};

export default Contact;