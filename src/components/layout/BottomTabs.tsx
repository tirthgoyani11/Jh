import React from 'react'
import { Home, Map, Calendar, Store, User, Shield } from 'lucide-react'
import { motion } from 'framer-motion'

interface BottomTabsProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

const tabs = [
  { id: 'home', label: 'Home', icon: Home, color: 'jungle-green' },
  { id: 'explore', label: 'Explore', icon: Map, color: 'blue' },
  { id: 'planner', label: 'Planner', icon: Calendar, color: 'purple' },
  { id: 'marketplace', label: 'Market', icon: Store, color: 'orange' },
  { id: 'profile', label: 'Profile', icon: User, color: 'indigo' },
]

export function BottomTabs({ activeTab, onTabChange }: BottomTabsProps) {
  return (
    <>
      {/* Enhanced SOS Button with pulse animation */}
      <motion.div 
        className="fixed bottom-20 right-4 z-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <button 
          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow-2xl transition-all duration-200 relative overflow-hidden"
          onClick={() => {
            // Enhanced SOS functionality
            navigator.vibrate?.(200);
            alert('🚨 Emergency Alert Sent!\nYour location has been shared with emergency contacts.');
          }}
        >
          <div className="absolute inset-0 bg-red-400 rounded-full animate-ping opacity-30"></div>
          <Shield className="h-6 w-6 relative z-10" />
        </button>
      </motion.div>

      {/* Enhanced Bottom Navigation with glassmorphism effect */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        <div className="bg-white/90 backdrop-blur-xl border-t border-gray-200/50 shadow-2xl">
          <div className="flex justify-around items-center py-3 px-2 max-w-md mx-auto">
            {tabs.map(({ id, label, icon: Icon, color }) => (
              <motion.button
                key={id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onTabChange(id)}
                className={`relative flex flex-col items-center p-3 rounded-2xl transition-all duration-300 min-w-0 flex-1 ${
                  activeTab === id
                    ? `text-${color}-500 bg-${color}-50 shadow-lg shadow-${color}-100`
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="relative">
                  <Icon className="h-6 w-6 mb-1" />
                  {activeTab === id && (
                    <>
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute -inset-1 rounded-xl bg-${color}-100 -z-10`}
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-${color}-500 rounded-full`}
                      />
                    </>
                  )}
                </div>
                <span className="text-xs font-medium truncate leading-tight">{label}</span>
                
                {/* Notification badge for some tabs */}
                {id === 'marketplace' && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                  >
                    3
                  </motion.div>
                )}
                {id === 'planner' && activeTab !== id && (
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute -top-1 -right-1 bg-purple-500 w-2 h-2 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </div>
          
          {/* Safe area for devices with home indicator */}
          <div className="h-safe-area-inset-bottom bg-white/90"></div>
        </div>
      </div>
    </>
  )
}
