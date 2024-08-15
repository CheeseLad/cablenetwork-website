import React, { useState } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-7">
            <div>
              <a href="#" className="flex items-center py-4 px-2">
                <img src={logo} alt="Logo" className="h-10 w-10 mr-2"/>
                <span className="font-semibold text-gray-500 text-lg">Cable Network</span>
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <a href="#" className="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold">Home</a>
            <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 relative group">
              About
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 relative group">
              Servers
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            
            {/* Apply Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('apply')} 
                onMouseEnter={() => setActiveDropdown('apply')}
                onMouseLeave={() => setActiveDropdown(null)}
                className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 relative group"
              >
                Apply
                <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
              {activeDropdown === 'apply' && (
                <div 
                  onMouseEnter={() => setActiveDropdown('apply')}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                >
                  <a href="https://forms.google.com/staff-application" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white">Staff Application</a>
                  <a href="https://forms.google.com/dev-application" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white">Developer Application</a>
                </div>
              )}
            </div>

            {/* Rules Dropdown */}
            <div className="relative group">
              <button 
                onClick={() => toggleDropdown('rules')}
                onMouseEnter={() => setActiveDropdown('rules')}
                onMouseLeave={() => setActiveDropdown(null)}
                className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 relative group"
              >
                Rules
                <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
              </button>
              {activeDropdown === 'rules' && (
                <div 
                  onMouseEnter={() => setActiveDropdown('rules')}
                  onMouseLeave={() => setActiveDropdown(null)}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10"
                >
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white">Discord Rules</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white">Server Rules</a>
                </div>
              )}
            </div>

            <a href="#" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 relative group">
              Contact
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </a>

            {/* Store Button */}
            <a href="#" className="ml-4 px-6 py-2 text-white bg-green-500 rounded-full font-bold hover:bg-green-600 transition duration-300 shadow-md">
              Store
            </a>
          </div>
          <div className="md:hidden flex items-center">
            <button className="outline-none mobile-menu-button" onClick={() => setIsOpen(!isOpen)}>
              <svg className="w-6 h-6 text-gray-500 hover:text-green-500"
                fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="mobile-menu md:hidden">
          <a href="#" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Home</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">About</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Servers</a>
          <a href="https://forms.google.com/staff-application" target="_blank" rel="noopener noreferrer" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Staff Application</a>
          <a href="https://forms.google.com/dev-application" target="_blank" rel="noopener noreferrer" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Developer Application</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Discord Rules</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Server Rules</a>
          <a href="#" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Contact</a>
          <a href="#" className="block py-2 px-4 text-sm bg-green-500 text-white hover:bg-green-600 transition duration-300">Store</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;