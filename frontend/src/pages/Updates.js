import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Calendar, 
  Tag, 
  Zap, 
  Shield, 
  TrendingUp, 
  Users,
  CheckCircle,
  Star,
  Bell,
  Download,
  ExternalLink,
  Clock,
  Sparkles,
  Bug,
  Plus,
  Settings,
  Database,
  Smartphone
} from 'lucide-react';

// Custom CSS for radial gradients - same as OurWork
const customStyles = `
  .bg-gradient-radial {
    background: radial-gradient(circle, var(--tw-gradient-stops));
  }
`;

// Add styles to head
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

const Updates = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedUpdate, setSelectedUpdate] = useState(null);

  const categories = ['All', 'Feature', 'Bug Fix', 'Security', 'Performance', 'Integration'];

  const updates = [
    {
      id: 1,
      version: "v3.2.0",
      title: "Advanced AI-Powered Invoice Processing",
      date: "2024-01-15",
      category: "Feature",
      description: "Introducing intelligent invoice processing with 99.9% accuracy using advanced machine learning algorithms.",
      details: [
        "Automatic data extraction from invoices and receipts",
        "Smart categorization of expenses",
        "Multi-language support for international documents",
        "Batch processing capabilities for high-volume operations",
        "Integration with popular cloud storage services"
      ],
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800",
      featured: true,
      downloadUrl: "#"
    },
    {
      id: 2,
      version: "v3.1.5",
      title: "Enhanced Security & Compliance",
      date: "2024-01-10",
      category: "Security",
      description: "Major security updates including end-to-end encryption and SOX compliance features.",
      details: [
        "End-to-end encryption for all data transmission",
        "SOX compliance reporting tools",
        "Advanced user permission management",
        "Audit trail enhancements",
        "Two-factor authentication improvements"
      ],
      featured: true
    },
    {
      id: 3,
      version: "v3.1.4",
      title: "Mobile App Performance Boost",
      date: "2024-01-05",
      category: "Performance",
      description: "Significant performance improvements for mobile applications with 60% faster load times.",
      details: [
        "60% faster app startup time",
        "Improved offline functionality",
        "Optimized data synchronization",
        "Reduced battery consumption",
        "Enhanced user interface responsiveness"
      ],
      featured: false
    },
    {
      id: 4,
      version: "v3.1.3",
      title: "QuickBooks Integration",
      date: "2023-12-28",
      category: "Integration",
      description: "Seamless integration with QuickBooks for automated data synchronization.",
      details: [
        "Real-time data synchronization with QuickBooks",
        "Automatic chart of accounts mapping",
        "Bi-directional transaction sync",
        "Error handling and conflict resolution",
        "Setup wizard for easy configuration"
      ],
      featured: false
    },
    {
      id: 5,
      version: "v3.1.2",
      title: "Critical Bug Fixes",
      date: "2023-12-20",
      category: "Bug Fix",
      description: "Important bug fixes for report generation and data export functionality.",
      details: [
        "Fixed report generation timeout issues",
        "Resolved data export formatting problems",
        "Corrected calculation errors in tax reports",
        "Fixed user interface display issues on Safari",
        "Improved error messaging and user feedback"
      ],
      featured: false
    },
    {
      id: 6,
      version: "v3.1.1",
      title: "Advanced Reporting Dashboard",
      date: "2023-12-15",
      category: "Feature",
      description: "New interactive dashboard with real-time analytics and customizable reports.",
      details: [
        "Interactive charts and graphs",
        "Customizable dashboard widgets",
        "Real-time financial metrics",
        "Automated report scheduling",
        "Export options for all major formats"
      ],
      featured: true
    }
  ];

  const newsItems = [
    {
      id: 1,
      title: "Kaid-B1 Wins 'Best Accounting Software 2024' Award",
      date: "2024-01-20",
      category: "Awards",
      excerpt: "We're thrilled to announce that Kaid has been recognized as the Best Accounting Software of 2024 by TechReview Magazine.",
      image: "https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "3 min read"
    },
    {
      id: 2,
      title: "New Partnership with Microsoft Azure",
      date: "2024-01-18",
      category: "Partnership",
      excerpt: "Strategic partnership announcement to enhance cloud infrastructure and provide better scalability for our enterprise clients.",
      image: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "5 min read"
    },
    {
      id: 3,
      title: "Expanding to European Markets",
      date: "2024-01-12",
      category: "Expansion",
      excerpt: "Kaid is expanding operations to serve businesses across Europe with localized features and multi-currency support.",
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800",
      readTime: "4 min read"
    }
  ];

  const filteredUpdates = selectedCategory === 'All' 
    ? updates 
    : updates.filter(update => update.category === selectedCategory);

  const featuredUpdates = updates.filter(update => update.featured);

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Feature': return <Plus className="w-4 h-4" />;
      case 'Bug Fix': return <Bug className="w-4 h-4" />;
      case 'Security': return <Shield className="w-4 h-4" />;
      case 'Performance': return <Zap className="w-4 h-4" />;
      case 'Integration': return <Settings className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'Feature': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'Bug Fix': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'Security': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'Performance': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'Integration': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header Section - Matching OurWork hero background */}
      <section className="pt-16 pb-16 px-4 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 relative overflow-hidden">
        {/* Background gradient glow - Same as OurWork */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 right-1/4 w-[600px] h-[400px] bg-gradient-radial from-purple-500/30 via-pink-500/15 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[300px] bg-gradient-radial from-cyan-500/25 via-purple-500/15 to-transparent rounded-full blur-2xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative z-10 pt-12">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full mb-6">
              <span className="text-purple-400 text-sm font-medium">📋 Latest Updates</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Product
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Updates
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Stay up-to-date with the latest features, improvements, and news from Kaid. 
              We're constantly evolving to serve you better.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="bg-white text-slate-900 px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 flex items-center group shadow-2xl">
              <Bell className="mr-2 w-5 h-5" />
              Subscribe to Updates
            </button>
            <button className="border-2 border-white/30 text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300">
              View Changelog
            </button>
          </div>
        </div>
      </section>

      {/* Featured Updates */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Latest Features</h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Discover the newest additions and improvements that make Kaid-B1 even more powerful.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {featuredUpdates.slice(0, 2).map((update) => (
              <div key={update.id} className="group cursor-pointer" onClick={() => setSelectedUpdate(update)}>
                <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:bg-slate-800/70 transition-all duration-300">
                  {update.image && (
                    <div className="aspect-video overflow-hidden">
                      <img 
                        src={update.image} 
                        alt={update.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(update.category)}`}>
                        {getCategoryIcon(update.category)}
                        <span>{update.category}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{new Date(update.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 mb-3">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                        {update.version}
                      </span>
                      <Star className="w-5 h-5 text-yellow-400" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{update.title}</h3>
                    <p className="text-gray-400 mb-4 leading-relaxed">{update.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="text-purple-400 group-hover:text-purple-300 transition-colors">
                        <span className="text-sm font-medium">View Details</span>
                      </div>
                      {update.downloadUrl && (
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                          <Download className="w-4 h-4" />
                          <span className="text-sm">Download</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-12 px-4 border-b border-slate-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">Release History</h2>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Complete changelog of all updates, improvements, and fixes.
            </p>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center space-x-2 border ${
                    selectedCategory === category
                      ? 'bg-purple-500 border-purple-500 text-white shadow-lg shadow-purple-500/25'
                      : 'bg-slate-800/50 border-slate-700 text-gray-300 hover:border-purple-500 hover:text-white hover:bg-slate-800/70'
                  }`}
                >
                  {category !== 'All' && getCategoryIcon(category)}
                  <span>{category}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Updates */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            {filteredUpdates.map((update) => (
              <div key={update.id} className="group cursor-pointer" onClick={() => setSelectedUpdate(update)}>
                <div className="bg-slate-800/50 rounded-xl border border-slate-700 p-6 hover:bg-slate-800/70 transition-all duration-300 hover:border-purple-500/30">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 mb-4 md:mb-0">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                        {update.version}
                      </span>
                      <div className={`flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(update.category)}`}>
                        {getCategoryIcon(update.category)}
                        <span>{update.category}</span>
                      </div>
                      {update.featured && (
                        <Star className="w-5 h-5 text-yellow-400" />
                      )}
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{new Date(update.date).toLocaleDateString()}</span>
                      </div>
                      {update.downloadUrl && (
                        <button className="flex items-center space-x-2 text-gray-400 hover:text-white transition-colors">
                          <Download className="w-4 h-4" />
                          <span className="text-sm">Download</span>
                        </button>
                      )}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{update.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{update.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Company News */}
      <section className="py-16 px-4 bg-slate-800/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Company News</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Stay informed about our latest achievements, partnerships, and company milestones.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {newsItems.map((news) => (
              <div key={news.id} className="group cursor-pointer">
                <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:bg-slate-800/70 transition-all duration-300 hover:border-purple-500/30">
                  <div className="aspect-video overflow-hidden">
                    <img 
                      src={news.image} 
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                        {news.category}
                      </span>
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{news.readTime}</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold text-white mb-2">{news.title}</h3>
                    <p className="text-gray-400 text-sm mb-4 leading-relaxed">{news.excerpt}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-gray-400">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">{new Date(news.date).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-purple-400 group-hover:text-purple-300 transition-colors">
                        <span className="text-sm font-medium">Read More</span>
                        <ExternalLink className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup - Matching OurWork CTA styling */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-900/30 via-slate-900 to-purple-900/30 relative overflow-hidden">
        {/* Background gradient glow - Same as OurWork */}
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-pink-500/40 via-purple-600/25 to-transparent rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
              Never Miss
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              an Update
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter and be the first to know about new features, updates, and company news.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-6 py-4 rounded-full bg-slate-800/50 border border-purple-500/20 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
            />
            <button className="bg-white text-slate-900 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Update Detail Modal */}
      {selectedUpdate && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-800 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <h2 className="text-3xl font-bold text-white">{selectedUpdate.title}</h2>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                    {selectedUpdate.version}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedUpdate(null)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
              </div>
              
              {selectedUpdate.image && (
                <div className="aspect-video mb-8 rounded-2xl overflow-hidden">
                  <img 
                    src={selectedUpdate.image} 
                    alt={selectedUpdate.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}

              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <h3 className="text-xl font-bold text-white mb-4">What's New</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">{selectedUpdate.description}</p>
                  
                  <h3 className="text-xl font-bold text-white mb-4">Detailed Changes</h3>
                  <div className="space-y-3">
                    {selectedUpdate.details.map((detail, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                        <span className="text-gray-300">{detail}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="bg-slate-700/30 rounded-2xl p-6">
                    <h3 className="text-lg font-bold text-white mb-4">Release Info</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <Tag className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="text-sm text-gray-400">Version</div>
                          <div className="text-white font-medium">{selectedUpdate.version}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Calendar className="w-5 h-5 text-purple-400" />
                        <div>
                          <div className="text-sm text-gray-400">Release Date</div>
                          <div className="text-white font-medium">{new Date(selectedUpdate.date).toLocaleDateString()}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(selectedUpdate.category)}
                        <div>
                          <div className="text-sm text-gray-400">Category</div>
                          <div className="text-white font-medium">{selectedUpdate.category}</div>
                        </div>
                      </div>
                    </div>
                    
                    {selectedUpdate.downloadUrl && (
                      <button className="w-full mt-6 bg-white text-slate-900 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center space-x-2">
                        <Download className="w-5 h-5" />
                        <span>Download Update</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Updates;