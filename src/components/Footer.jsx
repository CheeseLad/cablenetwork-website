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
            © {currentYear} Cable Network. All rights reserved.
          </p>
        </div>
        <div className="flex justify-center space-x-6">
          <a
            href="https://store.cablenetwork.xyz"
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
            href="#"
            className="text-2xl text-green-500 hover:text-green-600 transition duration-300"
          >
            <FontAwesomeIcon icon={faSteam} />
          </a>
          <a
            href="#"
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
