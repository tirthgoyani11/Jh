import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Calendar,
  MapPin,
  Wallet,
  Users,
  Sparkles,
  Download,
  Heart,
  BookOpen,
  Plane,
  Train,
  Bus,
  Car,
  Leaf,
  Star,
  Clock,
  Navigation,
  Sun,
  Thermometer,
  Zap
} from 'lucide-react';

// Type definitions
interface Day {
  day: number;
  activities: string[];
}

interface Transport {
  mode: string;
  from: string;
  to: string;
  cost: number;
  eta: string;
  icon: any;
}

interface Itinerary {
  id: string;
  title: string;
  mapThumbnail: string;
  days: Day[];
  transport: Transport[];
  cost: number;
  ecoScore: string;
  festivals: string[];
  rating: number;
}

interface TransportOption {
  mode: string;
  from: string;
  to: string;
  time: string;
  cost: number;
  duration: string;
  icon: any;
}

const PlannerPage: React.FC = () => {
  const [formData, setFormData] = useState({
    startDate: '',
    endDate: '',
    budget: 15000,
    interests: [] as string[],
    travelStyle: 'Family'
  });

  const [generatedItineraries, setGeneratedItineraries] = useState<Itinerary[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  // Interest options
  const interestOptions = [
    { id: 'waterfalls', label: 'Waterfalls', icon: '💧' },
    { id: 'wildlife', label: 'Wildlife', icon: '🦌' },
    { id: 'tribal', label: 'Tribal Culture', icon: '🎭' },
    { id: 'temples', label: 'Temples', icon: '🕉️' },
    { id: 'handicrafts', label: 'Handicrafts', icon: '🎨' },
    { id: 'adventure', label: 'Adventure', icon: '🏔️' }
  ];

  const travelStyles = ['Solo', 'Family', 'Group', 'Pilgrimage'];

  // Mock itinerary data
  const mockItineraries: Itinerary[] = [
    {
      id: 'itn_001',
      title: '3-Day Eco Circuit 🌳',
      mapThumbnail: 'https://images.unsplash.com/photo-1502780402662-acc01917271e?w=300&h=200&fit=crop',
      days: [
        { day: 1, activities: ['Ranchi city tour', 'Patratu Valley sunset'] },
        { day: 2, activities: ['Betla National Park safari', 'Tribal village visit'] },
        { day: 3, activities: ['Netarhat sunrise point', 'Local crafts bazaar'] }
      ],
      transport: [
        { mode: 'bus', from: 'Ranchi', to: 'Patratu', cost: 200, eta: '2h', icon: Bus },
        { mode: 'train', from: 'Patratu', to: 'Betla', cost: 150, eta: '3h', icon: Train }
      ],
      cost: 5200,
      ecoScore: 'Low Carbon',
      festivals: ['Sarhul Festival'],
      rating: 4.8
    },
    {
      id: 'itn_002',
      title: '4-Day Wildlife Adventure 🦁',
      mapThumbnail: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=300&h=200&fit=crop',
      days: [
        { day: 1, activities: ['Ranchi arrival', 'Tagore Hill visit'] },
        { day: 2, activities: ['Betla National Park', 'Night safari'] },
        { day: 3, activities: ['Hazaribagh wildlife sanctuary', 'Bird watching'] },
        { day: 4, activities: ['Dalma Wildlife Sanctuary', 'Elephant spotting'] }
      ],
      transport: [
        { mode: 'car', from: 'Ranchi', to: 'Betla', cost: 800, eta: '3h', icon: Car },
        { mode: 'bus', from: 'Betla', to: 'Hazaribagh', cost: 300, eta: '2h', icon: Bus }
      ],
      cost: 8500,
      ecoScore: 'Medium Carbon',
      festivals: [],
      rating: 4.9
    },
    {
      id: 'itn_003',
      title: '5-Day Cultural Heritage 🎭',
      mapThumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=200&fit=crop',
      days: [
        { day: 1, activities: ['Ranchi heritage walk', 'Tribal museum'] },
        { day: 2, activities: ['Deoghar temple complex', 'Local artisan visit'] },
        { day: 3, activities: ['Santhal village stay', 'Folk dance evening'] },
        { day: 4, activities: ['Handicraft workshops', 'Traditional cooking'] },
        { day: 5, activities: ['Local market tour', 'Departure'] }
      ],
      transport: [
        { mode: 'train', from: 'Ranchi', to: 'Deoghar', cost: 250, eta: '4h', icon: Train },
        { mode: 'bus', from: 'Deoghar', to: 'Village', cost: 150, eta: '1h', icon: Bus }
      ],
      cost: 6800,
      ecoScore: 'Low Carbon',
      festivals: ['Karam Festival', 'Tusu Parab'],
      rating: 4.7
    }
  ];

  const handleInterestToggle = (interestId: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const generateItinerary = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setGeneratedItineraries(mockItineraries);
    setIsGenerating(false);
  };

  const transportOptions: TransportOption[] = [
    { mode: 'bus', from: 'Ranchi', to: 'Netarhat', time: '6:30 AM', cost: 250, duration: '4h', icon: Bus },
    { mode: 'train', from: 'Ranchi', to: 'Hazaribagh', time: '8:15 AM', cost: 150, duration: '3h', icon: Train },
    { mode: 'car', from: 'Ranchi', to: 'Betla', time: 'Flexible', cost: 800, duration: '3h', icon: Car }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-jungle-green-600 to-jungle-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-4"
          >
            Plan Your Trip
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-jungle-green-100"
          >
            AI-powered personalized itineraries for Jharkhand
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Sidebar - Inputs */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-lg p-6 sticky top-24"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Sparkles className="w-6 h-6 mr-2 text-jungle-green-600" />
                Trip Preferences
              </h2>

              {/* Date Picker */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  Travel Dates
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jungle-green-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jungle-green-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Budget Slider */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Wallet className="w-4 h-4 mr-2" />
                  Budget Range
                </label>
                <div className="px-3">
                  <input
                    type="range"
                    min="2000"
                    max="50000"
                    step="1000"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: parseInt(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-2">
                    <span>₹2,000</span>
                    <span className="font-semibold text-jungle-green-600">₹{formData.budget.toLocaleString()}</span>
                    <span>₹50,000</span>
                  </div>
                  <div className="text-center mt-2">
                    <span className="text-sm text-gray-600">
                      {formData.budget < 10000 ? 'Budget' : formData.budget < 25000 ? 'Comfort' : 'Luxury'} Travel
                    </span>
                  </div>
                </div>
              </div>

              {/* Interest Tags */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  Interests
                </label>
                <div className="flex flex-wrap gap-2">
                  {interestOptions.map((interest) => (
                    <button
                      key={interest.id}
                      onClick={() => handleInterestToggle(interest.id)}
                      className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-1 ${
                        formData.interests.includes(interest.id)
                          ? 'bg-jungle-green-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      <span>{interest.icon}</span>
                      <span>{interest.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Travel Style */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  Travel Style
                </label>
                <select
                  value={formData.travelStyle}
                  onChange={(e) => setFormData(prev => ({ ...prev, travelStyle: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jungle-green-500 focus:border-transparent"
                >
                  {travelStyles.map((style) => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={generateItinerary}
                disabled={isGenerating}
                className={`w-full py-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center space-x-2 ${
                  isGenerating 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-jungle-green-600 to-jungle-green-700 hover:shadow-lg transform'
                }`}
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                    <span>Generating...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Generate My Itinerary 🚀</span>
                  </>
                )}
              </motion.button>

              {/* Weather Widget */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Sun className="w-5 h-5 text-yellow-500" />
                    <div>
                      <p className="text-sm font-semibold text-gray-800">🌤️ Ranchi</p>
                      <p className="text-xs text-gray-600">29°C, AQI 62 (Good)</p>
                    </div>
                  </div>
                  <Thermometer className="w-4 h-4 text-blue-500" />
                </div>
              </div>

              {/* Tips Box */}
              <div className="mt-4 p-4 bg-amber-50 rounded-lg border border-amber-200">
                <div className="flex items-start space-x-2">
                  <Zap className="w-4 h-4 text-amber-500 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-amber-800">Pro Tip</p>
                    <p className="text-xs text-amber-700">Travel early to avoid crowds at waterfalls.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right Main Section - Results */}
          <div className="lg:col-span-2">
            {generatedItineraries.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-2xl shadow-lg p-12 text-center"
              >
                <div className="w-32 h-32 mx-auto mb-6 bg-jungle-green-100 rounded-full flex items-center justify-center">
                  <MapPin className="w-16 h-16 text-jungle-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Plan Your Adventure?</h3>
                <p className="text-gray-600 mb-6">
                  Fill in your preferences and let our AI create the perfect Jharkhand itinerary for you.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="w-4 h-4" />
                    <span>AI-Powered</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Leaf className="w-4 h-4" />
                    <span>Eco-Friendly</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Real-time Updates</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="space-y-8">
                {/* Itinerary Cards */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {generatedItineraries.map((itinerary, index) => (
                    <motion.div
                      key={itinerary.id}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      {/* Card Header */}
                      <div className="relative">
                        <img 
                          src={itinerary.mapThumbnail} 
                          alt={itinerary.title}
                          className="w-full h-48 object-cover"
                        />
                        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                          <span className="text-sm font-semibold text-gray-800">{itinerary.title}</span>
                        </div>
                        <div className="absolute top-4 right-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-semibold">{itinerary.rating}</span>
                        </div>
                        {itinerary.festivals.length > 0 && (
                          <div className="absolute bottom-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            🎭 Festival Season!
                          </div>
                        )}
                      </div>

                      {/* Card Content */}
                      <div className="p-6">
                        {/* Day-wise Plan */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-3">Itinerary Highlights</h4>
                          <div className="space-y-2">
                            {itinerary.days.slice(0, 3).map((day: Day) => (
                              <div key={day.day} className="flex items-start space-x-3">
                                <div className="w-6 h-6 bg-jungle-green-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                  {day.day}
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-gray-600">
                                    {day.activities.slice(0, 2).join(', ')}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Transport Section */}
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-3 flex items-center">
                            <Navigation className="w-4 h-4 mr-1" />
                            Transport
                          </h4>
                          <div className="space-y-2">
                            {itinerary.transport.slice(0, 2).map((transport: Transport, idx: number) => {
                              const IconComponent = transport.icon;
                              return (
                                <div key={idx} className="flex items-center space-x-3 text-sm">
                                  <IconComponent className="w-4 h-4 text-jungle-green-600" />
                                  <span className="text-gray-600">
                                    {transport.from} → {transport.to} (₹{transport.cost}, {transport.eta})
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Cost and Eco Score */}
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-2">
                            <Wallet className="w-4 h-4 text-jungle-green-600" />
                            <span className="font-bold text-xl text-jungle-green-600">₹{itinerary.cost.toLocaleString()}</span>
                            <span className="text-sm text-gray-500">total</span>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                            itinerary.ecoScore === 'Low Carbon' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            <Leaf className="w-3 h-3 inline mr-1" />
                            {itinerary.ecoScore}
                          </div>
                        </div>

                        {/* Festival Add-ons */}
                        {itinerary.festivals.length > 0 && (
                          <div className="mb-4">
                            <div className="bg-orange-50 border border-orange-200 rounded-lg p-3">
                              <div className="flex items-center space-x-2 mb-2">
                                <span className="text-orange-600">🎭</span>
                                <span className="text-sm font-semibold text-orange-800">Festival Add-ons</span>
                              </div>
                              <div className="space-y-1">
                                {itinerary.festivals.map((festival: string, idx: number) => (
                                  <button
                                    key={idx}
                                    className="text-xs bg-orange-600 text-white px-2 py-1 rounded-full hover:bg-orange-700 transition-colors mr-2"
                                  >
                                    + Add {festival}
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="grid grid-cols-3 gap-2">
                          <button className="px-3 py-2 bg-jungle-green-50 text-jungle-green-700 rounded-lg text-sm font-medium hover:bg-jungle-green-100 transition-colors">
                            <BookOpen className="w-4 h-4 inline mr-1" />
                            View Full
                          </button>
                          <button className="px-3 py-2 bg-gray-50 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
                            <Heart className="w-4 h-4 inline mr-1" />
                            Save
                          </button>
                          <button className="px-3 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors">
                            <Plane className="w-4 h-4 inline mr-1" />
                            Book Now
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Transport Scheduler Widget */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white rounded-2xl shadow-lg p-6"
                >
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Navigation className="w-5 h-5 mr-2 text-jungle-green-600" />
                    Transport Options
                  </h3>
                  
                  {/* Search Box */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
                    <input
                      type="text"
                      placeholder="From"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jungle-green-500"
                    />
                    <input
                      type="text"
                      placeholder="To"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jungle-green-500"
                    />
                    <input
                      type="date"
                      className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-jungle-green-500"
                    />
                    <button className="bg-jungle-green-600 text-white py-2 rounded-lg hover:bg-jungle-green-700 transition-colors">
                      Search
                    </button>
                  </div>

                  {/* Transport Results */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {transportOptions.map((transport, index) => {
                      const IconComponent = transport.icon;
                      return (
                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-center space-x-3 mb-3">
                            <div className="w-10 h-10 bg-jungle-green-100 rounded-full flex items-center justify-center">
                              <IconComponent className="w-5 h-5 text-jungle-green-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800">{transport.from} → {transport.to}</p>
                              <p className="text-sm text-gray-500">{transport.time}</p>
                            </div>
                          </div>
                          <div className="flex justify-between items-center">
                            <div>
                              <p className="font-bold text-jungle-green-600">₹{transport.cost}</p>
                              <p className="text-xs text-gray-500">{transport.duration}</p>
                            </div>
                            <button className="text-sm bg-jungle-green-50 text-jungle-green-700 px-3 py-1 rounded-full hover:bg-jungle-green-100 transition-colors">
                              Select
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                    <p className="text-sm text-green-800 flex items-center">
                      <Leaf className="w-4 h-4 mr-2" />
                      <strong>Eco-friendly suggestion:</strong> Shared eco-taxi option available for group travel.
                    </p>
                  </div>
                </motion.div>

                {/* Offline Safety Kit Export */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-6 text-white text-center"
                >
                  <div className="max-w-md mx-auto">
                    <Download className="w-12 h-12 mx-auto mb-4" />
                    <h3 className="text-xl font-bold mb-2">Offline Safety Kit</h3>
                    <p className="text-blue-100 mb-4">
                      Download your complete itinerary with emergency contacts and offline maps.
                    </p>
                    <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors">
                      ⬇️ Download Itinerary + Emergency Contacts (PDF)
                    </button>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlannerPage;
