import React, { useState } from 'react';
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

// Custom CSS for radial gradients
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
      description: "Help our customers succeed with KAID. You'll be the primary point of contact for our enterprise clients, ensuring they get maximum value from our platform.",
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
      quote: "KAID gives me the freedom to create user experiences that truly matter. Our design system is world-class, and the impact is visible."
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
    <div className="min-h-screen bg-slate-900">  
      {/* Hero Section */}
      <section className="pt-16 pb-16 px-4 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
        {/* Background gradient glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-gradient-radial from-purple-500/30 via-pink-500/15 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[300px] bg-gradient-radial from-cyan-500/25 via-purple-500/15 to-transparent rounded-full blur-2xl"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10 pt-12">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <span className="text-purple-400 text-sm font-medium">🚀 Join Our Team</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                KAID
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Careers
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Build the future of accounting software with passionate, talented people who are changing 
              how businesses manage their finances worldwide.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16">
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
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Featured Opportunities</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Join our team and help build the future of business accounting software.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {featuredJobs.slice(0, 2).map((job) => (
              <div 
                key={job.id} 
                className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 hover:border-purple-500/30 transition-all duration-300 group project-card-hover"
                onClick={() => setSelectedJob(job)}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center text-white">
                      {getDepartmentIcon(job.department)}
                    </div>
                    <div>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                        {job.department}
                      </span>
                    </div>
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
      <section id="open-positions" className="py-16 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Open Positions</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Find your perfect role and join our mission to revolutionize business accounting.
            </p>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
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
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full ${
                    selectedDepartment === dept
                      ? 'liquid-glass-btn liquid-glass-btn-primary'
                      : 'liquid-glass-btn'
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
                className="bg-slate-800/50 rounded-2xl overflow-hidden border border-slate-700 project-card-hover hover:border-purple-500/30 transition-all duration-300"
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
                        className="liquid-glass-btn liquid-glass-btn-primary px-6 py-3 rounded-full font-medium"
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
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Why Work With Us?</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              We offer comprehensive benefits and a culture that supports your growth and well-being.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 hover:bg-slate-800/70 transition-all duration-300 group">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              These core values guide everything we do and shape our company culture.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {companyValues.map((value, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 hover:bg-slate-800/70 transition-all duration-300 text-center">
                <div className="w-16 h-16 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-purple-500/30 transition-colors duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Testimonials */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Meet Our Team</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Hear from our team members about their experience working at KAID.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-slate-800/50 rounded-xl p-8 border border-slate-700 hover:bg-slate-800/70 transition-all duration-300 text-center">
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
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/30 via-slate-900 to-purple-900/30 relative overflow-hidden">
        {/* Background gradient glow */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-pink-500/40 via-purple-600/25 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Ready to
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Join Us?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Don't see the perfect role? We're always looking for talented people. 
            Send us your resume and let's start a conversation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowApplicationForm(true)}
              className="bg-white text-slate-900 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-2xl flex items-center justify-center space-x-2"
            >
              <Rocket className="w-5 h-5" />
              <span>Apply Now</span>
            </button>
            <button className="border-2 border-purple-400/50 text-purple-400 hover:bg-purple-400/10 px-8 py-4 rounded-full font-semibold transition-all duration-300">
              Contact HR
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-bold mb-4">
                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                  KAID
                </span>
              </div>
              <p className="text-gray-400 mb-4">
                Transforming accounting with AI-powered automation and intelligent business solutions.
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500/30 transition-colors cursor-pointer">
                  <span className="text-purple-400 text-sm">T</span>
                </div>
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500/30 transition-colors cursor-pointer">
                  <span className="text-purple-400 text-sm">L</span>
                </div>
                <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center hover:bg-purple-500/30 transition-colors cursor-pointer">
                  <span className="text-purple-400 text-sm">G</span>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Integrations</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0">
              © 2025 KAID. All rights reserved.
            </div>
            <div className="flex space-x-6 text-gray-400 text-sm">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Job Detail Modal */}
      {selectedJob && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
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
                  className="text-gray-400 hover:text-white transition-colors"
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
                  <div className="bg-slate-700/30 rounded-2xl p-6 mb-6">
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
                    className="w-full bg-white text-slate-900 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2"
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
          <div className="bg-slate-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-white">Apply to KAID</h2>
                <button 
                  onClick={() => setShowApplicationForm(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ✕
                </button>
              </div>

              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Position of Interest
                  </label>
                  <select className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50">
                    <option value="">Select a position</option>
                    {jobs.map(job => (
                      <option key={job.id} value={job.title}>{job.title}</option>
                    ))}
                    <option value="other">Other / General Application</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Resume/CV *
                  </label>
                  <div className="border-2 border-dashed border-purple-500/20 rounded-xl p-6 text-center hover:border-purple-500/40 transition-colors">
                    <div className="text-gray-400 mb-2">Drop your resume here or click to browse</div>
                    <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
                    <button type="button" className="text-purple-400 hover:text-purple-300 transition-colors">
                      Choose File
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-purple-500/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
                    placeholder="Tell us why you'd be a great fit for KAID..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-slate-900 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl flex items-center justify-center space-x-2"
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