import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin, Leaf } from 'lucide-react';

const Footer = () => {
  const quickLinks = [
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Help Center', path: '/help' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Emergency', path: '/emergency' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: '#', color: 'text-blue-600' },
    { name: 'Twitter', icon: Twitter, url: '#', color: 'text-blue-400' },
    { name: 'Instagram', icon: Instagram, url: '#', color: 'text-pink-600' },
    { name: 'YouTube', icon: Youtube, url: '#', color: 'text-red-600' }
  ];

  return (
    <footer className="bg-gradient-to-r from-jungle-green-800 to-jungle-green-900 text-white relative overflow-hidden">
      {/* Tribal Art Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 left-4 w-24 h-24 border-2 border-white rounded-full"></div>
        <div className="absolute top-8 right-8 w-16 h-16 border-2 border-white transform rotate-45"></div>
        <div className="absolute bottom-8 left-1/4 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute bottom-4 right-1/4 w-12 h-12 border-2 border-white transform rotate-12"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-white p-2 rounded-xl">
                <Leaf className="w-6 h-6 text-jungle-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Explore Jharkhand</h2>
                <p className="text-jungle-green-200 text-sm">Discover the Heart of India</p>
              </div>
            </div>
            <p className="text-jungle-green-100 mb-4 max-w-md">
              Experience the rich tribal heritage, pristine forests, and vibrant culture of Jharkhand. 
              Your gateway to sustainable tourism and authentic local experiences.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+91-1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>hello@explorejharkhand.gov.in</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-jungle-green-200 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Government Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Government</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start space-x-2">
                <MapPin className="w-4 h-4 mt-1 text-jungle-green-300" />
                <div className="text-jungle-green-200">
                  <p>Government of Jharkhand</p>
                  <p>Tourism Department</p>
                  <p>Ranchi, Jharkhand 834001</p>
                </div>
              </div>
              <div className="pt-2 border-t border-jungle-green-700">
                <p className="text-xs text-jungle-green-300">
                  Developed under Smart India Hackathon 2024
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Social Media & Bottom Bar */}
        <div className="border-t border-jungle-green-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <span className="text-sm text-jungle-green-200">Follow Us:</span>
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    className="p-2 bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
                    aria-label={social.name}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            
            <div className="text-center md:text-right text-sm text-jungle-green-200">
              <p>&copy; 2024 Government of Jharkhand. All rights reserved.</p>
              <p className="text-xs mt-1">
                Made with ❤️ for sustainable tourism in Jharkhand
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
