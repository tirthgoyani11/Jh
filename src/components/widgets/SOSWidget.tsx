import { useState } from 'react';
import { AlertTriangle, X, Phone, MapPin, Clock, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SOSWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEmergencyActive, setIsEmergencyActive] = useState(false);
  const [countdown, setCountdown] = useState(5);

  const emergencyContacts = [
    { name: 'Police', number: '100', icon: Shield, color: 'bg-blue-500' },
    { name: 'Fire', number: '101', icon: AlertTriangle, color: 'bg-red-500' },
    { name: 'Ambulance', number: '108', icon: Phone, color: 'bg-green-500' },
    { name: 'Tourist Helpline', number: '1363', icon: MapPin, color: 'bg-purple-500' },
    { name: 'State Police', number: '0651-2446370', icon: Shield, color: 'bg-indigo-500' }
  ];

  const handleEmergencySOS = () => {
    setIsEmergencyActive(true);
    let count = 5;
    
    const timer = setInterval(() => {
      count--;
      setCountdown(count);
      
      if (count <= 0) {
        clearInterval(timer);
        // Send SOS with location
        sendSOSAlert();
        setIsEmergencyActive(false);
        setIsOpen(false);
      }
    }, 1000);
  };

  const sendSOSAlert = () => {
    // Get current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        
        // Simulate sending SOS
        console.log('SOS Alert Sent!', {
          location: { latitude, longitude },
          timestamp: new Date().toISOString(),
          message: 'Emergency assistance needed'
        });
        
        // In real implementation, this would:
        // 1. Send location to emergency services
        // 2. Send SMS to emergency contacts
        // 3. Make automated call
        // 4. Send data to tourism department
        
        alert('SOS Alert Sent! Emergency services have been notified with your location.');
      });
    }
  };

  const cancelEmergency = () => {
    setIsEmergencyActive(false);
    setCountdown(5);
  };

  const makeCall = (number: string) => {
    window.open(`tel:${number}`);
  };

  return (
    <>
      {/* Floating SOS Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 left-6 w-14 h-14 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 z-50 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <AlertTriangle className="w-6 h-6" />
      </motion.button>

      {/* SOS Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0, transformOrigin: 'bottom left' }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed bottom-6 left-6 w-72 max-w-xs bg-white rounded-xl shadow-2xl border border-gray-200 z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white p-3 rounded-t-xl flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <AlertTriangle className="w-3 h-3" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Emergency SOS</h3>
                  <p className="text-xs text-red-100">Tourist Safety & Support</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsOpen(false);
                  cancelEmergency();
                }}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4">
              {!isEmergencyActive ? (
                <>
                  {/* Emergency SOS Button */}
                  <div className="text-center mb-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleEmergencySOS}
                      className="w-24 h-24 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-full shadow-lg flex flex-col items-center justify-center mx-auto mb-3 hover:shadow-xl transition-all duration-300"
                    >
                      <AlertTriangle className="w-8 h-8 mb-1" />
                      <span className="text-sm font-bold">SOS</span>
                      <span className="text-xs">EMERGENCY</span>
                    </motion.button>
                    <p className="text-xs text-gray-600">
                      Press to send emergency alert with your location
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-800 mb-2">Current Status</h4>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2 flex items-center space-x-2">
                      <MapPin className="w-3 h-3 text-green-600" />
                      <div className="text-xs">
                        <p className="text-green-800 font-medium">Location Services Active</p>
                        <p className="text-green-600 text-xs">Ready to send precise location</p>
                      </div>
                    </div>
                  </div>

                  {/* Emergency Contacts */}
                  <div>
                    <h4 className="text-xs font-semibold text-gray-800 mb-2">Emergency Contacts</h4>
                    <div className="space-y-1">
                      {emergencyContacts.map((contact, index) => {
                        const IconComponent = contact.icon;
                        return (
                          <button
                            key={index}
                            onClick={() => makeCall(contact.number)}
                            className="w-full flex items-center justify-between p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <div className="flex items-center space-x-2">
                              <div className={`w-6 h-6 ${contact.color} rounded-full flex items-center justify-center`}>
                                <IconComponent className="w-3 h-3 text-white" />
                              </div>
                              <div className="text-left">
                                <p className="text-xs font-medium text-gray-800">{contact.name}</p>
                                <p className="text-xs text-gray-500">{contact.number}</p>
                              </div>
                            </div>
                            <Phone className="w-3 h-3 text-gray-400" />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              ) : (
                /* Emergency Countdown */
                <div className="text-center py-6">
                  <div className="w-20 h-20 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <div className="absolute inset-0 rounded-full border-4 border-red-300 animate-pulse"></div>
                    <span className="text-2xl font-bold">{countdown}</span>
                  </div>
                  <h3 className="text-base font-bold text-red-600 mb-2">Sending SOS Alert</h3>
                  <p className="text-xs text-gray-600 mb-4">
                    Emergency services will be notified with your location in {countdown} seconds
                  </p>
                  <button
                    onClick={cancelEmergency}
                    className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Cancel Emergency
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SOSWidget;
