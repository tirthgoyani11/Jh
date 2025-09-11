import React, { useState, useEffect } from 'react';
import { MapPin, Search, Calendar, Users, ArrowRight, Star, Camera, Heart, TrendingUp, Clock, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CleanHomePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeFeature, setActiveFeature] = useState(0);

  // Hero carousel with real Jharkhand destinations
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=800&fit=crop',
      title: 'Hundru Falls',
      subtitle: 'Nature\'s Majestic Symphony',
      location: 'Ranchi District'
    },
    {
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&h=800&fit=crop',
      title: 'Betla National Park',
      subtitle: 'Wildlife Paradise',
      location: 'Palamu District'
    },
    {
      url: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1200&h=800&fit=crop',
      title: 'Netarhat Hill Station',
      subtitle: 'Queen of Chotanagpur',
      location: 'Latehar District'
    }
  ];

  // Auto-rotate hero images
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Auto-rotate features
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const quickActions = [
    {
      title: 'Plan Your Trip',
      description: 'AI-powered smart itinerary',
      icon: Calendar,
      color: 'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600',
      href: '/planner',
      stats: '50K+ Trips Planned'
    },
    {
      title: 'Explore Jharkhand',
      description: 'Discover hidden gems',
      icon: MapPin,
      color: 'bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600',
      href: '/explore',
      stats: '200+ Destinations'
    },
    {
      title: 'Local Experiences',
      description: 'Authentic cultural tours',
      icon: Users,
      color: 'bg-gradient-to-br from-purple-500 via-purple-600 to-pink-600',
      href: '/marketplace',
      stats: '5K+ Experiences'
    }
  ];

  const popularDestinations = [
    {
      name: 'Hundru Falls',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      rating: 4.8,
      reviews: 2847,
      distance: '45 km from Ranchi',
      category: 'Waterfall',
      trending: true,
      price: '₹500',
      description: 'Spectacular 98m high waterfall'
    },
    {
      name: 'Betla National Park',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      rating: 4.7,
      reviews: 1923,
      distance: '65 km from Ranchi',
      category: 'Wildlife',
      trending: false,
      price: '₹800',
      description: 'Home to tigers, elephants & leopards'
    },
    {
      name: 'Netarhat Hill Station',
      image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=300&fit=crop',
      rating: 4.9,
      reviews: 3156,
      distance: '155 km from Ranchi',
      category: 'Hill Station',
      trending: true,
      price: '₹1200',
      description: 'Sunrise viewpoint & cool climate'
    }
  ];

  const features = [
    {
      icon: Award,
      title: 'Expert Local Guides',
      description: 'Certified guides with deep knowledge of Jharkhand culture',
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50'
    },
    {
      icon: Camera,
      title: 'Photography Tours',
      description: 'Capture stunning landscapes and wildlife moments',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Heart,
      title: 'Cultural Immersion',
      description: 'Experience authentic tribal traditions and festivals',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      icon: MapPin,
      title: 'Off-beat Destinations',
      description: 'Discover hidden gems away from crowds',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const stats = [
    { number: '200+', label: 'Destinations', icon: MapPin },
    { number: '15K+', label: 'Happy Travelers', icon: Users },
    { number: '4.9⭐', label: 'Average Rating', icon: Star }
  ];

  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      {/* Hero Section - Fixed height and proper spacing */}
      <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 min-h-[60vh] flex items-center">
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            {/* Hero Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Discover
                <span className="block text-yellow-300">Jharkhand</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
                Experience the natural beauty, rich culture, and authentic hospitality of Jharkhand
              </p>

              {/* Search Bar */}
              <div className="max-w-lg mx-auto mt-8">
                <div className="relative">
                  <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    isSearchFocused ? 'text-green-600' : 'text-gray-400'
                  }`} />
                  <input
                    type="text"
                    placeholder="Where would you like to go?"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setIsSearchFocused(true)}
                    onBlur={() => setIsSearchFocused(false)}
                    className="w-full pl-12 pr-4 py-4 bg-white rounded-2xl border-0 focus:outline-none focus:ring-4 focus:ring-white/30 text-gray-900 placeholder-gray-500 text-base shadow-xl"
                  />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto bg-white text-green-700 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100 transition-colors shadow-xl"
                >
                  Start Planning
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors"
                >
                  Learn More
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Actions - Proper spacing and responsive */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                  whileHover={{ scale: 1.02, y: -4 }}
                  className="group cursor-pointer"
                >
                  <div className={`${action.color} p-6 rounded-2xl shadow-xl text-white transition-all duration-300 hover:shadow-2xl`}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{action.title}</h3>
                        <p className="text-white/80 text-sm">{action.description}</p>
                      </div>
                      <div className="ml-4 p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section - Clean and responsive */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Visit Jharkhand?
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Discover what makes our state special
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                title: 'Natural Beauty',
                description: 'Stunning waterfalls, lush forests, and scenic landscapes',
                icon: '🌲'
              },
              {
                title: 'Rich Culture',
                description: 'Traditional festivals, art forms, and tribal heritage',
                icon: '🎭'
              },
              {
                title: 'Adventure Sports',
                description: 'Trekking, rock climbing, and wildlife safaris',
                icon: '🏔️'
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - Clean and centered */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-green-600 to-green-700">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Explore?
            </h2>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
              Start planning your perfect Jharkhand adventure today
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-white text-green-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors shadow-xl"
              >
                Plan Your Trip
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <span>Explore Now</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CleanHomePage;
