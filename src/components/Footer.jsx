import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faCartShopping, faServer } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faSteam } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-[#131316] shadow-lg mt-auto dark:border-t dark:border-[#27272a] transition-colors duration-200">
      <div className="block py-1 bg-green-500"></div>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="text-center mb-4">
          <p className="text-gray-500 dark:text-[#a1a1aa]">
            © 2020 - {currentYear} Cable Creative Roleplay. All rights reserved.
          </p>
                    <p className="text-gray-500 dark:text-[#a1a1aa]">
            Made with ❤️ by <a 
              href="https://jakefarrell.ie" 
              aria-label="Jake Farrell's Personal Website" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-green-500 hover:shadow-green-500 text-gray-800 dark:text-white"
            >Jake Farrell</a>
          </p>
        </div>
        <div className="flex justify-center space-x-6">
          <a
            href="https://cable-network.tebex.io"
            aria-label="Cable Network Store"
            className="text-2xl text-green-500 hover:text-green-600 dark:hover:text-green-400 transition duration-300"
          >
            <FontAwesomeIcon icon={faCartShopping} />
          </a>
          <a
            href="https://discord.gg/cable-network-702877615136178326"
            aria-label="Discord Server"
            className="text-2xl text-green-500 hover:text-green-600 dark:hover:text-green-400 transition duration-300"
          >
            <FontAwesomeIcon icon={faDiscord} />
          </a>
          <a
            href="https://steamcommunity.com/sharedfiles/filedetails/?id=2071736126"
            aria-label="Steam Workshop Collection"
            className="text-2xl text-green-500 hover:text-green-600 dark:hover:text-green-400 transition duration-300"
          >
            <FontAwesomeIcon icon={faSteam} />
          </a>
          <a
            href="steam://rungameid/304930//+connect%2045.43.163.72:27019"
            aria-label="Connect to Unturned Server"
            className="text-2xl text-green-500 hover:text-green-600 dark:hover:text-green-400 transition duration-300"
          >
            <FontAwesomeIcon icon={faServer} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
