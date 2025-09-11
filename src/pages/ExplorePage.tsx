import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPin, Camera, Navigation, Search, Star, Clock, Mountain, TreePine, Building2, Heart,
  X, Volume2, VolumeX, RotateCcw, Maximize2, Filter, ArrowUpRight, Car, Bus, Train,
  Download, Share2, BookOpen, Bookmark, Play, Pause, Eye, ArrowLeft, ArrowRight,
  ThumbsUp
} from 'lucide-react';

// TypeScript interfaces
interface POIData {
  id: number;
  name: string;
  category: 'waterfalls' | 'wildlife' | 'temples' | 'culture' | 'adventure' | 'food' | 'shopping' | 'accommodation';
  distance: number;
  rating: number;
  reviewCount: number;
  image: string;
  images: string[];
  description: string;
  timeToVisit: string;
  ecoScore: number;
  coordinates: { lat: number; lng: number };
  culturalContent?: {
    hasAR: boolean;
    has360: boolean;
    audioGuide: boolean;
    tribalStory?: string;
    folklore?: string;
  };
  facilities: string[];
  reviews: Review[];
  nearbyStays: string[];
  nearbyEvents: string[];
  transportOptions: TransportOption[];
  bestTimeToVisit: string;
  entryFee: string;
  openHours: string;
}

interface Review {
  id: number;
  userName: string;
  userAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
  images?: string[];
}

interface TransportOption {
  type: 'car' | 'bus' | 'train' | 'auto';
  provider: string;
  duration: string;
  price: string;
  availability: 'available' | 'limited' | 'unavailable';
}

interface Category {
  id: string;
  label: string;
  icon: React.ElementType;
  color: string;
}

const ExplorePage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'map' | 'ar'>('map');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPOI, setSelectedPOI] = useState<POIData | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews' | 'transport' | 'cultural'>('overview');
  const [isArEnabled, setIsArEnabled] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mapLoaded, setMapLoaded] = useState(false);

  const categories: Category[] = [
    { id: 'all', label: 'All', icon: MapPin, color: 'bg-gray-500' },
    { id: 'waterfalls', label: 'Waterfalls', icon: Mountain, color: 'bg-blue-500' },
    { id: 'wildlife', label: 'Wildlife', icon: TreePine, color: 'bg-green-500' },
    { id: 'temples', label: 'Temples', icon: Building2, color: 'bg-yellow-500' },
    { id: 'culture', label: 'Culture', icon: Heart, color: 'bg-red-500' },
  ];

  const nearbyPlaces: POIData[] = [
    {
      id: 1,
      name: "Hundru Falls",
      category: "waterfalls",
      distance: 2.3,
      rating: 4.6,
      reviewCount: 342,
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop"
      ],
      description: "Spectacular 98m waterfall cascading down rocky cliffs surrounded by lush tropical forest. Perfect for nature photography and peaceful retreats.",
      timeToVisit: "2-3 hours",
      ecoScore: 85,
      coordinates: { lat: 23.3441, lng: 85.6194 },
      culturalContent: {
        hasAR: true,
        has360: true,
        audioGuide: true,
        tribalStory: "Sacred to the Munda tribe as 'Hirni Falls' - the place where the deer goddess descended",
        folklore: "Legend says the waterfall was created by Lord Indra's thunderbolt to provide eternal water to the tribal communities"
      },
      facilities: ["Parking", "Viewpoint", "Photography", "Trekking Trail", "Food Stalls"],
      reviews: [
        {
          id: 1,
          userName: "Priya Singh",
          userAvatar: "https://images.unsplash.com/photo-1494790108755-2616b612b1c3?w=100&h=100&fit=crop",
          rating: 5,
          comment: "Absolutely breathtaking! The trek is moderate and the views are worth every step. Best time to visit is during monsoon.",
          date: "2024-01-15",
          helpful: 23,
          images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"]
        },
        {
          id: 2,
          userName: "Rahul Kumar",
          userAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
          rating: 4,
          comment: "Great place for photography. The sound of falling water is therapeutic. Can get crowded on weekends.",
          date: "2024-01-10",
          helpful: 18
        }
      ],
      nearbyStays: ["Forest Lodge Ranchi", "Nature Camp Hundru", "Eco Resort Valley"],
      nearbyEvents: ["Tribal Dance Festival (Feb)", "Photography Workshop (Monthly)"],
      transportOptions: [
        { type: 'car', provider: 'Ola/Uber', duration: '45 min', price: '₹250-350', availability: 'available' },
        { type: 'bus', provider: 'JRTC', duration: '1.5 hr', price: '₹25', availability: 'limited' },
        { type: 'auto', provider: 'Local', duration: '1 hr', price: '₹180', availability: 'available' }
      ],
      bestTimeToVisit: "July to October (Monsoon)",
      entryFee: "₹10 per person",
      openHours: "6:00 AM - 6:00 PM"
    },
    {
      id: 2,
      name: "Betla National Park",
      category: "wildlife",
      distance: 45.2,
      rating: 4.4,
      reviewCount: 156,
      image: "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=400&h=300&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1549366021-9f761d040a94?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1564349683136-77e08dba1ef7?w=800&h=600&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop"
      ],
      description: "First national park of Jharkhand, home to tigers, elephants, leopards, and over 180 bird species in 226 sq km of pristine wilderness.",
      timeToVisit: "Full day",
      ecoScore: 92,
      coordinates: { lat: 23.8659, lng: 84.1917 },
      culturalContent: {
        hasAR: true,
        has360: false,
        audioGuide: true,
        tribalStory: "Known as 'Palamau' by Ho tribals meaning 'land of elephants'",
        folklore: "Ancient hunting grounds of tribal chiefs, now a sanctuary protecting the spirit animals"
      },
      facilities: ["Safari Booking", "Rest House", "Canteen", "Nature Trails", "Watch Tower"],
      reviews: [
        {
          id: 1,
          userName: "Wildlife Enthusiast",
          userAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
          rating: 5,
          comment: "Spotted a tiger family! The morning safari is magical. Guides are knowledgeable about tribal history too.",
          date: "2024-01-20",
          helpful: 31
        }
      ],
      nearbyStays: ["Forest Rest House", "Betla Resort", "Nature Camp"],
      nearbyEvents: ["Wildlife Photography Tour", "Bird Watching Camp"],
      transportOptions: [
        { type: 'car', provider: 'Private', duration: '2.5 hr', price: '₹2500', availability: 'available' },
        { type: 'bus', provider: 'State Transport', duration: '4 hr', price: '₹150', availability: 'available' }
      ],
      bestTimeToVisit: "November to April",
      entryFee: "₹150 + Safari ₹2000",
      openHours: "6:00 AM - 5:00 PM"
    }
  ];

  const filteredPlaces = nearbyPlaces.filter(place => {
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         place.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('User location:', position.coords.latitude, position.coords.longitude);
          // Can be used for map centering in future
        },
        (error) => console.log('Location error:', error)
      );
    }
  };

  const handlePOISelect = (poi: POIData) => {
    setSelectedPOI(poi);
    setDrawerOpen(true);
    setCurrentImageIndex(0);
  };

  const nextImage = () => {
    if (selectedPOI) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedPOI.images.length);
    }
  };

  const prevImage = () => {
    if (selectedPOI) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedPOI.images.length) % selectedPOI.images.length);
    }
  };

  const renderInteractiveMap = () => (
    <div className="relative h-96 bg-gradient-to-br from-jungle-green-100 to-jungle-green-200 rounded-tourism overflow-hidden">
      {/* Map Container (will integrate Mapbox here) */}
      <div className="absolute inset-0 bg-jungle-green-500 opacity-10"></div>
      
      {/* Mock Interactive Map */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center z-10">
          <MapPin className="w-12 h-12 text-jungle-green-600 mx-auto mb-2" />
          <p className="text-jungle-green-700 font-medium">Interactive Map View</p>
          <p className="text-sm text-jungle-green-600 mb-4">Real-time POI discovery</p>
          {!mapLoaded && (
            <button 
              onClick={() => setMapLoaded(true)}
              className="bg-jungle-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-jungle-green-600 transition-colors"
            >
              Load Interactive Map
            </button>
          )}
        </div>
      </div>

      {/* POI Markers */}
      {filteredPlaces.map((place, index) => (
        <motion.div
          key={place.id}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1 }}
          className={`absolute w-6 h-6 rounded-full cursor-pointer transform hover:scale-125 transition-transform ${
            categories.find(c => c.id === place.category)?.color || 'bg-gray-500'
          }`}
          style={{
            top: `${20 + index * 15}%`,
            left: `${15 + index * 20}%`
          }}
          onClick={() => handlePOISelect(place)}
        >
          <div className="absolute -top-8 -left-12 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded opacity-0 hover:opacity-100 transition-opacity whitespace-nowrap">
            {place.name}
          </div>
        </motion.div>
      ))}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button 
          onClick={getUserLocation}
          className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow"
        >
          <Navigation className="w-5 h-5 text-jungle-green-600" />
        </button>
        <button className="bg-white p-2 rounded-lg shadow-md hover:shadow-lg transition-shadow">
          <Search className="w-5 h-5 text-jungle-green-600" />
        </button>
      </div>
    </div>
  );

  const renderARView = () => (
    <div className="space-y-4">
      {/* AR Camera Interface */}
      <div className="relative h-80 bg-gradient-to-br from-gray-800 to-gray-900 rounded-tourism overflow-hidden">
        {!isArEnabled ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center z-10">
              <Camera className="w-16 h-16 text-white mx-auto mb-4" />
              <h3 className="text-white font-semibold text-xl mb-2">AR Cultural Explorer</h3>
              <p className="text-gray-300 text-sm mb-6">Discover hidden stories through your camera</p>
              <button 
                onClick={() => setIsArEnabled(true)}
                className="bg-jungle-green-500 text-white px-6 py-3 rounded-full font-medium hover:bg-jungle-green-600 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Camera className="w-5 h-5" />
                <span>Enable AR Mode</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="relative h-full">
            {/* AR View Simulation */}
            <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
              <div className="text-white text-center">
                <Eye className="w-12 h-12 mx-auto mb-2" />
                <p>AR Camera View Active</p>
                <p className="text-sm opacity-75">Point camera at landmarks</p>
              </div>
            </div>
            
            {/* AR Overlays */}
            {filteredPlaces.slice(0, 3).map((place, index) => (
              <motion.div
                key={place.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.5 }}
                className="absolute bg-jungle-green-500 bg-opacity-90 text-white px-3 py-2 rounded-full text-sm cursor-pointer hover:bg-opacity-100"
                style={{
                  top: `${30 + index * 25}%`,
                  left: `${20 + index * 30}%`
                }}
                onClick={() => handlePOISelect(place)}
              >
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{place.name}</span>
                  <span className="text-xs opacity-75">{place.distance}km</span>
                </div>
              </motion.div>
            ))}
            
            {/* AR Controls */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
              <button 
                onClick={() => setAudioPlaying(!audioPlaying)}
                className="bg-white bg-opacity-20 p-3 rounded-full text-white hover:bg-opacity-30 transition-colors"
              >
                {audioPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </button>
              <button className="bg-white bg-opacity-20 p-3 rounded-full text-white hover:bg-opacity-30 transition-colors">
                <RotateCcw className="w-5 h-5" />
              </button>
              <button 
                onClick={() => setIsArEnabled(false)}
                className="bg-red-500 bg-opacity-80 p-3 rounded-full text-white hover:bg-opacity-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Cultural Content Preview */}
      <div className="bg-white rounded-tourism p-4 border border-gray-100">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center">
          <BookOpen className="w-5 h-5 text-jungle-green-600 mr-2" />
          Cultural Stories Available
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {filteredPlaces.filter(place => place.culturalContent?.hasAR).slice(0, 3).map((place) => (
            <div key={place.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors" onClick={() => handlePOISelect(place)}>
              <img src={place.image} alt={place.name} className="w-12 h-12 rounded object-cover" />
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900">{place.name}</p>
                <p className="text-xs text-gray-600">{place.culturalContent?.tribalStory?.substring(0, 60)}...</p>
              </div>
              <div className="flex items-center space-x-1">
                {place.culturalContent?.hasAR && <Camera className="w-4 h-4 text-jungle-green-600" />}
                {place.culturalContent?.has360 && <Maximize2 className="w-4 h-4 text-blue-600" />}
                {place.culturalContent?.audioGuide && <Volume2 className="w-4 h-4 text-purple-600" />}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPOIList = () => (
    <div className="space-y-3">
      {filteredPlaces.map((place) => (
        <motion.div
          key={place.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-tourism shadow-sm border border-gray-100 p-4 cursor-pointer hover:shadow-md transition-all"
          onClick={() => handlePOISelect(place)}
        >
          <div className="flex space-x-3">
            <img 
              src={place.image} 
              alt={place.name}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1">
              <div className="flex items-start justify-between mb-1">
                <h3 className="font-semibold text-gray-900">{place.name}</h3>
                <div className="flex items-center space-x-1">
                  <Navigation className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">{place.distance}km</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-2 line-clamp-2">{place.description}</p>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-medium">{place.rating}</span>
                    <span className="text-xs text-gray-500">({place.reviewCount})</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{place.timeToVisit}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {place.culturalContent?.hasAR && (
                    <Camera className="w-4 h-4 text-jungle-green-600" />
                  )}
                  {place.culturalContent?.has360 && (
                    <Maximize2 className="w-4 h-4 text-blue-600" />
                  )}
                  <ArrowUpRight className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderPOIDrawer = () => {
    if (!selectedPOI) return null;

    return (
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setDrawerOpen(false)}
            />
            
            {/* Drawer */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              className="fixed bottom-0 left-0 right-0 bg-white rounded-t-2xl z-50 max-h-[85vh] overflow-hidden"
            >
              {/* Handle */}
              <div className="flex justify-center p-3">
                <div className="w-12 h-1 bg-gray-300 rounded-full"></div>
              </div>
              
              {/* Header */}
              <div className="px-4 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-xl font-bold text-gray-900">{selectedPOI.name}</h2>
                  <button 
                    onClick={() => setDrawerOpen(false)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
                
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-medium">{selectedPOI.rating}</span>
                    <span>({selectedPOI.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Navigation className="w-4 h-4 text-blue-500" />
                    <span>{selectedPOI.distance}km away</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TreePine className="w-4 h-4 text-green-500" />
                    <span>Eco Score: {selectedPOI.ecoScore}</span>
                  </div>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="overflow-y-auto" style={{ maxHeight: 'calc(85vh - 120px)' }}>
                {/* Image Gallery */}
                <div className="relative h-64 bg-gray-200">
                  <img 
                    src={selectedPOI.images[currentImageIndex]} 
                    alt={selectedPOI.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {selectedPOI.images.length > 1 && (
                    <>
                      <button 
                        onClick={prevImage}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={nextImage}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-70"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      
                      {/* Image Indicators */}
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
                        {selectedPOI.images.map((_, index) => (
                          <div
                            key={index}
                            className={`w-2 h-2 rounded-full ${
                              index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                  
                  {/* Action Buttons */}
                  <div className="absolute top-2 right-2 flex space-x-2">
                    <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 shadow-sm">
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 shadow-sm">
                      <Bookmark className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="bg-white bg-opacity-90 p-2 rounded-full hover:bg-opacity-100 shadow-sm">
                      <Download className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 px-4">
                  <div className="flex space-x-6 -mb-px">
                    {['overview', 'reviews', 'transport', 'cultural'].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`py-3 px-1 text-sm font-medium border-b-2 transition-colors capitalize ${
                          activeTab === tab
                            ? 'text-jungle-green-600 border-jungle-green-600'
                            : 'text-gray-500 border-transparent hover:text-gray-700'
                        }`}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-4">
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <p className="text-gray-700 leading-relaxed">{selectedPOI.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-gray-900">Best Time:</span>
                          <p className="text-gray-600">{selectedPOI.bestTimeToVisit}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Duration:</span>
                          <p className="text-gray-600">{selectedPOI.timeToVisit}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Entry Fee:</span>
                          <p className="text-gray-600">{selectedPOI.entryFee}</p>
                        </div>
                        <div>
                          <span className="font-medium text-gray-900">Open Hours:</span>
                          <p className="text-gray-600">{selectedPOI.openHours}</p>
                        </div>
                      </div>
                      
                      <div>
                        <span className="font-medium text-gray-900 block mb-2">Facilities:</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedPOI.facilities.map((facility) => (
                            <span key={facility} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'reviews' && (
                    <div className="space-y-4">
                      {/* Review Stats */}
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-gray-900">{selectedPOI.rating}</div>
                            <div className="flex text-yellow-400 justify-center">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`w-4 h-4 ${i < Math.floor(selectedPOI.rating) ? 'fill-current' : ''}`} />
                              ))}
                            </div>
                            <div className="text-sm text-gray-600">{selectedPOI.reviewCount} reviews</div>
                          </div>
                          <div className="flex-1">
                            <button className="w-full bg-jungle-green-500 text-white py-2 rounded-lg font-medium hover:bg-jungle-green-600 transition-colors">
                              Write a Review
                            </button>
                          </div>
                        </div>
                      </div>
                      
                      {/* Reviews List */}
                      <div className="space-y-4">
                        {selectedPOI.reviews.map((review) => (
                          <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                            <div className="flex items-start space-x-3">
                              <img src={review.userAvatar} alt={review.userName} className="w-10 h-10 rounded-full" />
                              <div className="flex-1">
                                <div className="flex items-center space-x-2 mb-1">
                                  <span className="font-medium text-gray-900">{review.userName}</span>
                                  <div className="flex text-yellow-400">
                                    {[...Array(review.rating)].map((_, i) => (
                                      <Star key={i} className="w-3 h-3 fill-current" />
                                    ))}
                                  </div>
                                  <span className="text-sm text-gray-500">{review.date}</span>
                                </div>
                                <p className="text-gray-700 text-sm mb-2">{review.comment}</p>
                                <div className="flex items-center space-x-3 text-sm text-gray-500">
                                  <button className="flex items-center space-x-1 hover:text-jungle-green-600">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>Helpful ({review.helpful})</span>
                                  </button>
                                  <button className="hover:text-gray-700">Reply</button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'transport' && (
                    <div className="space-y-4">
                      <div className="bg-blue-50 rounded-lg p-4">
                        <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                          <Car className="w-5 h-5 text-blue-600 mr-2" />
                          How to Reach
                        </h3>
                        <p className="text-sm text-gray-600">
                          Distance from your location: {selectedPOI.distance}km
                        </p>
                      </div>
                      
                      <div className="space-y-3">
                        {selectedPOI.transportOptions.map((option, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <div className="p-2 bg-gray-100 rounded-lg">
                                {option.type === 'car' && <Car className="w-5 h-5 text-gray-600" />}
                                {option.type === 'bus' && <Bus className="w-5 h-5 text-gray-600" />}
                                {option.type === 'train' && <Train className="w-5 h-5 text-gray-600" />}
                                {option.type === 'auto' && <Navigation className="w-5 h-5 text-gray-600" />}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{option.provider}</p>
                                <p className="text-sm text-gray-600">{option.duration} • {option.price}</p>
                              </div>
                            </div>
                            <button 
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                option.availability === 'available' 
                                  ? 'bg-jungle-green-500 text-white hover:bg-jungle-green-600' 
                                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                              }`}
                              disabled={option.availability !== 'available'}
                            >
                              {option.availability === 'available' ? 'Book Now' : 'Unavailable'}
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTab === 'cultural' && (
                    <div className="space-y-4">
                      {selectedPOI.culturalContent ? (
                        <>
                          {/* Cultural Experience Options */}
                          <div className="grid grid-cols-2 gap-3">
                            {selectedPOI.culturalContent.hasAR && (
                              <button className="flex flex-col items-center p-4 border-2 border-jungle-green-200 rounded-lg hover:border-jungle-green-400 transition-colors">
                                <Camera className="w-8 h-8 text-jungle-green-600 mb-2" />
                                <span className="text-sm font-medium text-jungle-green-700">AR Experience</span>
                              </button>
                            )}
                            {selectedPOI.culturalContent.has360 && (
                              <button className="flex flex-col items-center p-4 border-2 border-blue-200 rounded-lg hover:border-blue-400 transition-colors">
                                <Maximize2 className="w-8 h-8 text-blue-600 mb-2" />
                                <span className="text-sm font-medium text-blue-700">360° Tour</span>
                              </button>
                            )}
                            {selectedPOI.culturalContent.audioGuide && (
                              <button 
                                onClick={() => setAudioPlaying(!audioPlaying)}
                                className="flex flex-col items-center p-4 border-2 border-purple-200 rounded-lg hover:border-purple-400 transition-colors"
                              >
                                {audioPlaying ? <Pause className="w-8 h-8 text-purple-600 mb-2" /> : <Play className="w-8 h-8 text-purple-600 mb-2" />}
                                <span className="text-sm font-medium text-purple-700">Audio Guide</span>
                              </button>
                            )}
                            <button className="flex flex-col items-center p-4 border-2 border-orange-200 rounded-lg hover:border-orange-400 transition-colors">
                              <BookOpen className="w-8 h-8 text-orange-600 mb-2" />
                              <span className="text-sm font-medium text-orange-700">Read More</span>
                            </button>
                          </div>
                          
                          {/* Tribal Story */}
                          {selectedPOI.culturalContent.tribalStory && (
                            <div className="bg-amber-50 rounded-lg p-4">
                              <h4 className="font-semibold text-amber-800 mb-2">Tribal Heritage</h4>
                              <p className="text-amber-700 text-sm leading-relaxed">{selectedPOI.culturalContent.tribalStory}</p>
                            </div>
                          )}
                          
                          {/* Folklore */}
                          {selectedPOI.culturalContent.folklore && (
                            <div className="bg-indigo-50 rounded-lg p-4">
                              <h4 className="font-semibold text-indigo-800 mb-2">Local Folklore</h4>
                              <p className="text-indigo-700 text-sm leading-relaxed">{selectedPOI.culturalContent.folklore}</p>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="text-center py-8">
                          <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                          <p className="text-gray-500">No cultural content available for this location</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    );
  };

  return (
    <div className="pb-20 bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900 mb-3">Explore</h1>
        
        {/* Search Bar */}
        <div className="relative mb-3">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search places..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-jungle-green-500 focus:border-transparent"
          />
        </div>

        {/* View Toggle */}
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setViewMode('map')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'map' 
                ? 'bg-white text-jungle-green-600 shadow-sm' 
                : 'text-gray-600'
            }`}
          >
            <MapPin className="w-4 h-4" />
            <span>Map Mode</span>
          </button>
          <button
            onClick={() => setViewMode('ar')}
            className={`flex-1 flex items-center justify-center space-x-2 py-2 rounded-md text-sm font-medium transition-colors ${
              viewMode === 'ar' 
                ? 'bg-white text-jungle-green-600 shadow-sm' 
                : 'text-gray-600'
            }`}
          >
            <Camera className="w-4 h-4" />
            <span>AR Mode</span>
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="bg-white border-b border-gray-200 p-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category.id
                  ? 'bg-jungle-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <category.icon className="w-4 h-4" />
              <span>{category.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="pb-20">
        {viewMode === 'map' ? (
          <div className="space-y-4 p-4">
            {renderInteractiveMap()}
            <div className="bg-white rounded-tourism p-4 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-gray-900">Places Nearby</h2>
                <span className="text-sm text-gray-500">{filteredPlaces.length} found</span>
              </div>
              {renderPOIList()}
            </div>
          </div>
        ) : (
          <div className="p-4">
            {renderARView()}
          </div>
        )}
      </div>

      {/* POI Details Drawer */}
      {renderPOIDrawer()}

      {/* Quick Action FAB */}
      <div className="fixed bottom-6 right-6 z-30">
        <button className="bg-jungle-green-500 text-white p-4 rounded-full shadow-lg hover:bg-jungle-green-600 transition-colors">
          <Filter className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ExplorePage;
