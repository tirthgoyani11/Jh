import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User, 
  Award, 
  Leaf, 
  Calendar, 
  MapPin, 
  Bell, 
  Globe, 
  ChevronRight, 
  Trophy, 
  Bookmark, 
  Shield,
  Star,
  Edit,
  Trash2,
  Plus,
  Download,
  Eye,
  X,
  QrCode,
  Phone,
  Camera,
  Settings as SettingsIcon,
  Lock,
  ChevronDown,
  Heart,
  Share2
} from 'lucide-react';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedReview, setSelectedReview] = useState<any>(null);
  const [settings, setSettings] = useState({
    language: 'English',
    notifications: true,
    offlineDownloads: true,
    privacy: 'public'
  });

  // Mock user data
  const userProfile = {
    id: "u_001",
    name: "Aarav Kumar",
    email: "aarav@example.com",
    phone: "+91 98765 43210",
    avatar: null, // null means show initials
    joinedDate: "January 2024",
    ecoPoints: 1250,
    maxEcoPoints: 2000,
    nextBadge: "Cultural Seeker",
    badges: ["Eco Explorer"],
    level: "Explorer"
  };

  // Sample bookings data
  const bookings = [
    {
      id: "b_101",
      type: "homestay",
      title: "Mahto Family Homestay",
      subtitle: "Traditional Jharkhand Experience",
      date: "2025-03-15 to 2025-03-17",
      status: "Confirmed",
      price: 2400,
      image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300",
      hostContact: { name: "Priya Mahto", phone: "+91 98765 12345" },
      qrCode: "QR-B101-MAHTO",
      location: "Netarhat, Jharkhand"
    },
    {
      id: "b_102", 
      type: "event",
      title: "Sarhul Festival Celebration",
      subtitle: "Traditional Tribal Festival",
      date: "2025-04-02",
      status: "Upcoming",
      price: 0,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300",
      hostContact: { name: "Cultural Committee", phone: "+91 98765 67890" },
      qrCode: "QR-E102-SARHUL",
      location: "Ranchi Cultural Center"
    },
    {
      id: "b_103",
      type: "product", 
      title: "Handwoven Tussar Silk Saree",
      subtitle: "Authentic Jharkhand Craft",
      date: "2025-02-20",
      status: "Delivered",
      price: 3500,
      image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=300",
      hostContact: { name: "Sunita Artisan Collective", phone: "+91 98765 11111" },
      qrCode: "QR-P103-SILK",
      location: "Shipped to Delhi"
    },
    {
      id: "b_104",
      type: "homestay",
      title: "Tribal Heritage Village Stay", 
      subtitle: "Santhal Community Experience",
      date: "2025-01-10 to 2025-01-12",
      status: "Completed",
      price: 1800,
      image: "https://images.unsplash.com/photo-1520637836862-4d197d17c13a?w=300",
      hostContact: { name: "Ramesh Soren", phone: "+91 98765 22222" },
      qrCode: "QR-B104-TRIBAL",
      location: "Dumka, Jharkhand"
    },
    {
      id: "b_105",
      type: "event",
      title: "Karam Festival Workshop",
      subtitle: "Traditional Dance & Music",
      date: "2024-12-15",
      status: "Cancelled",
      price: 500,
      image: "https://images.unsplash.com/photo-1504609773096-104ff2c73ba4?w=300",
      hostContact: { name: "Folk Art Society", phone: "+91 98765 33333" },
      qrCode: "QR-E105-KARAM",
      location: "Jamshedpur Arts Center"
    }
  ];

  // Available badges
  const allBadges = [
    {
      id: "eco-explorer",
      name: "🌱 Eco Explorer", 
      description: "Completed 3+ eco-friendly trips",
      earned: true,
      pointsRequired: 500
    },
    {
      id: "culture-seeker",
      name: "🎭 Culture Seeker",
      description: "Attended 5+ cultural events", 
      earned: false,
      pointsRequired: 2000
    },
    {
      id: "trailblazer", 
      name: "🏞️ Trailblazer",
      description: "Explored 10+ unique destinations",
      earned: false,
      pointsRequired: 3500
    },
    {
      id: "community-champion",
      name: "🤝 Community Champion", 
      description: "Stayed with 8+ local families",
      earned: false,
      pointsRequired: 5000
    }
  ];

  // Sample reviews
  const reviews = [
    {
      id: "r_501",
      poi: "Hundru Falls",
      stars: 4,
      text: "Amazing waterfall experience! The trek was moderate and the views were breathtaking. However, it gets quite crowded on weekends. Best to visit early morning.",
      date: "2025-02-10",
      images: ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200"]
    },
    {
      id: "r_502", 
      poi: "Mahto Family Homestay",
      stars: 5,
      text: "Incredible authentic experience! The family was so welcoming and the traditional meals were delicious. Learned so much about local customs and traditions.",
      date: "2025-01-25",
      images: []
    },
    {
      id: "r_503",
      poi: "Betla National Park",
      stars: 3,
      text: "Good wildlife spotting opportunities but the safari timing could be better. Saw elephants and several bird species. The forest rest house needs maintenance.",
      date: "2024-12-18", 
      images: ["https://images.unsplash.com/photo-1549366021-9f761d040a94?w=200", "https://images.unsplash.com/photo-1564760055775-d63b17a55c44?w=200"]
    }
  ];

  const tabs = [
    { id: 'bookings', label: '📖 My Bookings', icon: Bookmark },
    { id: 'rewards', label: '🎖️ Rewards & Badges', icon: Award },
    { id: 'reviews', label: '📝 My Reviews', icon: Star },
    { id: 'settings', label: '⚙️ Settings', icon: SettingsIcon }
  ];

  const getStatusColor = (status: string) => {
    const colors = {
      'Confirmed': 'bg-blue-100 text-blue-800',
      'Upcoming': 'bg-green-100 text-green-800', 
      'Completed': 'bg-gray-100 text-gray-800',
      'Delivered': 'bg-purple-100 text-purple-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      'homestay': '🏡',
      'event': '🎉', 
      'product': '🛍️'
    };
    return icons[type as keyof typeof icons] || '📝';
  };

  const handleBookingClick = (booking: any) => {
    setSelectedBooking(booking);
    setShowBookingModal(true);
  };

  const handleReviewClick = (review: any) => {
    setSelectedReview(review);
    setShowReviewModal(true);
  };

  const handleSettingToggle = (setting: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const downloadItinerary = () => {
    alert('Itinerary backup downloaded successfully!');
  };

  const renderProfileHeader = () => (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-jungle-green-600 to-jungle-green-800 text-white p-6 rounded-2xl mb-6"
    >
      <div className="flex items-center space-x-6 mb-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-20 h-20 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-2xl font-bold">
            {userProfile.avatar ? (
              <img src={userProfile.avatar} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <span>{userProfile.name.split(' ').map(n => n[0]).join('')}</span>
            )}
          </div>
          <button className="absolute -bottom-1 -right-1 bg-white text-jungle-green-600 rounded-full p-1">
            <Camera className="w-4 h-4" />
          </button>
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-1">{userProfile.name}</h1>
          <p className="text-jungle-green-100 mb-1">{userProfile.email}</p>
          <p className="text-jungle-green-100 text-sm">{userProfile.phone}</p>
          <p className="text-jungle-green-200 text-sm mt-1">Member since {userProfile.joinedDate}</p>
        </div>

        {/* Level Badge */}
        <div className="text-right">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-3">
            <Trophy className="w-6 h-6 mx-auto mb-1" />
            <p className="text-sm font-semibold">{userProfile.level}</p>
          </div>
        </div>
      </div>

      {/* Eco-Points Progress */}
      <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <Leaf className="w-5 h-5" />
            <span className="font-semibold">Eco-Points Progress</span>
          </div>
          <span className="text-lg font-bold">{userProfile.ecoPoints} / {userProfile.maxEcoPoints}</span>
        </div>
        
        <div className="w-full bg-white bg-opacity-20 rounded-full h-3 mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(userProfile.ecoPoints / userProfile.maxEcoPoints) * 100}%` }}
            transition={{ duration: 1, delay: 0.5 }}
            className="bg-warm-yellow-400 h-3 rounded-full"
          />
        </div>
        
        <p className="text-sm text-jungle-green-100">
          {userProfile.maxEcoPoints - userProfile.ecoPoints} more points to unlock "{userProfile.nextBadge}" badge! 🌟
        </p>
      </div>
    </motion.div>
  );

  const renderMyBookings = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Bookings</h2>
        <span className="text-sm text-gray-500">{bookings.length} total bookings</span>
      </div>

      {bookings.map((booking, index) => (
        <motion.div
          key={booking.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => handleBookingClick(booking)}
        >
          <div className="flex">
            {/* Image */}
            <div className="w-24 h-24 flex-shrink-0">
              <img 
                src={booking.image} 
                alt={booking.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{getTypeIcon(booking.type)}</span>
                    <h3 className="font-semibold text-gray-900">{booking.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600">{booking.subtitle}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                  {booking.status}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{booking.date}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <MapPin className="w-4 h-4" />
                    <span>{booking.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">
                    {booking.price === 0 ? 'Free' : `₹${booking.price.toLocaleString()}`}
                  </p>
                  <button className="text-jungle-green-600 text-sm font-medium hover:underline flex items-center space-x-1">
                    <Eye className="w-4 h-4" />
                    <span>View Details</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderRewardsAndBadges = () => (
    <div className="space-y-6">
      {/* Eco-Points Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-warm-yellow-400 to-warm-yellow-600 rounded-2xl p-6 text-white"
      >
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold mb-1">Your Eco-Points</h3>
            <p className="text-3xl font-bold">{userProfile.ecoPoints}</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-full p-3">
            <Leaf className="w-8 h-8" />
          </div>
        </div>
        
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-3">
          <p className="text-sm mb-2">Next milestone: {userProfile.nextBadge}</p>
          <div className="w-full bg-white bg-opacity-20 rounded-full h-2">
            <div 
              className="bg-white h-2 rounded-full"
              style={{ width: `${(userProfile.ecoPoints / userProfile.maxEcoPoints) * 100}%` }}
            />
          </div>
          <p className="text-xs mt-1 text-right">{userProfile.maxEcoPoints - userProfile.ecoPoints} points to go</p>
        </div>
      </motion.div>

      {/* Badge Showcase */}
      <div>
        <h3 className="text-xl font-bold text-gray-900 mb-4">Your Badges</h3>
        <div className="grid grid-cols-2 gap-4">
          {allBadges.map((badge, index) => (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl p-6 text-center transition-all ${
                badge.earned 
                  ? 'bg-gradient-to-br from-jungle-green-50 to-jungle-green-100 border-2 border-jungle-green-200 shadow-lg' 
                  : 'bg-gray-50 border-2 border-gray-200'
              }`}
            >
              <div className={`text-4xl mb-3 ${!badge.earned && 'grayscale opacity-50'}`}>
                {badge.name.split(' ')[0]}
              </div>
              <h4 className={`font-bold text-sm mb-2 ${badge.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                {badge.name.substring(2)} {/* Remove emoji from name */}
              </h4>
              <p className={`text-xs mb-3 ${badge.earned ? 'text-gray-700' : 'text-gray-400'}`}>
                {badge.description}
              </p>
              {badge.earned ? (
                <div className="flex items-center justify-center space-x-1">
                  <Trophy className="w-4 h-4 text-yellow-500" />
                  <span className="text-xs font-semibold text-jungle-green-700">Earned!</span>
                </div>
              ) : (
                <div className="text-xs text-gray-500">
                  Need {badge.pointsRequired} points
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* How to Earn Points */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 border border-gray-100"
      >
        <h3 className="text-lg font-bold text-gray-900 mb-4">How to Earn More Points</h3>
        <div className="space-y-3">
          {[
            { action: 'Complete a homestay booking', points: 150 },
            { action: 'Attend cultural events', points: 100 },
            { action: 'Purchase local handicrafts', points: 75 },
            { action: 'Leave detailed reviews', points: 50 },
            { action: 'Share experiences on social media', points: 25 }
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-gray-700">{item.action}</span>
              <span className="font-semibold text-jungle-green-600">+{item.points} pts</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderMyReviews = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Reviews</h2>
        <button 
          onClick={() => setShowReviewModal(true)}
          className="bg-jungle-green-600 hover:bg-jungle-green-700 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Review</span>
        </button>
      </div>

      {reviews.map((review, index) => (
        <motion.div
          key={review.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-2xl p-6 border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">{review.poi}</h3>
              <div className="flex items-center space-x-2 mb-2">
                <div className="flex items-center space-x-1">
                  {renderStars(review.stars)}
                </div>
                <span className="text-sm text-gray-500">• {review.date}</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => handleReviewClick(review)}
                className="text-jungle-green-600 hover:text-jungle-green-700 p-1"
              >
                <Edit className="w-4 h-4" />
              </button>
              <button className="text-red-600 hover:text-red-700 p-1">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          <p className="text-gray-700 mb-4 leading-relaxed">{review.text}</p>
          
          {review.images.length > 0 && (
            <div className="flex space-x-2">
              {review.images.map((image, imgIndex) => (
                <img
                  key={imgIndex}
                  src={image}
                  alt={`Review ${imgIndex + 1}`}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <button className="flex items-center space-x-1 hover:text-jungle-green-600">
                <Heart className="w-4 h-4" />
                <span>12 likes</span>
              </button>
              <button className="flex items-center space-x-1 hover:text-jungle-green-600">
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
            <span className="text-xs text-gray-500">+50 eco-points earned</span>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Settings</h2>

      {/* Language Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Globe className="w-6 h-6 text-jungle-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Preferred Language</h3>
              <p className="text-sm text-gray-600">Choose your app language</p>
            </div>
          </div>
          <div className="relative">
            <select 
              value={settings.language}
              onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))}
              className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-jungle-green-500"
            >
              <option value="English">English</option>
              <option value="Hindi">Hindi</option>
              <option value="Santhali">Santhali</option>
            </select>
            <ChevronDown className="w-5 h-5 text-gray-400 absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Bell className="w-6 h-6 text-jungle-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              <p className="text-sm text-gray-600">Receive booking updates and offers</p>
            </div>
          </div>
          <button 
            onClick={() => handleSettingToggle('notifications')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              settings.notifications ? 'bg-jungle-green-600' : 'bg-gray-200'
            }`}
          >
            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              settings.notifications ? 'translate-x-6' : 'translate-x-1'
            }`} />
          </button>
        </div>
      </motion.div>

      {/* Offline Downloads */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-2xl p-6 border border-gray-100"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Download className="w-6 h-6 text-jungle-green-600" />
            <div>
              <h3 className="font-semibold text-gray-900">Offline Downloads</h3>
              <p className="text-sm text-gray-600">Download itinerary backups</p>
            </div>
          </div>
          <button 
            onClick={downloadItinerary}
            className="bg-jungle-green-600 hover:bg-jungle-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Download Backup
          </button>
        </div>
      </motion.div>

      {/* Privacy & Security */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl p-6 border border-gray-100"
      >
        <div className="flex items-center space-x-3 mb-4">
          <Shield className="w-6 h-6 text-jungle-green-600" />
          <div>
            <h3 className="font-semibold text-gray-900">Privacy & Security</h3>
            <p className="text-sm text-gray-600">Manage your account security</p>
          </div>
        </div>
        
        <div className="space-y-3">
          <button className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className="flex items-center space-x-3">
              <Lock className="w-5 h-5 text-gray-600" />
              <span className="font-medium text-gray-900">Reset Password</span>
            </div>
            <ChevronRight className="w-5 h-5 text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-3 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
            <div className="flex items-center space-x-3">
              <Trash2 className="w-5 h-5 text-red-600" />
              <span className="font-medium text-red-900">Delete Account</span>
            </div>
            <ChevronRight className="w-5 h-5 text-red-400" />
          </button>
        </div>
      </motion.div>

      {/* Help & Support */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-jungle-green-50 to-terracotta-50 rounded-2xl p-6 border border-gray-100"
      >
        <div className="text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Need Help?</h3>
          <p className="text-sm text-gray-600 mb-4">Our support team is here to assist you</p>
          <button className="bg-jungle-green-600 hover:bg-jungle-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Contact Support
          </button>
        </div>
      </motion.div>
    </div>
  );

  // Booking Details Modal
  const BookingModal = () => {
    if (!selectedBooking) return null;

    return (
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <img 
                  src={selectedBooking.image} 
                  alt={selectedBooking.title}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="absolute top-4 right-4 bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-2"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedBooking.title}</h2>
                    <p className="text-gray-600">{selectedBooking.subtitle}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedBooking.status)}`}>
                    {selectedBooking.status}
                  </span>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Calendar className="w-5 h-5" />
                    <span>{selectedBooking.date}</span>
                  </div>
                  
                  <div className="flex items-center space-x-3 text-gray-700">
                    <MapPin className="w-5 h-5" />
                    <span>{selectedBooking.location}</span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">Contact Information</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">{selectedBooking.hostContact.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4 text-gray-600" />
                        <span className="text-sm">{selectedBooking.hostContact.phone}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-jungle-green-50 rounded-lg p-4 text-center">
                    <QrCode className="w-16 h-16 mx-auto mb-2 text-jungle-green-600" />
                    <h3 className="font-semibold text-gray-900 mb-1">Booking QR Code</h3>
                    <p className="text-sm text-gray-600 font-mono">{selectedBooking.qrCode}</p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t">
                    <span className="text-lg font-bold text-gray-900">
                      Total: {selectedBooking.price === 0 ? 'Free' : `₹${selectedBooking.price.toLocaleString()}`}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

  // Review Modal (Add/Edit)
  const ReviewModal = () => (
    <AnimatePresence>
      {showReviewModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowReviewModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {selectedReview ? 'Edit Review' : 'Add Review'}
              </h2>
              <button
                onClick={() => setShowReviewModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Place/Experience
                </label>
                <input
                  type="text"
                  defaultValue={selectedReview?.poi || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jungle-green-500"
                  placeholder="e.g., Hundru Falls"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Rating
                </label>
                <div className="flex space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className="text-2xl text-gray-300 hover:text-yellow-400"
                    >
                      <Star className="w-8 h-8" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Review
                </label>
                <textarea
                  rows={5}
                  defaultValue={selectedReview?.text || ''}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jungle-green-500 resize-none"
                  placeholder="Share your experience..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Photos (optional)
                </label>
                <button
                  type="button"
                  className="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-600 hover:border-jungle-green-400 hover:text-jungle-green-600 transition-colors"
                >
                  <Camera className="w-6 h-6 mx-auto mb-1" />
                  Upload Photos
                </button>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="flex-1 py-3 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-jungle-green-600 hover:bg-jungle-green-700 text-white rounded-lg font-medium"
                >
                  {selectedReview ? 'Update' : 'Submit'} Review
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'bookings':
        return renderMyBookings();
      case 'rewards':
        return renderRewardsAndBadges();
      case 'reviews':
        return renderMyReviews();
      case 'settings':
        return renderSettings();
      default:
        return renderMyBookings();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Profile Header */}
      <div className="bg-white px-4 pt-4">
        {renderProfileHeader()}
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-gray-200 sticky top-16 z-40">
        <div className="flex overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 min-w-fit px-4 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-jungle-green-600 border-b-2 border-jungle-green-600 bg-jungle-green-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {renderContent()}
      </div>

      {/* Modals */}
      <BookingModal />
      <ReviewModal />
    </div>
  );
};

export default ProfilePage;
