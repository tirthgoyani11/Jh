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
  BookmarkPlus,
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
  Moon,
  Sunrise,
  Plane,
  Train,
  Bus,
  Loader,
  Download,
  RefreshCw,
  Clock,
  Thermometer,
  Droplets,
  Wind,
  CloudRain,
  Shield,
  Leaf,
  Globe,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Info,
  X
} from 'lucide-react';
import { geminiTravelService } from '../services/aiTravelService';
import type { TravelPreferences, GeneratedItinerary } from '../services/aiTravelService';

const SuperEnhancedPlannerPage: React.FC = () => {
  // Core State
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

  // UI State
  const [generatedItineraries, setGeneratedItineraries] = useState<GeneratedItinerary[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedItinerary, setExpandedItinerary] = useState<number | null>(null);
  const [expandedDay, setExpandedDay] = useState<number | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedItinerary, setSelectedItinerary] = useState<GeneratedItinerary | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [favoriteItineraries, setFavoriteItineraries] = useState<string[]>([]);
  const [comparisonMode, setComparisonMode] = useState(false);
  const [selectedForComparison, setSelectedForComparison] = useState<string[]>([]);

  // Stable references for data to prevent re-renders
  const stableInterestCategories = useMemo(() => [
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
  ], []);

  const stableTravelStyles = useMemo(() => [
    { id: 'budget', label: 'Budget Explorer', desc: 'Local transport, basic stays, authentic experiences', multiplier: 0.7, icon: '🎒' },
    { id: 'moderate', label: 'Comfort Seeker', desc: 'Balanced comfort & cost, mix of experiences', multiplier: 1.0, icon: '🧳' },
    { id: 'luxury', label: 'Luxury Traveler', desc: 'Premium experiences, luxury stays, private transport', multiplier: 1.5, icon: '✈️' }
  ], []);

  const stableAccommodationTypes = useMemo(() => [
    { id: 'homestay', label: 'Homestays', desc: 'Authentic local experience with families', icon: '🏡', sustainability: true },
    { id: 'hotel', label: 'Hotels', desc: 'Comfort & amenities in city centers', icon: '🏨', sustainability: false },
    { id: 'resort', label: 'Eco Resorts', desc: 'Luxury in nature with eco-practices', icon: '🌴', sustainability: true },
    { id: 'camping', label: 'Camping', desc: 'Adventure under stars, close to nature', icon: '⛺', sustainability: true }
  ], []);

  const stableTransportOptions = useMemo(() => [
    { id: 'public', label: 'Public Transport', desc: 'Eco-friendly buses and trains', icon: '🚌', carbon: 'Low' },
    { id: 'private', label: 'Private Car', desc: 'Convenient door-to-door travel', icon: '🚗', carbon: 'High' },
    { id: 'mixed', label: 'Mixed Transport', desc: 'Optimized for cost and convenience', icon: '🚙', carbon: 'Medium' }
  ], []);

  const stableSeasonOptions = useMemo(() => [
    { id: 'current', label: 'Current Season', weather: 'Variable', temp: '22-28°C' },
    { id: 'winter', label: 'Winter (Oct-Feb)', weather: 'Pleasant', temp: '15-25°C' },
    { id: 'summer', label: 'Summer (Mar-Jun)', weather: 'Warm', temp: '25-35°C' },
    { id: 'monsoon', label: 'Monsoon (Jul-Sep)', weather: 'Rainy', temp: '20-30°C' }
  ], []);

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
      // You could show an error message here
    } finally {
      setIsGenerating(false);
    }
  };

  // Performance-optimized handlers
  const handleInterestToggle = useCallback((interestId: string) => {
    setPreferences(prev => ({
      ...prev,
      interests: prev.interests.includes(interestId)
        ? prev.interests.filter(id => id !== interestId)
        : [...prev.interests, interestId]
    }));
  }, []);

  const handleBudgetChange = useCallback((value: number) => {
    setPreferences(prev => ({ ...prev, budget: value }));
  }, []);

  const handleDurationChange = useCallback((delta: number) => {
    setPreferences(prev => ({ 
      ...prev, 
      duration: Math.max(1, Math.min(14, prev.duration + delta)) 
    }));
  }, []);

  const handleTravelersChange = useCallback((delta: number) => {
    setPreferences(prev => ({ 
      ...prev, 
      travelers: Math.max(1, Math.min(10, prev.travelers + delta)) 
    }));
  }, []);

  const handleTravelStyleChange = useCallback((style: string) => {
    setPreferences(prev => ({ ...prev, travelStyle: style as any }));
  }, []);

  const handleAccommodationChange = useCallback((accommodation: string) => {
    setPreferences(prev => ({ ...prev, accommodation: accommodation as any }));
  }, []);

  const handleTransportChange = useCallback((transport: string) => {
    setPreferences(prev => ({ ...prev, transport: transport as any }));
  }, []);

  const handleSeasonChange = useCallback((season: string) => {
    setPreferences(prev => ({ ...prev, season }));
  }, []);

  const handleAccessibilityChange = useCallback((checked: boolean) => {
    setPreferences(prev => ({ ...prev, accessibility: checked }));
  }, []);

  // Memoized Basic Preferences Section
  const BasicPreferences = memo(() => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Duration */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center mb-4">
          <Calendar className="w-5 h-5 text-blue-500 mr-2" />
          <label className="font-semibold text-gray-900">Duration</label>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleDurationChange(-1)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all duration-150 active:scale-95"
          >
            -
          </button>
          <span className="text-2xl font-bold text-green-600 min-w-[3rem] text-center transition-all duration-200">
            {preferences.duration}
          </span>
          <button
            onClick={() => handleDurationChange(1)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all duration-150 active:scale-95"
          >
            +
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">{preferences.duration} day{preferences.duration > 1 ? 's' : ''}</p>
      </div>

      {/* Travelers */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center mb-4">
          <Users className="w-5 h-5 text-purple-500 mr-2" />
          <label className="font-semibold text-gray-900">Travelers</label>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleTravelersChange(-1)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all duration-150 active:scale-95"
          >
            -
          </button>
          <span className="text-2xl font-bold text-green-600 min-w-[3rem] text-center transition-all duration-200">
            {preferences.travelers}
          </span>
          <button
            onClick={() => handleTravelersChange(1)}
            className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all duration-150 active:scale-95"
          >
            +
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-2">{preferences.travelers} person{preferences.travelers > 1 ? 's' : ''}</p>
      </div>

      {/* Budget */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center mb-4">
          <IndianRupee className="w-5 h-5 text-green-500 mr-2" />
          <label className="font-semibold text-gray-900">Budget</label>
        </div>
        <input
          type="range"
          min="1000"
          max="50000"
          step="500"
          value={preferences.budget}
          onChange={(e) => handleBudgetChange(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider transition-all duration-200 hover:bg-gray-300"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>₹1K</span>
          <span className="font-semibold text-green-600 transition-all duration-200">₹{(preferences.budget / 1000).toFixed(0)}K</span>
          <span>₹50K</span>
        </div>
      </div>

      {/* Season */}
      <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
        <div className="flex items-center mb-4">
          <Sun className="w-5 h-5 text-yellow-500 mr-2" />
          <label className="font-semibold text-gray-900">Season</label>
        </div>
        <select
          value={preferences.season}
          onChange={(e) => handleSeasonChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
        >
          {stableSeasonOptions.map(season => (
            <option key={season.id} value={season.id}>
              {season.label}
            </option>
          ))}
        </select>
        <p className="text-sm text-gray-500 mt-2">
          {stableSeasonOptions.find(s => s.id === preferences.season)?.weather} • {stableSeasonOptions.find(s => s.id === preferences.season)?.temp}
        </p>
      </div>
    </div>
  ));

  // Memoized Interest Selection Section
  const InterestSelection = memo(() => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Heart className="w-6 h-6 text-red-500 mr-2" />
        What interests you?
      </h3>
      
      {stableInterestCategories.map((category, categoryIndex) => (
        <div key={category.category} className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">{category.category}</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {category.interests.map((interest) => (
              <InterestButton
                key={interest.id}
                interest={interest}
                isSelected={preferences.interests.includes(interest.id)}
                onToggle={() => handleInterestToggle(interest.id)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  ));

  // Memoized Travel Style Section
  const TravelStyleSelection = memo(() => (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
        <Compass className="w-6 h-6 text-blue-500 mr-2" />
        Choose Your Travel Style
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stableTravelStyles.map((style) => (
          <TravelStyleButton
            key={style.id}
            style={style}
            isSelected={preferences.travelStyle === style.id}
            onSelect={() => handleTravelStyleChange(style.id)}
            estimatedBudget={getEstimatedBudget()}
          />
        ))}
      </div>
    </div>
  ));

  // Handle favorites
  const toggleFavorite = useCallback((itineraryId: string) => {
    setFavoriteItineraries(prev =>
      prev.includes(itineraryId)
        ? prev.filter(id => id !== itineraryId)
        : [...prev, itineraryId]
    );
  }, []);

  // Calculate estimated budget
  const getEstimatedBudget = useCallback(() => {
    const basePerDay = 1000;
    const styleMultiplier = stableTravelStyles.find(s => s.id === preferences.travelStyle)?.multiplier || 1;
    return Math.floor(basePerDay * preferences.duration * preferences.travelers * styleMultiplier);
  }, [preferences.travelStyle, preferences.duration, preferences.travelers, stableTravelStyles]);

  // Memoized Interest Button Component - No Motion
  const InterestButton = memo(({ 
    interest, 
    isSelected, 
    onToggle 
  }: { 
    interest: any; 
    isSelected: boolean; 
    onToggle: () => void; 
  }) => (
    <div
      onClick={onToggle}
      className={`p-4 rounded-xl border-2 transition-all duration-100 cursor-pointer ${
        isSelected
          ? 'border-green-500 bg-green-50 shadow-lg'
          : 'border-gray-200 bg-gray-50 hover:border-green-300 hover:bg-green-25'
      }`}
    >
      <div className="text-2xl mb-2">{interest.icon}</div>
      <div className="font-semibold text-gray-900 mb-1">{interest.label}</div>
      <div className="text-xs text-gray-600">{interest.description}</div>
    </div>
  ));

  // Memoized Travel Style Button Component - No Motion
  const TravelStyleButton = memo(({ 
    style, 
    isSelected, 
    onSelect,
    estimatedBudget 
  }: { 
    style: any; 
    isSelected: boolean; 
    onSelect: () => void;
    estimatedBudget: number;
  }) => (
    <div
      onClick={onSelect}
      className={`p-6 rounded-xl border-2 transition-all duration-100 text-left cursor-pointer ${
        isSelected
          ? 'border-green-500 bg-green-50 shadow-lg'
          : 'border-gray-200 bg-gray-50 hover:border-green-300'
      }`}
    >
      <div className="text-3xl mb-3">{style.icon}</div>
      <div className="font-bold text-lg text-gray-900 mb-2">{style.label}</div>
      <div className="text-sm text-gray-600 mb-3">{style.desc}</div>
      <div className="text-xs text-green-600 font-semibold">
        Est. ₹{Math.floor(estimatedBudget * style.multiplier).toLocaleString()}
      </div>
    </div>
  ));

  // Memoized callbacks for itinerary interactions
  const handleToggleFavorite = useCallback((itineraryId: string) => {
    toggleFavorite(itineraryId);
  }, [toggleFavorite]);

  const handleToggleExpand = useCallback((index: number) => {
    setExpandedItinerary(expandedItinerary === index ? null : index);
  }, [expandedItinerary]);

  // Itinerary Results Component - Memoized
  const ItineraryResults = memo(() => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header with controls */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-4 md:space-y-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Your AI-Generated Itineraries</h2>
          <p className="text-gray-600">
            {generatedItineraries.length} personalized itineraries based on your preferences
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button
            onClick={() => setCurrentStep(1)}
            className="inline-flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Modify Preferences</span>
          </button>
          
          <button
            onClick={() => setComparisonMode(!comparisonMode)}
            className={`inline-flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              comparisonMode 
                ? 'bg-blue-500 text-white'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Compare</span>
          </button>
        </div>
      </div>

      {/* Itinerary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {generatedItineraries.map((itinerary, index) => (
            <ItineraryCard 
              key={itinerary.id} 
              itinerary={itinerary} 
              index={index}
              isFavorite={favoriteItineraries.includes(itinerary.id)}
              onToggleFavorite={() => handleToggleFavorite(itinerary.id)}
              isExpanded={expandedItinerary === index}
              onToggleExpand={() => handleToggleExpand(index)}
            />
        ))}
      </div>

      {/* Detailed View */}
      {selectedItinerary && (
        <DetailedItineraryView 
          itinerary={selectedItinerary} 
          onClose={() => setSelectedItinerary(null)} 
        />
      )}
    </motion.div>
  ));

  // Individual Itinerary Card Component - Memoized
  const ItineraryCard = memo(({ 
    itinerary, 
    index, 
    isFavorite, 
    onToggleFavorite, 
    isExpanded, 
    onToggleExpand 
  }: {
    itinerary: GeneratedItinerary;
    index: number;
    isFavorite: boolean;
    onToggleFavorite: () => void;
    isExpanded: boolean;
    onToggleExpand: () => void;
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Card Header */}
      <div className="p-6 pb-4">
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
            <h3 className="text-xl font-bold text-gray-900 mb-2">{itinerary.title}</h3>
            <p className="text-gray-600 text-sm line-clamp-2">{itinerary.description}</p>
          </div>
          
          <div className="flex space-x-2 ml-4">
            <button
              onClick={onToggleFavorite}
              className={`p-2 rounded-lg transition-colors ${
                isFavorite 
                  ? 'bg-red-100 text-red-500 hover:bg-red-200' 
                  : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
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
                <span className="line-clamp-1">{highlight}</span>
              </div>
            ))}
            {itinerary.highlights.length > 3 && (
              <div className="text-xs text-gray-500">
                +{itinerary.highlights.length - 3} more highlights
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-3">
          <button
            onClick={onToggleExpand}
            className="flex-1 inline-flex items-center justify-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
          >
            <span>{isExpanded ? 'Less Details' : 'View Details'}</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          <button
            onClick={() => setSelectedItinerary(itinerary)}
            className="px-4 py-2 border border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors"
          >
            Select
          </button>
        </div>
      </div>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="border-t border-gray-200 overflow-hidden"
          >
            <div className="p-6 pt-4 space-y-4">
              {/* Day-by-day breakdown */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Daily Itinerary:</h4>
                <div className="space-y-3">
                  {itinerary.days.slice(0, 3).map((day, dayIdx) => (
                    <div key={dayIdx} className="flex space-x-3 text-sm">
                      <div className="flex-shrink-0 w-6 h-6 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-xs font-medium">
                        {day.day}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{day.title}</div>
                        <div className="text-gray-600 line-clamp-1">{day.description}</div>
                        <div className="text-gray-500 text-xs mt-1">
                          {day.activities.length} activities • ₹{day.estimatedCost}
                        </div>
                      </div>
                    </div>
                  ))}
                  {itinerary.days.length > 3 && (
                    <div className="text-center">
                      <button 
                        onClick={() => setSelectedItinerary(itinerary)}
                        className="text-sm text-green-600 hover:text-green-700 font-medium"
                      >
                        View all {itinerary.days.length} days →
                      </button>
                    </div>
                  )}
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
                    <span className="font-medium text-green-900">{itinerary.sustainability.carbonFootprint}</span>
                  </div>
                  <div className="text-green-700">{itinerary.sustainability.localImpact}</div>
                </div>
              </div>

              {/* Quick recommendations */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Best Time to Visit:</h4>
                <p className="text-sm text-gray-600">{itinerary.recommendations.bestTimeToVisit}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  ));

  // Detailed Itinerary View Component (Modal-like)
  const DetailedItineraryView = ({ 
    itinerary, 
    onClose 
  }: { 
    itinerary: GeneratedItinerary; 
    onClose: () => void; 
  }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-500 to-blue-500 text-white">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold mb-2">{itinerary.title}</h2>
              <p className="text-green-100">{itinerary.description}</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white bg-opacity-20 hover:bg-opacity-30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="p-6 space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Calendar className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="font-bold text-gray-900">{itinerary.duration}</div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
              <div className="text-center p-4 bg-blue-50 rounded-lg">
                <IndianRupee className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                <div className="font-bold text-gray-900">₹{itinerary.estimatedCost.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Total Cost</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg">
                <Star className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                <div className="font-bold text-gray-900">{itinerary.difficulty}</div>
                <div className="text-sm text-gray-600">Difficulty</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg">
                <Leaf className="w-6 h-6 text-green-500 mx-auto mb-2" />
                <div className="font-bold text-gray-900">{itinerary.sustainability.ecoScore}/10</div>
                <div className="text-sm text-gray-600">Eco Score</div>
              </div>
            </div>

            {/* Day by Day Breakdown */}
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Daily Itinerary</h3>
              <div className="space-y-4">
                {itinerary.days.map((day, dayIdx) => (
                  <div key={dayIdx} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setExpandedDay(expandedDay === dayIdx ? null : dayIdx)}
                      className="w-full p-4 bg-gray-50 text-left hover:bg-gray-100 transition-colors"
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h4 className="font-semibold text-gray-900">{day.title}</h4>
                          <p className="text-sm text-gray-600 mt-1">{day.description}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">₹{day.estimatedCost}</span>
                          {expandedDay === dayIdx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </div>
                      </div>
                    </button>
                    
                    <AnimatePresence>
                      {expandedDay === dayIdx && (
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: 'auto' }}
                          exit={{ height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 border-t border-gray-200 space-y-4">
                            {/* Activities */}
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Activities:</h5>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {day.activities.map((activity, actIdx) => (
                                  <div key={actIdx} className="p-3 bg-blue-50 rounded-lg">
                                    <div className="flex justify-between items-start mb-1">
                                      <span className="font-medium text-gray-900">{activity.name}</span>
                                      <span className="text-sm text-blue-600">₹{activity.cost}</span>
                                    </div>
                                    <div className="text-sm text-gray-600 mb-2">{activity.description}</div>
                                    <div className="flex items-center justify-between text-xs text-gray-500">
                                      <span>{activity.duration}</span>
                                      <span className="flex items-center">
                                        <Star className="w-3 h-3 text-yellow-500 mr-1" />
                                        {activity.rating}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Meals */}
                            <div>
                              <h5 className="font-medium text-gray-900 mb-2">Meals:</h5>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                {day.meals.map((meal, mealIdx) => (
                                  <div key={mealIdx} className="p-3 bg-orange-50 rounded-lg">
                                    <div className="font-medium text-gray-900 capitalize">{meal.type}</div>
                                    <div className="text-sm text-gray-600">{meal.restaurant}</div>
                                    <div className="text-sm text-orange-600">₹{meal.cost} • {meal.speciality}</div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            {/* Accommodation */}
                            <div className="p-3 bg-purple-50 rounded-lg">
                              <h5 className="font-medium text-gray-900 mb-1">Accommodation:</h5>
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{day.accommodation.name}</div>
                                  <div className="text-xs text-gray-600">{day.accommodation.location}</div>
                                </div>
                                <div className="text-sm text-purple-600">₹{day.accommodation.cost}/night</div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">What to Pack:</h3>
                <div className="space-y-2">
                  {itinerary.recommendations.whatToPack.map((item, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-600">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Local Tips:</h3>
                <div className="space-y-2">
                  {itinerary.recommendations.localTips.slice(0, 4).map((tip, idx) => (
                    <div key={idx} className="flex items-start space-x-2 text-sm text-gray-600">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4 border-t border-gray-200">
              <button className="flex-1 bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition-colors font-medium">
                Book This Itinerary
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Download className="w-4 h-4 inline mr-2" />
                Download PDF
              </button>
              <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                <Share2 className="w-4 h-4 inline mr-2" />
                Share
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  // Step 1: Memoized Preferences Form
  const PreferencesForm = memo(() => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-full mb-4"
        >
          <Sparkles className="w-5 h-5" />
          <span className="font-semibold">AI-Powered Planner</span>
        </motion.div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Plan Your Perfect Jharkhand Journey</h1>
        <p className="text-xl text-gray-600">Let our AI create personalized itineraries based on your preferences</p>
      </div>

      {/* Basic Preferences */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Duration */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center mb-4">
            <Calendar className="w-5 h-5 text-blue-500 mr-2" />
            <label className="font-semibold text-gray-900">Duration</label>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleDurationChange(-1)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all duration-150 active:scale-95"
            >
              -
            </button>
            <span className="text-2xl font-bold text-green-600 min-w-[3rem] text-center transition-all duration-200">
              {preferences.duration}
            </span>
            <button
              onClick={() => handleDurationChange(1)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all duration-150 active:scale-95"
            >
              +
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">{preferences.duration} day{preferences.duration > 1 ? 's' : ''}</p>
        </div>

        {/* Travelers */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center mb-4">
            <Users className="w-5 h-5 text-purple-500 mr-2" />
            <label className="font-semibold text-gray-900">Travelers</label>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => handleTravelersChange(-1)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all duration-150 active:scale-95"
            >
              -
            </button>
            <span className="text-2xl font-bold text-green-600 min-w-[3rem] text-center transition-all duration-200">
              {preferences.travelers}
            </span>
            <button
              onClick={() => handleTravelersChange(1)}
              className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-all duration-150 active:scale-95"
            >
              +
            </button>
          </div>
          <p className="text-sm text-gray-500 mt-2">{preferences.travelers} person{preferences.travelers > 1 ? 's' : ''}</p>
        </div>

        {/* Budget */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center mb-4">
            <IndianRupee className="w-5 h-5 text-green-500 mr-2" />
            <label className="font-semibold text-gray-900">Budget</label>
          </div>
          <input
            type="range"
            min="1000"
            max="50000"
            step="500"
            value={preferences.budget}
            onChange={(e) => handleBudgetChange(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider transition-all duration-200 hover:bg-gray-300"
          />
          <div className="flex justify-between text-sm text-gray-500 mt-2">
            <span>₹1K</span>
            <span className="font-semibold text-green-600 transition-all duration-200">₹{(preferences.budget / 1000).toFixed(0)}K</span>
            <span>₹50K</span>
          </div>
        </div>

        {/* Season */}
        <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
          <div className="flex items-center mb-4">
            <Sun className="w-5 h-5 text-yellow-500 mr-2" />
            <label className="font-semibold text-gray-900">Season</label>
          </div>
          <select
            value={preferences.season}
            onChange={(e) => handleSeasonChange(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200"
          >
          {stableSeasonOptions.map(season => (
              <option key={season.id} value={season.id}>
                {season.label}
              </option>
            ))}
          </select>
          <p className="text-sm text-gray-500 mt-2">
          {stableSeasonOptions.find(s => s.id === preferences.season)?.weather} • {stableSeasonOptions.find(s => s.id === preferences.season)?.temp}
          </p>
        </div>
      </div>

      {/* Interest Selection */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Heart className="w-6 h-6 text-red-500 mr-2" />
          What interests you?
        </h3>
        
        {stableInterestCategories.map((category, categoryIndex) => (
          <div key={category.category} className="mb-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">{category.category}</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {category.interests.map((interest) => (
                <InterestButton
                  key={interest.id}
                  interest={interest}
                  isSelected={preferences.interests.includes(interest.id)}
                  onToggle={() => handleInterestToggle(interest.id)}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Travel Style Selection */}
      <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
          <Compass className="w-6 h-6 text-blue-500 mr-2" />
          Choose Your Travel Style
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stableTravelStyles.map((style: any) => (
            <TravelStyleButton
              key={style.id}
              style={style}
              isSelected={preferences.travelStyle === style.id}
              onSelect={() => handleTravelStyleChange(style.id)}
              estimatedBudget={getEstimatedBudget()}
            />
          ))}
        </div>
      </div>

      {/* Advanced Options */}
      <motion.div
        initial={false}
        animate={{ height: showAdvancedFilters ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Accommodation */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Bed className="w-5 h-5 text-indigo-500 mr-2" />
                Accommodation Preference
              </h4>
              <div className="space-y-3">
                {stableAccommodationTypes.map((acc: any) => (
                  <label key={acc.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="accommodation"
                      value={acc.id}
                      checked={preferences.accommodation === acc.id}
                      onChange={(e) => handleAccommodationChange(e.target.value)}
                      className="text-green-500 focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{acc.icon}</span>
                        <span className="font-medium text-gray-900">{acc.label}</span>
                        {acc.sustainability && (
                          <div title="Eco-friendly">
                            <Leaf className="w-4 h-4 text-green-500" />
                          </div>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">{acc.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Transport */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Car className="w-5 h-5 text-blue-500 mr-2" />
                Transportation
              </h4>
              <div className="space-y-3">
                {stableTransportOptions.map((transport: any) => (
                  <label key={transport.id} className="flex items-center space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="transport"
                      value={transport.id}
                      checked={preferences.transport === transport.id}
                      onChange={(e) => handleTransportChange(e.target.value)}
                      className="text-green-500 focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{transport.icon}</span>
                        <span className="font-medium text-gray-900">{transport.label}</span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          transport.carbon === 'Low' ? 'bg-green-100 text-green-600' :
                          transport.carbon === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-red-100 text-red-600'
                        }`}>
                          {transport.carbon} Carbon
                        </span>
                      </div>
                      <div className="text-sm text-gray-600">{transport.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Additional Preferences */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Additional Preferences</h4>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={preferences.accessibility}
                  onChange={(e) => setPreferences(prev => ({ ...prev, accessibility: e.target.checked }))}
                  className="text-green-500 focus:ring-green-500"
                />
                <span className="text-sm text-gray-700">Accessibility requirements</span>
              </label>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Advanced Toggle Button */}
      <div className="text-center">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="inline-flex items-center space-x-2 text-green-600 hover:text-green-700 font-medium"
        >
          <Filter className="w-4 h-4" />
          <span>{showAdvancedFilters ? 'Hide' : 'Show'} Advanced Options</span>
          {showAdvancedFilters ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {/* Generate Button */}
      <div className="text-center">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleGenerateItineraries}
          disabled={preferences.interests.length === 0}
          className={`inline-flex items-center space-x-3 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
            preferences.interests.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-blue-500 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          <Sparkles className="w-6 h-6" />
          <span>Generate AI Itineraries</span>
          <span className="bg-white/20 px-2 py-1 rounded-lg text-sm">
            {preferences.interests.length} interests
          </span>
        </motion.button>
        {preferences.interests.length === 0 && (
          <p className="text-sm text-gray-500 mt-2">Please select at least one interest to continue</p>
        )}
      </div>
    </motion.div>
  ));

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="preferences"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              <PreferencesForm />
            </motion.div>
          )}
          
          {currentStep === 2 && (
            <motion.div
              key="generating"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6"
              >
                <Loader className="w-full h-full text-green-500" />
              </motion.div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Crafting Your Perfect Journey
              </h2>
              <p className="text-gray-600 text-lg mb-8">
                Our AI is analyzing your preferences to create personalized itineraries...
              </p>
              <div className="flex justify-center space-x-8 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Analyzing preferences</span>
                </div>
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </motion.div>
                  <span>Generating itineraries</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-blue-500" />
                  <span>Optimizing routes</span>
                </div>
              </div>
            </motion.div>
          )}
          
          {currentStep === 3 && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ItineraryResults />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SuperEnhancedPlannerPage;