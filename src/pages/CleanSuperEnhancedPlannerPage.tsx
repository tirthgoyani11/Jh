import React, { useState, useMemo, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  MapPin,
  Users,
  IndianRupee,
  Sparkles,
  Filter,
  ChevronDown,
  ChevronUp,
  Star,
  Heart,
  Share2,
  Car,
  Camera,
  Utensils,
  Bed,
  TreePine,
  Zap,
  Award,
  Mountain,
  Compass,
  Sun,
  Leaf,
  Globe,
  TrendingUp,
  CheckCircle,
  X,
  Clock,
  RefreshCw,
  Loader,
  Thermometer,
  Download
} from 'lucide-react';
import { geminiTravelService } from '../services/aiTravelService';
import type { TravelPreferences, GeneratedItinerary } from '../services/aiTravelService';

const CleanSuperEnhancedPlannerPage: React.FC = () => {
  // Simple state management - no complex memoization
  const [preferences, setPreferences] = useState<TravelPreferences>({
    budget: 5000,
    duration: 3,
    travelers: 2,
    interests: [],
    travelStyle: 'moderate',
    accommodation: 'homestay',
    transport: 'mixed',
    season: 'current',
    accessibility: false,
    dietaryRestrictions: []
  });

  const [generatedItineraries, setGeneratedItineraries] = useState<GeneratedItinerary[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedItinerary, setExpandedItinerary] = useState<number | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [favoriteItineraries, setFavoriteItineraries] = useState<string[]>([]);
  const [selectedDetailItinerary, setSelectedDetailItinerary] = useState<GeneratedItinerary | null>(null);

  // Static data - no useMemo needed
  const interestCategories = [
    {
      category: 'Nature & Adventure',
      interests: [
        { id: 'waterfalls', label: 'Waterfalls', icon: '💧', color: 'bg-blue-500', description: 'Stunning waterfalls like Hundru & Dassam' },
        { id: 'wildlife', label: 'Wildlife', icon: '🦌', color: 'bg-green-500', description: 'Safari at Betla National Park' },
        { id: 'trekking', label: 'Trekking', icon: '🥾', color: 'bg-orange-500', description: 'Mountain trails and forest walks' },
        { id: 'adventure', label: 'Adventure Sports', icon: '⛰️', color: 'bg-red-500', description: 'Rock climbing, rappelling, river rafting' }
      ]
    },
    {
      category: 'Culture & Heritage',
      interests: [
        { id: 'temples', label: 'Temples', icon: '🛕', color: 'bg-orange-600', description: 'Sacred sites like Baidyanath Temple' },
        { id: 'culture', label: 'Tribal Culture', icon: '🎭', color: 'bg-purple-500', description: 'Traditional villages and customs' },
        { id: 'crafts', label: 'Handicrafts', icon: '🎨', color: 'bg-pink-500', description: 'Local artisan workshops' },
        { id: 'festivals', label: 'Festivals', icon: '🎪', color: 'bg-indigo-500', description: 'Sarhul, Karma and other celebrations' }
      ]
    },
    {
      category: 'Experience & Lifestyle',
      interests: [
        { id: 'photography', label: 'Photography', icon: '📸', color: 'bg-gray-600', description: 'Scenic spots and cultural photography' },
        { id: 'food', label: 'Local Cuisine', icon: '🍛', color: 'bg-yellow-600', description: 'Litti Chokha and tribal delicacies' },
        { id: 'wellness', label: 'Wellness', icon: '🧘', color: 'bg-green-400', description: 'Meditation and yoga retreats' },
        { id: 'learning', label: 'Educational', icon: '📚', color: 'bg-blue-600', description: 'Museums and learning experiences' }
      ]
    }
  ];

  const travelStyles = [
    { id: 'budget', label: 'Budget Explorer', desc: 'Local transport, basic stays, authentic experiences', multiplier: 0.7, icon: '🎒' },
    { id: 'moderate', label: 'Comfort Seeker', desc: 'Balanced comfort & cost, mix of experiences', multiplier: 1.0, icon: '🧳' },
    { id: 'luxury', label: 'Luxury Traveler', desc: 'Premium experiences, luxury stays, private transport', multiplier: 1.5, icon: '✈️' }
  ];

  const accommodationTypes = [
    { id: 'homestay', label: 'Homestays', desc: 'Authentic local experience with families', icon: '🏡', sustainability: true },
    { id: 'hotel', label: 'Hotels', desc: 'Comfort & amenities in city centers', icon: '🏨', sustainability: false },
    { id: 'resort', label: 'Eco Resorts', desc: 'Luxury in nature with eco-practices', icon: '🌴', sustainability: true },
    { id: 'camping', label: 'Camping', desc: 'Adventure under stars, close to nature', icon: '⛺', sustainability: true }
  ];

  const transportOptions = [
    { id: 'public', label: 'Public Transport', desc: 'Eco-friendly buses and trains', icon: '🚌', carbon: 'Low' },
    { id: 'private', label: 'Private Car', desc: 'Convenient door-to-door travel', icon: '🚗', carbon: 'High' },
    { id: 'mixed', label: 'Mixed Transport', desc: 'Optimized for cost and convenience', icon: '🚙', carbon: 'Medium' }
  ];

  const seasonOptions = [
    { id: 'current', label: 'Current Season', weather: 'Variable', temp: '22-28°C' },
    { id: 'winter', label: 'Winter (Oct-Feb)', weather: 'Pleasant', temp: '15-25°C' },
    { id: 'summer', label: 'Summer (Mar-Jun)', weather: 'Warm', temp: '25-35°C' },
    { id: 'monsoon', label: 'Monsoon (Jul-Sep)', weather: 'Rainy', temp: '20-30°C' }
  ];

  // Simple handlers - no useCallback needed
  const handleInterestToggle = (interestId: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  };

  const handleBudgetChange = (value: number) => {
    setPreferences(prev => ({ ...prev, budget: value }));
  };

  const handleDurationChange = (delta: number) => {
    setPreferences(prev => ({ 
      ...prev, 
      duration: Math.max(1, Math.min(14, prev.duration + delta)) 
    }));
  };

  const handleTravelersChange = (delta: number) => {
    setPreferences(prev => ({ 
      ...prev, 
      travelers: Math.max(1, Math.min(10, prev.travelers + delta)) 
    }));
  };

  const handleTravelStyleChange = (style: string) => {
    setPreferences(prev => ({ ...prev, travelStyle: style as any }));
  };

  const handleAccommodationChange = (accommodation: string) => {
    setPreferences(prev => ({ ...prev, accommodation: accommodation as any }));
  };

  const handleTransportChange = (transport: string) => {
    setPreferences(prev => ({ ...prev, transport: transport as any }));
  };

  const handleSeasonChange = (season: string) => {
    setPreferences(prev => ({ ...prev, season }));
  };

  // Generate itineraries with AI
  const handleGenerateItineraries = async () => {
    setIsGenerating(true);
    setCurrentStep(2);
    
    try {
      const itineraries = await geminiTravelService.generateItinerary(preferences);
      setGeneratedItineraries(itineraries);
      setCurrentStep(3);
    } catch (error) {
      console.error('Error generating itineraries:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const toggleFavorite = (itineraryId: string) => {
    setFavoriteItineraries(prev =>
      prev.includes(itineraryId)
        ? prev.filter(id => id !== itineraryId)
        : [...prev, itineraryId]
    );
  };

  const getEstimatedBudget = () => {
    const basePerDay = 1000;
    const styleMultiplier = travelStyles.find(s => s.id === preferences.travelStyle)?.multiplier || 1;
    return Math.floor(basePerDay * preferences.duration * preferences.travelers * styleMultiplier);
  };

  // Main component render
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-green-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-white/20 p-3 rounded-xl">
                <Sparkles className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold">AI Trip Planner</h1>
                <p className="text-green-100">Discover Jharkhand with intelligent recommendations</p>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-green-100">Destinations</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">10k+</div>
                <div className="text-green-100">Happy Travelers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold">4.8⭐</div>
                <div className="text-green-100">Avg Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Step 1: Preferences */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Basic Preferences */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Compass className="w-6 h-6 text-blue-500 mr-2" />
                Trip Basics
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Duration */}
                <div className="text-center">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Calendar className="w-4 h-4 inline mr-2" />
                    Duration
                  </label>
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => handleDurationChange(-1)}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-3xl font-bold text-green-600 min-w-[4rem]">
                      {preferences.duration}
                    </span>
                    <button
                      onClick={() => handleDurationChange(1)}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{preferences.duration} day{preferences.duration > 1 ? 's' : ''}</p>
                </div>

                {/* Travelers */}
                <div className="text-center">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Users className="w-4 h-4 inline mr-2" />
                    Travelers
                  </label>
                  <div className="flex items-center justify-center space-x-3">
                    <button
                      onClick={() => handleTravelersChange(-1)}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-3xl font-bold text-green-600 min-w-[4rem]">
                      {preferences.travelers}
                    </span>
                    <button
                      onClick={() => handleTravelersChange(1)}
                      className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{preferences.travelers} person{preferences.travelers > 1 ? 's' : ''}</p>
                </div>

                {/* Budget */}
                <div className="text-center">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <IndianRupee className="w-4 h-4 inline mr-2" />
                    Budget
                  </label>
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="500"
                    value={preferences.budget}
                    onChange={(e) => handleBudgetChange(parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-sm text-gray-500 mt-2">
                    <span>₹1K</span>
                    <span className="font-semibold text-green-600">₹{(preferences.budget / 1000).toFixed(0)}K</span>
                    <span>₹50K</span>
                  </div>
                </div>

                {/* Season */}
                <div className="text-center">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    <Sun className="w-4 h-4 inline mr-2" />
                    Season
                  </label>
                  <select
                    value={preferences.season}
                    onChange={(e) => handleSeasonChange(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    {seasonOptions.map(season => (
                      <option key={season.id} value={season.id}>
                        {season.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-sm text-gray-500 mt-2">
                    {seasonOptions.find(s => s.id === preferences.season)?.weather} • {seasonOptions.find(s => s.id === preferences.season)?.temp}
                  </p>
                </div>
              </div>
            </div>

            {/* Interest Selection */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Heart className="w-6 h-6 text-red-500 mr-2" />
                What interests you?
              </h3>
              
              {interestCategories.map((category) => (
                <div key={category.category} className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-800 mb-4">{category.category}</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {category.interests.map((interest) => (
                      <div
                        key={interest.id}
                        onClick={() => handleInterestToggle(interest.id)}
                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                          preferences.interests.includes(interest.id)
                            ? 'border-green-500 bg-green-50 shadow-lg'
                            : 'border-gray-200 bg-gray-50 hover:border-green-300 hover:bg-green-25'
                        }`}
                      >
                        <div className="text-2xl mb-2">{interest.icon}</div>
                        <div className="font-semibold text-gray-900 mb-1">{interest.label}</div>
                        <div className="text-xs text-gray-600">{interest.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Travel Style */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Compass className="w-6 h-6 text-blue-500 mr-2" />
                Choose Your Travel Style
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {travelStyles.map((style) => (
                  <div
                    key={style.id}
                    onClick={() => handleTravelStyleChange(style.id)}
                    className={`p-6 rounded-xl border-2 transition-all text-left cursor-pointer ${
                      preferences.travelStyle === style.id
                        ? 'border-green-500 bg-green-50 shadow-lg'
                        : 'border-gray-200 bg-gray-50 hover:border-green-300'
                    }`}
                  >
                    <div className="text-3xl mb-3">{style.icon}</div>
                    <div className="font-bold text-lg text-gray-900 mb-2">{style.label}</div>
                    <div className="text-sm text-gray-600 mb-3">{style.desc}</div>
                    <div className="text-xs text-green-600 font-semibold">
                      Est. ₹{Math.floor(getEstimatedBudget() * style.multiplier).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advanced Preferences */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Additional Preferences</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Accommodation */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Bed className="w-5 h-5 mr-2 text-blue-500" />
                    Preferred Stay
                  </h4>
                  <div className="space-y-3">
                    {accommodationTypes.map((type) => (
                      <div
                        key={type.id}
                        onClick={() => handleAccommodationChange(type.id)}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          preferences.accommodation === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{type.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">{type.label}</div>
                            <div className="text-sm text-gray-600">{type.desc}</div>
                          </div>
                          {type.sustainability && (
                            <Leaf className="w-4 h-4 text-green-500 ml-auto" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Transport */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4 flex items-center">
                    <Car className="w-5 h-5 mr-2 text-purple-500" />
                    Transport Mode
                  </h4>
                  <div className="space-y-3">
                    {transportOptions.map((option) => (
                      <div
                        key={option.id}
                        onClick={() => handleTransportChange(option.id)}
                        className={`p-4 rounded-lg border-2 transition-all cursor-pointer ${
                          preferences.transport === option.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{option.icon}</span>
                          <div>
                            <div className="font-medium text-gray-900">{option.label}</div>
                            <div className="text-sm text-gray-600">{option.desc}</div>
                          </div>
                          <div className={`ml-auto px-2 py-1 rounded-full text-xs ${
                            option.carbon === 'Low' ? 'bg-green-100 text-green-600' :
                            option.carbon === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {option.carbon} Carbon
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Generate Button */}
            <div className="text-center">
              <button
                onClick={handleGenerateItineraries}
                disabled={preferences.interests.length === 0}
                className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                  preferences.interests.length === 0
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl'
                }`}
              >
                <Sparkles className="w-6 h-6" />
                <span>Generate AI Itineraries</span>
                <Award className="w-6 h-6" />
              </button>
              {preferences.interests.length === 0 && (
                <p className="text-sm text-gray-500 mt-2">Please select at least one interest to continue</p>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 2: Generating */}
        {currentStep === 2 && isGenerating && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <div className="bg-white rounded-xl shadow-lg p-12 max-w-md mx-auto">
              <div className="animate-spin w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-6"></div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Creating Your Perfect Trip</h2>
              <p className="text-gray-600 mb-6">Our AI is analyzing your preferences and crafting personalized itineraries...</p>
              <div className="space-y-2 text-sm text-gray-500">
                <div className="flex items-center justify-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Analyzing preferences</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Loader className="w-4 h-4 animate-spin text-blue-500" />
                  <span>Finding best destinations</span>
                </div>
                <div className="flex items-center justify-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span>Optimizing routes</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Results */}
        {currentStep === 3 && generatedItineraries.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Your AI-Generated Itineraries</h2>
                <p className="text-gray-600">
                  {generatedItineraries.length} personalized itineraries based on your preferences
                </p>
              </div>
              
              <button
                onClick={() => setCurrentStep(1)}
                className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Modify Preferences</span>
              </button>
            </div>

            {/* Itinerary Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {generatedItineraries.map((itinerary, index) => (
                <motion.div
                  key={itinerary.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                >
                  {/* Hero Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={`https://images.unsplash.com/photo-${
                        itinerary.title.toLowerCase().includes('waterfall') ? '1506905925346-21bda4d32df4' :
                        itinerary.title.toLowerCase().includes('cultural') || itinerary.title.toLowerCase().includes('heritage') ? '1582510003544-d39c50d2a4b1' :
                        itinerary.title.toLowerCase().includes('wildlife') || itinerary.title.toLowerCase().includes('safari') ? '1564760055775-d63cdf0d55da' :
                        itinerary.title.toLowerCase().includes('adventure') || itinerary.title.toLowerCase().includes('trek') ? '1551632811-561732d1e306' :
                        itinerary.title.toLowerCase().includes('spiritual') || itinerary.title.toLowerCase().includes('temple') ? '1582510003544-d39c50d2a4b1' :
                        itinerary.title.toLowerCase().includes('nature') || itinerary.title.toLowerCase().includes('forest') ? '1441974231531-c6227db76b6e' :
                        '1506905925346-21bda4d32df4'
                      }?w=600&h=300&fit=crop&q=80`}
                      alt={itinerary.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1">
                        <span className="text-sm font-semibold text-gray-900">{itinerary.duration} Days</span>
                      </div>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4">
                      <h3 className="text-xl font-bold text-white mb-1">{itinerary.title}</h3>
                      <p className="text-white/90 text-sm">{itinerary.description}</p>
                    </div>
                  </div>

                  {/* Card Header */}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            itinerary.difficulty === 'easy' ? 'bg-green-100 text-green-600' :
                            itinerary.difficulty === 'moderate' ? 'bg-yellow-100 text-yellow-600' :
                            'bg-red-100 text-red-600'
                          }`}>
                            {itinerary.difficulty.charAt(0).toUpperCase() + itinerary.difficulty.slice(1)}
                          </span>
                          <span className="flex items-center text-xs text-gray-500">
                            <Clock className="w-3 h-3 mr-1" />
                            {itinerary.duration} days
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 ml-4">
                        <button
                          onClick={() => toggleFavorite(itinerary.id)}
                          className={`p-2 rounded-lg transition-colors ${
                            favoriteItineraries.includes(itinerary.id)
                              ? 'bg-red-100 text-red-500 hover:bg-red-200' 
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${favoriteItineraries.includes(itinerary.id) ? 'fill-current' : ''}`} />
                        </button>
                        
                        <button className="p-2 rounded-lg bg-gray-100 text-gray-400 hover:bg-gray-200 transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Cost and Eco Score */}
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center space-x-1">
                        <IndianRupee className="w-4 h-4 text-green-500" />
                        <span className="text-lg font-bold text-gray-900">
                          ₹{itinerary.estimatedCost.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500">total</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <div className="flex items-center space-x-1">
                          <Leaf className="w-4 h-4 text-green-500" />
                          <span className="text-sm font-medium text-green-600">
                            Eco {itinerary.sustainability.ecoScore}/10
                          </span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">4.8</span>
                        </div>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 mb-2">Highlights:</h4>
                      <div className="space-y-1">
                        {itinerary.highlights.slice(0, 3).map((highlight, idx) => (
                          <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                            <CheckCircle className="w-3 h-3 text-green-500 flex-shrink-0" />
                            <span>{highlight}</span>
                          </div>
                        ))}
                        {itinerary.highlights.length > 3 && (
                          <div className="text-xs text-gray-500">
                            +{itinerary.highlights.length - 3} more highlights
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => setSelectedDetailItinerary(itinerary)}
                      className="w-full inline-flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      <span>View Full Details</span>
                      <Mountain className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Detailed Itinerary Modal */}
      <AnimatePresence>
        {selectedDetailItinerary && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-2 sm:p-4"
            onClick={() => setSelectedDetailItinerary(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-5xl w-full max-h-[95vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fixed Modal Header */}
              <div className="flex-shrink-0 bg-white border-b border-gray-200 p-4 sm:p-6 rounded-t-xl">
                <div className="flex justify-between items-start">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">{selectedDetailItinerary.title}</h3>
                    <p className="text-sm sm:text-base text-gray-600 mt-1">{selectedDetailItinerary.duration} days • ₹{selectedDetailItinerary.estimatedCost.toLocaleString()} total</p>
                  </div>
                  <button
                    onClick={() => setSelectedDetailItinerary(null)}
                    className="ml-4 text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded-lg"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>
              </div>

              {/* Scrollable Modal Content */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
                {/* Complete Day-by-day breakdown */}
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                    Complete Day-by-Day Itinerary
                  </h4>
                  <div className="space-y-6">
                    {selectedDetailItinerary.days.map((day, dayIdx) => (
                      <div key={dayIdx} className="border border-gray-200 rounded-xl overflow-hidden">
                        {/* Day Header */}
                        <div className="bg-gradient-to-r from-green-500 to-blue-500 text-white p-4">
                          <div className="flex justify-between items-center">
                            <div>
                              <h5 className="text-lg font-bold">Day {day.day}: {day.title}</h5>
                              <p className="text-green-100 text-sm">{day.description}</p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">₹{day.estimatedCost.toLocaleString()}</div>
                              <div className="text-xs text-green-100">Daily Budget</div>
                            </div>
                          </div>
                          {day.weather && (
                            <div className="mt-3 flex items-center space-x-4 text-sm">
                              <div className="flex items-center space-x-1">
                                <Thermometer className="w-4 h-4" />
                                <span>{day.weather.temperature}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Sun className="w-4 h-4" />
                                <span>{day.weather.condition}</span>
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Day Content */}
                        <div className="p-4 space-y-4">
                          {/* Activities */}
                          <div>
                            <h6 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Mountain className="w-4 h-4 mr-2 text-orange-500" />
                              Activities & Experiences
                            </h6>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
                              {day.activities.map((activity, actIdx) => (
                                <div key={actIdx} className="bg-blue-50 rounded-lg p-3 sm:p-4 relative overflow-hidden">
                                  {/* Activity Image */}
                                  <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 overflow-hidden rounded-bl-lg">
                                    <img 
                                      src={`https://images.unsplash.com/photo-${
                                        activity.type.toLowerCase().includes('waterfall') ? '1506905925346-21bda4d32df4' :
                                        activity.type.toLowerCase().includes('temple') ? '1582510003544-d39c50d2a4b1' :
                                        activity.type.toLowerCase().includes('wildlife') ? '1564760055775-d63cdf0d55da' :
                                        activity.type.toLowerCase().includes('culture') ? '1549046308-e1c2c6f14f5f' :
                                        activity.type.toLowerCase().includes('food') ? '1555126634-323283e090fa' :
                                        activity.type.toLowerCase().includes('adventure') ? '1551632811-561732d1e306' :
                                        '1506905925346-21bda4d32df4'
                                      }?w=100&h=100&fit=crop&q=80`}
                                      alt={activity.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  
                                  <div className="pr-20">
                                    <div className="flex justify-between items-start mb-2">
                                      <div className="font-semibold text-gray-900 text-sm">{activity.name}</div>
                                    </div>
                                    <p className="text-xs text-gray-600 mb-2">{activity.description}</p>
                                    <div className="flex justify-between items-center text-xs">
                                      <div className="flex items-center space-x-3">
                                        <span className="flex items-center text-gray-500">
                                          <Clock className="w-3 h-3 mr-1" />
                                          {activity.duration}
                                        </span>
                                        <span className="flex items-center text-blue-600 font-medium">
                                          <IndianRupee className="w-3 h-3 mr-1" />
                                          ₹{activity.cost}
                                        </span>
                                      </div>
                                      <div className="flex items-center text-yellow-600">
                                        <Star className="w-3 h-3 mr-1 fill-current" />
                                        <span>{activity.rating}</span>
                                      </div>
                                    </div>
                                    <div className="mt-2 text-xs text-gray-500">
                                      📍 {activity.location} • {activity.bestTime}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Meals */}
                          <div>
                            <h6 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Utensils className="w-4 h-4 mr-2 text-red-500" />
                              Meals & Dining
                            </h6>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {day.meals.map((meal, mealIdx) => (
                                <div key={mealIdx} className="bg-yellow-50 rounded-lg p-3 relative">
                                  <div className="absolute top-2 right-2 w-12 h-12 rounded-lg overflow-hidden">
                                    <img 
                                      src={`https://images.unsplash.com/photo-${
                                        meal.type === 'breakfast' ? '1555126634-323283e090fa' :
                                        meal.type === 'lunch' ? '1556909114-f6e7ad7d3136' :
                                        meal.type === 'dinner' ? '1559847844-69928d105cbb' :
                                        '1555126634-323283e090fa'
                                      }?w=80&h=80&fit=crop&q=80`}
                                      alt={meal.speciality}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="pr-14">
                                    <div className="text-xs font-medium text-gray-900 capitalize">{meal.type}</div>
                                    <div className="text-sm font-semibold text-gray-800">{meal.restaurant}</div>
                                    <div className="text-xs text-gray-600 mb-1">{meal.speciality}</div>
                                    <div className="text-xs text-orange-600 font-medium">₹{meal.cost}</div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Accommodation */}
                          <div>
                            <h6 className="font-semibold text-gray-900 mb-3 flex items-center">
                              <Bed className="w-4 h-4 mr-2 text-purple-500" />
                              Accommodation
                            </h6>
                            <div className="bg-purple-50 rounded-lg p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                                <img 
                                  src={`https://images.unsplash.com/photo-${
                                    day.accommodation.type.toLowerCase().includes('homestay') ? '1520250497591-112f2f40a3a4' :
                                    day.accommodation.type.toLowerCase().includes('hotel') ? '1566073771259-6a8506862ac5' :
                                    day.accommodation.type.toLowerCase().includes('resort') ? '1571003123894-1f0594d2b5d9' :
                                    '1504280390-efb9bb203a6a'
                                  }?w=120&h=120&fit=crop&q=80`}
                                  alt={day.accommodation.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="font-semibold text-gray-900">{day.accommodation.name}</div>
                                <p className="text-sm text-gray-600 mb-1">{day.accommodation.type} • {day.accommodation.location}</p>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                                  <div className="flex items-center space-x-2">
                                    <div className="flex items-center text-yellow-600">
                                      <Star className="w-3 h-3 mr-1 fill-current" />
                                      <span className="text-xs">{day.accommodation.rating}</span>
                                    </div>
                                    {day.accommodation.sustainability && (
                                      <Leaf className="w-3 h-3 text-green-500" />
                                    )}
                                  </div>
                                  <div className="text-purple-600 font-semibold">₹{day.accommodation.cost}</div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {day.accommodation.amenities.slice(0, 3).join(' • ')}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Transport */}
                          {day.transport && day.transport.length > 0 && (
                            <div>
                              <h6 className="font-semibold text-gray-900 mb-3 flex items-center">
                                <Car className="w-4 h-4 mr-2 text-green-500" />
                                Transportation
                              </h6>
                              <div className="space-y-2">
                                {day.transport.map((transport, transportIdx) => (
                                  <div key={transportIdx} className="bg-green-50 rounded-lg p-3 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                                        <Car className="w-4 h-4 text-green-600" />
                                      </div>
                                      <div>
                                        <div className="text-sm font-medium text-gray-900">
                                          {transport.from} → {transport.to}
                                        </div>
                                        <div className="text-xs text-gray-600">
                                          {transport.mode} • {transport.duration}
                                        </div>
                                      </div>
                                    </div>
                                    <div className="text-green-600 font-semibold">₹{transport.cost}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Sustainability info */}
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2 flex items-center">
                    <Globe className="w-4 h-4 mr-2" />
                    Sustainability Impact
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-green-700">Carbon Footprint:</span>
                      <span className="font-medium text-green-900">{selectedDetailItinerary.sustainability.carbonFootprint}</span>
                    </div>
                    <div className="text-green-700">{selectedDetailItinerary.sustainability.localImpact}</div>
                  </div>
                </div>

                {/* Quick recommendations */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Best Time to Visit:</h4>
                  <p className="text-sm text-gray-600">{selectedDetailItinerary.recommendations.bestTimeToVisit}</p>
                </div>
              </div>

              {/* Fixed Action Buttons Footer */}
              <div className="flex-shrink-0 border-t border-gray-200 p-4 sm:p-6 bg-gray-50 rounded-b-xl">
                <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm sm:text-base">
                    <Download className="w-4 h-4" />
                    <span>Download Itinerary</span>
                  </button>
                  <button className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm sm:text-base">
                    <CheckCircle className="w-4 h-4" />
                    <span>Book This Trip</span>
                  </button>
                  <button className="inline-flex items-center justify-center space-x-2 px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CleanSuperEnhancedPlannerPage;