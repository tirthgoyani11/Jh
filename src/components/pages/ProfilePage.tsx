import React, { useState } from 'react';
import { User, MapPin, Star, Calendar, Heart, Camera, Award, Settings, LogOut, Edit, Share } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const user = {
    name: 'Arjun Singh',
    email: 'arjun.singh@email.com',
    location: 'Ranchi, Jharkhand',
    joinDate: 'March 2023',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    stats: {
      placesVisited: 18,
      tripsCompleted: 12,
      reviewsWritten: 8,
      photosTaken: 156
    },
    badges: [
      { name: 'Explorer', icon: '🗺️', description: 'Visited 10+ destinations' },
      { name: 'Photographer', icon: '📸', description: 'Uploaded 100+ photos' },
      { name: 'Reviewer', icon: '⭐', description: 'Written 5+ reviews' },
      { name: 'Cultural Enthusiast', icon: '🎭', description: 'Joined cultural tours' }
    ]
  };

  const recentTrips = [
    {
      id: 1,
      destination: 'Hundru Falls',
      date: 'Dec 2024',
      rating: 5,
      images: ['https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=150&fit=crop'],
      review: 'Absolutely breathtaking! The 98m cascade was spectacular.'
    },
    {
      id: 2,
      destination: 'Betla National Park',
      date: 'Nov 2024',
      rating: 5,
      images: ['https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=200&h=150&fit=crop'],
      review: 'Amazing wildlife safari. Spotted tigers and elephants!'
    },
    {
      id: 3,
      destination: 'Netarhat Hill Station',
      date: 'Oct 2024',
      rating: 4,
      images: ['https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=200&h=150&fit=crop'],
      review: 'Beautiful sunrise point. Perfect for photography enthusiasts.'
    }
  ];

  const upcomingTrips = [
    {
      id: 1,
      destination: 'Palamau Tiger Reserve',
      date: 'Jan 15, 2025',
      bookingId: 'JT2024001',
      status: 'Confirmed'
    },
    {
      id: 2,
      destination: 'Deoghar Temple Complex',
      date: 'Feb 8, 2025',
      bookingId: 'JT2024002',
      status: 'Pending'
    }
  ];

  const wishlist = [
    {
      id: 1,
      name: 'Jonha Falls Trek',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=200&h=150&fit=crop',
      price: '₹399'
    },
    {
      id: 2,
      name: 'Tribal Village Tour',
      image: 'https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=200&h=150&fit=crop',
      price: '₹1599'
    },
    {
      id: 3,
      name: 'Parasnath Hill Pilgrimage',
      image: 'https://images.unsplash.com/photo-1609952332026-8297b92b4ee0?w=200&h=150&fit=crop',
      price: '₹1799'
    }
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: User },
    { id: 'trips', name: 'My Trips', icon: MapPin },
    { id: 'reviews', name: 'Reviews', icon: Star },
    { id: 'wishlist', name: 'Wishlist', icon: Heart }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-32 h-32 rounded-full border-4 border-white/20 object-cover"
              />
              <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-2 rounded-full">
                <Award className="w-5 h-5" />
              </div>
            </div>
            
            <div className="text-center md:text-left flex-1">
              <h1 className="text-4xl font-bold mb-2">{user.name}</h1>
              <p className="text-emerald-200 text-lg mb-4 flex items-center justify-center md:justify-start gap-2">
                <MapPin className="w-5 h-5" />
                {user.location}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm">
                <div>
                  <span className="text-emerald-200">Member since:</span>
                  <span className="font-semibold ml-1">{user.joinDate}</span>
                </div>
                <div>
                  <span className="text-emerald-200">Email:</span>
                  <span className="font-semibold ml-1">{user.email}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors flex items-center gap-2"
              >
                <Edit className="w-4 h-4" />
                Edit Profile
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors"
              >
                <Share className="w-4 h-4" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-600 mb-2">{user.stats.placesVisited}</div>
              <div className="text-sm text-gray-600">Places Visited</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-600 mb-2">{user.stats.tripsCompleted}</div>
              <div className="text-sm text-gray-600">Trips Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-600 mb-2">{user.stats.reviewsWritten}</div>
              <div className="text-sm text-gray-600">Reviews Written</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-black text-emerald-600 mb-2">{user.stats.photosTaken}</div>
              <div className="text-sm text-gray-600">Photos Shared</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex space-x-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-emerald-600 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Badges */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Achievements</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {user.badges.map((badge, index) => (
                  <motion.div
                    key={badge.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="text-center p-4 bg-gradient-to-br from-emerald-50 to-blue-50 rounded-2xl"
                  >
                    <div className="text-3xl mb-2">{badge.icon}</div>
                    <h3 className="font-bold text-gray-900 mb-1">{badge.name}</h3>
                    <p className="text-sm text-gray-600">{badge.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <span className="text-gray-600">Completed trip to <strong>Hundru Falls</strong></span>
                  <span className="text-sm text-gray-400 ml-auto">2 days ago</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-600">Added <strong>Jonha Falls Trek</strong> to wishlist</span>
                  <span className="text-sm text-gray-400 ml-auto">1 week ago</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-600">Wrote review for <strong>Betla National Park</strong></span>
                  <span className="text-sm text-gray-400 ml-auto">2 weeks ago</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trips' && (
          <div className="space-y-8">
            {/* Upcoming Trips */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Trips</h2>
              <div className="space-y-4">
                {upcomingTrips.map((trip) => (
                  <div key={trip.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 mb-2">{trip.destination}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {trip.date}
                          </div>
                          <span>Booking ID: {trip.bookingId}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        trip.status === 'Confirmed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {trip.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Past Trips */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Past Trips</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentTrips.map((trip) => (
                  <motion.div
                    key={trip.id}
                    whileHover={{ y: -5 }}
                    className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all"
                  >
                    <img
                      src={trip.images[0]}
                      alt={trip.destination}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="font-bold text-gray-900 mb-2">{trip.destination}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex">
                          {[...Array(trip.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">{trip.date}</span>
                      </div>
                      <p className="text-sm text-gray-600 line-clamp-2">{trip.review}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">My Wishlist</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <motion.div
                  key={item.id}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all group"
                >
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
                      <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                    </button>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-gray-900 mb-2">{item.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-emerald-600">{item.price}</span>
                      <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors">
                        Book Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
