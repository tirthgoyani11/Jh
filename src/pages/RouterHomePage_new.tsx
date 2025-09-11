import { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  Calendar, 
  MapPin, 
  Star, 
  Thermometer, 
  Leaf, 
  Users, 
  Play, 
  TrendingUp, 
  Heart, 
  X, 
  ChevronLeft,
  ChevronRight,
  Plus,
  Share2,
  TreePine,
  Mountain,
  Compass,
  Sun,
  Cloud,
  Wind,
  Eye,
  Zap,
  Globe,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const RouterHomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showWeatherWidget, setShowWeatherWidget] = useState(true);

  // Mock Data - Hero Carousel Images
  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80',
      title: 'Explore Jharkhand: Where Culture Meets Nature',
      subtitle: 'Discover pristine waterfalls, ancient temples, and vibrant tribal heritage',
      location: 'Netarhat Sunrise Point',
      gradient: 'from-jungle-green-600/80 to-black/60'
    },
    {
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80',
      title: 'Experience Rich Tribal Culture',
      subtitle: 'Immerse yourself in traditional festivals and authentic local experiences',
      location: 'Hundru Falls, Ranchi',
      gradient: 'from-terracotta-600/80 to-black/60'
    },
    {
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1920&q=80',
      title: 'Spiritual Journeys Await',
      subtitle: 'Sacred temples and ancient wisdom in the heart of India',
      location: 'Baidyanath Temple, Deoghar',
      gradient: 'from-warm-yellow-600/80 to-black/60'
    },
    {
      image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=1920&q=80',
      title: 'Wildlife & Adventure Trails',
      subtitle: 'Encounter exotic wildlife and embark on thrilling adventures',
      location: 'Betla National Park',
      gradient: 'from-green-700/80 to-black/60'
    }
  ];

  // Quick Explore Categories
  const exploreCategories = [
    {
      id: 'eco',
      title: 'Eco Tourism',
      description: 'Sustainable adventures in pristine forests and waterfalls',
      icon: TreePine,
      color: 'from-jungle-green-500 to-emerald-600',
      path: '/explore?category=eco',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=500&q=80',
      features: ['Waterfalls', 'Dense Forests', 'Wildlife Sanctuaries']
    },
    {
      id: 'culture',
      title: 'Cultural & Heritage',
      description: 'Rich tribal traditions and ancient wisdom',
      icon: Users,
      color: 'from-terracotta-500 to-orange-600',
      path: '/explore?category=culture',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&q=80',
      features: ['Tribal Villages', 'Traditional Crafts', 'Folk Dances']
    },
    {
      id: 'pilgrimage',
      title: 'Pilgrimage',
      description: 'Sacred temples and spiritual journeys',
      icon: Mountain,
      color: 'from-warm-yellow-500 to-amber-600',
      path: '/explore?category=pilgrimage',
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=500&q=80',
      features: ['Ancient Temples', 'Spiritual Sites', 'Holy Rivers']
    },
    {
      id: 'adventure',
      title: 'Adventure Trails',
      description: 'Thrilling outdoor activities and exploration',
      icon: Compass,
      color: 'from-blue-500 to-indigo-600',
      path: '/explore?category=adventure',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&q=80',
      features: ['Trekking', 'Rock Climbing', 'River Rafting']
    }
  ];

  // AI-Suggested Trips
  const suggestedTrips = [
    {
      id: 'trip_001',
      title: '3-Day Eco Circuit',
      days: 3,
      theme: 'Eco',
      preview: ['Ranchi', 'Patratu', 'Netarhat'],
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80',
      price: '₹8,500',
      rating: 4.8,
      highlights: ['Sunrise Point', 'Patratu Valley', 'Dense Forests'],
      description: 'Experience nature at its finest with waterfalls and sunrise views'
    },
    {
      id: 'trip_002',
      title: 'Cultural & Tribal Trails',
      days: 4,
      theme: 'Culture',
      preview: ['Ranchi', 'Hazaribagh', 'Tribal Village'],
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
      price: '₹12,000',
      rating: 4.9,
      highlights: ['Sarhul Festival', 'Handicraft Villages', 'Traditional Dance'],
      description: 'Immerse in authentic tribal culture and traditional arts'
    },
    {
      id: 'trip_003',
      title: 'Spiritual Jharkhand',
      days: 5,
      theme: 'Pilgrimage',
      preview: ['Deoghar', 'Basukinath', 'Jasidih'],
      image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=400&q=80',
      price: '₹15,500',
      rating: 4.7,
      highlights: ['Baidyanath Temple', 'Holy Ganges', 'Ancient Caves'],
      description: 'Journey through sacred temples and spiritual experiences'
    },
    {
      id: 'trip_004',
      title: 'Wildlife Adventure',
      days: 3,
      theme: 'Adventure',
      preview: ['Betla', 'Dalma', 'Palamu'],
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
      price: '₹10,500',
      rating: 4.8,
      highlights: ['Tiger Safari', 'Elephant Reserve', 'Bird Watching'],
      description: 'Encounter exotic wildlife in their natural habitat'
    },
    {
      id: 'trip_005',
      title: 'Heritage Circuit',
      days: 6,
      theme: 'Heritage',
      preview: ['Hazaribagh', 'Giridih', 'Koderma'],
      image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&q=80',
      price: '₹18,000',
      rating: 4.6,
      highlights: ['Rock Paintings', 'Ancient Forts', 'Museums'],
      description: 'Explore ancient history and archaeological wonders'
    }
  ];

  // Seasonal Festivals
  const seasonalFestivals = [
    {
      id: 'ev_201',
      name: 'Sarhul Festival',
      date: '2025-03-25',
      month: 'March',
      location: 'Ranchi District',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
      type: 'Spring Festival',
      description: 'Celebrate the blooming of Sal trees with tribal communities',
      season: 'spring'
    },
    {
      id: 'ev_202',
      name: 'Karma Festival',
      date: '2025-09-15',
      month: 'September',
      location: 'Hazaribagh',
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=400&q=80',
      type: 'Harvest Festival',
      description: 'Traditional harvest celebration with folk dances',
      season: 'autumn'
    },
    {
      id: 'ev_203',
      name: 'Tusu Parab',
      date: '2025-01-14',
      month: 'January',
      location: 'Tribal Villages',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&q=80',
      type: 'Cultural Festival',
      description: 'Winter festival celebrating goddess Tusu',
      season: 'winter'
    },
    {
      id: 'ev_204',
      name: 'Jani Shikar',
      date: '2025-06-20',
      month: 'June',
      location: 'Forest Regions',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&q=80',
      type: 'Traditional Hunt',
      description: 'Ceremonial community hunting festival',
      season: 'monsoon'
    }
  ];

  // Weather & AQI Data
  const weatherData = {
    temperature: 29,
    aqi: 62,
    condition: 'Good',
    location: 'Ranchi',
    humidity: 65,
    windSpeed: 8,
    visibility: 'Excellent'
  };

  // Featured Homestays
  const featuredHomestays = [
    {
      name: 'Eco Valley Resort',
      location: 'Netarhat',
      rating: 4.8,
      price: '₹3,200',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&q=80',
      features: ['Mountain View', 'Organic Food', 'Nature Walks']
    },
    {
      name: 'Tribal Heritage Stay',
      location: 'Hazaribagh',
      rating: 4.9,
      price: '₹2,800',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&q=80',
      features: ['Cultural Programs', 'Traditional Crafts', 'Local Cuisine']
    },
    {
      name: 'Forest Lodge',
      location: 'Betla',
      rating: 4.7,
      price: '₹4,500',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&q=80',
      features: ['Wildlife Safari', 'Jungle Trek', 'Bird Watching']
    }
  ];

  // Auto-rotate hero carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Carousel Section */}
      <section className="relative h-screen overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(${heroSlides[currentSlide].gradient}), url('${heroSlides[currentSlide].image}')`
              }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4 z-10">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-6xl"
          >
            <motion.h1 
              className="text-5xl md:text-8xl font-bold mb-8 leading-tight bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-3xl mb-8 text-gray-100 max-w-4xl mx-auto font-light"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
            
            <motion.div 
              className="flex items-center justify-center space-x-3 mb-12 text-lg"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.9 }}
            >
              <MapPin className="w-6 h-6 text-warm-yellow-400" />
              <span className="text-warm-yellow-100">{heroSlides[currentSlide].location}</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-8"
            >
              <Link
                to="/planner"
                className="group relative overflow-hidden bg-gradient-to-r from-jungle-green-600 to-jungle-green-500 hover:from-jungle-green-700 hover:to-jungle-green-600 text-white px-10 py-5 rounded-full text-xl font-bold transition-all duration-500 flex items-center space-x-4 shadow-2xl hover:shadow-3xl transform hover:scale-105"
              >
                <span>Start Planning Your Trip</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-700 skew-x-12"></div>
              </Link>
              
              <button className="group flex items-center space-x-4 bg-white/10 backdrop-blur-lg border-2 border-white/30 text-white px-10 py-5 rounded-full text-xl font-bold hover:bg-white/20 transition-all duration-500 hover:scale-105">
                <Play className="w-6 h-6 group-hover:scale-125 transition-transform duration-300" />
                <span>Watch Journey</span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Navigation Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-20"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-8 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 z-20"
        >
          <ChevronRight className="w-8 h-8" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 flex space-x-4 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 transition-all duration-500 rounded-full ${
                index === currentSlide 
                  ? 'bg-white w-12' 
                  : 'bg-white/50 hover:bg-white/70 w-8'
              }`}
            />
          ))}
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-24 left-1/2 transform -translate-x-1/2 text-white text-center z-20"
        >
          <div className="flex flex-col items-center space-y-2">
            <span className="text-sm font-medium">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
            >
              <div className="w-1 h-3 bg-white rounded-full mt-2"></div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Weather & AQI Widget */}
      <AnimatePresence>
        {showWeatherWidget && (
          <motion.div 
            initial={{ opacity: 0, x: 100, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.8 }}
            transition={{ delay: 3, duration: 0.5 }}
            className="fixed top-24 right-6 z-40"
          >
            <div className="bg-white/95 backdrop-blur-xl border border-gray-200/50 rounded-3xl shadow-2xl p-6 w-80 relative overflow-hidden">
              <button
                onClick={() => setShowWeatherWidget(false)}
                className="absolute top-4 right-4 bg-red-500/10 hover:bg-red-500 text-red-600 hover:text-white rounded-full p-2 transition-all duration-300"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <MapPin className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900">{weatherData.location}</h3>
                    <p className="text-sm text-gray-500">Live Weather</p>
                  </div>
                </div>
                <Sun className="w-8 h-8 text-yellow-500" />
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Thermometer className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">Temperature</span>
                  </div>
                  <p className="text-3xl font-bold text-blue-900">{weatherData.temperature}°C</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-2xl">
                  <div className="flex items-center space-x-2 mb-2">
                    <Leaf className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-green-800">AQI</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">{weatherData.aqi}</p>
                  <p className="text-sm text-green-600">{weatherData.condition}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <Wind className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <p className="text-xs text-gray-500">Wind</p>
                  <p className="text-sm font-semibold">{weatherData.windSpeed}km/h</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <Cloud className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <p className="text-xs text-gray-500">Humidity</p>
                  <p className="text-sm font-semibold">{weatherData.humidity}%</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-xl">
                  <Eye className="w-5 h-5 mx-auto mb-1 text-gray-600" />
                  <p className="text-xs text-gray-500">Visibility</p>
                  <p className="text-sm font-semibold">{weatherData.visibility}</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Explore Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Quick <span className="bg-gradient-to-r from-jungle-green-600 to-emerald-500 bg-clip-text text-transparent">Explore</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Discover the four pillars of Jharkhand's tourism heritage with curated experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {exploreCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.15, duration: 0.8 }}
                  className="group cursor-pointer"
                >
                  <Link to={category.path}>
                    <div className="relative bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-3xl transition-all duration-700 transform group-hover:-translate-y-4 group-hover:scale-105">
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={category.image} 
                          alt={category.title}
                          className="w-full h-full object-cover group-hover:scale-125 transition-transform duration-1000"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-85`} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                          <motion.div
                            whileHover={{ scale: 1.2, rotate: 5 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="mb-4 p-4 bg-white/20 backdrop-blur-sm rounded-2xl"
                          >
                            <IconComponent className="w-12 h-12" />
                          </motion.div>
                          <h3 className="text-2xl font-bold text-center mb-2">{category.title}</h3>
                          <div className="flex flex-wrap justify-center gap-2 px-4">
                            {category.features.map((feature, idx) => (
                              <span key={idx} className="text-xs bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                {feature}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 text-center leading-relaxed">{category.description}</p>
                        <div className="mt-4 flex items-center justify-center text-jungle-green-600 group-hover:text-jungle-green-700 font-semibold">
                          <span className="mr-2">Explore Now</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI-Suggested Trips Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-start justify-between mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
                AI-Suggested <span className="bg-gradient-to-r from-jungle-green-600 to-emerald-500 bg-clip-text text-transparent">Trips</span>
              </h2>
              <p className="text-2xl text-gray-600 font-light mb-8">
                Personalized itineraries crafted with artificial intelligence, tailored to your interests and travel style
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="w-10 h-10 bg-gradient-to-br from-jungle-green-500 to-emerald-500 rounded-full border-2 border-white flex items-center justify-center text-white font-semibold">
                      {i + 1}
                    </div>
                  ))}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Smart Recommendations</p>
                  <p className="text-sm text-gray-500">Based on 10,000+ travelers</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="mt-8 lg:mt-0"
            >
              <Link 
                to="/planner"
                className="group flex items-center space-x-3 bg-gradient-to-r from-jungle-green-600 to-emerald-500 hover:from-jungle-green-700 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
              >
                <Zap className="w-6 h-6" />
                <span>Create AI Trip</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
            </motion.div>
          </div>

          {/* Horizontal Scroll Container */}
          <div className="overflow-x-auto pb-6">
            <div className="flex space-x-8 w-max">
              {suggestedTrips.map((trip, index) => (
                <motion.div
                  key={trip.id}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  className="flex-shrink-0 w-96 bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 group"
                >
                  <div className="relative">
                    <img 
                      src={trip.image} 
                      alt={trip.title}
                      className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    
                    {/* Trip Duration Badge */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-800 flex items-center space-x-2">
                      <Calendar className="w-4 h-4" />
                      <span>{trip.days} Days</span>
                    </div>
                    
                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-bold text-gray-800 flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span>{trip.rating}</span>
                    </div>
                    
                    {/* Theme Badge */}
                    <div className="absolute bottom-4 left-4 bg-jungle-green-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      {trip.theme}
                    </div>
                    
                    {/* Like Button */}
                    <button className="absolute bottom-4 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors group">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{trip.title}</h3>
                    <p className="text-gray-600 mb-4 leading-relaxed">{trip.description}</p>
                    
                    {/* Preview Locations */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {trip.preview.map((location, idx) => (
                        <span key={idx} className="text-sm bg-jungle-green-100 text-jungle-green-700 px-3 py-1 rounded-full font-medium flex items-center space-x-1">
                          <MapPin className="w-3 h-3" />
                          <span>{location}</span>
                        </span>
                      ))}
                    </div>
                    
                    {/* Highlights */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-gray-700 mb-2">Trip Highlights:</p>
                      <div className="flex flex-wrap gap-2">
                        {trip.highlights.map((highlight, idx) => (
                          <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {/* Price and Action */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-3xl font-bold text-jungle-green-600">{trip.price}</span>
                        <span className="text-sm text-gray-500 ml-2">per person</span>
                      </div>
                      <Link 
                        to={`/planner?trip=${trip.id}`}
                        className="group bg-jungle-green-600 hover:bg-jungle-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center space-x-2 hover:scale-105"
                      >
                        <span>View in Planner</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Festivals Section */}
      <section className="py-24 px-4 bg-gradient-to-br from-jungle-green-50 via-terracotta-50 to-warm-yellow-50">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Seasonal <span className="bg-gradient-to-r from-terracotta-600 to-warm-yellow-500 bg-clip-text text-transparent">Festivals</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Experience the rich cultural tapestry of Jharkhand through vibrant seasonal celebrations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {seasonalFestivals.map((festival, index) => (
              <motion.div
                key={festival.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.15, duration: 0.8 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-4 group"
              >
                <div className="relative">
                  <img 
                    src={festival.image} 
                    alt={festival.name}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Season Badge */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800 capitalize">
                    {festival.season}
                  </div>
                  
                  {/* Month Display */}
                  <div className="absolute top-4 right-4 bg-terracotta-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                    {festival.month}
                  </div>
                  
                  {/* Trending Badge */}
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-warm-yellow-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Popular</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-terracotta-600 bg-terracotta-100 px-3 py-1 rounded-full">
                      {festival.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{festival.name}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{festival.description}</p>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
                    <MapPin className="w-4 h-4" />
                    <span>{festival.location}</span>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-jungle-green-600 to-emerald-500 hover:from-jungle-green-700 hover:to-emerald-600 text-white py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add to Planner</span>
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Local Showcase Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
              Featured <span className="bg-gradient-to-r from-jungle-green-600 to-emerald-500 bg-clip-text text-transparent">Homestays</span>
            </h2>
            <p className="text-2xl text-gray-600 max-w-3xl mx-auto font-light">
              Experience authentic local hospitality with our carefully curated homestay partners
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredHomestays.map((homestay, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-2 group"
              >
                <div className="relative">
                  <img 
                    src={homestay.image} 
                    alt={homestay.name}
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold text-gray-800 flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span>{homestay.rating}</span>
                  </div>
                  
                  {/* Share Button */}
                  <button className="absolute bottom-4 right-4 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{homestay.name}</h3>
                  <div className="flex items-center space-x-2 text-gray-600 mb-4">
                    <MapPin className="w-4 h-4" />
                    <span>{homestay.location}</span>
                  </div>
                  
                  {/* Features */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {homestay.features.map((feature, idx) => (
                      <span key={idx} className="text-xs bg-jungle-green-100 text-jungle-green-700 px-3 py-1 rounded-full font-medium">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-2xl font-bold text-jungle-green-600">{homestay.price}</span>
                      <span className="text-sm text-gray-500 ml-1">/night</span>
                    </div>
                    <Link 
                      to="/marketplace"
                      className="bg-jungle-green-600 hover:bg-jungle-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors shadow-lg hover:shadow-xl"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-center mt-12"
          >
            <Link 
              to="/marketplace"
              className="inline-flex items-center space-x-3 bg-gradient-to-r from-jungle-green-600 to-emerald-500 hover:from-jungle-green-700 hover:to-emerald-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <Globe className="w-6 h-6" />
              <span>Explore All Homestays</span>
              <ArrowRight className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-black text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Logo & Description */}
            <div className="md:col-span-2">
              <h3 className="text-3xl font-bold mb-4 bg-gradient-to-r from-jungle-green-400 to-emerald-300 bg-clip-text text-transparent">
                Jharkhand Tourism
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Discover the untouched beauty of Jharkhand - where pristine forests meet ancient culture, 
                and every journey tells a story of heritage and natural splendor.
              </p>
              <div className="flex items-center space-x-4">
                <Award className="w-8 h-8 text-warm-yellow-400" />
                <div>
                  <p className="font-semibold">Government of Jharkhand</p>
                  <p className="text-sm text-gray-400">Official Tourism Portal</p>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-warm-yellow-400">Quick Links</h4>
              <div className="space-y-3">
                {[
                  { name: 'Home', path: '/' },
                  { name: 'Plan Your Trip', path: '/planner' },
                  { name: 'Explore Places', path: '/explore' },
                  { name: 'Marketplace', path: '/marketplace' },
                  { name: 'About Us', path: '/about' }
                ].map((link) => (
                  <Link 
                    key={link.name}
                    to={link.path} 
                    className="block text-gray-300 hover:text-jungle-green-400 transition-colors duration-300 hover:translate-x-2 transform"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-warm-yellow-400">Contact</h4>
              <div className="space-y-4 text-gray-300">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-jungle-green-400" />
                  <span>Tourism Directorate, Ranchi</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Thermometer className="w-5 h-5 text-jungle-green-400" />
                  <span>Weather: {weatherData.temperature}°C, AQI: {weatherData.aqi}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-gray-400 mb-4 md:mb-0">
              © 2025 Government of Jharkhand. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-500">
                Made with ❤️ for sustainable tourism
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RouterHomePage;
