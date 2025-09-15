import React, { useState } from 'react';
import { Bell, Globe, Search, X, MapPin, Cloud, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logoSvg from '../../assets/logo.svg';

interface EnhancedAppHeaderProps {
  title?: string;
  showNotifications?: boolean;
  showLanguage?: boolean;
}

const EnhancedAppHeader: React.FC<EnhancedAppHeaderProps> = ({ 
  title = "Jharkhand Tourism",
  showNotifications = true,
  showLanguage = true 
}) => {
  const [showNotificationPanel, setShowNotificationPanel] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentLanguage, setCurrentLanguage] = useState('EN');

  const notifications = [
    { 
      id: 1, 
      title: "Weather Update", 
      message: "Perfect weather for Hundru Falls visit!", 
      time: "2m ago", 
      type: "weather",
      icon: Sun,
      color: "bg-yellow-100 text-yellow-600"
    },
    { 
      id: 2, 
      title: "Booking Confirmed", 
      message: "Your Netarhat homestay is confirmed for tomorrow", 
      time: "15m ago", 
      type: "booking",
      icon: MapPin,
      color: "bg-green-100 text-green-600"
    },
    { 
      id: 3, 
      title: "Festival Alert", 
      message: "Sarhul festival celebrations start at 6 AM", 
      time: "1h ago", 
      type: "event",
      icon: Bell,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const searchSuggestions = [
    { name: "Hundru Falls", type: "Waterfall", distance: "45 km" },
    { name: "Betla National Park", type: "Wildlife", distance: "65 km" },
    { name: "Netarhat Hill Station", type: "Hill Station", distance: "155 km" },
    { name: "Deoghar Temple", type: "Religious", distance: "78 km" },
    { name: "Tribal Village Tour", type: "Culture", distance: "25 km" }
  ];

  const languages = ['EN', 'HI', 'SA', 'KH'];

  const toggleNotifications = () => {
    setShowNotificationPanel(!showNotificationPanel);
    if (showSearch) setShowSearch(false);
  };

  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (showNotificationPanel) setShowNotificationPanel(false);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Main Header with Enhanced Glassmorphism */}
        <motion.div 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-white/95 backdrop-blur-xl border-b border-gray-200/50 shadow-lg"
        >
          <div className="px-4 py-3">
            <div className="flex items-center justify-between">
              {/* Enhanced Logo and Branding */}
              <motion.div 
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative">
                  <div className="p-2.5">
                    <img src={logoSvg} alt="Jharkhand Tourism Logo" className="w-12 h-12" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-warm-yellow-400 to-warm-yellow-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-gray-900 leading-tight">
                    {title.split(' ')[0]}
                  </h1>
                  <div className="flex items-center space-x-2">
                    <p className="text-xs font-semibold text-jungle-green-600">
                      {title.split(' ')[1]}
                    </p>
                    <div className="w-1 h-1 bg-terracotta-400 rounded-full"></div>
                    <p className="text-xs text-gray-500">Explore More</p>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Action Buttons */}
              <div className="flex items-center space-x-2">
                {/* Search Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleSearch}
                  className={`p-2.5 rounded-xl transition-all duration-300 ${
                    showSearch 
                      ? 'bg-blue-100 text-blue-600 shadow-md' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm'
                  }`}
                >
                  <motion.div
                    animate={{ rotate: showSearch ? 90 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    {showSearch ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                  </motion.div>
                </motion.button>

                {/* Language Switcher */}
                {showLanguage && (
                  <motion.div 
                    className="relative"
                    whileHover={{ scale: 1.05 }}
                  >
                    <button 
                      className="flex items-center space-x-1 px-3 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-xl transition-all duration-300"
                      onClick={() => {
                        const currentIndex = languages.indexOf(currentLanguage);
                        const nextIndex = (currentIndex + 1) % languages.length;
                        setCurrentLanguage(languages[nextIndex]);
                      }}
                    >
                      <Globe className="w-4 h-4 text-gray-600" />
                      <span className="text-sm font-medium text-gray-700">{currentLanguage}</span>
                    </button>
                  </motion.div>
                )}

                {/* Enhanced Notifications */}
                {showNotifications && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleNotifications}
                    className={`relative p-2.5 rounded-xl transition-all duration-300 ${
                      showNotificationPanel 
                        ? 'bg-red-100 text-red-600 shadow-md' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-sm'
                    }`}
                  >
                    <Bell className="w-5 h-5" />
                    <motion.div 
                      className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      {notifications.length}
                    </motion.div>
                  </motion.button>
                )}
              </div>
            </div>
          </div>

          {/* Enhanced Search Bar */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="px-4 pb-4 border-t border-gray-100/80 overflow-hidden"
              >
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search destinations, experiences, stays..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-12 py-3.5 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-jungle-green-500 focus:border-transparent transition-all duration-200 text-sm placeholder-gray-500"
                    autoFocus
                  />
                  {searchQuery && (
                    <motion.button
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      onClick={() => setSearchQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
                
                {/* Enhanced Search Suggestions */}
                <AnimatePresence>
                  {(searchQuery.length > 0 || !searchQuery) && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-3 bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
                    >
                      <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
                        <h3 className="text-sm font-semibold text-gray-700">
                          {searchQuery ? 'Search Results' : 'Popular Destinations'}
                        </h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {searchSuggestions
                          .filter(item => !searchQuery || 
                            item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.type.toLowerCase().includes(searchQuery.toLowerCase())
                          )
                          .map((suggestion, index) => (
                          <motion.button
                            key={index}
                            whileHover={{ backgroundColor: "#f9fafb" }}
                            className="w-full px-4 py-3.5 text-left transition-colors border-b border-gray-50 last:border-0"
                            onClick={() => {
                              setSearchQuery(suggestion.name);
                              setShowSearch(false);
                            }}
                          >
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-3">
                                <div className="w-2 h-2 bg-jungle-green-500 rounded-full"></div>
                                <div>
                                  <p className="font-medium text-gray-900 text-sm">{suggestion.name}</p>
                                  <p className="text-xs text-gray-500">{suggestion.type}</p>
                                </div>
                              </div>
                              <span className="text-xs text-jungle-green-600 font-medium">
                                {suggestion.distance}
                              </span>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Weather/Info Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-jungle-green-50 via-blue-50 to-warm-yellow-50 px-4 py-2.5 border-b border-gray-200/50"
        >
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Cloud className="w-4 h-4 text-blue-500" />
                <span className="text-gray-700 font-medium">Today: Sep 10, 2025</span>
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="w-4 h-4 text-orange-500" />
                <span className="text-blue-600 font-medium">28°C • Pleasant</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-jungle-green-600 font-semibold">Perfect for exploring!</span>
            </div>
          </div>
        </motion.div>
      </header>

      {/* Enhanced Notifications Panel */}
      <AnimatePresence>
        {showNotificationPanel && (
          <>
            {/* Enhanced Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40 backdrop-blur-sm"
              onClick={() => setShowNotificationPanel(false)}
            />
            
            {/* Enhanced Notifications Panel */}
            <motion.div
              initial={{ opacity: 0, y: -30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.9 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed top-24 right-4 bg-white rounded-2xl shadow-2xl border border-gray-200 w-80 max-h-96 overflow-hidden z-50"
            >
              {/* Panel Header */}
              <div className="p-4 bg-gradient-to-r from-jungle-green-50 to-blue-50 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">Notifications</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Stay updated with your journey</p>
                  </div>
                  <button
                    onClick={() => setShowNotificationPanel(false)}
                    className="p-1.5 hover:bg-white rounded-xl transition-colors"
                  >
                    <X className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>
              
              {/* Notifications List */}
              <div className="max-h-80 overflow-y-auto">
                {notifications.map((notification, index) => {
                  const IconComponent = notification.icon;
                  return (
                    <motion.div
                      key={notification.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ backgroundColor: "#f9fafb" }}
                      className="p-4 border-b border-gray-100 last:border-0 cursor-pointer transition-colors"
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`p-2 rounded-xl ${notification.color}`}>
                          <IconComponent className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-gray-900 mb-1 text-sm">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-gray-600 mb-2 leading-relaxed">
                            {notification.message}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs text-gray-500">{notification.time}</span>
                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            <span className="text-xs text-jungle-green-600 font-medium capitalize">
                              {notification.type}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Panel Footer */}
              <div className="p-3 bg-gray-50 border-t border-gray-100">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-2.5 text-center text-sm text-jungle-green-600 font-semibold hover:text-jungle-green-700 transition-colors rounded-xl hover:bg-jungle-green-50"
                >
                  View All Notifications
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default EnhancedAppHeader;
