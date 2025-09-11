import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Filter, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const CleanPlannerPage: React.FC = () => {
  const [budget, setBudget] = useState(5000);
  const [duration, setDuration] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [interests, setInterests] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const interestOptions = [
    'Nature & Wildlife',
    'Cultural Heritage',
    'Adventure Sports',
    'Photography',
    'Local Cuisine',
    'Spiritual Places',
    'Tribal Culture',
    'Waterfalls'
  ];

  const toggleInterest = (interest: string) => {
    setInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const handlePlanTrip = () => {
    // This would typically call an API
    alert('Trip planning feature coming soon! We\'ll create a personalized itinerary based on your preferences.');
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Plan Your Trip
          </h1>
          <p className="text-lg text-gray-600">
            Let us help you create the perfect Jharkhand experience
          </p>
        </motion.div>

        {/* Main Planning Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-6"
        >
          {/* Quick Settings */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
            {/* Budget */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Budget (₹)
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="2000"
                  max="20000"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="text-center mt-2 text-green-600 font-semibold">
                  ₹{budget.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Duration */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Duration (Days)
              </label>
              <select
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                {[1, 2, 3, 4, 5, 6, 7].map(day => (
                  <option key={day} value={day}>
                    {day} {day === 1 ? 'Day' : 'Days'}
                  </option>
                ))}
              </select>
            </div>

            {/* Travelers */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Travelers
              </label>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setTravelers(Math.max(1, travelers - 1))}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <span className="text-xl font-semibold text-gray-900 w-8 text-center">
                  {travelers}
                </span>
                <button
                  onClick={() => setTravelers(Math.min(10, travelers + 1))}
                  className="w-10 h-10 bg-gray-200 hover:bg-gray-300 rounded-full flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <label className="text-sm font-semibold text-gray-900">
                What interests you?
              </label>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2 text-green-600 hover:text-green-700 transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span className="text-sm">More Filters</span>
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {interestOptions.map((interest, index) => (
                <motion.button
                  key={interest}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.1 * index }}
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    interests.includes(interest)
                      ? 'bg-green-100 text-green-700 ring-2 ring-green-200'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {interest}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Plan Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePlanTrip}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-2xl font-semibold text-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
          >
            <Sparkles className="w-5 h-5" />
            <span>Create My Itinerary</span>
          </motion.button>
        </motion.div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            {
              icon: MapPin,
              title: 'Smart Recommendations',
              description: 'AI-powered suggestions based on your preferences',
              color: 'text-blue-600'
            },
            {
              icon: Clock,
              title: 'Optimized Routes',
              description: 'Efficient travel routes to maximize your time',
              color: 'text-green-600'
            },
            {
              icon: Users,
              title: 'Local Insights',
              description: 'Tips and advice from local experts',
              color: 'text-purple-600'
            }
          ].map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + (0.1 * index) }}
                className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <IconComponent className={`w-8 h-8 ${card.color} mb-3`} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {card.title}
                </h3>
                <p className="text-gray-600 text-sm">
                  {card.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Coming Soon Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-center"
        >
          <p className="text-yellow-800">
            <strong>Coming Soon:</strong> Full AI-powered itinerary planning with real-time availability and booking
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default CleanPlannerPage;
