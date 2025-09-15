import { 
  Mail, 
  Phone, 
  ChevronDown, 
  ChevronUp, 
  Bot,
  Shield,
  Leaf,
  Home,
  Globe,
  Facebook,
  Instagram,
  Twitter,
  Send,
  Award,
  Users,
  Heart
} from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const AboutPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const faqs = [
    {
      question: 'How do I book a homestay?',
      answer: 'Go to Marketplace → Homestays, choose your stay, and click Book Now. You can select dates, view amenities, and complete secure payment through our platform.'
    },
    {
      question: 'Is the platform free for tourists?',
      answer: 'Yes, browsing and planning are completely free. You only pay for actual bookings (homestays, events) or purchases (handicrafts). All planning features, AI recommendations, and maps are free to use.'
    },
    {
      question: 'How are local artisans verified?',
      answer: 'Each artisan is verified through the Jharkhand Tourism Department and receives a digital certificate. We verify their identity, craft authenticity, and quality standards before listing their products.'
    },
    {
      question: 'What happens if I face an issue during my trip?',
      answer: 'Use the SOS button for emergencies or contact our 24/7 support helpline. Our local support team can assist with accommodation issues, travel problems, or any safety concerns.'
    },
    {
      question: 'Can I use the platform offline?',
      answer: 'Yes, itineraries can be downloaded as PDFs with offline maps and emergency contacts. Essential features like SOS and saved content work offline, though live updates require internet.'
    }
  ];

  const keyFeatures = [
    {
      icon: Bot,
      title: 'AI Personalized Planning',
      description: 'Smart itineraries tailored to your interests, budget, and travel style using advanced AI algorithms.',
      color: 'text-blue-600'
    },
    {
      icon: Shield,
      title: 'Verified & Secure Services',
      description: 'All homestays, guides, and services are government-verified with secure payment processing.',
      color: 'text-green-600'
    },
    {
      icon: Leaf,
      title: 'Sustainable Eco-Tourism',
      description: 'Promoting responsible travel that preserves Jharkhand\'s natural heritage and environment.',
      color: 'text-emerald-600'
    },
    {
      icon: Home,
      title: 'Empowering Local Communities',
      description: 'Directly connecting tourists with local families, artisans, and community-based tourism initiatives.',
      color: 'text-purple-600'
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // API call would go here: /support/contact
    console.log('Contact form submitted:', formData);
    alert('Thank you for your message! Our support team will respond within 24 hours.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero / Header Section */}
      <section className="bg-gradient-to-r from-jungle-green-600 to-jungle-green-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:flex-row items-center justify-between"
          >
            {/* Government Logo */}
            <div className="flex items-center mb-6 lg:mb-0">
              <div className="bg-white p-4 rounded-full shadow-lg mr-6">
                <Award className="w-12 h-12 text-jungle-green-600" />
              </div>
              <div className="text-white">
                <p className="text-sm uppercase tracking-wide">Government of Jharkhand</p>
                <p className="text-xs opacity-80">Department of Tourism</p>
              </div>
            </div>

            {/* Tagline Center */}
            <div className="text-center text-white">
              <h1 className="text-4xl lg:text-5xl font-bold mb-4">
                Smart Tourism for Eco & Cultural Jharkhand
              </h1>
              <p className="text-xl lg:text-2xl text-jungle-green-100 font-light">
                Powered by AI to connect people, culture, and nature
              </p>
            </div>

            {/* Additional Badge */}
            <div className="hidden lg:flex items-center text-white">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg p-4 text-center">
                <Users className="w-8 h-8 mx-auto mb-2" />
                <p className="text-sm font-semibold">Trusted Platform</p>
                <p className="text-xs opacity-80">Est. 2024</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-8">Our Mission</h2>
            <p className="text-xl text-gray-700 leading-relaxed mb-8">
              We aim to promote eco-tourism and cultural heritage of Jharkhand by leveraging 
              AI-powered itineraries, interactive maps, verified local homestays, and tribal crafts. 
              Our vision is to empower local communities while providing tourists with safe, 
              authentic, and sustainable experiences.
            </p>
            <div className="flex items-center justify-center">
              <Heart className="w-8 h-8 text-red-500 mr-3" />
              <span className="text-lg font-semibold text-gray-800">
                Connecting Hearts, Preserving Heritage
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Our Platform</h2>
            <p className="text-xl text-gray-600">Innovative features designed for modern travelers</p>
          </div>

          <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-8">
            {keyFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                >
                  <div className={`w-20 h-20 ${feature.color.replace('text-', 'bg-').replace('600', '100')} rounded-full flex items-center justify-center mx-auto mb-6`}>
                    <IconComponent className={`w-10 h-10 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Find answers to common questions about our platform</p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-100 transition-colors"
                >
                  <span className="text-lg font-semibold text-gray-900">{faq.question}</span>
                  <div className="flex-shrink-0 ml-4">
                    {openFAQ === index ? (
                      <ChevronUp className="w-6 h-6 text-jungle-green-600" />
                    ) : (
                      <ChevronDown className="w-6 h-6 text-jungle-green-600" />
                    )}
                  </div>
                </button>
                {openFAQ === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-8 pb-6"
                  >
                    <p className="text-gray-700 text-base leading-relaxed">{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-jungle-green-50 to-terracotta-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get Support & Contact Us</h2>
            <p className="text-xl text-gray-600">We're here to help you 24/7</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 p-4 rounded-full mr-6">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Tourism Helpline</h4>
                    <p className="text-blue-600 font-semibold text-lg">+91-1800-xxxx-xxx</p>
                    <p className="text-gray-600 text-sm">24/7 Support Available</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-green-100 p-4 rounded-full mr-6">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email Support</h4>
                    <p className="text-green-600 font-semibold">support@explorejharkhand.in</p>
                    <p className="text-gray-600 text-sm">Response within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="bg-purple-100 p-4 rounded-full mr-6">
                    <Globe className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Official Website</h4>
                    <p className="text-purple-600 font-semibold">jharkhandtourism.in</p>
                    <p className="text-gray-600 text-sm">Government Portal</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Send us a Message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jungle-green-500 focus:border-transparent"
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jungle-green-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-jungle-green-500 focus:border-transparent resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-jungle-green-600 hover:bg-jungle-green-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors flex items-center justify-center"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Quick Links */}
            <div>
              <h4 className="text-xl font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                <li>
                  <a href="/privacy" className="text-gray-300 hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-300 hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/help" className="text-gray-300 hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-xl font-bold mb-6">Follow Us</h4>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a 
                  href="#" 
                  className="bg-pink-600 p-3 rounded-full hover:bg-pink-700 transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
                <a 
                  href="#" 
                  className="bg-blue-400 p-3 rounded-full hover:bg-blue-500 transition-colors"
                >
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </div>

            {/* Credits */}
            <div>
              <h4 className="text-xl font-bold mb-6">Development</h4>
              <p className="text-gray-300 mb-4">
                Developed under SIH 2025 by Team Digital Drifters
              </p>
              <p className="text-sm text-gray-400">
                © 2025 Government of Jharkhand. All rights reserved.
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              Smart India Hackathon 2025 • Promoting Digital Tourism in Jharkhand
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
