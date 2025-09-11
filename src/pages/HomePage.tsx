import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, TreePine, Landmark, Church, Plus, Thermometer, Wind, Sparkles, Calendar, MapPin, Clock, Star, ArrowRight, Users, Camera, Heart, Zap, Award, Waves, Mountain, Compass, Gift } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const HomePage: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [weatherData, setWeatherData] = useState({
    temperature: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12
  });

  const heroSlides = [
    {
      id: 1,
      title: "Discover Netarhat",
      subtitle: "Queen of Chotanagpur",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=400&fit=crop",
      cta: "Explore Now"
    },
    {
      id: 2,
      title: "Festivals in September",
      subtitle: "Tribal Cultural Heritage",
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=800&h=400&fit=crop",
      cta: "View Events"
    },
    {
      id: 3,
      title: "Jharkhand Eco Trails",
      subtitle: "Sustainable Tourism",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
      cta: "Plan Journey"
    }
  ];

  const quickAccessCards = [
    {
      id: 'eco',
      title: 'Eco Tourism',
      icon: <TreePine className="w-8 h-8" />,
      description: 'Waterfalls, forests & wildlife',
      color: 'bg-green-500',
      bgColor: 'bg-green-50',
      textColor: 'text-green-700'
    },
    {
      id: 'culture',
      title: 'Culture & Heritage',
      icon: <Landmark className="w-8 h-8" />,
      description: 'Tribal art & traditions',
      color: 'bg-terracotta-500',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700'
    },
    {
      id: 'pilgrimage',
      title: 'Pilgrimage',
      icon: <Church className="w-8 h-8" />,
      description: 'Sacred temples & sites',
      color: 'bg-warm-yellow-500',
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-700'
    }
  ];

  const suggestedTrips = [
    {
      id: 1,
      title: "3-Day Eco Circuit",
      places: "Hundru Falls • Jonha Falls • Netarhat",
      duration: "3 Days",
      budget: "₹4,500",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=200&fit=crop"
    },
    {
      id: 2,
      title: "Cultural Heritage Tour",
      places: "Ranchi • Khunti • Saraikela",
      duration: "4 Days", 
      budget: "₹6,200",
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=200&fit=crop"
    },
    {
      id: 3,
      title: "Pilgrimage Journey",
      places: "Baidyanath • Rajrappa • Itkhori",
      duration: "2 Days",
      budget: "₹3,800",
      image: "https://images.unsplash.com/photo-1580077135843-85d9c4b25ecf?w=300&h=200&fit=crop"
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Sarhul Festival",
      date: "March 15-17",
      location: "Khunti",
      image: "https://images.unsplash.com/photo-1533929736458-ca588d08c8be?w=300&h=150&fit=crop"
    },
    {
      id: 2,
      title: "Karma Festival",
      date: "September 20-22", 
      location: "Jashpur",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=150&fit=crop"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  return (
    <div className="pb-20">
      {/* Hero Carousel */}
      <div className="relative h-48 overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
              index === currentSlide ? 'translate-x-0' : 
              index < currentSlide ? '-translate-x-full' : 'translate-x-full'
            }`}
          >
            <div 
              className="w-full h-full bg-cover bg-center relative"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6">
                <h2 className="text-white text-xl font-bold mb-1">{slide.title}</h2>
                <p className="text-white/90 text-sm mb-3">{slide.subtitle}</p>
                <button className="bg-jungle-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium self-start hover:bg-jungle-green-600 transition-colors">
                  {slide.cta}
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {/* Carousel Controls */}
        <button 
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button 
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 text-white p-2 rounded-full backdrop-blur-sm hover:bg-white/30 transition-colors"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="px-4 py-6">
        <h3 className="text-heading font-heading mb-4 text-gray-900">Explore Jharkhand</h3>
        <div className="grid grid-cols-3 gap-3">
          {quickAccessCards.map((card) => (
            <div 
              key={card.id}
              className={`${card.bgColor} rounded-tourism p-4 text-center hover:scale-105 transition-transform duration-200 cursor-pointer`}
            >
              <div className={`${card.color} text-white rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2`}>
                {card.icon}
              </div>
              <h4 className={`text-sm font-semibold ${card.textColor} mb-1`}>{card.title}</h4>
              <p className="text-xs text-gray-600">{card.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Weather & AQI Widget */}
      <div className="mx-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-tourism p-4 border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Thermometer className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Ranchi Weather</p>
                <p className="text-xs text-gray-600">28°C • Clear Sky</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Wind className="w-5 h-5 text-green-600" />
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">AQI: 52</p>
                <p className="text-xs text-green-600">Good</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Trips */}
      <div className="px-4 mb-6">
        <h3 className="text-heading font-heading mb-4 text-gray-900">AI Suggested Trips</h3>
        <div className="space-y-4">
          {suggestedTrips.map((trip) => (
            <div key={trip.id} className="bg-white rounded-tourism shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
              <div className="flex space-x-4">
                <img 
                  src={trip.image} 
                  alt={trip.title}
                  className="w-20 h-16 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">{trip.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{trip.places}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex space-x-4">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">{trip.duration}</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">{trip.budget}</span>
                    </div>
                    <button className="text-jungle-green-500 text-sm font-medium">View & Book</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Events & Festivals */}
      <div className="px-4 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-heading font-heading text-gray-900">Upcoming Events</h3>
          <button className="text-jungle-green-500 text-sm font-medium">View All</button>
        </div>
        <div className="space-y-3">
          {upcomingEvents.map((event) => (
            <div key={event.id} className="bg-white rounded-tourism shadow-sm border border-gray-100 p-4">
              <div className="flex items-center space-x-4">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-16 h-12 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{event.title}</h4>
                  <p className="text-sm text-gray-600">{event.date} • {event.location}</p>
                </div>
                <button className="bg-warm-yellow-500 text-white p-2 rounded-full hover:bg-warm-yellow-600 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
