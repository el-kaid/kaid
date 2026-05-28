'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../../components/Navbar';
import CareerApplicationModal from '../../components/CareerApplicationModal';
import {
    MapPin,
    Clock,
    DollarSign,
    Users as UsersIcon,
    Heart,
    Laptop,
    TrendingUp,
    Coffee,
    GraduationCap,
    Globe,
    Shield,
    Target,
    Lightbulb,
    Code,
    BarChart3,
    Palette,
    Building2,
    Briefcase,
    Search,
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
            icon: <Target className="w-10 h-10 text-white" />,
            title: "Result-Driven Excellence",
            description: "We bypass standard presentations. We measure our engineering and trade systems solely by operational KPIs, uptime, and concrete value generated for users."
        },
        {
            icon: <Lightbulb className="w-10 h-10 text-white" />,
            title: "Technological Rigor",
            description: "We constantly hardened our software. Whether building zero-friction offline-first desktop systems or optimizing web pipelines, we embrace absolute code quality."
        },
        {
            icon: <UsersIcon className="w-10 h-10 text-white" />,
            title: "Transnational Alignment",
            description: "We foster team collaboration across divisions. From backend engineers to logistics desk operators, diverse perspectives work in complete harmony."
        },
        {
            icon: <Shield className="w-10 h-10 text-white" />,
            title: "Absolute Transparency",
            description: "We coordinate complicated logistics and secure transaction workflows with complete honesty, strict compliance, and high ethical standars."
        }
    ];

    const benefits = [
        {
            icon: <Heart className="w-6 h-6 text-white" />,
            title: "Health & Wellness",
            description: "Comprehensive medical and wellness plans protecting you and your family."
        },
        {
            icon: <Laptop className="w-6 h-6 text-white" />,
            title: "Flexible Context",
            description: "Work from anywhere. We support remote setups and professional workstation equipment."
        },
        {
            icon: <TrendingUp className="w-6 h-6 text-white" />,
            title: "Growth Pathways",
            description: "Dedicated learning budget, international trade exposure, and career growth tracks."
        },
        {
            icon: <Coffee className="w-6 h-6 text-white" />,
            title: "Balance & PTO",
            description: "Flexible working hours and mental rest days to keep your execution sharp."
        },
        {
            icon: <DollarSign className="w-6 h-6 text-white" />,
            title: "Competitive Compensation",
            description: "Market-leading packages, annual reviews, and performance bonuses."
        },
        {
            icon: <UsersIcon className="w-6 h-6 text-white" />,
            title: "High-Caliber Team",
            description: "Work with technical experts who care deeply about robust platform systems."
        },
        {
            icon: <GraduationCap className="w-6 h-6 text-white" />,
            title: "Continuous Learning",
            description: "Direct sponsorship for certifications, bootcamps, and technical books."
        },
        {
            icon: <Globe className="w-6 h-6 text-white" />,
            title: "Transnational Impact",
            description: "Coordinate platforms and workflows serving commerce corridors across regions."
        }
    ];

    const jobs = [
        {
            id: 1,
            title: "Senior Full Stack Engineer",
            department: "Engineering",
            location: "Hybrid (Chennai)",
            type: "Full-time",
            experience: "5+ years",
            salary: "Competitive",
            description: "Hardened full stack engineer to build robust, offline-first accounting structures and scale ERP sync pipelines. You'll drive clean code practices and help architect secure B1 system layers.",
            requirements: [
                "5+ years of experience with React, Node.js, and TypeScript",
                "Strong background in desktop builds (.exe configuration) or offline sync",
                "Experience with high-availability database engines and optimization",
                "Familiarity with financial platforms, compliance, or B2B accounting"
            ],
            responsibilities: [
                "Architect and scale robust offline-first software features",
                "Build secure API integration connectors for payments & bank syncs",
                "Write clean, well-tested TypeScript/JavaScript scripts",
                "Conduct strict engineering code reviews and mentor junior peers"
            ],
            featured: true,
            posted: "2026-05-20"
        },
        {
            id: 2,
            title: "Product Designer (UI/UX)",
            department: "Design",
            location: "Remote",
            type: "Full-time",
            experience: "3+ years",
            salary: "Competitive",
            description: "UI/UX product designer to shape our financial analytics dashboard. You will convert complex transaction workflows, live graph data sheets, and invoice forms into clean minimalist layouts.",
            requirements: [
                "3+ years of professional UX/UI product design experience",
                "Advanced portfolio demonstrating clean typography and complex layouts",
                "Proficiency in Figma and interactive design systems",
                "Knowledge of HTML/CSS standards is preferred"
            ],
            responsibilities: [
                "Design premium, minimalist user interfaces for B1 desktop and web",
                "Run active user feedback research and iterative prototypes",
                "Construct and scale our design system modules",
                "Work closely with full stack engineers to align high-fidelity assets"
            ],
            featured: true,
            posted: "2026-05-18"
        },
        {
            id: 3,
            title: "B2B Trade Coordinator",
            department: "Operations",
            location: "Hybrid (Chennai)",
            type: "Full-time",
            experience: "2+ years",
            salary: "Competitive",
            description: "Coordinate supplier sourcing requests, invoice checks, packing list alignments, and partner logistics status (freight, custom brokers) across our India-to-GCC corridor.",
            requirements: [
                "2+ years in international B2B trade coordination or export documentation support",
                "Familiarity with India-GCC import/export parameters and GST",
                "Excellent commercial communication and vendor management skills",
                "High attention to detail regarding trade specifications and terms (FOB, CIF)"
            ],
            responsibilities: [
                "Bridge communications between GCC buyers, Indian suppliers, and licensed brokers",
                "Coordinate proforma invoices, specifications, and packing logs",
                "Ensure shipment milestone updates are logged in near real time",
                "Perform strict supplier verification checks against buyer standards"
            ],
            featured: false,
            posted: "2026-05-15"
        },
        {
            id: 4,
            title: "DevOps Infrastructure Engineer",
            department: "Engineering",
            location: "Hybrid (Chennai)",
            type: "Full-time",
            experience: "4+ years",
            salary: "Competitive",
            description: "Scale our secure data center systems, real-time replica streams, and disaster recovery drill pipelines. You'll ensure the platform runs with high availability.",
            requirements: [
                "4+ years in DevOps, CI/CD automation, or high-availability infra",
                "Advanced experience with AWS/GCP, Docker, and replication configurations",
                "Proven expertise in business continuity design, automated failovers, and backup systems",
                "Knowledge of intrusion detection and privileged access security layers"
            ],
            responsibilities: [
                "Maintain data infrastructure environments with continuous uptime",
                "Deploy and secure disaster recovery geographic replication pipelines",
                "Run standard capacity planning and performance checks under load",
                "Automate release deployments and secure infrastructure credentials"
            ],
            featured: false,
            posted: "2026-05-12"
        }
    ];

    const departments = ['All', 'Engineering', 'Design', 'Operations'];

    const getDepartmentIcon = (department) => {
        switch (department) {
            case 'Engineering': return <Code className="w-5 h-5 text-white" />;
            case 'Design': return <Palette className="w-5 h-5 text-white" />;
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
        <main className="min-h-screen bg-black text-white selection:bg-white selection:text-black font-inter pt-36">
            <Navbar />

            {/* === HERO SECTION === */}
            <section className="max-w-6xl mx-auto px-6 md:px-12 mb-20 text-center">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

                <div className="max-w-4xl mx-auto z-10">
                    <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-neutral-400 text-[10px] uppercase tracking-widest font-mono">
                      Careers & Culture
                    </span>
                    <h1 className="text-5xl md:text-8xl font-bold mt-6 mb-8 font-outfit tracking-tighter leading-none text-white">
                      Work With Us
                    </h1>
                    <p className="text-neutral-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-12">
                      Join our mission to bridge high-availability enterprise software with global trade sourcing networks. We seek outstanding minds ready to solve practical problems at scale.
                    </p>
                    <a
                        href="#roles"
                        className="inline-block px-8 py-3.5 bg-white text-black hover:bg-neutral-200 transition-colors rounded-full font-bold uppercase tracking-widest text-[10px] shadow-lg shadow-white/5 border border-white"
                    >
                        Explore Open Positions
                    </a>
                </div>
            </section>

            {/* === VALUES === */}
            <section className="py-24 px-6 md:px-12 bg-onyx border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20 text-center">
                        <p className="text-neutral-500 tracking-widest uppercase text-xs mb-3 font-mono">Core Beliefs</p>
                        <h2 className="text-3xl md:text-5xl font-bold font-outfit text-white">Our Values</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {companyValues.map((value, i) => (
                          <div key={i} className="glass-card p-10 rounded-[2rem] border border-white/5 hover:border-white/15 transition-all duration-500 flex flex-col gap-6">
                            <div className="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center">
                              {value.icon}
                            </div>
                            <div>
                              <h3 className="text-2xl font-bold mb-3 text-white font-outfit">{value.title}</h3>
                              <p className="text-neutral-400 text-sm leading-relaxed">{value.description}</p>
                            </div>
                          </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === BENEFITS === */}
            <section className="py-24 px-6 md:px-12 bg-black border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20 text-center">
                        <p className="text-neutral-500 tracking-widest uppercase text-xs mb-3 font-mono">Perks</p>
                        <h2 className="text-3xl md:text-5xl font-bold font-outfit text-white">Benefits & Perks</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, i) => (
                            <div key={i} className="glass-card p-8 rounded-3xl transition-all duration-300">
                                <div className="mb-4 text-white/60">{benefit.icon}</div>
                                <h3 className="text-lg font-bold mb-2 text-white font-outfit">{benefit.title}</h3>
                                <p className="text-xs text-neutral-400 leading-relaxed">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === OUR TEAM (REDESIGNED SIDE-BY-SIDE) === */}
            <section className="py-24 px-6 md:px-12 bg-onyx border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="mb-20 text-center">
                        <p className="text-neutral-500 tracking-widest uppercase text-xs mb-3 font-mono">Leadership</p>
                        <h2 className="text-3xl md:text-5xl font-bold font-outfit text-white">Our Team</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {[
                            {
                                role: "CEO",
                                name: "Kaif Kirmani",
                                initial: "K",
                                linkedin: ""
                            },
                            {
                                role: "CIO",
                                name: "R Mohammed Basil",
                                image: "/assets/linkdin-profile.png",
                                linkedin: "https://www.linkedin.com/in/mdbasil07"
                            },
                        ].map((member, i) => (
                            <div
                                key={member.role}
                                className="glass-card border border-white/10 rounded-[2rem] p-10 flex flex-col md:flex-row gap-8 items-center text-center md:text-left relative overflow-hidden"
                            >
                                <div className="shrink-0">
                                    {member.image ? (
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className="w-32 h-32 md:w-36 md:h-36 object-cover rounded-2xl shadow-xl border border-white/10"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 md:w-36 md:h-36 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white text-5xl font-bold font-outfit">
                                            {member.initial}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col justify-center">
                                    <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-2 font-mono">{member.role}</p>
                                    <h3 className="text-2xl font-bold text-white font-outfit mb-4">{member.name}</h3>
                                    {member.linkedin ? (
                                        <a
                                            href={member.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-block self-center md:self-start px-4 py-1.5 border border-white/15 text-[10px] font-bold uppercase tracking-widest text-neutral-400 hover:border-white hover:text-white rounded-full transition-all"
                                        >
                                            LinkedIn Profile &rarr;
                                        </a>
                                    ) : (
                                        <span className="text-[10px] font-bold text-neutral-600 uppercase tracking-widest">Enterprise Leadership</span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* === OPEN ROLES === */}
            <section className="py-24 px-6 md:px-12 bg-black border-t border-white/10" id="roles">
                <div className="max-w-6xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                        <div>
                            <p className="text-neutral-500 tracking-widest uppercase text-xs mb-3 font-mono">Opportunities</p>
                            <h2 className="text-3xl md:text-5xl font-bold text-white font-outfit">Open Roles</h2>
                            <p className="text-neutral-400 text-sm mt-2">Join our transnational divisions and build the future.</p>
                        </div>
                        <button
                            onClick={handleGeneralApplication}
                            className="px-6 py-3 bg-white text-black hover:bg-neutral-200 transition-colors rounded-full font-bold uppercase tracking-widest text-[10px] border border-white cursor-pointer"
                        >
                            General Application
                        </button>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4 mb-12 bg-neutral-950/60 p-4 rounded-2xl border border-white/10 backdrop-blur">
                        <div className="relative flex-grow">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-500" />
                            <input
                                type="text"
                                placeholder="Search by role or keyword..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-black border border-white/10 rounded-xl text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-white/30 transition-all font-mono"
                            />
                        </div>
                        <div className="flex overflow-x-auto gap-2 pb-2 md:pb-0 no-scrollbar">
                            {departments.map((dept) => (
                                <button
                                    key={dept}
                                    onClick={() => setSelectedDepartment(dept)}
                                    className={`whitespace-nowrap px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${selectedDepartment === dept
                                        ? 'bg-white text-black'
                                        : 'bg-black text-neutral-400 hover:text-white border border-white/10 hover:border-white/30'
                                        }`}
                                >
                                    {dept}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Job List */}
                    <div className="space-y-6">
                        {filteredJobs.length > 0 ? (
                            filteredJobs.map((role) => (
                                <div
                                    key={role.id}
                                    onClick={() => handleJobClick(role)}
                                    className="glass-card p-8 rounded-[2rem] hover:bg-neutral-950/70 border border-white/5 hover:border-white/20 transition-all flex flex-col md:flex-row justify-between md:items-center gap-6 cursor-pointer"
                                >
                                    <div className="flex-1">
                                        <div className="flex flex-wrap items-center gap-3 mb-4">
                                            <div className="p-2 bg-black rounded-lg border border-white/10">
                                                {getDepartmentIcon(role.department)}
                                            </div>
                                            <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500">
                                                {role.department} • {role.location}
                                            </span>
                                            {role.featured && (
                                                <span className="px-2 py-0.5 bg-white text-black text-[9px] font-bold uppercase tracking-wider rounded-full">Featured</span>
                                            )}
                                        </div>
                                        <h3 className="text-2xl font-bold text-white mb-2 font-outfit">
                                            {role.title}
                                        </h3>
                                        <div className="flex gap-4 text-xs text-neutral-400">
                                            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {role.type}</span>
                                            <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5" /> {role.experience}</span>
                                        </div>
                                    </div>

                                    <div className="text-right">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleJobClick(role);
                                            }}
                                            className="px-6 py-3 border border-white/20 text-white rounded-full hover:bg-white hover:text-black transition-all font-bold text-xs uppercase tracking-widest whitespace-nowrap"
                                        >
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-24 bg-white/5 rounded-2xl border border-white/10 border-dashed">
                                <p className="text-gray-500">No positions found matching "{searchTerm}".</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setSelectedDepartment('All'); }}
                                    className="text-white mt-4 underline decoration-white/30 hover:decoration-white transition-all text-sm font-semibold"
                                >
                                    Clear filters
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Job Details Modal - Premium Glassmorphic */}
            <AnimatePresence>
                {selectedJob && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
                        onClick={handleCloseJobModal}
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="bg-neutral-950 border border-white/10 rounded-[2.5rem] max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl backdrop-blur-xl"
                        >
                            <div className="p-8 md:p-12">
                                <div className="flex items-start justify-between mb-8 pb-6 border-b border-white/10">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white border border-white/10">
                                            {getDepartmentIcon(selectedJob.department)}
                                        </div>
                                        <div>
                                            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 font-outfit">{selectedJob.title}</h2>
                                            <div className="flex items-center space-x-4 text-neutral-400 text-xs font-mono uppercase tracking-wider">
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
                                        className="p-2 text-neutral-400 hover:text-white transition-colors rounded-full hover:bg-white/10"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="grid md:grid-cols-3 gap-8">
                                    <div className="md:col-span-2 space-y-8">
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-4 font-outfit uppercase tracking-widest text-neutral-400">About This Role</h3>
                                            <p className="text-neutral-400 leading-relaxed text-sm">{selectedJob.description}</p>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-4 font-outfit uppercase tracking-widest text-neutral-400">Key Responsibilities</h3>
                                            <div className="space-y-3">
                                                {selectedJob.responsibilities.map((res, idx) => (
                                                    <div key={idx} className="flex items-start gap-3 text-neutral-400 text-sm">
                                                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                                        <span>{res}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-4 font-outfit uppercase tracking-widest text-neutral-400">Requirements</h3>
                                            <div className="space-y-3">
                                                {selectedJob.requirements.map((req, idx) => (
                                                    <div key={idx} className="flex items-start gap-3 text-neutral-400 text-sm">
                                                        <CheckCircle className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                                                        <span>{req}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-1">
                                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10 mb-6">
                                            <h3 className="text-sm font-bold text-white mb-4 font-outfit uppercase tracking-widest">Job Overview</h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center gap-3">
                                                    <MapPin className="w-5 h-5 text-neutral-400" />
                                                    <div>
                                                        <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Location</div>
                                                        <div className="text-white text-sm font-medium">{selectedJob.location}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <DollarSign className="w-5 h-5 text-neutral-400" />
                                                    <div>
                                                        <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Salary</div>
                                                        <div className="text-white text-sm font-medium">{selectedJob.salary}</div>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <Briefcase className="w-5 h-5 text-neutral-400" />
                                                    <div>
                                                        <div className="text-[10px] text-neutral-500 uppercase tracking-widest font-mono">Experience</div>
                                                        <div className="text-white text-sm font-medium">{selectedJob.experience}</div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => handleApplyFromJobModal(selectedJob.title)}
                                            className="w-full py-3.5 bg-white text-black hover:bg-neutral-200 transition-colors rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 border border-white shadow-xl"
                                        >
                                            <span>Apply for this role</span>
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </main>
    );
};

export default CareerPage;
