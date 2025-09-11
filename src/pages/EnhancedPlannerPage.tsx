import React, { useState } from 'react';
import { Calendar, MapPin, Users, Clock, Sparkles, Filter, ChevronDown, ChevronUp, Star, Heart, Share2, BookmarkPlus, Car, Camera, Utensils, Bed, TreePine, Zap, Award, Mountain, Compass, Sun, Moon, Sunrise, IndianRupee } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EnhancedPlannerPage: React.FC = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [budget, setBudget] = useState(5000);
  const [duration, setDuration] = useState(3);
  const [travelers, setTravelers] = useState(2);
  const [travelStyle, setTravelStyle] = useState('moderate');
  const [accommodation, setAccommodation] = useState('homestay');
  const [transport, setTransport] = useState('mixed');
  const [season, setSeason] = useState('current');
  const [generatedItineraries, setGeneratedItineraries] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [expandedItinerary, setExpandedItinerary] = useState<number | null>(null);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const interestTags = [
    { id: 'waterfalls', label: 'Waterfalls', icon: '💧', color: 'bg-blue-500' },
    { id: 'wildlife', label: 'Wildlife', icon: '🦌', color: 'bg-green-500' },
    { id: 'temples', label: 'Temples', icon: '🛕', color: 'bg-orange-500' },
    { id: 'crafts', label: 'Handicrafts', icon: '🎨', color: 'bg-purple-500' },
    { id: 'culture', label: 'Tribal Culture', icon: '🎭', color: 'bg-red-500' },
    { id: 'adventure', label: 'Adventure', icon: '⛰️', color: 'bg-yellow-600' },
    { id: 'photography', label: 'Photography', icon: '📸', color: 'bg-pink-500' },
    { id: 'food', label: 'Local Cuisine', icon: '🍛', color: 'bg-orange-600' },
    { id: 'festivals', label: 'Festivals', icon: '🎪', color: 'bg-indigo-500' },
    { id: 'nature', label: 'Nature Walks', icon: '🌿', color: 'bg-emerald-500' }
  ];

  const travelStyles = [
    { id: 'budget', label: 'Budget Explorer', desc: 'Local transport, basic stays', multiplier: 0.7 },
    { id: 'moderate', label: 'Comfort Seeker', desc: 'Balanced comfort & cost', multiplier: 1.0 },
    { id: 'luxury', label: 'Luxury Traveler', desc: 'Premium experiences', multiplier: 1.5 }
  ];

  const accommodationTypes = [
    { id: 'homestay', label: 'Homestays', desc: 'Authentic local experience', icon: '🏡' },
    { id: 'hotel', label: 'Hotels', desc: 'Comfort & amenities', icon: '🏨' },
    { id: 'resort', label: 'Eco Resorts', desc: 'Luxury in nature', icon: '🌴' },
    { id: 'camping', label: 'Camping', desc: 'Adventure under stars', icon: '⛺' }
  ];

  const transportOptions = [
    { id: 'public', label: 'Public Transport', desc: 'Eco-friendly & budget', icon: '🚌' },
    { id: 'private', label: 'Private Car', desc: 'Convenient & flexible', icon: '🚗' },
    { id: 'mixed', label: 'Mixed Transport', desc: 'Best of both worlds', icon: '🚙' }
  ];

  const seasonOptions = [
    { id: 'current', label: 'Current (Sept)', desc: 'Pleasant weather', temp: '25-30°C' },
    { id: 'winter', label: 'Winter (Dec-Feb)', desc: 'Cool & comfortable', temp: '15-25°C' },
    { id: 'monsoon', label: 'Monsoon (Jun-Sep)', desc: 'Lush & green', temp: '20-28°C' },
    { id: 'summer', label: 'Summer (Mar-May)', desc: 'Warm but clear', temp: '25-35°C' }
  ];

  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest) 
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  const generateItineraries = async () => {
    if (selectedInterests.length === 0) return;
    
    setIsGenerating(true);
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const sampleItineraries = [
      {
        id: 1,
        title: "Waterfall & Nature Explorer",
        description: "Perfect blend of stunning waterfalls and wildlife experiences",
        duration: duration,
        totalCost: Math.round(budget * 0.85),
        ecoScore: 92,
        difficulty: "Easy",
        highlights: ["Hundru Falls", "Jonha Falls", "Betla National Park"],
        rating: 4.8,
        bookings: 245,
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&q=80",
        days: [
          {
            day: 1,
            title: "Ranchi to Hundru Falls",
            activities: [
              { time: "09:00", icon: Car, title: "Departure from Ranchi", desc: "Private car pickup from hotel", duration: "1h", cost: 500 },
              { time: "10:30", icon: Camera, title: "Hundru Falls Photography", desc: "Spectacular 98m waterfall with guided photo session", duration: "3h", cost: 800 },
              { time: "14:00", icon: Utensils, title: "Traditional Lunch", desc: "Authentic Jharkhandi thali at local restaurant", duration: "1h", cost: 400 },
              { time: "16:00", icon: Bed, title: "Check-in Homestay", desc: "Eco-friendly hill view accommodation", duration: "2h", cost: 1200 }
            ],
            transport: "Private Car (45km)",
            accommodation: "Hill View Eco Homestay",
            meals: "Lunch + Traditional dinner included",
            totalCost: 2900,
            weather: "Pleasant, 28°C, Clear skies"
          },
          {
            day: 2,
            title: "Jonha Falls & Nature Trek",
            activities: [
              { time: "07:00", icon: Sunrise, title: "Sunrise Photography", desc: "Golden hour at waterfall viewpoint", duration: "2h", cost: 200 },
              { time: "10:00", icon: Mountain, title: "Trek to Jonha Falls", desc: "Scenic 5km forest trail with nature guide", duration: "4h", cost: 600 },
              { time: "15:00", icon: TreePine, title: "Bird Watching Session", desc: "Spot local species with expert guide", duration: "2h", cost: 400 },
              { time: "19:00", icon: Moon, title: "Cultural Evening", desc: "Folk stories and local music around bonfire", duration: "2h", cost: 300 }
            ],
            transport: "Trekking + Local jeep (15km)",
            accommodation: "Forest Rest House (Government)",
            meals: "All meals + evening snacks",
            totalCost: 1500,
            weather: "Cool morning, warm afternoon, 26°C"
          },
          {
            day: 3,
            title: "Betla Wildlife Safari",
            activities: [
              { time: "06:00", icon: Camera, title: "Morning Tiger Safari", desc: "4-hour guided wildlife safari in open jeep", duration: "4h", cost: 1500 },
              { time: "11:00", icon: Utensils, title: "Jungle Breakfast", desc: "Hot breakfast in the wild", duration: "1h", cost: 300 },
              { time: "14:00", icon: Car, title: "Elephant Safari", desc: "Close encounters with gentle giants", duration: "2h", cost: 800 },
              { time: "17:00", icon: Car, title: "Return Journey", desc: "Comfortable ride back to Ranchi", duration: "3h", cost: 700 }
            ],
            transport: "Safari vehicles + AC car return",
            accommodation: "Return to Ranchi (drop-off included)",
            meals: "Breakfast + packed lunch",
            totalCost: 3300,
            weather: "Early morning cool, pleasant day"
          }
        ],
        inclusions: ["All accommodation", "Daily breakfast", "Transport as per itinerary", "Entry fees", "Local guides", "Photography assistance"],
        exclusions: ["Personal expenses", "Tips to guides", "Travel insurance", "Monuments not mentioned"],
        bestTime: "October to March for optimal weather",
        groupDiscount: "15% off for 4+ travelers",
        cancellation: "Free cancellation up to 48 hours before"
      },
      {
        id: 2,
        title: "Cultural Heritage Deep Dive",
        description: "Immerse yourself in rich tribal culture and traditional crafts",
        duration: duration,
        totalCost: Math.round(budget * 0.75),
        ecoScore: 88,
        difficulty: "Moderate",
        highlights: ["Tribal Villages", "Handicraft Workshops", "Cultural Performances"],
        rating: 4.9,
        bookings: 189,
        image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=400&h=250&fit=crop&q=80",
        days: [
          {
            day: 1,
            title: "Ranchi to Khunti Tribal Village",
            activities: [
              { time: "08:00", icon: Car, title: "Scenic Drive to Khunti", desc: "Journey through picturesque Jharkhand countryside", duration: "2h", cost: 800 },
              { time: "11:00", icon: Users, title: "Traditional Welcome Ceremony", desc: "Authentic Sarhul greeting by village elders", duration: "1h", cost: 500 },
              { time: "14:00", icon: Utensils, title: "Community Cooking Experience", desc: "Prepare traditional dishes with host family", duration: "3h", cost: 600 },
              { time: "18:00", icon: Mountain, title: "Village Walking Tour", desc: "Explore traditional Munda lifestyle", duration: "2h", cost: 300 }
            ],
            transport: "Private AC car (60km scenic route)",
            accommodation: "Authentic Tribal Homestay with modern amenities",
            meals: "All meals with host family + cooking experience",
            totalCost: 2200,
            weather: "Pleasant countryside weather, 27°C"
          }
        ]
      },
      {
        id: 3,
        title: "Adventure & Photography Expedition",
        description: "Perfect for thrill-seekers and photography enthusiasts",
        duration: duration,
        totalCost: Math.round(budget * 0.95),
        ecoScore: 85,
        difficulty: "Challenging",
        highlights: ["Rock Climbing", "Waterfall Rappelling", "Wildlife Photography"],
        rating: 4.7,
        bookings: 156,
        image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=250&fit=crop&q=80"
      }
    ];
    
    setGeneratedItineraries(sampleItineraries);
    setIsGenerating(false);
  };

  const toggleExpandItinerary = (id: number) => {
    setExpandedItinerary(expandedItinerary === id ? null : id);
  };

  return (
    <div className="pb-20 bg-gradient-to-b from-gray-50 to-white">
      {/* Enhanced Header */}
      <div className="bg-gradient-to-r from-jungle-green-500 to-jungle-green-600 p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-white/20 p-3 rounded-xl">
            <Sparkles className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">AI Trip Planner</h1>
            <p className="text-jungle-green-100">Let AI craft your perfect Jharkhand adventure</p>
          </div>
        </div>
        
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold">500+</div>
              <div className="text-xs text-jungle-green-100">Destinations</div>
            </div>
            <div>
              <div className="text-2xl font-bold">10k+</div>
              <div className="text-xs text-jungle-green-100">Happy Travelers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">4.8⭐</div>
              <div className="text-xs text-jungle-green-100">Avg Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        {/* Enhanced Interest Selection */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <div className="flex items-center space-x-2 mb-4">
            <Heart className="w-5 h-5 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-900">What interests you?</h2>
            <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
              {selectedInterests.length}/10 selected
            </span>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            {interestTags.map((interest) => (
              <motion.button
                key={interest.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => toggleInterest(interest.id)}
                className={`p-4 rounded-xl border-2 transition-all duration-300 ${
                  selectedInterests.includes(interest.id)
                    ? `${interest.color} text-white border-transparent shadow-lg transform scale-105`
                    : 'bg-gray-50 text-gray-700 border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-1">{interest.icon}</div>
                <div className="font-medium text-sm">{interest.label}</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Enhanced Budget & Duration */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <IndianRupee className="w-5 h-5 text-green-500" />
            <span>Budget & Duration</span>
          </h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget per person
              </label>
              <div className="relative">
                <input
                  type="range"
                  min="2000"
                  max="15000"
                  step="500"
                  value={budget}
                  onChange={(e) => setBudget(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>₹2K</span>
                  <span>₹15K</span>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-2xl font-bold text-jungle-green-600">₹{budget.toLocaleString()}</span>
                <div className="text-xs text-gray-500">per person</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trip duration
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[2, 3, 4, 5, 6, 7].map((days) => (
                  <button
                    key={days}
                    onClick={() => setDuration(days)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all ${
                      duration === days
                        ? 'bg-jungle-green-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {days}D
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Number of travelers
            </label>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setTravelers(Math.max(1, travelers - 1))}
                className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200"
              >
                -
              </button>
              <span className="text-xl font-semibold w-12 text-center">{travelers}</span>
              <button
                onClick={() => setTravelers(travelers + 1)}
                className="w-10 h-10 rounded-full bg-jungle-green-100 text-jungle-green-600 flex items-center justify-center hover:bg-jungle-green-200"
              >
                +
              </button>
              <div className="ml-4 text-sm text-gray-600">
                Total budget: <span className="font-semibold">₹{(budget * travelers).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Filters Toggle */}
        <div className="mb-6">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="w-full bg-white rounded-xl shadow-sm border border-gray-200 p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Advanced Preferences</span>
              <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">Optional</span>
            </div>
            {showAdvancedFilters ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          <AnimatePresence>
            {showAdvancedFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 mt-3 overflow-hidden"
              >
                <div className="p-6 space-y-6">
                  {/* Travel Style */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Travel Style</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {travelStyles.map((style) => (
                        <button
                          key={style.id}
                          onClick={() => setTravelStyle(style.id)}
                          className={`p-3 rounded-lg text-center transition-all ${
                            travelStyle === style.id
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <div className="font-medium text-sm">{style.label}</div>
                          <div className="text-xs opacity-75">{style.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Accommodation */}
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-3">Preferred Stay</h3>
                    <div className="grid grid-cols-2 gap-3">
                      {accommodationTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setAccommodation(type.id)}
                          className={`p-3 rounded-lg text-left transition-all ${
                            accommodation === type.id
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="text-lg">{type.icon}</span>
                            <span className="font-medium text-sm">{type.label}</span>
                          </div>
                          <div className="text-xs opacity-75">{type.desc}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Transport & Season in same row */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Transport</h3>
                      {transportOptions.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setTransport(option.id)}
                          className={`w-full p-2 rounded-lg text-left mb-2 transition-all ${
                            transport === option.id
                              ? 'bg-orange-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <div className="flex items-center space-x-2">
                            <span>{option.icon}</span>
                            <div>
                              <div className="font-medium text-xs">{option.label}</div>
                              <div className="text-xs opacity-75">{option.desc}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-3">Best Season</h3>
                      {seasonOptions.map((seasonOpt) => (
                        <button
                          key={seasonOpt.id}
                          onClick={() => setSeason(seasonOpt.id)}
                          className={`w-full p-2 rounded-lg text-left mb-2 transition-all ${
                            season === seasonOpt.id
                              ? 'bg-purple-500 text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          <div className="font-medium text-xs">{seasonOpt.label}</div>
                          <div className="text-xs opacity-75">{seasonOpt.temp}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Generate Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={generateItineraries}
          disabled={selectedInterests.length === 0 || isGenerating}
          className={`w-full p-4 rounded-2xl font-semibold text-lg transition-all duration-300 ${
            selectedInterests.length === 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-jungle-green-500 to-jungle-green-600 text-white shadow-lg hover:shadow-xl'
          }`}
        >
          {isGenerating ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>AI is crafting your perfect trip...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <Sparkles className="w-6 h-6" />
              <span>Generate AI Itineraries</span>
            </div>
          )}
        </motion.button>

        {/* Generated Itineraries */}
        <AnimatePresence>
          {generatedItineraries.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 space-y-6"
            >
              <div className="text-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Your AI-Curated Itineraries</h2>
                <p className="text-gray-600">Personalized based on your preferences</p>
              </div>

              {generatedItineraries.map((itinerary, index) => (
                <motion.div
                  key={itinerary.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300"
                >
                  {/* Itinerary Header */}
                  <div className="relative">
                    {itinerary.image && (
                      <img 
                        src={itinerary.image} 
                        alt={itinerary.title}
                        className="w-full h-48 object-cover"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="bg-jungle-green-500 px-3 py-1 rounded-full text-xs font-medium">
                          AI Recommended
                        </span>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{itinerary.rating}</span>
                        </div>
                        <span className="text-xs">({itinerary.bookings} bookings)</span>
                      </div>
                      <h3 className="text-xl font-bold mb-1">{itinerary.title}</h3>
                      <p className="text-sm text-gray-200">{itinerary.description}</p>
                    </div>
                  </div>

                  <div className="p-6">
                    {/* Quick Info */}
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{itinerary.duration} days</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <TreePine className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-600">Eco Score: {itinerary.ecoScore}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mountain className="w-4 h-4 text-gray-500" />
                        <span className="text-sm text-gray-600">{itinerary.difficulty}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <IndianRupee className="w-4 h-4 text-gray-500" />
                        <span className="text-sm font-semibold text-gray-900">₹{itinerary.totalCost.toLocaleString()}</span>
                      </div>
                    </div>

                    {/* Highlights */}
                    <div className="mb-4">
                      <h4 className="font-medium text-gray-900 mb-2">Highlights</h4>
                      <div className="flex flex-wrap gap-2">
                        {itinerary.highlights.map((highlight: string, i: number) => (
                          <span key={i} className="bg-jungle-green-100 text-jungle-green-700 px-3 py-1 rounded-full text-sm">
                            {highlight}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <div className="flex items-center space-x-3">
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                          <Heart className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                          <Share2 className="w-5 h-5 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors">
                          <BookmarkPlus className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => toggleExpandItinerary(itinerary.id)}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors flex items-center space-x-2"
                        >
                          <span>View Details</span>
                          {expandedItinerary === itinerary.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                        <button className="bg-jungle-green-500 text-white px-6 py-2 rounded-lg font-medium hover:bg-jungle-green-600 transition-colors">
                          Book Now
                        </button>
                      </div>
                    </div>

                    {/* Expanded Details */}
                    <AnimatePresence>
                      {expandedItinerary === itinerary.id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="mt-6 pt-6 border-t border-gray-100 overflow-hidden"
                        >
                          <div className="space-y-6">
                            {/* Day-wise Itinerary */}
                            {itinerary.days?.map((day: any, dayIndex: number) => (
                              <div key={dayIndex} className="bg-gray-50 rounded-xl p-4">
                                <div className="flex items-center space-x-3 mb-4">
                                  <div className="bg-jungle-green-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                                    {day.day}
                                  </div>
                                  <div>
                                    <h4 className="font-semibold text-gray-900">{day.title}</h4>
                                    <p className="text-sm text-gray-600">{day.weather}</p>
                                  </div>
                                  <div className="ml-auto text-right">
                                    <div className="font-semibold text-jungle-green-600">₹{day.totalCost}</div>
                                    <div className="text-xs text-gray-500">per person</div>
                                  </div>
                                </div>

                                {/* Activities Timeline */}
                                <div className="space-y-3 ml-5 border-l-2 border-jungle-green-200 pl-4">
                                  {day.activities?.map((activity: any, actIndex: number) => (
                                    <div key={actIndex} className="relative">
                                      <div className="absolute -left-6 w-3 h-3 bg-jungle-green-400 rounded-full border-2 border-white"></div>
                                      <div className="flex items-start space-x-3">
                                        <div className="bg-white p-2 rounded-lg">
                                          <activity.icon className="w-4 h-4 text-jungle-green-600" />
                                        </div>
                                        <div className="flex-1">
                                          <div className="flex items-center justify-between mb-1">
                                            <h5 className="font-medium text-gray-900">{activity.title}</h5>
                                            <div className="text-sm text-gray-500 flex items-center space-x-2">
                                              <span>{activity.time}</span>
                                              <span>•</span>
                                              <span>{activity.duration}</span>
                                            </div>
                                          </div>
                                          <p className="text-sm text-gray-600">{activity.desc}</p>
                                          {activity.cost && (
                                            <p className="text-xs text-jungle-green-600 font-medium mt-1">
                                              ₹{activity.cost} per person
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {/* Day Summary */}
                                <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <span className="text-gray-500">Transport: </span>
                                    <span className="font-medium">{day.transport}</span>
                                  </div>
                                  <div>
                                    <span className="text-gray-500">Stay: </span>
                                    <span className="font-medium">{day.accommodation}</span>
                                  </div>
                                </div>
                              </div>
                            ))}

                            {/* Package Details */}
                            {itinerary.inclusions && (
                              <div className="grid grid-cols-2 gap-4">
                                <div>
                                  <h4 className="font-semibold text-green-700 mb-2">✓ Inclusions</h4>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    {itinerary.inclusions.map((item: string, i: number) => (
                                      <li key={i}>• {item}</li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className="font-semibold text-red-700 mb-2">✗ Exclusions</h4>
                                  <ul className="text-sm text-gray-600 space-y-1">
                                    {itinerary.exclusions?.map((item: string, i: number) => (
                                      <li key={i}>• {item}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EnhancedPlannerPage;
