import React, { useState } from 'react';
import { Search, Filter, Star, MapPin, Clock, Users, Heart, ChevronDown, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MarketplacePage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilter, setSelectedFilter] = useState('popular');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'All Experiences', icon: '🌟' },
    { id: 'adventure', name: 'Adventure', icon: '🏔️' },
    { id: 'cultural', name: 'Cultural Tours', icon: '🎭' },
    { id: 'wildlife', name: 'Wildlife Safari', icon: '🐅' },
    { id: 'spiritual', name: 'Spiritual', icon: '🕉️' },
    { id: 'photography', name: 'Photography', icon: '📸' }
  ];

  const experiences = [
    {
      id: '1',
      title: 'Hundru Falls Photography Tour',
      provider: 'Jharkhand Adventures',
      rating: 4.9,
      reviews: 234,
      price: 899,
      originalPrice: 1299,
      duration: '6-8 hours',
      groupSize: '8-12 people',
      category: 'photography',
      location: 'Ranchi',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop',
      highlights: ['Professional Guide', 'Equipment Provided', 'Lunch Included'],
      description: 'Capture the magnificent 98m Hundru Falls with expert photography guidance',
      difficulty: 'Easy',
      verified: true,
      bestseller: true
    },
    {
      id: '2',
      title: 'Betla Tiger Safari Experience',
      provider: 'Wildlife Experts',
      rating: 4.8,
      reviews: 189,
      price: 2499,
      originalPrice: 2999,
      duration: '2 days',
      groupSize: '6-8 people',
      category: 'wildlife',
      location: 'Palamau',
      image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=300&fit=crop',
      highlights: ['Tiger Sighting', 'Elephant Safari', 'Expert Naturalist'],
      description: 'Track tigers and elephants in their natural habitat with expert guides',
      difficulty: 'Moderate',
      verified: true,
      bestseller: false
    },
    {
      id: '3',
      title: 'Tribal Village Cultural Immersion',
      provider: 'Cultural Connections',
      rating: 5.0,
      reviews: 156,
      price: 1599,
      originalPrice: 1999,
      duration: '1 day',
      groupSize: '10-15 people',
      category: 'cultural',
      location: 'Khunti',
      image: 'https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=400&h=300&fit=crop',
      highlights: ['Traditional Dance', 'Local Cuisine', 'Handicraft Workshop'],
      description: 'Experience authentic Mundari tribal culture and traditions',
      difficulty: 'Easy',
      verified: true,
      bestseller: true
    },
    {
      id: '4',
      title: 'Netarhat Sunrise Trekking',
      provider: 'Mountain Trails',
      rating: 4.7,
      reviews: 298,
      price: 1299,
      originalPrice: 1599,
      duration: '12 hours',
      groupSize: '12-20 people',
      category: 'adventure',
      location: 'Latehar',
      image: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=400&h=300&fit=crop',
      highlights: ['Sunrise Point', 'Pine Forest Walk', 'Local Breakfast'],
      description: 'Trek to the famous sunrise point and experience the Queen of Chotanagpur',
      difficulty: 'Moderate',
      verified: true,
      bestseller: false
    },
    {
      id: '5',
      title: 'Deoghar Spiritual Journey',
      provider: 'Sacred Travels',
      rating: 4.9,
      reviews: 445,
      price: 999,
      originalPrice: 1299,
      duration: '8 hours',
      groupSize: '15-25 people',
      category: 'spiritual',
      location: 'Deoghar',
      image: 'https://images.unsplash.com/photo-1620766182966-c6eb5ed2b788?w=400&h=300&fit=crop',
      highlights: ['Baidyanath Temple', 'Guided Prayers', 'Temple History'],
      description: 'Visit the sacred Jyotirlinga and experience divine spirituality',
      difficulty: 'Easy',
      verified: true,
      bestseller: true
    },
    {
      id: '6',
      title: 'Parasnath Hill Pilgrimage Trek',
      provider: 'Sacred Journeys',
      rating: 4.6,
      reviews: 178,
      price: 1799,
      originalPrice: 2199,
      duration: '2 days',
      groupSize: '8-12 people',
      category: 'spiritual',
      location: 'Giridih',
      image: 'https://images.unsplash.com/photo-1609952332026-8297b92b4ee0?w=400&h=300&fit=crop',
      highlights: ['Jain Temples', 'Mountain Trek', 'Spiritual Guidance'],
      description: 'Sacred pilgrimage to Jharkhand\'s highest peak with 24 Jain temples',
      difficulty: 'Challenging',
      verified: true,
      bestseller: false
    }
  ];

  const filteredExperiences = experiences.filter(exp => {
    const matchesCategory = selectedCategory === 'all' || exp.category === selectedCategory;
    const matchesSearch = exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         exp.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedExperiences = [...filteredExperiences].sort((a, b) => {
    switch (selectedFilter) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      default:
        return b.reviews - a.reviews; // popular by reviews
    }
  });

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Enhanced Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40 border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <h1 className="text-3xl font-black text-gray-900 mb-4">
            Local <span className="text-emerald-600">Experiences</span>
          </h1>
          
          {/* Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search experiences, locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            
            <div className="flex gap-3">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none bg-white"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex overflow-x-auto gap-3 pb-4 scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium whitespace-nowrap transition-all ${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50 shadow-sm'
                }`}
              >
                <span className="text-lg">{category.icon}</span>
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600">
            Found <span className="font-semibold text-emerald-600">{sortedExperiences.length}</span> experiences
          </p>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {sortedExperiences.map((experience, index) => (
              <motion.div
                key={experience.id}
                layout
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
              >
                {/* Image Section */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {experience.bestseller && (
                      <div className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        Bestseller
                      </div>
                    )}
                    {experience.verified && (
                      <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        Verified
                      </div>
                    )}
                  </div>

                  {/* Favorite Button */}
                  <button
                    onClick={() => toggleFavorite(experience.id)}
                    className={`absolute top-4 right-4 p-2 rounded-full transition-all ${
                      favorites.includes(experience.id)
                        ? 'bg-red-500 text-white'
                        : 'bg-white/80 text-gray-600 hover:bg-white'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${favorites.includes(experience.id) ? 'fill-current' : ''}`} />
                  </button>

                  {/* Price Badge */}
                  <div className="absolute bottom-4 right-4 bg-emerald-600 text-white px-3 py-2 rounded-full font-bold">
                    ₹{experience.price}
                    <span className="text-xs line-through opacity-75 ml-2">₹{experience.originalPrice}</span>
                  </div>

                  {/* Difficulty Badge */}
                  <div className="absolute bottom-4 left-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm">
                    {experience.difficulty}
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900 line-clamp-1 group-hover:text-emerald-600 transition-colors">
                      {experience.title}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded-full">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-bold text-gray-700">{experience.rating}</span>
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 mb-3 flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {experience.location} • by {experience.provider}
                  </p>

                  <p className="text-gray-600 mb-4 line-clamp-2">{experience.description}</p>

                  {/* Highlights */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {experience.highlights.slice(0, 2).map((highlight) => (
                      <span
                        key={highlight}
                        className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                    {experience.highlights.length > 2 && (
                      <span className="text-emerald-600 text-xs font-medium">
                        +{experience.highlights.length - 2} more
                      </span>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-6">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {experience.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {experience.groupSize}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500">
                      {experience.reviews} reviews
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors"
                    >
                      Book Now
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {sortedExperiences.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No experiences found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setSelectedFilter('popular');
              }}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-emerald-700 transition-colors"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default MarketplacePage;
