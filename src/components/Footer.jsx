import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { faCartShopping, faServer } from "@fortawesome/free-solid-svg-icons";
import { faDiscord, faSteam } from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white shadow-lg mt-auto">
      <div className="block py-1 bg-green-500"></div>
      <div className="max-w-6xl mx-auto px-4 py-4">
        <div className="text-center mb-4">
          <p className="text-gray-500">
            © 2020 - {currentYear} Cable Creative Roleplay. All rights reserved.
          </p>
        </div>
        <div className="flex justify-center space-x-6">
          <a
            href="https://cable-network.tebex.io"
            className="text-2xl text-green-500 hover:text-green-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faCartShopping} />
          </a>
          <a
            href="https://discord.gg/cable-network-702877615136178326"
            className="text-2xl text-green-500 hover:text-green-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faDiscord} />
          </a>
          <a
            href="https://steamcommunity.com/sharedfiles/filedetails/?id=2071736126"
            className="text-2xl text-green-500 hover:text-green-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faSteam} />
          </a>
          <a
            href="steam://rungameid/304930//+connect%2045.43.163.72:27019"
            className="text-2xl text-green-500 hover:text-green-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faServer} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
