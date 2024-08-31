import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.png';
import navItems from '../navItems.json';

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
                <span className="font-semibold text-gray-500 text-lg">Cable Creative Roleplay</span>
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              if (item.dropdown) {
                return (
                  <div
                    key={item.name}
                    className="relative"
                    onMouseEnter={() => handleDropdownMouseEnter(item.name)}
                    onMouseLeave={handleDropdownMouseLeave}
                  >
                    <button className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 relative">
                      {item.name}
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                        {item.items.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            target={subItem.external ? "_blank" : "_self"}
                            rel={subItem.external ? "noopener noreferrer" : ""}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
              return (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.external ? "_blank" : "_self"}
                  rel={item.external ? "noopener noreferrer" : ""}
                  className="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300 relative"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 hover:scale-x-100 transition-transform duration-300"></span>
                </a>
              );
            })}
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
        <div className="mobile-menu md:hidden bg-white shadow-lg z-20">
          {navItems.map((item) => (
            <React.Fragment key={item.name}>
              {item.dropdown ? (
                <>
                  <div className="relative">
                    <button className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300">
                      {item.name}
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute left-0 mt-2 w-full bg-white rounded-md shadow-lg">
                        {item.items.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            target={subItem.external ? "_blank" : "_self"}
                            rel={subItem.external ? "noopener noreferrer" : ""}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-green-500 hover:text-white"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </>
              ) : (
                <a
                  href={item.href}
                  target={item.external ? "_blank" : "_self"}
                  rel={item.external ? "noopener noreferrer" : ""}
                  className="block py-2 px-4 text-sm hover:bg-green-500 hover:text-white transition duration-300"
                >
                  {item.name}
                </a>
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
