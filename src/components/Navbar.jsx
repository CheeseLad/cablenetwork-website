import React, { useState } from 'react';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const handleDropdownMouseEnter = (dropdown) => {
    setActiveDropdown(dropdown);
  };

  const handleDropdownMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-7">
            <div>
              <a href="/" className="flex items-center py-4 px-2">
                <img src={logo} alt="Logo" className="h-10 w-10 mr-2"/>
                <span className="font-semibold text-gray-500 text-lg">Cable Network</span>
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            <a href="/" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 relative">
              Home
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            <a href="/staff" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 relative">
              Staff
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            <a href="/commands" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 relative">
              Commands
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
            </a>
            
            {/* Apply Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownMouseEnter('apply')}
            >
              <button className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 relative">
                Apply
                <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
              </button>
              {activeDropdown === 'apply' && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <a href="https://forms.gle/RRRr2fhtbHXucgvu7" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white">Staff Application</a>
                  <a href="https://forms.gle/yFDMAHUicjimtJ5z7" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white">Developer Application</a>
                </div>
              )}
            </div>

            {/* Rules Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleDropdownMouseEnter('rules')}
            >
              <button className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 relative">
                Rules
                <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
              </button>
              {activeDropdown === 'rules' && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                  <a href="/discord-rules" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white">Discord Rules</a>
                  <a href="/server-rules" className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white">Server Rules</a>
                </div>
              )}
            </div>

            <a href="/contact" className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 relative">
              Contact
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
            </a>

            <a href="https://discord.gg/cable-network-702877615136178326" className="ml-4 px-4 py-2 text-white bg-purple-500 rounded-full font-bold hover:bg-purple-600 transition duration-300 shadow-md">
              Discord
            </a>
            <a href="https://store.cablenetwork.xyz" className="ml-4 px-4 py-2 text-white bg-green-500 rounded-full font-bold hover:bg-green-600 transition duration-300 shadow-md">
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
          <a href="/" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Home</a>
          <a href="/staff" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Staff</a>
          <a href="/commands" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Commands</a>
          <a href="https://forms.gle/RRRr2fhtbHXucgvu7" target="_blank" rel="noopener noreferrer" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Staff Application</a>
          <a href="https://forms.gle/yFDMAHUicjimtJ5z7" target="_blank" rel="noopener noreferrer" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Developer Application</a>
          <a href="/discord-rules" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Discord Rules</a>
          <a href="/server-rules" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Server Rules</a>
          <a href="/contact" className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">Contact</a>
          <a href="https://discord.gg/cable-network-702877615136178326" className="block py-2 px-4 text-sm bg-purple-500 text-white hover:bg-purple-600 transition duration-300">Discord</a>
          <a href="https://store.cablenetwork.xyz" className="block py-2 px-4 text-sm bg-green-500 text-white hover:bg-green-600 transition duration-300">Store</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
