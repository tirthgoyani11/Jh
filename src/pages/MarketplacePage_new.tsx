import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, ShoppingBag, Calendar, Star, MapPin, Users, Wifi, Car, Coffee,
  ShoppingCart, X, Plus, Minus, Check, CreditCard, Smartphone, Building2,
  Award, Heart, Clock, IndianRupee, Filter, Search, ChevronDown, Badge,
  Verified, Camera, MessageCircle, Share2
} from 'lucide-react';

// TypeScript Interfaces
interface Homestay {
  id: string;
  name: string;
  host: string;
  location: string;
  price: number;
  verified: boolean;
  amenities: string[];
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  maxGuests: number;
  ecoPoints: number;
}

interface Product {
  id: string;
  title: string;
  artisan: string;
  artisanImage: string;
  price: number;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  category: string;
  description: string;
  ecoPoints: number;
  inStock: number;
}

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  ticketPrice: number;
  isFree: boolean;
  category: string;
  duration: string;
  maxCapacity: number;
  ecoPoints: number;
}

interface CartItem {
  id: string;
  type: 'homestay' | 'product' | 'event';
  title: string;
  price: number;
  image: string;
  quantity: number;
  details?: {
    checkIn?: string;
    checkOut?: string;
    guests?: number;
    eventDate?: string;
  };
  ecoPoints: number;
}

const MarketplacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'homestays' | 'handicrafts' | 'events'>('homestays');
  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [bookingModal, setBookingModal] = useState<{ open: boolean; item: Homestay | Event | null }>({
    open: false,
    item: null
  });
  const [checkoutModal, setCheckoutModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 10000 });
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Sample Data
  const homestays: Homestay[] = [
    {
      id: 'hs_001',
      name: 'Mahto Family Homestay',
      host: 'Ramesh Mahto',
      location: 'Netarhat Hills',
      price: 1200,
      verified: true,
      amenities: ['wifi', 'meals', 'parking', 'garden'],
      image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
      ],
      rating: 4.8,
      reviews: 34,
      description: 'Experience authentic tribal hospitality in the serene Netarhat Hills. Our family has been welcoming guests for generations.',
      maxGuests: 6,
      ecoPoints: 150
    },
    {
      id: 'hs_002',
      name: 'Tribal Heritage Home',
      host: 'Sita Devi Munda',
      location: 'Khunti Village',
      price: 900,
      verified: true,
      amenities: ['meals', 'cultural', 'nature'],
      image: 'https://images.unsplash.com/photo-1559508551-44bff1de756d?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1559508551-44bff1de756d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop'
      ],
      rating: 4.9,
      reviews: 28,
      description: 'Live with a Munda family and learn about tribal traditions, folk music, and organic farming practices.',
      maxGuests: 4,
      ecoPoints: 200
    },
    {
      id: 'hs_003',
      name: 'Forest Edge Retreat',
      host: 'Bandu Singh Oraon',
      location: 'Betla National Park',
      price: 1800,
      verified: true,
      amenities: ['wifi', 'meals', 'safari', 'parking'],
      image: 'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1501436513145-30f24e19fcc4?w=800&h=600&fit=crop'
      ],
      rating: 4.7,
      reviews: 19,
      description: 'Stay at the edge of Betla National Park with guided nature walks and wildlife safari experiences.',
      maxGuests: 8,
      ecoPoints: 250
    }
  ];

  const products: Product[] = [
    {
      id: 'p_001',
      title: 'Dokra Metal Figurine',
      artisan: 'Kailash Kumar',
      artisanImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop',
      price: 850,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      ],
      rating: 4.9,
      reviews: 67,
      category: 'metalcraft',
      description: 'Handcrafted using the ancient lost-wax casting technique by master artisan from Khunti.',
      ecoPoints: 85,
      inStock: 12
    },
    {
      id: 'p_002',
      title: 'Tribal Dance Mask',
      artisan: 'Maya Kumari',
      artisanImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b1c3?w=100&h=100&fit=crop',
      price: 1200,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      ],
      rating: 4.8,
      reviews: 43,
      category: 'woodcraft',
      description: 'Traditional Santhali dance mask carved from sustainably sourced sal wood.',
      ecoPoints: 120,
      inStock: 8
    },
    {
      id: 'p_003',
      title: 'Handwoven Tussar Silk Saree',
      artisan: 'Lakshmi Devi',
      artisanImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
      price: 3500,
      image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=800&h=600&fit=crop'
      ],
      rating: 4.9,
      reviews: 89,
      category: 'textile',
      description: 'Exquisite Tussar silk saree with traditional tribal motifs, handwoven on pit loom.',
      ecoPoints: 350,
      inStock: 5
    },
    {
      id: 'p_004',
      title: 'Bamboo Craft Storage Set',
      artisan: 'Raman Oraon',
      artisanImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop',
      price: 600,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop',
      images: [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop'
      ],
      rating: 4.6,
      reviews: 34,
      category: 'bamboo',
      description: 'Eco-friendly storage baskets made from locally grown bamboo using traditional techniques.',
      ecoPoints: 60,
      inStock: 20
    }
  ];

  const events: Event[] = [
    {
      id: 'ev_001',
      title: 'Sarhul Festival Celebration',
      date: '2025-04-15',
      location: 'Ranchi Tribal Ground',
      description: 'Join the grand celebration of spring with traditional Munda and Oraon communities. Experience folk music, dance, and ritual ceremonies.',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop',
      ticketPrice: 0,
      isFree: true,
      category: 'festival',
      duration: '6 hours',
      maxCapacity: 500,
      ecoPoints: 100
    },
    {
      id: 'ev_002',
      title: 'Tribal Cooking Workshop',
      date: '2025-03-22',
      location: 'Khunti Cultural Center',
      description: 'Learn to cook authentic tribal dishes using traditional methods and locally sourced ingredients.',
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop',
      ticketPrice: 800,
      isFree: false,
      category: 'workshop',
      duration: '4 hours',
      maxCapacity: 20,
      ecoPoints: 80
    },
    {
      id: 'ev_003',
      title: 'Jharkhand Handicrafts Fair',
      date: '2025-05-10',
      location: 'Birsa Munda Stadium',
      description: 'Explore and shop directly from over 200 tribal artisans showcasing their traditional crafts.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      ticketPrice: 150,
      isFree: false,
      category: 'fair',
      duration: '3 days',
      maxCapacity: 1000,
      ecoPoints: 75
    }
  ];

  // Cart Functions
  const addToCart = (item: Homestay | Product | Event, type: 'homestay' | 'product' | 'event', details?: any) => {
    const cartItem: CartItem = {
      id: item.id,
      type,
      title: type === 'homestay' ? item.name : item.title,
      price: type === 'event' ? (item as Event).ticketPrice : item.price,
      image: item.image,
      quantity: 1,
      details,
      ecoPoints: item.ecoPoints
    };

    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.id && cartItem.type === type);
      if (existing && type === 'product') {
        return prev.map(cartItem =>
          cartItem.id === item.id && cartItem.type === type
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prev, cartItem];
    });

    if (type !== 'homestay' && type !== 'event') {
      // Show success message for products
      setTimeout(() => setCartOpen(true), 100);
    }
  };

  const removeFromCart = (id: string, type: string) => {
    setCart(prev => prev.filter(item => !(item.id === id && item.type === type)));
  };

  const updateQuantity = (id: string, type: string, newQuantity: number) => {
    if (newQuantity === 0) {
      removeFromCart(id, type);
      return;
    }
    setCart(prev =>
      prev.map(item =>
        item.id === id && item.type === type
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalEcoPoints = () => {
    return cart.reduce((total, item) => total + (item.ecoPoints * item.quantity), 0);
  };

  const getAmenityIcon = (amenity: string) => {
    const icons = {
      wifi: <Wifi className="w-4 h-4" />,
      meals: <Coffee className="w-4 h-4" />,
      parking: <Car className="w-4 h-4" />,
      garden: <Heart className="w-4 h-4" />,
      cultural: <Users className="w-4 h-4" />,
      nature: <MapPin className="w-4 h-4" />,
      safari: <Camera className="w-4 h-4" />
    };
    return icons[amenity as keyof typeof icons] || <Check className="w-4 h-4" />;
  };

  // Homestay Card Component
  const HomestayCard: React.FC<{ homestay: Homestay }> = ({ homestay }) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      <div className="relative">
        <img
          src={homestay.image}
          alt={homestay.name}
          className="w-full h-48 object-cover"
        />
        {homestay.verified && (
          <div className="absolute top-3 left-3 bg-jungle-green text-white px-2 py-1 rounded-full text-xs flex items-center gap-1">
            <Verified className="w-3 h-3" />
            Verified
          </div>
        )}
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
          ₹{homestay.price}/night
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="font-semibold text-lg text-gray-900">{homestay.name}</h3>
            <p className="text-gray-600 text-sm flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {homestay.location}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warm-yellow text-warm-yellow" />
            <span className="text-sm font-medium">{homestay.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-3">{homestay.description}</p>
        
        <div className="flex items-center gap-2 mb-3 flex-wrap">
          {homestay.amenities.map((amenity) => (
            <div
              key={amenity}
              className="flex items-center gap-1 text-jungle-green text-xs bg-jungle-green bg-opacity-10 px-2 py-1 rounded-full"
            >
              {getAmenityIcon(amenity)}
              <span className="capitalize">{amenity}</span>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Host: {homestay.host}
          </div>
          <button
            onClick={() => setBookingModal({ open: true, item: homestay })}
            className="bg-terracotta text-white px-4 py-2 rounded-lg hover:bg-terracotta-dark transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </motion.div>
  );

  // Product Card Component
  const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 right-3 bg-warm-yellow text-gray-900 px-2 py-1 rounded-full text-xs font-medium">
          +{product.ecoPoints} eco points
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{product.title}</h3>
            <div className="flex items-center gap-2 mb-2">
              <img
                src={product.artisanImage}
                alt={product.artisan}
                className="w-6 h-6 rounded-full object-cover"
              />
              <span className="text-sm text-gray-600">{product.artisan}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-warm-yellow text-warm-yellow" />
            <span className="text-sm font-medium">{product.rating}</span>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-3">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
            <div className="text-xs text-gray-500">{product.inStock} left</div>
          </div>
          <button
            onClick={() => addToCart(product, 'product')}
            className="bg-jungle-green text-white px-4 py-2 rounded-lg hover:bg-jungle-green-dark transition-colors flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );

  // Event Card Component
  const EventCard: React.FC<{ event: Event }> = ({ event }) => (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -4 }}
    >
      <div className="relative">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-3 left-3">
          {event.isFree ? (
            <div className="bg-jungle-green text-white px-3 py-1 rounded-full text-sm font-medium">
              FREE
            </div>
          ) : (
            <div className="bg-terracotta text-white px-3 py-1 rounded-full text-sm font-medium">
              ₹{event.ticketPrice}
            </div>
          )}
        </div>
        <div className="absolute bottom-3 right-3 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {event.duration}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-900 mb-1">{event.title}</h3>
            <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {new Date(event.date).toLocaleDateString()}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {event.location}
              </div>
            </div>
          </div>
        </div>
        
        <p className="text-gray-700 text-sm mb-4">{event.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="text-xs text-gray-500">
            {event.maxCapacity} max capacity • +{event.ecoPoints} eco points
          </div>
          <button
            onClick={() => {
              if (event.isFree) {
                addToCart(event, 'event', { eventDate: event.date });
              } else {
                setBookingModal({ open: true, item: event });
              }
            }}
            className={`px-4 py-2 rounded-lg transition-colors ${
              event.isFree
                ? 'bg-jungle-green text-white hover:bg-jungle-green-dark'
                : 'bg-terracotta text-white hover:bg-terracotta-dark'
            }`}
          >
            {event.isFree ? 'Join Now' : 'Book Ticket'}
          </button>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Marketplace</h1>
              <p className="text-gray-600 mt-1">Stay, Shop, and Experience Jharkhand with Locals</p>
            </div>
            
            {/* Cart Button */}
            <button
              onClick={() => setCartOpen(true)}
              className="relative bg-jungle-green text-white p-3 rounded-full hover:bg-jungle-green-dark transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cart.length > 0 && (
                <div className="absolute -top-2 -right-2 bg-terracotta text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {cart.reduce((total, item) => total + item.quantity, 0)}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-sm mb-8">
              <div className="flex border-b">
                {[
                  { id: 'homestays', label: 'Homestays', icon: Home },
                  { id: 'handicrafts', label: 'Handicrafts', icon: ShoppingBag },
                  { id: 'events', label: 'Events', icon: Calendar }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 px-6 font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'text-jungle-green border-b-2 border-jungle-green bg-jungle-green bg-opacity-5'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <tab.icon className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </div>
              
              {/* Search and Filters */}
              <div className="p-4 border-b">
                <div className="flex gap-4 items-center">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder={`Search ${activeTab}...`}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jungle-green focus:border-transparent"
                    />
                  </div>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="w-5 h-5" />
                    Filters
                  </button>
                </div>
              </div>
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {activeTab === 'homestays' && (
                <motion.div
                  key="homestays"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {homestays.map((homestay) => (
                    <HomestayCard key={homestay.id} homestay={homestay} />
                  ))}
                </motion.div>
              )}

              {activeTab === 'handicrafts' && (
                <motion.div
                  key="handicrafts"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                >
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </motion.div>
              )}

              {activeTab === 'events' && (
                <motion.div
                  key="events"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <AnimatePresence>
        {cartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 overflow-y-auto"
            >
              <div className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold">Your Cart</h3>
                  <button
                    onClick={() => setCartOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 p-4">
                {cart.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map((item, index) => (
                      <div key={`${item.id}-${item.type}-${index}`} className="flex gap-3 p-3 bg-gray-50 rounded-lg">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{item.title}</h4>
                          <p className="text-xs text-gray-500 capitalize">{item.type}</p>
                          <div className="flex items-center justify-between mt-2">
                            <span className="font-semibold">₹{item.price}</span>
                            {item.type === 'product' && (
                              <div className="flex items-center gap-1">
                                <button
                                  onClick={() => updateQuantity(item.id, item.type, item.quantity - 1)}
                                  className="p-1 hover:bg-white rounded"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm w-8 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.type, item.quantity + 1)}
                                  className="p-1 hover:bg-white rounded"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            )}
                            <button
                              onClick={() => removeFromCart(item.id, item.type)}
                              className="p-1 hover:bg-white rounded text-red-500"
                            >
                              <X className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t p-4">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Total:</span>
                      <span className="font-semibold">₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-jungle-green">
                      <span>Eco Points:</span>
                      <span className="font-semibold">+{getTotalEcoPoints()}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      setCheckoutModal(true);
                    }}
                    className="w-full bg-jungle-green text-white py-3 rounded-lg hover:bg-jungle-green-dark transition-colors font-medium"
                  >
                    Checkout
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Booking Modal */}
      <AnimatePresence>
        {bookingModal.open && bookingModal.item && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setBookingModal({ open: false, item: null })}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  {'name' in bookingModal.item ? 'Book Homestay' : 'Book Event'}
                </h3>
                <button
                  onClick={() => setBookingModal({ open: false, item: null })}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                {'name' in bookingModal.item ? (
                  // Homestay booking form
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Check-in
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jungle-green"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Check-out
                        </label>
                        <input
                          type="date"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jungle-green"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Guests
                      </label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jungle-green">
                        {Array.from({ length: bookingModal.item.maxGuests }, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} Guest{i > 0 ? 's' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                ) : (
                  // Event booking form
                  <div>
                    <p className="text-sm text-gray-600 mb-4">
                      Booking for: {bookingModal.item.title}
                    </p>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="text-sm">
                        <div className="flex justify-between mb-1">
                          <span>Date:</span>
                          <span>{new Date(bookingModal.item.date).toLocaleDateString()}</span>
                        </div>
                        <div className="flex justify-between mb-1">
                          <span>Duration:</span>
                          <span>{bookingModal.item.duration}</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Price:</span>
                          <span>₹{bookingModal.item.ticketPrice}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={() => {
                    addToCart(
                      bookingModal.item!,
                      'name' in bookingModal.item! ? 'homestay' : 'event',
                      'name' in bookingModal.item! 
                        ? { checkIn: '2025-04-01', checkOut: '2025-04-03', guests: 2 }
                        : { eventDate: bookingModal.item!.date }
                    );
                    setBookingModal({ open: false, item: null });
                    setCartOpen(true);
                  }}
                  className="w-full bg-jungle-green text-white py-3 rounded-lg hover:bg-jungle-green-dark transition-colors font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Checkout Modal */}
      <AnimatePresence>
        {checkoutModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setCheckoutModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl max-w-md w-full p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Checkout</h3>
                <button
                  onClick={() => setCheckoutModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-medium mb-2">Order Summary</h4>
                  {cart.map((item, index) => (
                    <div key={`${item.id}-${index}`} className="flex justify-between text-sm mb-1">
                      <span>{item.title} x{item.quantity}</span>
                      <span>₹{item.price * item.quantity}</span>
                    </div>
                  ))}
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span>₹{getTotalPrice()}</span>
                    </div>
                    <div className="flex justify-between text-sm text-jungle-green">
                      <span>Eco Points Earned:</span>
                      <span>+{getTotalEcoPoints()}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="font-medium">Payment Method</h4>
                  <div className="space-y-2">
                    {[
                      { id: 'upi', label: 'UPI', icon: Smartphone },
                      { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                      { id: 'netbanking', label: 'Net Banking', icon: Building2 }
                    ].map((method) => (
                      <label key={method.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                        <input type="radio" name="payment" value={method.id} className="text-jungle-green" />
                        <method.icon className="w-5 h-5 text-gray-600" />
                        <span>{method.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => {
                    // Simulate successful payment
                    setCheckoutModal(false);
                    setCart([]);
                    alert(`🎉 Booking Confirmed! Order ID: JH${Date.now()}. You earned ${getTotalEcoPoints()} eco-points!`);
                  }}
                  className="w-full bg-jungle-green text-white py-3 rounded-lg hover:bg-jungle-green-dark transition-colors font-medium"
                >
                  Pay ₹{getTotalPrice()}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MarketplacePage;
