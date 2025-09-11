import React from 'react';
import { Home, MapPin, Calendar, ShoppingBag, User, AlertTriangle } from 'lucide-react';
import { motion } from 'framer-motion';

interface CleanBottomTabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const CleanBottomTabs: React.FC<CleanBottomTabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'explore', label: 'Explore', icon: MapPin },
    { id: 'planner', label: 'Plan', icon: Calendar },
    { id: 'marketplace', label: 'Market', icon: ShoppingBag },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-40">
        <div className="flex items-center justify-around max-w-md mx-auto">
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-xl transition-colors ${
                  isActive 
                    ? 'text-green-600 bg-green-50' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <IconComponent className={`w-6 h-6 ${isActive ? 'text-green-600' : ''}`} />
                <span className={`text-xs font-medium ${isActive ? 'text-green-600' : ''}`}>
                  {tab.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Emergency SOS Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-20 right-4 bg-red-600 hover:bg-red-700 text-white p-4 rounded-full shadow-lg z-50 transition-colors"
        onClick={() => {
          // Handle SOS functionality
          alert('Emergency services contacted!');
        }}
      >
        <AlertTriangle className="w-6 h-6" />
      </motion.button>

      {/* Spacer to prevent content overlap */}
      <div className="h-20"></div>
    </>
  );
};

export default CleanBottomTabs;
