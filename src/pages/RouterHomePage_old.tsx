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
      {/* Hero Carousel */}
      <section className="relative h-[85vh] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 1 }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `linear-gradient(135deg, rgba(46, 125, 50, 0.7) 0%, rgba(0, 0, 0, 0.4) 100%), url('${heroSlides[currentSlide].image}')`
              }}
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-5xl"
          >
            <motion.h1 
              className="text-4xl md:text-7xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
            >
              {heroSlides[currentSlide].title}
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
            >
              {heroSlides[currentSlide].subtitle}
            </motion.p>
            <motion.div 
              className="flex items-center justify-center space-x-2 mb-10 text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
            >
              <MapPin className="w-5 h-5" />
              <span>{heroSlides[currentSlide].location}</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.1 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6"
            >
              <Link
                to="/planner"
                className="group relative overflow-hidden bg-jungle-green-600 hover:bg-jungle-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 flex items-center space-x-3 shadow-xl hover:shadow-2xl transform-gpu"
              >
                <span>Plan Your Journey</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group flex items-center space-x-3 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white/20 transition-all duration-300 transform-gpu">
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                <span>Watch Video</span>
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </section>

      {/* Weather & AQI Widget */}
      {showWeatherWidget && (
        <div className="fixed top-20 right-4 z-40">
          <motion.div 
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            transition={{ delay: 2 }}
            className="bg-white rounded-xl shadow-lg p-4 w-48 border border-gray-200 relative"
          >
            <button
              onClick={() => setShowWeatherWidget(false)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-sm text-gray-800">{weatherData.location}</h3>
              <Thermometer className="w-4 h-4 text-blue-500" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-900">{weatherData.temperature}°C</p>
                <p className="text-xs text-gray-500">Temperature</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-green-600">AQI {weatherData.aqi}</p>
                <p className="text-xs text-green-600">{weatherData.condition}</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Quick Explore Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Quick <span className="text-jungle-green-600">Explore</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover the three pillars of Jharkhand's tourism heritage
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {exploreCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="group cursor-pointer"
                >
                  <Link to={category.path}>
                    <div className="relative bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform-gpu">
                      <div className="relative h-64">
                        <img 
                          src={category.image} 
                          alt={category.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`} />
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                          <motion.div
                            whileHover={{ scale: 1.1, rotate: 3 }}
                            className="mb-4"
                          >
                            <IconComponent className="w-16 h-16" />
                          </motion.div>
                          <h3 className="text-2xl font-bold text-center">{category.title}</h3>
                        </div>
                      </div>
                      <div className="p-6">
                        <p className="text-gray-600 text-center">{category.description}</p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI-Suggested Trips */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                AI-Suggested <span className="text-jungle-green-600">Trips</span>
              </h2>
              <p className="text-xl text-gray-600">
                Personalized itineraries crafted with artificial intelligence
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Link 
                to="/planner"
                className="hidden md:flex items-center space-x-2 text-jungle-green-600 hover:text-jungle-green-700 font-semibold text-lg group"
              >
                <span>View All Trips</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>

          <div className="overflow-x-auto pb-4">
            <div className="flex space-x-6" style={{ width: 'max-content' }}>
              {suggestedTrips.map((trip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex-shrink-0 w-80 bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform-gpu"
                >
                  <div className="relative">
                    <img 
                      src={trip.image} 
                      alt={trip.title}
                      className="w-full h-52 object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-800">
                      {trip.duration}
                    </div>
                    <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-semibold text-gray-800">{trip.rating}</span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <button className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{trip.title}</h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {trip.highlights.map((highlight, idx) => (
                        <span key={idx} className="text-xs bg-jungle-green-100 text-jungle-green-700 px-3 py-1 rounded-full font-medium">
                          {highlight}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-jungle-green-600">{trip.price}</span>
                        <span className="text-sm text-gray-500 ml-1">per person</span>
                      </div>
                      <Link 
                        to={`/planner?trip=${index}`}
                        className="bg-jungle-green-600 hover:bg-jungle-green-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors shadow-lg hover:shadow-xl"
                      >
                        View & Book
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Seasonal Events */}
      <section className="py-16 px-4 bg-gradient-to-br from-jungle-green-50 to-blue-50">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Seasonal <span className="text-jungle-green-600">Events</span>
            </h2>
            <p className="text-xl text-gray-600">
              Don't miss these cultural celebrations and special experiences
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform-gpu"
              >
                <div className="relative">
                  <img 
                    src={event.image} 
                    alt={event.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-jungle-green-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {event.type}
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      <span>Popular</span>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{event.name}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-jungle-green-600 hover:bg-jungle-green-700 text-white py-3 rounded-xl font-semibold transition-colors shadow-lg hover:shadow-xl transform-gpu"
                  >
                    Add to Planner
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional Stats Overlay */}
      {showStats && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50"
        >
          <div className="bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">Tourism Statistics</h3>
              <button
                onClick={() => setShowStats(false)}
                className="text-gray-500 hover:text-red-500 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex space-x-6">
              <div className="text-center">
                <Users className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                <div className="text-2xl font-bold text-gray-900">25,000+</div>
                <div className="text-sm text-gray-600">Happy Travelers</div>
              </div>
              <div className="text-center">
                <MapPin className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <div className="text-2xl font-bold text-gray-900">150+</div>
                <div className="text-sm text-gray-600">Tourist Spots</div>
              </div>
              <div className="text-center">
                <Leaf className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
                <div className="text-2xl font-bold text-gray-900">9.2/10</div>
                <div className="text-sm text-gray-600">Eco Score</div>
              </div>
              <div className="text-center">
                <Star className="w-8 h-8 mx-auto mb-2 text-yellow-600" />
                <div className="text-2xl font-bold text-gray-900">4.8/5</div>
                <div className="text-sm text-gray-600">Safety Rating</div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default RouterHomePage;
