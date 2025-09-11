import React, { useState, useEffect } from 'react';
import { MapPin, Star, Calendar, Users, Camera, Play, ArrowRight, Sparkles, Heart, Clock, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EnhancedHomePage: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Hero carousel images
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
      title: 'Hundru Falls',
      subtitle: 'Nature\'s Spectacular Symphony',
      location: 'Ranchi District'
    },
    {
      url: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200',
      title: 'Betla National Park',
      subtitle: 'Wildlife Adventure Awaits',
      location: 'Palamu District'
    },
    {
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200',
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

  const features = [
    {
      icon: MapPin,
      title: 'Discover Hidden Gems',
      description: 'Explore unexplored destinations with our AI-powered recommendations',
      color: 'from-emerald-500 to-emerald-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-600'
    },
    {
      icon: Calendar,
      title: 'Smart Trip Planning',
      description: 'Create perfect itineraries tailored to your preferences and budget',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600'
    },
    {
      icon: Users,
      title: 'Local Experiences',
      description: 'Connect with local guides and authentic cultural experiences',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600'
    },
    {
      icon: Camera,
      title: 'Capture Memories',
      description: 'Get tips for the best photo spots and share your journey',
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
      textColor: 'text-pink-600'
    }
  ];

  const quickActions = [
    {
      title: 'Plan Trip',
      description: 'Start your adventure',
      icon: Calendar,
      color: 'bg-gradient-to-r from-jungle-green-500 to-jungle-green-600',
      href: '/planner'
    },
    {
      title: 'Explore Now',
      description: 'Discover destinations',
      icon: MapPin,
      color: 'bg-gradient-to-r from-blue-500 to-blue-600',
      href: '/explore'
    },
    {
      title: 'Local Market',
      description: 'Shop authentic items',
      icon: Sparkles,
      color: 'bg-gradient-to-r from-terracotta-500 to-terracotta-600',
      href: '/marketplace'
    }
  ];

  const popularDestinations = [
    {
      name: 'Hundru Falls',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      rating: 4.8,
      reviews: 2847,
      distance: '45 km',
      category: 'Waterfall',
      trending: true
    },
    {
      name: 'Betla National Park',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400',
      rating: 4.7,
      reviews: 1923,
      distance: '65 km',
      category: 'Wildlife',
      trending: false
    },
    {
      name: 'Netarhat Hill Station',
      image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400',
      rating: 4.9,
      reviews: 3156,
      distance: '155 km',
      category: 'Hill Station',
      trending: true
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Enhanced Hero Section with Carousel */}
      <section className="relative h-[70vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div 
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{ 
                backgroundImage: `linear-gradient(135deg, rgba(46, 125, 50, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%), url('${heroImages[currentImageIndex].url}')` 
              }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mb-4"
            >
              <span className="inline-flex items-center space-x-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium">
                <MapPin className="w-4 h-4" />
                <span>{heroImages[currentImageIndex].location}</span>
              </span>
            </motion.div>

            <motion.h1 
              key={currentImageIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-5xl md:text-7xl font-bold mb-4 leading-tight"
            >
              {heroImages[currentImageIndex].title}
            </motion.h1>

            <motion.p 
              key={`${currentImageIndex}-subtitle`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-xl md:text-2xl mb-8 opacity-90"
            >
              {heroImages[currentImageIndex].subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <button className="bg-white text-jungle-green-600 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl">
                Start Exploring
              </button>
              <button className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 border border-white/30">
                <Play className="w-5 h-5" />
                <span>Watch Video</span>
              </button>
            </motion.div>
          </div>
        </div>

        {/* Hero Navigation Dots */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentImageIndex 
                  ? 'bg-white scale-125' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-12 px-4 bg-gray-50 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {quickActions.map((action, index) => {
              const IconComponent = action.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 * index }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                >
                  <div className={`${action.color} p-6 rounded-2xl shadow-xl text-white cursor-pointer transition-all duration-300 hover:shadow-2xl`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-xl font-bold mb-1">{action.title}</h3>
                        <p className="text-white/80 text-sm">{action.description}</p>
                      </div>
                      <div className="p-3 bg-white/20 rounded-xl group-hover:bg-white/30 transition-colors">
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

      {/* Enhanced Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-jungle-green-600">Jharkhand Tourism</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the best of Jharkhand with our comprehensive travel platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  whileHover={{ scale: 1.05 }}
                  onHoverStart={() => setActiveFeature(index)}
                  className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                    activeFeature === index 
                      ? 'bg-white shadow-2xl transform scale-105' 
                      : 'bg-white shadow-lg hover:shadow-xl'
                  }`}
                >
                  <div className={`inline-flex p-3 rounded-xl mb-4 ${feature.bgColor}`}>
                    <IconComponent className={`w-6 h-6 ${feature.textColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Popular Destinations */}
      <section className="py-16 px-4 bg-gradient-to-br from-jungle-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Popular <span className="text-jungle-green-600">Destinations</span>
              </h2>
              <p className="text-xl text-gray-600">
                Discover the most loved places in Jharkhand
              </p>
            </div>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              className="hidden md:flex items-center space-x-2 bg-white text-jungle-green-600 px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <span>View All</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {popularDestinations.map((destination, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={destination.image} 
                    alt={destination.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {destination.trending && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Trending</span>
                    </div>
                  )}
                  <button className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                    <Heart className="w-4 h-4" />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{destination.name}</h3>
                    <span className="bg-jungle-green-100 text-jungle-green-600 px-2 py-1 rounded-lg text-xs font-medium">
                      {destination.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="font-medium">{destination.rating}</span>
                      <span>({destination.reviews.toLocaleString()} reviews)</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{destination.distance} away</span>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-jungle-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-jungle-green-700 transition-colors"
                    >
                      Explore
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-jungle-green-600 via-jungle-green-700 to-jungle-green-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who have discovered the magic of Jharkhand. 
              Let our AI-powered platform create the perfect adventure for you.
            </p>
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-jungle-green-600 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-2xl"
              >
                Plan Your Trip Now
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Download App
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EnhancedHomePage;
