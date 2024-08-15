// src/StaffPage.js

import React from 'react';

const staffMembers = [
  {
    name: 'Alice Johnson',
    position: 'Developer',
    image: 'https://via.placeholder.com/150',
    steam: 'https://steamcommunity.com/id/alicejohnson',
    discord: 'https://discordapp.com/users/alicejohnson'
  },
  {
    name: 'Bob Smith',
    position: 'Designer',
    image: 'https://via.placeholder.com/150',
    steam: 'https://steamcommunity.com/id/bobsmith',
    discord: 'https://discordapp.com/users/bobsmith'
  },
  {
    name: 'Charlie Brown',
    position: 'Marketing',
    image: 'https://via.placeholder.com/150',
    steam: 'https://steamcommunity.com/id/charliebrown',
    discord: 'https://discordapp.com/users/charliebrown'
  },
  {
    name: 'David Lee',
    position: 'Support',
    image: 'https://via.placeholder.com/150',
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
                  className="text-gray-600 hover:text-green-500"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.623 3.645 10.365 8.536 11.761-.118-.75-.223-1.92-.091-2.764.234-1.452 1.057-2.617 2.232-3.346 2.391-1.228 5.391-.834 7.322.38.32.21.654.367 1.011.484-.485-1.071-.866-2.166-1.179-3.305-.492-1.621-1.072-3.238-2.06-4.558-.768-1.08-1.766-1.981-2.84-2.557C12.907 2.646 12.012 2 11 2c-4.151 0-7.5 3.355-7.5 7.5 0 1.712.673 3.304 1.847 4.489.882.879 2.059 1.439 3.286 1.665 1.057.16 2.178.235 3.284.235 1.222 0 2.444-.104 3.662-.31.382-.048.767-.144 1.141-.247.315.253.611.53.854.835.768 1.14 1.411 2.368 1.95 3.592.389.956.639 1.987.751 3.013.097.758.128 1.529.115 2.296 4.688-.765 8.003-4.545 10.685-9.917 10.685-3.978 0-7.314-3.244-7.314-7.309 0-.722.097-1.469.275-2.2-.142.035-.288.066-.436.066-1.014 0-1.934-.649-2.266-1.589-.123-.26-.264-.493-.43-.71-.325-.43-.798-.75-1.328-1.015.947-1.182 2.048-2.228 3.241-3.207 1.414-1.029 2.849-2.069 4.255-3.027.889-.591 1.76-1.21 2.614-1.842-.186-.232-.368-.467-.548-.701-.767-1.047-1.61-2.073-2.488-3.04-.645-.727-1.326-1.446-2.059-2.067.645-.87 1.278-1.724 1.916-2.56.732-1.091 1.417-2.192 2.057-3.339.778-1.309 1.594-2.616 2.578-3.832-.446-.115-.885-.203-1.325-.203z" />
                  </svg>
                </a>
              )}
              {member.discord && (
                <a
                  href={member.discord}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-green-500"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.623 3.645 10.365 8.536 11.761-.118-.75-.223-1.92-.091-2.764.234-1.452 1.057-2.617 2.232-3.346 2.391-1.228 5.391-.834 7.322.38.32.21.654.367 1.011.484-.485-1.071-.866-2.166-1.179-3.305-.492-1.621-1.072-3.238-2.06-4.558-.768-1.08-1.766-1.981-2.84-2.557C12.907 2.646 12.012 2 11 2c-4.151 0-7.5 3.355-7.5 7.5 0 1.712.673 3.304 1.847 4.489.882.879 2.059 1.439 3.286 1.665 1.057.16 2.178.235 3.284.235 1.222 0 2.444-.104 3.662-.31.382-.048.767-.144 1.141-.247.315.253.611.53.854.835.768 1.14 1.411 2.368 1.95 3.592.389.956.639 1.987.751 3.013.097.758.128 1.529.115 2.296 4.688-.765 8.003-4.545 10.685-9.917 10.685-3.978 0-7.314-3.244-7.314-7.309 0-.722.097-1.469.275-2.2-.142.035-.288.066-.436.066-1.014 0-1.934-.649-2.266-1.589-.123-.26-.264-.493-.43-.71-.325-.43-.798-.75-1.328-1.015.947-1.182 2.048-2.228 3.241-3.207 1.414-1.029 2.849-2.069 4.255-3.027.889-.591 1.76-1.21 2.614-1.842-.186-.232-.368-.467-.548-.701-.767-1.047-1.61-2.073-2.488-3.04-.645-.727-1.326-1.446-2.059-2.067.645-.87 1.278-1.724 1.916-2.56.732-1.091 1.417-2.192 2.057-3.339.778-1.309 1.594-2.616 2.578-3.832-.446-.115-.885-.203-1.325-.203z" />
                  </svg>
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
