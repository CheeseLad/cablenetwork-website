import React from 'react';
import { FaUser, FaServer, FaStar, FaDollarSign } from 'react-icons/fa'; // Example icons from react-icons

const stats = [
  {
    id: 1,
    icon: <FaUser className="text-4xl text-green-500" />,
    number: '1,234',
    description: 'Active Users'
  },
  {
    id: 2,
    icon: <FaServer className="text-4xl text-green-500" />,
    number: '56',
    description: 'Servers Running'
  },
  {
    id: 3,
    icon: <FaStar className="text-4xl text-green-500" />,
    number: '99.9%',
    description: 'Uptime'
  },
  {
    id: 4,
    icon: <FaDollarSign className="text-4xl text-green-500" />,
    number: '$12,345',
    description: 'Revenue'
  },
];

const StatsPage = () => {
  return (
    <div className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Statistics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(stat => (
            <div key={stat.id} className="bg-green-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <div className="mb-4">
                {stat.icon}
              </div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">
                {stat.number}
              </h2>
              <p className="text-gray-600 text-center">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
