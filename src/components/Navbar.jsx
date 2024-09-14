import React, { useState, useCallback } from 'react';
import logo from '../assets/logo.png';
import navItems from '../navItems.json';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleDropdownToggle = useCallback((dropdownName) => {
    setActiveDropdown(prev => prev === dropdownName ? null : dropdownName);
  }, []);

  const NavItem = ({ item, isMobile }) => {
    const isDropdown = item.dropdown;
    const isActive = activeDropdown === item.name;

    const commonClasses = `
      py-2 px-4 text-gray-500 font-semibold hover:text-green-500 transition duration-300
      ${isMobile ? 'block w-full text-left' : 'inline-block relative'}
    `;

    const handleClick = isDropdown ? () => handleDropdownToggle(item.name) : undefined;

    return (
      <div className={isMobile ? 'w-full' : 'relative'}>
        {isDropdown ? (
          <button
            onClick={handleClick}
            className={commonClasses}
            aria-haspopup="true"
            aria-expanded={isActive}
          >
            {item.name}
            {!isMobile && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            )}
          </button>
        ) : (
          <a
            href={item.href}
            target={item.external ? "_blank" : "_self"}
            rel={item.external ? "noopener noreferrer" : ""}
            className={commonClasses}
          >
            {item.name}
            {!isMobile && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            )}
          </a>
        )}
        {isDropdown && isActive && (
          <div className={`bg-white rounded-md shadow-lg z-20 ${isMobile ? 'w-full' : 'absolute right-0 mt-2 w-48'}`}>
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
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-7">
            <a href="/" className="flex items-center py-4 px-2">
              <img src={logo} alt="Logo" className="h-10 w-10 mr-2"/>
              <span className="font-semibold text-gray-500 text-lg">Cable Creative Roleplay</span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} isMobile={false} />
            ))}
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="outline-none"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-6 h-6 text-gray-500 hover:text-green-500"
                fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg z-20">
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} isMobile={true} />
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;