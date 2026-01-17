import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, 
  Clock, 
  DollarSign, 
  Users as UsersIcon, 
  Heart, 
  Zap, 
  Award, 
  Coffee, 
  Laptop, 
  Globe, 
  TrendingUp, 
  Shield, 
  Star,
  ArrowRight,
  CheckCircle,
  Building2,
  Calendar,
  Send,
  Filter,
  Search,
  Briefcase,
  GraduationCap,
  Target,
  Lightbulb,
  Headphones,
  Code,
  BarChart3,
  Palette,
  Rocket,
  Github,
  ExternalLink,
  FileText,
  CreditCard,
  Smartphone,
  Database,
  Brain,
  Receipt,
  Calculator
} from 'lucide-react';
import ScrollDown from "../components/ScrollDown";

// Custom CSS matching Home.js theme
const customStyles = `
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
  
  .project-card-hover {
    transition: all 0.3s ease;
  }
  
  .project-card-hover:hover {
    transform: translateY(-8px);
  }
  
  /* Scroll Animation Styles */
  .scroll-animate {
    opacity: 1;
    transform: translateY(0);
    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .scroll-animate:not(.animate-in) {
    opacity: 0;
    transform: translateY(50px);
  }
  
  .scroll-animate.animate-in {
    opacity: 1;
    transform: translateY(0);
  }
  
  .scroll-animate-delay-1 {
    transition-delay: 0.1s;
  }
  
  .scroll-animate-delay-2 {
    transition-delay: 0.2s;
  }
  
  .scroll-animate-delay-3 {
    transition-delay: 0.3s;
  }
  
  .feature-box-glow {
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.15), 0 0 16px rgba(255, 255, 255, 0.05);
  }
  
  /* Glow Button matching Home.js */
  .glow-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.85rem 2.5rem;
    border-radius: 9999px;
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(168, 85, 247, 0.3);
    color: #ffffff;
    font-weight: 500;
    font-size: 1.125rem;
    overflow: hidden;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  .glow-button:hover {
    background: rgba(168, 85, 247, 0.1);
    border-color: rgba(168, 85, 247, 0.5);
  }

  .button_inner {
    position: relative;
    z-index: 2;
    pointer-events: none;
  }

  .glow {
    position: absolute;
    inset: 0;
    border-radius: 9999px;
    background: radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.35), transparent 70%);
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.4s ease, transform 0.4s ease;
    z-index: 1;
  }

  .glow-button:hover .glow {
    opacity: 1;
    transform: scale(1.05);
    animation: glowMove 3s ease-in-out infinite alternate;
  }

  @keyframes glowMove {
    0% { background-position: 50% 50%; }
    50% { background-position: 60% 40%; }
    100% { background-position: 50% 50%; }
  }
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

// Animated Box Component with Gradient Effect (matching Home.js)
const AnimatedBoxWithGradient = ({ children, delay = "" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const boxRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!boxRef.current) return;
    const rect = boxRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <div className={`relative scroll-animate h-full ${delay}`} ref={boxRef}>
      {/* Outer glow layer */}
      <div
        className="pointer-events-none absolute -inset-1 opacity-0 blur-xl transition-opacity duration-500 rounded-2xl"
        style={{
          opacity: isHovered ? 0.15 : 0,
          background: `radial-gradient(200px circle at ${position.x}px ${position.y}px, #6366f1, #c4b5fd 50%, transparent 70%)`,
        }}
      />

      {/* Middle glow layer */}
      <div
        className="pointer-events-none absolute -inset-0.5 opacity-0 blur-lg transition-opacity duration-500 rounded-2xl"
        style={{
          opacity: isHovered ? 0.25 : 0,
          background: `radial-gradient(150px circle at ${position.x}px ${position.y}px, #8b5cf6, #e9d5ff 50%, transparent 70%)`,
        }}
      />

      {/* Main glow layer */}
      <div
        className="pointer-events-none absolute -inset-0 opacity-0 blur-md transition-opacity duration-400 rounded-2xl"
        style={{
          opacity: isHovered ? 0.35 : 0,
          background: `radial-gradient(120px circle at ${position.x}px ${position.y}px, #7c3aed, rgba(255, 255, 255, 0.4) 40%, transparent 65%)`,
        }}
      />

      {/* Box with animated border */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative h-full"
      >
        {/* Animated border that appears only on hover and follows cursor */}
        <div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          style={{
            background: isHovered 
              ? `radial-gradient(150px circle at ${position.x}px ${position.y}px, 
                  rgba(139, 92, 246, 1) 0%, 
                  rgba(124, 58, 237, 0.7) 25%, 
                  rgba(139, 92, 246, 0.4) 50%, 
                  transparent 75%)`
              : 'transparent',
            padding: '2px',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />

        <div 
          className="bg-slate-800/30 backdrop-blur-sm rounded-2xl transition-all duration-300 relative z-10 feature-box-glow h-full flex flex-col"
          style={{
            border: 'none',
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

// Country to Phone Code Mapping
const countryPhoneCodes = {
  'Australia': '+61',
  'Bangladesh': '+880',
  'Dubai': '+971',
  'United Arab Emirates': '+971',
  'India': '+91',
  'Kuwait': '+965',
  'Malaysia': '+60',
  'New Zealand': '+64',
  'Oman': '+968',
  'Qatar': '+974',
  'Saudi Arabia': '+966',
  'Singapore': '+65',
  'Sri Lanka': '+94',
  'United States': '+1',
  'United Kingdom': '+44',
  'Canada': '+1',
  'Germany': '+49',
  'France': '+33',
  'Other': '+'
};

const Career = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  const [phoneCode, setPhoneCode] = useState('+1');
  const [modalPhoneCode, setModalPhoneCode] = useState('+1');
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    phone: '',
    email: '',
    address: '',
    country: '',
    pancard: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Update phone code when country changes
    if (name === 'country' && value) {
      const code = countryPhoneCodes[value] || '+';
      setPhoneCode(code);
    }
  };

  const handleModalCountryChange = (e) => {
    const value = e.target.value;
    const code = countryPhoneCodes[value] || '+';
    setModalPhoneCode(code);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:8080/api/sellers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setToast({ visible: true, message: 'Application submitted successfully!', type: 'success' });
        setTimeout(() => setToast((t) => ({ ...t, visible: false })), 2500);
        setFormData({
          name: "",
          dob: "",
          phone: "",
          email: "",
          address: "",
          country: "",
          pancard: ""
        });
        setPhoneCode("+1");
        setModalPhoneCode("+1");
        setShowApplicationForm(false);
      } else {
        setToast({ visible: true, message: data.message || 'Submission failed', type: 'error' });
        setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
      }
    } catch (err) {
      console.error("Form submission failed:", err);
      setToast({ visible: true, message: 'Something went wrong. Please try again.', type: 'error' });
      setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
    }
  };
  

  // Initialize phone code when country is set
  useEffect(() => {
    if (formData.country) {
      const code = countryPhoneCodes[formData.country] || '+1';
      setPhoneCode(code);
    }
  }, [formData.country]);

  // Scroll animation effect matching Home.js
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          } else {
            entry.target.classList.remove('animate-in');
          }
        });
      },
      { threshold: 0.15 }
    );

    const els = document.querySelectorAll('.scroll-animate');
    els.forEach(el => io.observe(el));

    return () => io.disconnect();
  }, []);

  const departments = ['All', 'Engineering', 'Design', 'Sales', 'Marketing', 'Support', 'Operations'];

  const jobs = [
    {
      id: 1,
      title: "Senior Full Stack Developer",
      department: "Engineering",
      location: "New York, NY",
      type: "Full-time",
      experience: "5+ years",
      salary: "$120k - $160k",
      description: "Join our engineering team to build the next generation of accounting software. You'll work on both frontend and backend systems, contributing to our mission of simplifying financial management for businesses worldwide.",
      requirements: [
        "5+ years of experience with React, Node.js, and TypeScript",
        "Experience with cloud platforms (AWS, Azure, or GCP)",
        "Strong understanding of database design and optimization",
        "Experience with microservices architecture",
        "Knowledge of financial/accounting systems is a plus"
      ],
      responsibilities: [
        "Develop and maintain scalable web applications",
        "Collaborate with product and design teams",
        "Write clean, maintainable, and well-tested code",
        "Participate in code reviews and technical discussions",
        "Mentor junior developers and contribute to team growth"
      ],
      featured: true,
      posted: "2024-01-15"
    },
    {
      id: 2,
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote",
      type: "Full-time",
      experience: "3+ years",
      salary: "$90k - $120k",
      description: "Shape the user experience of our accounting platform. You'll design intuitive interfaces that make complex financial tasks simple and enjoyable for our users.",
      requirements: [
        "3+ years of UX/UI design experience",
        "Proficiency in Figma, Sketch, or similar design tools",
        "Strong portfolio demonstrating user-centered design",
        "Experience with design systems and component libraries",
        "Understanding of web accessibility standards"
      ],
      responsibilities: [
        "Design user interfaces for web and mobile applications",
        "Conduct user research and usability testing",
        "Create and maintain design systems",
        "Collaborate with engineering and product teams",
        "Present design concepts to stakeholders"
      ],
      featured: true,
      posted: "2024-01-12"
    },
    {
      id: 3,
      title: "Customer Success Manager",
      department: "Support",
      location: "London, UK",
      type: "Full-time",
      experience: "2+ years",
      salary: "£45k - £65k",
      description: "Help our customers succeed with EL KAID. You'll be the primary point of contact for our enterprise clients, ensuring they get maximum value from our platform.",
      requirements: [
        "2+ years in customer success or account management",
        "Excellent communication and interpersonal skills",
        "Experience with SaaS products",
        "Understanding of accounting or finance is preferred",
        "Ability to work across different time zones"
      ],
      responsibilities: [
        "Manage relationships with enterprise customers",
        "Conduct onboarding and training sessions",
        "Identify upselling and expansion opportunities",
        "Gather customer feedback and feature requests",
        "Collaborate with support and product teams"
      ],
      featured: false,
      posted: "2024-01-10"
    },
    {
      id: 4,
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Singapore",
      type: "Full-time",
      experience: "4+ years",
      salary: "S$80k - S$120k",
      description: "Build and maintain our cloud infrastructure. You'll ensure our platform is scalable, secure, and reliable for thousands of businesses worldwide.",
      requirements: [
        "4+ years of DevOps or infrastructure experience",
        "Experience with AWS, Docker, and Kubernetes",
        "Knowledge of CI/CD pipelines and automation",
        "Understanding of security best practices",
        "Experience with monitoring and logging tools"
      ],
      responsibilities: [
        "Manage cloud infrastructure and deployments",
        "Implement CI/CD pipelines and automation",
        "Monitor system performance and reliability",
        "Ensure security and compliance standards",
        "Collaborate with development teams"
      ],
      featured: false,
      posted: "2024-01-08"
    },
    {
      id: 5,
      title: "Product Marketing Manager",
      department: "Marketing",
      location: "New York, NY",
      type: "Full-time",
      experience: "3+ years",
      salary: "$100k - $130k",
      description: "Drive product adoption and growth through strategic marketing initiatives. You'll work closely with product and sales teams to bring new features to market.",
      requirements: [
        "3+ years in product marketing or related field",
        "Experience with B2B SaaS marketing",
        "Strong analytical and communication skills",
        "Knowledge of marketing automation tools",
        "Understanding of accounting/finance industry preferred"
      ],
      responsibilities: [
        "Develop go-to-market strategies for new features",
        "Create marketing content and collateral",
        "Conduct competitive analysis and market research",
        "Support sales team with marketing materials",
        "Analyze marketing performance and ROI"
      ],
      featured: false,
      posted: "2024-01-05"
    },
    {
      id: 6,
      title: "Sales Development Representative",
      department: "Sales",
      location: "Remote",
      type: "Full-time",
      experience: "1+ years",
      salary: "$60k - $80k + Commission",
      description: "Generate new business opportunities and help grow our customer base. You'll be the first point of contact for potential customers, qualifying leads and setting up demos.",
      requirements: [
        "1+ years of sales or business development experience",
        "Excellent communication and phone skills",
        "Experience with CRM systems (Salesforce preferred)",
        "Self-motivated and goal-oriented",
        "Interest in technology and SaaS products"
      ],
      responsibilities: [
        "Generate qualified leads through outbound prospecting",
        "Conduct discovery calls with potential customers",
        "Schedule demos for the sales team",
        "Maintain accurate records in CRM",
        "Collaborate with marketing on lead generation"
      ],
      featured: true,
      posted: "2024-01-03"
    }
  ];

  const benefits = [
    {
      icon: <Heart className="w-8 h-8 text-purple-400" />,
      title: "Health & Wellness",
      description: "Comprehensive health insurance, dental, vision, and wellness programs including gym memberships and mental health support."
    },
    {
      icon: <Laptop className="w-8 h-8 text-purple-400" />,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours. We provide top-tier equipment and a home office setup allowance."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-400" />,
      title: "Career Growth",
      description: "Professional development budget, conference attendance, and clear career progression paths with regular reviews."
    },
    {
      icon: <Coffee className="w-8 h-8 text-purple-400" />,
      title: "Work-Life Balance",
      description: "Unlimited PTO, flexible working hours, and company-wide mental health days to ensure you stay refreshed."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-purple-400" />,
      title: "Competitive Compensation",
      description: "Market-leading salaries, equity packages, performance bonuses, and annual salary reviews."
    },
    {
      icon: <UsersIcon className="w-8 h-8 text-purple-400" />,
      title: "Amazing Team",
      description: "Work with talented, passionate people who care about making a difference in the world of business finance."
    },
    {
      icon: <GraduationCap className="w-8 h-8 text-purple-400" />,
      title: "Learning & Development",
      description: "Access to online courses, workshops, conferences, and a dedicated learning budget for skill development."
    },
    {
      icon: <Globe className="w-8 h-8 text-purple-400" />,
      title: "Global Impact",
      description: "Work on products used by thousands of businesses worldwide, making a real impact on how companies manage their finances."
    }
  ];

  const teamMembers = [
    {
      name: "Sarah Chen",
      position: "Senior Software Engineer",
      department: "Engineering",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300",
      quote: "The technical challenges here are incredible, and the team support is unmatched. I've grown more in 2 years here than in my previous 5 years combined."
    },
    {
      name: "Marcus Johnson",
      position: "Product Designer",
      department: "Design",
      image: "https://images.pexels.com/photos/697509/pexels-photo-697509.jpeg?auto=compress&cs=tinysrgb&w=300",
      quote: "EL KAID gives me the freedom to create user experiences that truly matter. Our design system is world-class, and the impact is visible."
    },
    {
      name: "Emily Rodriguez",
      position: "Customer Success Lead",
      department: "Support",
      image: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=300",
      quote: "Every day I help businesses transform their operations. The satisfaction of seeing customers succeed with our platform is incredibly rewarding."
    }
  ];

  const companyValues = [
    {
      icon: <Target className="w-12 h-12 text-purple-400" />,
      title: "Customer-Centric",
      description: "Everything we do is focused on delivering exceptional value to our customers and solving their real problems."
    },
    {
      icon: <Lightbulb className="w-12 h-12 text-purple-400" />,
      title: "Innovation",
      description: "We constantly push boundaries and embrace new technologies to stay ahead in the rapidly evolving fintech space."
    },
    {
      icon: <UsersIcon className="w-12 h-12 text-purple-400" />,
      title: "Collaboration",
      description: "We believe the best solutions come from diverse perspectives working together towards common goals."
    },
    {
      icon: <Shield className="w-12 h-12 text-purple-400" />,
      title: "Integrity",
      description: "We operate with transparency, honesty, and the highest ethical standards in everything we do."
    }
  ];

  const stats = [
    { label: "Open Positions", value: "12+", icon: Briefcase },
    { label: "Team Members", value: "150+", icon: UsersIcon },
    { label: "Countries", value: "25+", icon: Globe },
    { label: "Employee Rating", value: "4.9/5", icon: Star }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesSearch;
  });

  const featuredJobs = jobs.filter(job => job.featured);

  const getDepartmentIcon = (department) => {
    switch (department) {
      case 'Engineering': return <Code className="w-5 h-5" />;
      case 'Design': return <Palette className="w-5 h-5" />;
      case 'Sales': return <TrendingUp className="w-5 h-5" />;
      case 'Marketing': return <BarChart3 className="w-5 h-5" />;
      case 'Support': return <Headphones className="w-5 h-5" />;
      case 'Operations': return <Building2 className="w-5 h-5" />;
      default: return <Briefcase className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      {/* Toast Notification */}
      <div
        className={`fixed top-6 right-6 z-[100] transform transition-all duration-500 ${
          toast.visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3 pointer-events-none'
        }`}
      >
        <div
          className={`flex items-center gap-3 px-5 py-4 rounded-2xl shadow-2xl backdrop-blur-sm border ${
            toast.type === 'success'
              ? 'bg-green-500/15 border-green-400/30 text-green-100'
              : 'bg-red-500/15 border-red-400/30 text-red-100'
          }`}
        >
          {toast.type === 'success' ? (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-2.59a.75.75 0 1 0-1.06-1.06l-4.72 4.72-1.78-1.78a.75.75 0 1 0-1.06 1.06l2.31 2.31c.293.293.767.293 1.06 0l5.25-5.25Z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
              <path fillRule="evenodd" d="M9.401 1.592a3.75 3.75 0 0 1 5.198 0l7.809 7.809a3.75 3.75 0 0 1 0 5.198l-7.809 7.809a3.75 3.75 0 0 1-5.198 0L1.592 14.599a3.75 3.75 0 0 1 0-5.198l7.809-7.809Zm6.102 6.102a.75.75 0 0 0-1.06-1.06L12 9.077 9.557 6.634a.75.75 0 1 0-1.06 1.06L10.94 10.14l-2.443 2.443a.75.75 0 1 0 1.06 1.06L12 11.2l2.443 2.443a.75.75 0 1 0 1.06-1.06L13.06 10.14l2.443-2.443Z" clipRule="evenodd" />
            </svg>
          )}
          <div className="text-sm font-medium">{toast.message}</div>
        </div>
      </div>
      {/* Hero Section - Matching Home.js style */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black scroll-animate">
        {/* Starry Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15)_1px,transparent_1px)] bg-[size:200px_200px] opacity-20" />
        </div>


        {/* Centered Title */}
        <div className="relative z-10 text-center">
          {/* Subtle glow effect behind text (match Home.js) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="text-6xl md:text-8xl font-bold uppercase tracking-wide opacity-25 blur-md"
              style={{
                fontFamily: "Montserrat, sans-serif",
                fontWeight: 600,
                background: "linear-gradient(to bottom, #60a5fa, #3b82f6)",
                WebkitBackgroundClip: "text",
                color: "transparent",
                letterSpacing: '0.05em'
              }}
            >
              JOIN US
            </div>
          </div>
          <h1
            className="text-6xl md:text-8xl font-bold uppercase tracking-wide relative text-white mb-6"
            style={{
              fontFamily: "Montserrat, sans-serif",
              fontWeight: 100,
              letterSpacing: '0.05em',
              textShadow: "0 0 15px rgba(96, 165, 250, 0.3)",
            }}
          >
            Join Us
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join our mission to revolutionize business finance with cutting-edge technology
          </p>
        </div>

        {/* === Scroll Down - Bottom === */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10">
          <ScrollDown />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-black">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                    <IconComponent className="w-8 h-8 text-purple-400 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                  <div className="text-gray-400">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
     

      {/* Featured Jobs */}
      <section className="py-20 px-4 bg-black scroll-animate">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-400 tracking-widest uppercase text-sm mb-4">Featured Roles</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Open Positions
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Join our team and help build the future of business accounting software
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredJobs.slice(0, 2).map((job) => (
              <div 
                key={job.id} 
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/10 hover:bg-slate-800/50 transition-all duration-300 group project-card-hover cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                      {getDepartmentIcon(job.department)}
                    </div>
                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                      {job.department}
                    </span>
                  </div>
                  <Star className="w-6 h-6 text-yellow-400" />
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-3">{job.title}</h3>
                <p className="text-gray-300 mb-6 leading-relaxed">{job.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{job.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{job.type}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <DollarSign className="w-4 h-4" />
                    <span className="text-sm">{job.salary}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Briefcase className="w-4 h-4" />
                    <span className="text-sm">{job.experience}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-gray-400 text-sm">
                    Posted {new Date(job.posted).toLocaleDateString()}
                  </div>
                  <div className="flex items-center space-x-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                    <span className="text-sm font-medium">View Details</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* All Open Positions */}
      <section id="open-positions" className="py-20 px-4 bg-black scroll-animate">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="pt-20">
              <p className="text-purple-400 tracking-widest uppercase text-sm mb-4">Explore All Roles</p>
              <h2 className="text-4xl md:text-5xl font-bold mb-6"
                style={{
                  background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Find Your Perfect Role
              </h2>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 w-80"
              />
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all ${
                    selectedDepartment === dept
                      ? 'bg-white text-black'
                      : 'bg-slate-800/50 border border-purple-500/20 text-gray-300 hover:bg-slate-800/70'
                  }`}
                >
                  {dept !== 'All' && getDepartmentIcon(dept)}
                  <span>{dept}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div 
                key={job.id} 
                className="bg-slate-800/30 backdrop-blur-sm rounded-2xl overflow-hidden border border-purple-500/10 project-card-hover hover:border-purple-500/30 transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedJob(job)}
              >
                <div className="p-6">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-4 mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                          {getDepartmentIcon(job.department)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white">{job.title}</h3>
                          <div className="flex items-center space-x-4 text-gray-400 text-sm">
                            <span>{job.department}</span>
                            <span>•</span>
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                          </div>
                        </div>
                        {job.featured && (
                          <Star className="w-5 h-5 text-yellow-400" />
                        )}
                      </div>
                      <p className="text-gray-300 mb-4 leading-relaxed">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <div className="flex items-center space-x-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.salary}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Briefcase className="w-4 h-4" />
                          <span>{job.experience}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>Posted {new Date(job.posted).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 lg:mt-0 lg:ml-6">
                      <button 
                        className="bg-white text-black px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-colors"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedJob(job);
                        }}
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">No positions found matching your criteria.</div>
              <button 
                onClick={() => {
                  setSelectedDepartment('All');
                  setSearchTerm('');
                }}
                className="text-purple-400 hover:text-purple-300 transition-colors"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>


       {/* Application Form Section */}
{/* Application Form Section */}
<section className="py-20 px-4 bg-black scroll-animate">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <p className="text-purple-400 tracking-widest uppercase text-sm mb-4">Apply Now</p>
      <h2 className="text-4xl md:text-5xl font-bold mb-6"
        style={{
          background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
        }}
      >
        Become a Seller
      </h2>
      <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
        Fill out the form below 
      </p>
    </div>

    <div className="grid md:grid-cols-2 gap-8 items-start">
      {/* Terms & Conditions - Left */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 md:p-10 border border-purple-500/20">
        <h3 className="text-2xl font-bold text-white mb-4">Terms & Conditions</h3>
        <p className="text-gray-300 mb-4">Please read these important points before submitting your seller application:</p>
        <ul className="list-disc list-inside space-y-3 text-gray-300">
          <li>Provide accurate and verifiable personal and business information.</li>
          <li>Agree to comply with local regulations and tax requirements.</li>
          <li>Transactions and payouts are subject to verification and review.</li>
          <li>Any misuse or fraudulent activities may result in account suspension.</li>
          <li>Data will be handled according to our privacy policy.</li>
        </ul>
        <div className="mt-6 text-sm text-gray-400">
          By submitting the application, you agree to our <span className="text-purple-300">Terms of Service</span> and <span className="text-purple-300">Privacy Policy</span>.
        </div>
      </div>

      {/* Seller Form - Right */}
      <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-500/20">
        <form onSubmit={handleFormSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              placeholder="John Doe"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Date of Birth *
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleFormChange}
                required
                className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Phone Number *
            </label>
            <div className="flex">
              <div className="flex items-center px-4 py-3 bg-slate-700/50 border border-purple-500/20 border-r-0 rounded-l-xl text-white font-medium">
                {phoneCode}
              </div>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleFormChange}
                required
                className="flex-1 px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-r-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                placeholder="234 567 8900"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Email *
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
              placeholder="john@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Address *
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleFormChange}
              required
              rows={3}
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
              placeholder="Street Address, City, State, ZIP Code"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Country *
            </label>
            <select
              name="country"
              value={formData.country}
              onChange={handleFormChange}
              required
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50 hover:border-purple-500/40 transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27rgb(168,85,247)%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.5rem] bg-[right_0.75rem_center] bg-no-repeat"
              style={{
                backgroundPositionX: 'calc(100% - 0.75rem)',
              }}
            >
              <option value="" disabled className="bg-slate-800 text-gray-400">Select your country</option>
              <option value="Australia" className="bg-slate-800 text-white py-2">Australia</option>
              <option value="Bangladesh" className="bg-slate-800 text-white py-2">Bangladesh</option>
              <option value="Dubai" className="bg-slate-800 text-white py-2">Dubai</option>
              <option value="India" className="bg-slate-800 text-white py-2">India</option>
              <option value="Kuwait" className="bg-slate-800 text-white py-2">Kuwait</option>
              <option value="Malaysia" className="bg-slate-800 text-white py-2">Malaysia</option>
              <option value="New Zealand" className="bg-slate-800 text-white py-2">New Zealand</option>
              <option value="Oman" className="bg-slate-800 text-white py-2">Oman</option>
              <option value="Qatar" className="bg-slate-800 text-white py-2">Qatar</option>
              <option value="Saudi Arabia" className="bg-slate-800 text-white py-2">Saudi Arabia</option>
              <option value="Singapore" className="bg-slate-800 text-white py-2">Singapore</option>
              <option value="Sri Lanka" className="bg-slate-800 text-white py-2">Sri Lanka</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              PAN Card Number *
            </label>
            <input
              type="text"
              name="pancard"
              value={formData.pancard}
              onChange={handleFormChange}
              required
              maxLength="10"
              className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 uppercase"
              placeholder="ABCDE1234F"
              pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
              title="Enter valid PAN card number (e.g., ABCDE1234F)"
            />
            <p className="text-xs text-gray-500 mt-1">Format: ABCDE1234F (5 letters, 4 digits, 1 letter)</p>
          </div>

          <button
            type="submit"
            className="w-full bg-white text-black py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2"
          >
            <Send className="w-5 h-5" />
            <span>Submit Application</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</section>

      {/* Benefits */}
      <section className="py-20 px-4 bg-black scroll-animate">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-400 tracking-widest uppercase text-sm mb-4">Benefits</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Why Work With Us?
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              We offer comprehensive benefits and a culture that supports your growth and well-being
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <AnimatedBoxWithGradient key={index} delay={index % 4 === 0 ? "" : index % 4 === 1 ? "scroll-animate-delay-1" : index % 4 === 2 ? "scroll-animate-delay-2" : "scroll-animate-delay-3"}>
                <div className="p-6 group flex flex-col h-full">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors duration-300 flex-shrink-0">
                    {benefit.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 flex-shrink-0">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed flex-grow">{benefit.description}</p>
                </div>
              </AnimatedBoxWithGradient>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 px-4 bg-black scroll-animate">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-400 tracking-widest uppercase text-sm mb-4">Our Values</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              What Drives Us
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              These core values guide everything we do and shape our company culture
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <AnimatedBoxWithGradient key={index} delay={index % 4 === 0 ? "" : index % 4 === 1 ? "scroll-animate-delay-1" : index % 4 === 2 ? "scroll-animate-delay-2" : "scroll-animate-delay-3"}>
                <div className="p-6 text-center group flex flex-col h-full">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500/30 transition-colors duration-300 flex-shrink-0">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3 flex-shrink-0">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed flex-grow">{value.description}</p>
                </div>
              </AnimatedBoxWithGradient>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-black scroll-animate">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] lg:w-[1000px] h-[300px] sm:h-[450px] lg:h-[600px] bg-gradient-radial from-purple-500/40 via-purple-600/25 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[525px] lg:w-[700px] h-[200px] sm:h-[300px] lg:h-[400px] bg-gradient-radial from-purple-500/50 via-purple-600/30 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600 bg-clip-text text-transparent">
              Join Our Team?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
            Don't see the perfect role? We're always looking for talented people. 
            Send us your resume and let's start a conversation.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              type="button"
              onClick={() => setShowApplicationForm(true)}
              className="bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-all duration-300"
            >
              Apply Now
            </button>
            <button className="border-2 border-purple-400/50 text-purple-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-purple-400/10 transition-all duration-300">
              Contact HR
            </button>
          </div>
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/20 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                    {getDepartmentIcon(selectedJob.department)}
                  </div>
                  <div>
                    <h2 className="text-3xl font-bold text-white">{selectedJob.title}</h2>
                    <div className="flex items-center space-x-4 text-gray-400 mt-2">
                      <span>{selectedJob.department}</span>
                      <span>•</span>
                      <span>{selectedJob.location}</span>
                      <span>•</span>
                      <span>{selectedJob.type}</span>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedJob(null)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">About This Role</h3>
                    <p className="text-gray-300 leading-relaxed">{selectedJob.description}</p>
                  </div>

                  <div className="mb-8">
                    <h3 className="text-xl font-bold text-white mb-4">Key Responsibilities</h3>
                    <div className="space-y-3">
                      {selectedJob.responsibilities.map((responsibility, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{responsibility}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Requirements</h3>
                    <div className="space-y-3">
                      {selectedJob.requirements.map((requirement, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{requirement}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-slate-800/50 rounded-2xl p-6 mb-6 border border-purple-500/10">
                    <h3 className="text-lg font-bold text-white mb-4">Job Details</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <MapPin className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="text-sm text-gray-400">Location</div>
                          <div className="text-white font-medium">{selectedJob.location}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Clock className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="text-sm text-gray-400">Type</div>
                          <div className="text-white font-medium">{selectedJob.type}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <DollarSign className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="text-sm text-gray-400">Salary</div>
                          <div className="text-white font-medium">{selectedJob.salary}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Briefcase className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="text-sm text-gray-400">Experience</div>
                          <div className="text-white font-medium">{selectedJob.experience}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button 
                    onClick={() => {
                      setSelectedJob(null);
                      setShowApplicationForm(true);
                    }}
                    className="w-full bg-white text-black py-4 rounded-full font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>Apply for This Position</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Application Form Modal */}
      {showApplicationForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/20 rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Apply to EL KAID</h2>
                <button 
                  onClick={() => setShowApplicationForm(false)}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ✕
                </button>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                    </label>
                    <input
                      type="text"
                    name="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                    placeholder="John Doe"
                    />
                  </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleFormChange}
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <div className="flex">
                    <div className="flex items-center px-4 py-3 bg-slate-700/50 border border-purple-500/20 border-r-0 rounded-l-xl text-white font-medium">
                      {modalPhoneCode}
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleFormChange}
                      required
                      className="flex-1 px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-r-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                      placeholder="234 567 8900"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleFormChange}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleFormChange}
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
                    placeholder="Street Address, City, State, ZIP Code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Country *
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={(e) => {
                      handleFormChange(e);
                      handleModalCountryChange(e);
                    }}
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50 hover:border-purple-500/40 transition-colors cursor-pointer appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27rgb(168,85,247)%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3e%3cpolyline points=%276 9 12 15 18 9%27%3e%3c/polyline%3e%3c/svg%3e')] bg-[length:1.5rem] bg-[right_0.75rem_center] bg-no-repeat"
                    style={{
                      backgroundPositionX: 'calc(100% - 0.75rem)',
                    }}
                  >
                    <option value="" disabled defaultValue>Select your country</option>
                    <option value="United States" className="bg-slate-800 text-white py-2">United States</option>
                    <option value="United Kingdom" className="bg-slate-800 text-white py-2">United Kingdom</option>
                    <option value="Canada" className="bg-slate-800 text-white py-2">Canada</option>
                    <option value="India" className="bg-slate-800 text-white py-2">India</option>
                    <option value="Australia" className="bg-slate-800 text-white py-2">Australia</option>
                    <option value="Germany" className="bg-slate-800 text-white py-2">Germany</option>
                    <option value="France" className="bg-slate-800 text-white py-2">France</option>
                    <option value="Singapore" className="bg-slate-800 text-white py-2">Singapore</option>
                    <option value="United Arab Emirates" className="bg-slate-800 text-white py-2">United Arab Emirates</option>
                    <option value="Other" className="bg-slate-800 text-white py-2">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    PAN Card Number *
                  </label>
                  <input
                    type="text"
                    name="pancard"
                    value={formData.pancard}
                    onChange={handleFormChange}
                    required
                    maxLength="10"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 uppercase"
                    placeholder="ABCDE1234F"
                    pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                    title="Enter valid PAN card number (e.g., ABCDE1234F)"
                  />
                  <p className="text-xs text-gray-500 mt-1">Format: ABCDE1234F (5 letters, 4 digits, 1 letter)</p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Submit Application</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Career;