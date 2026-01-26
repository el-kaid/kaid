'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';
import CareerApplicationModal from '../../components/CareerApplicationModal';
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
    Briefcase,
    GraduationCap,
    Target,
    Lightbulb,
    Headphones,
    Code,
    BarChart3,
    Palette,
    Building2,
    Calendar,
    Search,
    Filter,
    CheckCircle,
    X,
    ArrowRight
} from 'lucide-react';

const CareerPage = () => {
    // State for Application Form Modal
    const [isApplicationModalOpen, setIsApplicationModalOpen] = useState(false);

    // State for Job Details Modal (JD)
    const [selectedJob, setSelectedJob] = useState(null);
    const [roleForApplication, setRoleForApplication] = useState(null);

    const [selectedDepartment, setSelectedDepartment] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');

    // Handlers
    const handleJobClick = (job) => {
        setSelectedJob(job);
    };

    const handleCloseJobModal = () => {
        setSelectedJob(null);
    };

    const handleApplyFromJobModal = (jobTitle) => {
        setSelectedJob(null);
        setRoleForApplication(jobTitle);
        setIsApplicationModalOpen(true);
    };

    const handleGeneralApplication = () => {
        setRoleForApplication(null); // General application
        setIsApplicationModalOpen(true);
    };

    const handleCloseApplicationModal = () => {
        setIsApplicationModalOpen(false);
        setRoleForApplication(null);
    };


    const companyValues = [
        {
            icon: <Target className="w-12 h-12 text-white" />,
            title: "Customer-Centric",
            description: "Everything we do is focused on delivering exceptional value to our customers and solving their real problems."
        },
        {
            icon: <Lightbulb className="w-12 h-12 text-white" />,
            title: "Innovation",
            description: "We constantly push boundaries and embrace new technologies to stay ahead in the rapidly evolving fintech space."
        },
        {
            icon: <UsersIcon className="w-12 h-12 text-white" />,
            title: "Collaboration",
            description: "We believe the best solutions come from diverse perspectives working together towards common goals."
        },
        {
            icon: <Shield className="w-12 h-12 text-white" />,
            title: "Integrity",
            description: "We operate with transparency, honesty, and the highest ethical standards in everything we do."
        }
    ];

    const benefits = [
        {
            icon: <Heart className="w-6 h-6 text-white" />,
            title: "Health & Wellness",
            description: "Comprehensive health insurance, dental, vision, and wellness programs including gym memberships."
        },
        {
            icon: <Laptop className="w-6 h-6 text-white" />,
            title: "Remote-First",
            description: "Work from anywhere with flexible hours. We provide top-tier equipment and home office allowance."
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-white" />,
            title: "Career Growth",
            description: "Professional development budget, conference attendance, and clear career progression paths."
        },
        {
            icon: <Coffee className="w-6 h-6 text-white" />,
            title: "Work-Life Balance",
            description: "Unlimited PTO, flexible working hours, and company-wide mental health days."
        },
        {
            icon: <DollarSign className="w-6 h-6 text-white" />,
            title: "Competitive Pay",
            description: "Market-leading salaries, equity packages, performance bonuses, and annual reviews."
        },
        {
            icon: <UsersIcon className="w-6 h-6 text-white" />,
            title: "Amazing Team",
            description: "Work with talented, passionate people who care about making a difference."
        },
        {
            icon: <GraduationCap className="w-6 h-6 text-white" />,
            title: "L&D Budget",
            description: "Access to online courses, workshops, and a dedicated learning budget."
        },
        {
            icon: <Globe className="w-6 h-6 text-white" />,
            title: "Global Impact",
            description: "Work on products used by thousands of businesses worldwide."
        }
    ];

    const teamMembers = [
        {
            name: "Sarah Chen",
            position: "Senior Software Engineer",
            quote: "The technical challenges here are incredible, and the team support is unmatched. I've grown more in 2 years here than in my previous 5 years combined."
        },
        {
            name: "Marcus Johnson",
            position: "Product Designer",
            quote: "EL KAID gives me the freedom to create user experiences that truly matter. Our design system is world-class, and the impact is visible."
        },
        {
            name: "Emily Rodriguez",
            position: "Customer Success Lead",
            quote: "Every day I help businesses transform their operations. The satisfaction of seeing customers succeed with our platform is incredibly rewarding."
        }
    ];

    const jobs = [
        {
            id: 1,
            title: "Senior Full Stack Developer",
            department: "Engineering",
            location: "Hybrid",
            type: "Full-time",
            experience: "5+ years",
            salary: "Not Disclosed",
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
            salary: "Not Disclosed",
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
            location: "Hybrid",
            type: "Full-time",
            experience: "2+ years",
            salary: "Not Disclosed",
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
            location: "Hybrid",
            type: "Full-time",
            experience: "4+ years",
            salary: "Not Disclosed",
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
            location: "Hybrid",
            type: "Full-time",
            experience: "3+ years",
            salary: "Not Disclosed",
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
            title: "Sales Development Rep",
            department: "Sales",
            location: "Remote",
            type: "Full-time",
            experience: "1+ years",
            salary: "Not Disclosed",
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

    const departments = ['All', 'Engineering', 'Design', 'Sales', 'Marketing', 'Support'];

    const getDepartmentIcon = (department) => {
        switch (department) {
            case 'Engineering': return <Code className="w-5 h-5 text-white" />;
            case 'Design': return <Palette className="w-5 h-5 text-white" />;
            case 'Sales': return <TrendingUp className="w-5 h-5 text-white" />;
            case 'Marketing': return <BarChart3 className="w-5 h-5 text-white" />;
            case 'Support': return <Headphones className="w-5 h-5 text-white" />;
            case 'Operations': return <Building2 className="w-5 h-5 text-white" />;
            default: return <Briefcase className="w-5 h-5 text-white" />;
        }
    };

    const filteredJobs = jobs.filter(job => {
        const matchesDepartment = selectedDepartment === 'All' || job.department === selectedDepartment;
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesDepartment && matchesSearch;
    });

    return (
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-montserrat">
            <Navbar />

            {/* === HERO SECTION === */}
            <section className="relative min-h-[70vh] flex flex-col justify-center px-6 md:px-12 pt-32 pb-12 overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                <div className="max-w-7xl mx-auto w-full z-10 text-center">
                    <motion.h1
                        className="text-6xl md:text-9xl font-bold tracking-tighter text-white mb-8"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    >
                        WORK WITH US
                    </motion.h1>

                    <motion.p
                        className="text-lg md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1 }}
                    >
                        Join our mission to revolutionize business finance with cutting-edge technology.
                    </motion.p>

                    {/* Removed Stats Bar per user request */}
                </div>
            </section>

            {/* === VALUES === */}
            <section className="py-24 px-6 md:px-12 bg-onyx border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Values</h2>
                        <p className="text-gray-400 max-w-2xl mx-auto">The principles that guide our work and culture.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {companyValues.map((value, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-black/40 p-8 rounded-2xl border border-white/5 hover:border-white/20 transition-colors"
                            >
                                <div className="mb-6">{value.icon}</div>
                                <h3 className="text-2xl font-bold mb-3 text-white">{value.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === BENEFITS === */}
            <section className="py-24 px-6 md:px-12 bg-black border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Benefits & Perks</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {benefits.map((benefit, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="group p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all"
                            >
                                <div className="mb-4 text-white/50 group-hover:text-white transition-colors">{benefit.icon}</div>
                                <h3 className="text-lg font-bold mb-2 text-white">{benefit.title}</h3>
                                <p className="text-sm text-gray-400 leading-relaxed">{benefit.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === TESTIMONIALS === */}
            <section className="py-24 px-6 md:px-12 bg-onyx border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {teamMembers.map((member, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative bg-black p-8 rounded-2xl border border-white/5"
                            >
                                <div className="text-4xl text-white/20 font-serif mb-6">"</div>
                                <p className="text-gray-300 mb-8 italic relative z-10 leading-relaxed min-h-[80px]">
                                    {member.quote}
                                </p>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-sm font-bold">
                                        {member.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-white font-bold text-sm">{member.name}</h4>
                                        <p className="text-white/40 text-xs uppercase tracking-wider">{member.position}</p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* === OPEN ROLES === */}
            <section className="py-24 px-6 md:px-12 bg-black border-t border-white/10" id="roles">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8">
                        <div>
                            <h2 className="text-4xl md:text-6xl font-bold mb-4">Open Roles</h2>
                            <p className="text-gray-400">Join our team and help build the future.</p>
                        </div>
                        <button
                            onClick={handleGeneralApplication}
                            className="inline-block px-8 py-3 bg-white text-black hover:bg-gray-200 transition-colors rounded-full font-semibold uppercase tracking-wider text-sm cursor-pointer"
                        >
                            General Application
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-12 bg-white/5 p-4 rounded-2xl border border-white/10">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search by role or keyword..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-white/30 transition-all"
                            />
                        </div>
                        <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 no-scrollbar">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDepartment(dept)}
                                    className={`whitespace-nowrap px-6 py-3 rounded-xl text-sm font-medium transition-all ${selectedDepartment === dept
                                        ? 'bg-white text-black'
                                        : 'bg-black text-gray-400 hover:text-white border border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Job List */}
                    <div className="space-y-4">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((role) => (
                                <motion.div
                                    key={role.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => handleJobClick(role)}
                                    className="group relative bg-white/5 border border-white/5 p-6 md:p-8 rounded-2xl hover:bg-white/10 transition-all hover:border-white/20 flex flex-col md:flex-row justify-between md:items-center gap-6 cursor-pointer"
                                >
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-black rounded-lg border border-white/10">
                                                {getDepartmentIcon(role.department)}
                                            </div>
                                            <span className="text-xs font-mono tracking-widest uppercase text-gray-500">
                                                {role.department} • {role.location}
                                            </span>
                                            {role.featured && (
                                                <span className="px-2 py-0.5 bg-white text-black text-[10px] font-bold uppercase tracking-wider rounded-full">Featured</span>
                                            )}
                                        </div>
                                        <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-white transition-colors mb-2">
                                            {role.title}
                                        </h3>
                                        <div className="flex gap-4 text-sm text-gray-400">
                                            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {role.type}</span>
                                            {/* Removed Salary and Date per user request */}
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleJobClick(role);
                                            }}
                                            className="px-6 py-3 border border-white/20 text-white rounded-xl hover:bg-white hover:text-black transition-all font-medium text-sm whitespace-nowrap"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <div className="text-center py-24 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                                <p className="text-gray-500">No positions found matching "{searchTerm}".</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setSelectedDepartment('All'); }}
                                    className="text-white mt-4 underline decoration-white/30 hover:decoration-white transition-all"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Job Details Modal - The "pop given JD" */}
            <AnimatePresence>
                {selectedJob && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
                        onClick={handleCloseJobModal}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-onyx border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                        >
                            <div className="p-8">
                                <div className="flex items-start justify-between mb-8">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10">
                                            {getDepartmentIcon(selectedJob.department)}
                                        </div>
                                        <div>
                                            <h2 className="text-3xl font-bold text-white mb-2">{selectedJob.title}</h2>
                                            <div className="flex items-center space-x-4 text-gray-400 text-sm">
                                                <span>{selectedJob.department}</span>
                                                <span>•</span>
                                                <span className="text-white">{selectedJob.location}</span>
                                                <span>•</span>
                                                <span>{selectedJob.type}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCloseJobModal}
                                        className="p-2 text-gray-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2 space-y-8">
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-4">About This Role</h3>
                                            <p className="text-gray-300 leading-relaxed">{selectedJob.description}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-4">Key Responsibilities</h3>
                                            <div className="space-y-3">
                                                {selectedJob.responsibilities.map((res, idx) => (
                                                    <div key={idx} className="flex items-start gap-3 text-gray-300">
                                                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                                        <span>{res}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-4">Requirements</h3>
                                            <div className="space-y-3">
                                                {selectedJob.requirements.map((req, idx) => (
                                                    <div key={idx} className="flex items-start gap-3 text-gray-300">
                                                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                                        <span>{req}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-1">
                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
                                            <h3 className="text-lg font-bold text-white mb-4">Job Overview</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <MapPin className="w-5 h-5 text-gray-400" />
                                                    <div>
                                                        <div className="text-xs text-gray-500 uppercase tracking-widest">Location</div>
                                                        <div className="text-white font-medium">{selectedJob.location}</div>
                                                    </div>
                                                </div>
                                                {/* Keeping Salary/Date in JD Modal as hidden detail is often preferred, remove if user insists on GLOBAL removal. 
                                                    User said "remove the salary and date of posted" in context of screenshot 2 (card view). 
                                                    I will keep it here for transparency unless asked otherwise. */}
                                                <div className="flex items-center gap-3">
                                                    <DollarSign className="w-5 h-5 text-gray-400" />
                                                    <div>
                                                        <div className="text-xs text-gray-500 uppercase tracking-widest">Salary</div>
                                                        <div className="text-white font-medium">{selectedJob.salary}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Briefcase className="w-5 h-5 text-gray-400" />
                                                    <div>
                                                        <div className="text-xs text-gray-500 uppercase tracking-widest">Experience</div>
                                                        <div className="text-white font-medium">{selectedJob.experience}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleApplyFromJobModal(selectedJob.title)}
                                            className="w-full py-4 bg-white text-black rounded-xl font-bold text-lg hover:bg-gray-200 transition-all shadow-xl flex items-center justify-center gap-2"
                                        >
                                            <span>Apply for this role</span>
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <CareerApplicationModal
                isOpen={isApplicationModalOpen}
                onClose={handleCloseApplicationModal}
                role={roleForApplication}
            />

        </main>
    );
};

export default CareerPage;
