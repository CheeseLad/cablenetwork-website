// src/StaffPage.js

import React from 'react';
import cheeselad from '../assets/staff/cheeselad.png';
import beans from '../assets/staff/beans.png';
import robot24 from '../assets/staff/robot24.png';
import prophet from '../assets/staff/prophet.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDiscord, faSteam } from '@fortawesome/free-brands-svg-icons';

const staffMembers = [
  {
    name: 'CheeseLad',
    position: 'Server Owner',
    image: cheeselad,
    steam: 'https://steamcommunity.com/id/tastycheese101',
    discord: 'https://discordapp.com/users/cheeselad'
  },
  {
    name: 'Beans',
    position: 'Server Manager',
    image: beans,
    steam: 'https://steamcommunity.com/id/bobsmith',
    discord: 'https://discordapp.com/users/bobsmith'
  },
  {
    name: 'RoBoT24',
    position: 'Head-Developer',
    image: robot24,
    steam: 'https://steamcommunity.com/id/charliebrown',
    discord: 'https://discordapp.com/users/charliebrown'
  },
  {
    name: 'Prophet',
    position: 'Head-Of-Staff',
    image: prophet,
    steam: 'https://steamcommunity.com/id/davidlee',
    discord: 'https://discordapp.com/users/davidlee'
  }
];

const StaffPage = () => {
  return (
    <div className="bg-gray-100 p-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-green-500">Meet Our Staff</h1>
        <p className="text-xl text-gray-600">Dedicated professionals who make everything happen</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {staffMembers.map((member, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <img
              src={member.image}
              alt={member.name}
              className="w-32 h-32 rounded-full object-cover mb-4"
            />
            <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
            <p className="text-gray-500 mb-4">{member.position}</p>
            <div className="flex space-x-4">
              {member.steam && (
                <a
                  href={member.steam}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-600 hover:text-green-500"
                >
                  <FontAwesomeIcon icon={faSteam} />
                </a>
              )}
              {member.discord && (
                <a
                  href={member.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-3xl text-gray-600 hover:text-green-500"
                >
                  <FontAwesomeIcon icon={faDiscord} />
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StaffPage;
