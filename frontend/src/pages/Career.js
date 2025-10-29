import React, { useState, useEffect } from 'react';
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

const Career = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [selectedJob, setSelectedJob] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isVisible, setIsVisible] = useState({});
  
  // Form state
  const [formData, setFormData] = useState({
    fullname: '',
    dob: '',
    age: '',
    number: '',
    mail: '',
    address: '',
    pancard: ''
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you can add API call to submit the form
    alert('Application submitted successfully!');
    // Reset form
    setFormData({
      fullname: '',
      dob: '',
      age: '',
      number: '',
      mail: '',
      address: '',
      pancard: ''
    });
  };

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
              fontWeight: 600,
              letterSpacing: '0.05em',
              textShadow: "0 0 15px rgba(96, 165, 250, 0.35)",
            }}
          >
            Join Us
          </h1>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Join our mission to revolutionize business finance with cutting-edge technology
          </p>
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

      {/* Application Form Section */}
      <section className="py-20 px-4 bg-black scroll-animate">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-purple-400 tracking-widest uppercase text-sm mb-4">Apply Now</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Became a Seller
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Fill out the form below 
            </p>
          </div>

          <div className="bg-slate-800/30 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-500/20">
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullname"
                  value={formData.fullname}
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
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleFormChange}
                    required
                    min="18"
                    max="100"
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                    placeholder="25"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleFormChange}
                  required
                  className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                  placeholder="+1 234 567 8900"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="mail"
                  value={formData.mail}
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
                          setShowApplicationForm(true);
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
              <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/10 hover:bg-slate-800/50 transition-all duration-300 group">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
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
              <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/10 hover:bg-slate-800/50 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/30 transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Testimonials */}
      <section className="py-20 px-4 bg-black scroll-animate">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-purple-400 tracking-widest uppercase text-sm mb-4">Team Stories</p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6"
              style={{
                background: 'linear-gradient(to bottom, #FFFFFF, #AAAAAA)',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Meet Our Team
            </h2>
            <p className="text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Hear from our team members about their experience working at EL KAID
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-slate-800/30 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/10 hover:bg-slate-800/50 transition-all duration-300 text-center">
                <img 
                  src={member.image} 
                  alt={member.name}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-6"
                />
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <div className="text-purple-300 mb-1">{member.position}</div>
                <div className="text-gray-400 text-sm mb-6">{member.department}</div>
                <p className="text-gray-300 leading-relaxed italic">"{member.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 relative overflow-hidden bg-black scroll-animate">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[750px] lg:w-[1000px] h-[300px] sm:h-[450px] lg:h-[600px] bg-gradient-radial from-blue-500/40 via-sky-600/25 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[525px] lg:w-[700px] h-[200px] sm:h-[300px] lg:h-[400px] bg-gradient-radial from-sky-500/50 via-blue-500/30 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-sky-400 to-cyan-400 bg-clip-text text-transparent">
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
              className="glow-button"
            >
              <div className="button_inner">
                <p>Apply Now</p>
              </div>
              <div className="glow"></div>
            </button>
            <button className="border-2 border-blue-400/50 text-blue-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-400/10 transition-all duration-300">
              Contact HR
            </button>
          </div>
        </div>
      </section>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-purple-500/20 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
          <div className="bg-slate-900 border border-purple-500/20 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
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

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullname"
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
                      required
                      className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Age *
                    </label>
                    <input
                      type="number"
                      name="age"
                      required
                      min="18"
                      max="100"
                      className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                      placeholder="25"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="number"
                    required
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="mail"
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
                    required
                    rows={3}
                    className="w-full px-4 py-3 bg-slate-800/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
                    placeholder="Street Address, City, State, ZIP Code"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    PAN Card Number *
                  </label>
                  <input
                    type="text"
                    name="pancard"
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