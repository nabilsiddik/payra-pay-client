import { useState, useRef, useEffect } from 'react';
import logo from '../assets/images/logo/logo.png'
import {
  Search,
  Bell,
  ChevronDown,
  Home,
  Users,
  User
} from 'lucide-react';
import { Link } from 'react-router';

// Standalone Navigation Header Component (Static Logged-In View)
export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // A static user object for display purposes
  const user = {
    email: 'user@example.com',
    displayName: 'User',
    photoURL: 'https://placehold.co/100x100/EFEFEF/4A4A4A?text=U'
  };

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handlers for mouse enter/leave to manage dropdown visibility with a delay
  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsUserDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsUserDropdownOpen(false);
    }, 150); // Small delay to prevent flicker
  };

  // Toggles dropdown on click
  const handleDropdownClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  // Navigation items configuration
  const navItems = [
    { name: 'Dashboard', icon: Home, slug: '/dashboard' },
    { name: 'Login', icon: Users, slug: '/login' },
    { name: 'Sign Up', icon: Users, slug: '/signup' },
  ];

  return (
    <div className="mx-4 sm:mx-6 mt-2 font-sans">
      <header className="relative">
        <div className="bg-primary border border-gray-800 rounded-2xl shadow-2xl p-4 text-white">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Logo and Desktop Navigation */}
            <div className="flex items-center space-x-2 sm:space-x-8">
              <div className='flex items-center gap-1'>
                <img src={logo} className='w-[60px]' alt="payra pay logo" />
                <h2 className='font-bold text-2xl mb-3'>Payra Pay</h2>
              </div>

              <nav className="hidden lg:flex space-x-1">
                {navItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Link key={index} to={`/${item.slug}`}>
                      <button
                        key={item.name}
                        onClick={() => setActiveTab(item.name)}
                        className={`
                        flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-300
                        ${activeTab === item.name
                            ? 'bg-gray-800 text-white'
                            : 'hover:text-white hover:bg-gray-900'}
                      `}
                      >
                        <Icon size={18} />
                        <span className="font-medium">{item.name}</span>
                      </button>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Menu Hamburger Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-gray-900 border border-gray-700 hover:bg-gray-800 transition-all duration-300"
              >
                <div className="w-5 h-5 flex flex-col justify-center items-center">
                  <div className={`w-4 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-0.5' : ''}`}></div>
                  <div className={`w-4 h-0.5 bg-white mt-1 transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></div>
                  <div className={`w-4 h-0.5 bg-white mt-1 transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></div>
                </div>
              </button>
            </div>

            {/* Right side: Search, Notifications, and User Profile */}
            <div className="flex items-center space-x-2 sm:space-x-4">

              <button className="sm:hidden p-2 rounded-xl bg-gray-900 border border-gray-700 hover:bg-gray-800 transition-all duration-300">
                <Search className="h-5 w-5 text-gray-400" />
              </button>

              <button className="
                relative p-2 rounded-xl bg-gray-900 border border-gray-700
                hover:bg-gray-800 transition-all duration-300 group
              ">
                <Bell className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
              </button>

              {/* User Profile Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div
                  className="flex items-center space-x-1 sm:space-x-3 cursor-pointer hover:bg-gray-900 p-2 rounded-xl transition-all duration-300"
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  onClick={handleDropdownClick}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center border border-gray-700">
                    {user.photoURL ? (
                      <img
                        src={user.photoURL}
                        alt="User avatar"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <User className="h-5 w-5 text-white" />
                    )}
                  </div>
                  <ChevronDown className={`h-4 w-4 text-gray-500 hidden sm:block transition-transform duration-300 ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
                </div>

                {/* Dropdown Menu */}
                {isUserDropdownOpen && (
                  <div
                    className="absolute right-0 mt-2 w-64 bg-black border border-gray-800 rounded-xl shadow-2xl py-2 z-50"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div className="px-4 py-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-800 flex items-center justify-center border border-gray-700">
                          {user.photoURL ? (
                            <img
                              src={user.photoURL}
                              alt="User avatar"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <User className="h-6 w-6 text-white" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">
                            {user.displayName || 'User'}
                          </p>
                          <p className="text-gray-400 text-sm truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {isMobileMenuOpen && (
            <div className="lg:hidden mt-4 pt-4 border-t border-gray-800">
              <nav className="grid grid-cols-2 gap-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.name}
                      onClick={() => {
                        setActiveTab(item.name);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`
                        flex items-center space-x-2 px-3 py-2 rounded-xl transition-all duration-300
                        ${activeTab === item.name
                          ? 'bg-gray-800 text-white'
                          : 'text-gray-400 hover:text-white hover:bg-gray-900'}
                      `}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{item.name}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}

