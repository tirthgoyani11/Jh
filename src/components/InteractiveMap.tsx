import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MapPin,
  Star,
  Navigation,
  Mountain,
  TreePine,
  Building2,
  Heart,
  Utensils,
  Clock,
  DollarSign,
  Plus,
  Minus,
  Locate,
  Layers,
  Satellite,
  Map as MapIcon,
  Eye
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

interface InteractiveMapProps {
  places: POIData[];
  selectedCategory: string;
  onPlaceSelect: (place: POIData) => void;
  userLocation?: { lat: number; lng: number };
  className?: string;
}

const InteractiveMap: React.FC<InteractiveMapProps> = ({
  places,
  selectedCategory,
  onPlaceSelect,
  userLocation,
  className = ""
}) => {
  const [selectedPlace, setSelectedPlace] = useState<POIData | null>(null);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite' | 'outdoors'>('streets');
  const [zoom, setZoom] = useState(10);
  const [center, setCenter] = useState({ lat: 23.3441, lng: 85.6194 });

  // Category icons and colors
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'waterfalls': return Mountain;
      case 'wildlife': return TreePine;
      case 'temples': return Building2;
      case 'culture': return Heart;
      case 'food': return Utensils;
      default: return MapPin;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'waterfalls': return 'bg-blue-500';
      case 'wildlife': return 'bg-green-500';
      case 'temples': return 'bg-yellow-500';
      case 'culture': return 'bg-red-500';
      case 'food': return 'bg-orange-500';
      default: return 'bg-gray-500';
    }
  };

  // Filter places by category
  const filteredPlaces = selectedCategory === 'all' 
    ? places 
    : places.filter(place => place.category === selectedCategory);

  // Handle marker click
  const handleMarkerClick = useCallback((place: POIData) => {
    setSelectedPlace(place);
    // Center map on selected place
    setCenter({ lat: place.coordinates.lat, lng: place.coordinates.lng });
    setZoom(Math.max(zoom, 14));
  }, [zoom]);

  // Map styles
  const mapStyles = [
    { id: 'streets', name: 'Streets', icon: MapIcon },
    { id: 'satellite', name: 'Satellite', icon: Satellite },
    { id: 'outdoors', name: 'Outdoors', icon: Mountain }
  ];

  // Calculate marker position based on coordinates (simplified projection)
  const getMarkerPosition = (coords: { lat: number; lng: number }) => {
    const mapBounds = {
      north: 24.0,
      south: 22.5,
      east: 86.0,
      west: 84.5
    };
    
    const x = ((coords.lng - mapBounds.west) / (mapBounds.east - mapBounds.west)) * 100;
    const y = ((mapBounds.north - coords.lat) / (mapBounds.north - mapBounds.south)) * 100;
    
    return {
      left: `${Math.max(5, Math.min(95, x))}%`,
      top: `${Math.max(5, Math.min(95, y))}%`
    };
  };

  // Get background image based on map style
  const getMapBackground = () => {
    switch (mapStyle) {
      case 'satellite':
        return 'linear-gradient(135deg, #1a5f5f 0%, #2d7d7d 50%, #1a5f5f 100%)';
      case 'outdoors':
        return 'linear-gradient(135deg, #22543d 0%, #38a169 50%, #22543d 100%)';
      default:
        return 'linear-gradient(135deg, #e6f3ff 0%, #b3d9ff 50%, #80c5ff 100%)';
    }
  };

  return (
    <div className={`relative ${className}`}>
      {/* Map Container */}
      <div 
        className="w-full h-full rounded-lg overflow-hidden relative"
        style={{ background: getMapBackground() }}
      >
        {/* Map Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-8 grid-rows-6 h-full w-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-gray-700"></div>
            ))}
          </div>
        </div>

        {/* Location Markers */}
        {filteredPlaces.map((place, index) => {
          const IconComponent = getCategoryIcon(place.category);
          const colorClass = getCategoryColor(place.category);
          const position = getMarkerPosition(place.coordinates);
          
          return (
            <motion.div
              key={place.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="absolute cursor-pointer z-10"
              style={position}
              onClick={() => handleMarkerClick(place)}
            >
              {/* Marker */}
              <motion.div
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`w-8 h-8 ${colorClass} rounded-full shadow-lg flex items-center justify-center border-2 border-white relative`}
              >
                <IconComponent className="w-4 h-4 text-white" />
                
                {/* Pulse effect */}
                <div className={`absolute inset-0 ${colorClass} rounded-full animate-ping opacity-30`}></div>
              </motion.div>
              
              {/* Marker Label */}
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                {place.name}
              </div>
            </motion.div>
          );
        })}

        {/* User Location */}
        {userLocation && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute z-20"
            style={getMarkerPosition(userLocation)}
          >
            <div className="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg">
              <div className="w-full h-full bg-blue-400 rounded-full animate-pulse"></div>
            </div>
          </motion.div>
        )}

        {/* Selected Place Popup */}
        <AnimatePresence>
          {selectedPlace && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute top-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 z-30 max-w-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-gray-900">{selectedPlace.name}</h3>
                <button 
                  onClick={() => setSelectedPlace(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center space-x-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-current" />
                  <span>{selectedPlace.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Navigation className="w-3 h-3" />
                  <span>{selectedPlace.distance}km</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>{selectedPlace.timeToVisit}</span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{selectedPlace.description}</p>
              
              <div className="flex space-x-2">
                <button 
                  onClick={() => onPlaceSelect(selectedPlace)}
                  className="flex-1 bg-blue-500 text-white text-sm py-2 px-3 rounded-md hover:bg-blue-600 transition-colors"
                >
                  View Details
                </button>
                <button className="flex-1 bg-gray-100 text-gray-700 text-sm py-2 px-3 rounded-md hover:bg-gray-200 transition-colors">
                  Directions
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2">
        {/* Map Style Selector */}
        <div className="bg-white rounded-lg shadow-lg p-2">
          <div className="grid grid-cols-1 gap-1">
            {mapStyles.map((style) => {
              const IconComponent = style.icon;
              return (
                <button
                  key={style.id}
                  onClick={() => setMapStyle(style.id as any)}
                  className={`p-2 rounded-md text-xs flex items-center space-x-2 transition-colors ${
                    mapStyle === style.id 
                      ? 'bg-blue-100 text-blue-600' 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{style.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute bottom-4 right-4 space-y-2">
        <div className="bg-white rounded-lg shadow-lg p-1">
          <button
            onClick={() => setZoom(Math.min(zoom + 2, 20))}
            className="block w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            onClick={() => setZoom(Math.max(zoom - 2, 1))}
            className="block w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded"
          >
            <Minus className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Map Info */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <div className="text-xs text-gray-600">
          <div className="font-medium text-gray-900 mb-1">
            {filteredPlaces.length} places found
          </div>
          <div>Zoom: {zoom}</div>
          <div>Style: {mapStyle}</div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;