import React from 'react';
import { Bell, Globe, ChevronDown } from 'lucide-react';
import logoSvg from '../../assets/logo.svg';

interface AppHeaderProps {
  title?: string;
  showNotifications?: boolean;
  showLanguage?: boolean;
}

const AppHeader: React.FC<AppHeaderProps> = ({ 
  title = "Jharkhand Tourism",
  showNotifications = true,
  showLanguage = true 
}) => {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        {/* Logo and Title */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-14 h-14">
            <img src={logoSvg} alt="Jharkhand Tourism Logo" className="w-12 h-12" />
          </div>
          <div>
            <h1 className="text-heading font-heading text-jungle-green-600">
              {title}
            </h1>
            <p className="text-xs text-gray-500">Explore • Experience • Enjoy</p>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {/* Language Switcher */}
          {showLanguage && (
            <button className="flex items-center space-x-1 px-2 py-1 rounded-lg hover:bg-gray-100 transition-colors">
              <Globe className="w-4 h-4 text-gray-600" />
              <span className="text-sm text-gray-700">EN</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
          )}

          {/* Notifications */}
          {showNotifications && (
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Bell className="w-5 h-5 text-gray-600" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
