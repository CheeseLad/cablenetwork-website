import React, { useState, useCallback, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import navItems from '../navItems.json';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(prev => !prev);
  }, []);

  const handleDropdownToggle = useCallback((dropdownName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(prev => prev === dropdownName ? null : dropdownName);
  }, []);

  const handleDropdownEnter = useCallback((dropdownName) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveDropdown(dropdownName);
  }, []);

  const handleDropdownLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  }, []);

  const NavItem = ({ item, isMobile }) => {
    const isDropdown = item.dropdown;
    const isActive = activeDropdown === item.name;

    const commonClasses = `
      group py-2 px-4 text-gray-500 dark:text-[#a1a1aa] font-semibold hover:text-green-500 dark:hover:text-green-400 transition duration-300
      focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded
      ${isMobile ? 'block w-full text-left' : 'inline-block relative'}
    `;

    const handleClick = isDropdown ? () => handleDropdownToggle(item.name) : undefined;
    const handleMouseEnter = !isMobile && isDropdown ? () => handleDropdownEnter(item.name) : undefined;
    const handleMouseLeave = !isMobile && isDropdown ? handleDropdownLeave : undefined;

    return (
      <div
        className={isMobile ? 'w-full' : 'relative'}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isDropdown ? (
          <button
            type="button"
            onClick={handleClick}
            className={`${commonClasses} ${!isMobile && isActive ? 'text-green-500 dark:text-green-400' : ''}`}
            aria-haspopup="true"
            aria-expanded={isActive}
          >
            {item.name}
            {!isMobile && (
              <span className={`absolute bottom-0 left-0 w-full h-1 bg-green-500 transform transition-transform duration-300 ${isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
            )}
          </button>
        ) : item.external ? (
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={commonClasses}
          >
            {item.name}
            {!isMobile && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            )}
          </a>
        ) : (
          <Link
            to={item.href}
            onClick={() => {
              if (isMobile) setIsMobileMenuOpen(false);
            }}
            className={commonClasses}
          >
            {item.name}
            {!isMobile && (
              <span className="absolute bottom-0 left-0 w-full h-1 bg-green-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            )}
          </Link>
        )}
        {isDropdown && isActive && (
          <div className={`z-20 ${isMobile ? 'w-full' : 'absolute left-0 top-full pt-2 w-52'}`}>
            <div className="bg-white dark:bg-[#1a1a20] rounded-md shadow-lg dark:border dark:border-[#27272a] py-1 overflow-hidden">
              {item.items.map((subItem) => (
                subItem.external ? (
                  <a
                    key={subItem.name}
                    href={subItem.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setActiveDropdown(null)}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-[#fafafa] hover:bg-green-500 hover:text-white transition-colors"
                  >
                    {subItem.name}
                  </a>
                ) : (
                  <Link
                    key={subItem.name}
                    to={subItem.href}
                    onClick={() => {
                      setActiveDropdown(null);
                      if (isMobile) setIsMobileMenuOpen(false);
                    }}
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-[#fafafa] hover:bg-green-500 hover:text-white transition-colors"
                  >
                    {subItem.name}
                  </Link>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <nav className="bg-white dark:bg-[#131316] shadow-lg dark:border-b dark:border-[#27272a] transition-colors duration-200">
      <div className="max-w-8xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div className="flex space-x-7">
            <Link
              to="/"
              onClick={() => {
                if (isMobileMenuOpen) setIsMobileMenuOpen(false);
              }}
              className="flex items-center py-4 px-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded"
            >
              <img src={logo} alt="Logo" className="h-10 w-10 mr-2"/>
              <span className="font-semibold text-gray-500 dark:text-[#fafafa] text-lg whitespace-nowrap">Cable Creative Roleplay</span>
            </Link>
          </div>
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => (
              <NavItem key={item.name} item={item} isMobile={false} />
            ))}
            <div className="ml-3 pl-3 border-l border-gray-200 dark:border-[#27272a]">
              <ThemeToggle />
            </div>
          </div>
          <div className="lg:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              className="outline-none focus-visible:ring-2 focus-visible:ring-green-500 rounded p-1"
              onClick={toggleMobileMenu}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              <svg className="w-6 h-6 text-gray-500 hover:text-green-500 dark:text-[#a1a1aa] dark:hover:text-green-400"
                fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#131316] shadow-lg z-20 border-t border-gray-100 dark:border-[#27272a]">
          {navItems.map((item) => (
            <NavItem key={item.name} item={item} isMobile={true} />
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;