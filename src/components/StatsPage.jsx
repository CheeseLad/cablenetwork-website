import React, { useEffect, useState } from 'react';
import { FaUser, FaServer, FaStar, FaDollarSign } from 'react-icons/fa';

const StatsPage = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalPlayTime, setTotalPlayTime] = useState(0);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/active-users');
        const data = await response.json();
        setActiveUsers(data.activeUsersCount);
      } catch (error) {
        console.error('Error fetching active users count:', error);
      }
    };

    const fetchTotalPlayTime = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/total-playtime');
        const data = await response.json();
        setTotalPlayTime(data.totalPlayTime);
      } catch (error) {
        console.error('Error fetching total playtime:', error);
      }
    };

    fetchActiveUsers();
    fetchTotalPlayTime();
  }, []);

  const formatPlayTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) {
      return `${days} days, ${hours % 24} hours`;
    } else if (hours > 0) {
      return `${hours} hours, ${minutes % 60} minutes`;
    } else {
      return `${minutes} minutes`;
    }
  };

  const stats = [
    {
      id: 1,
      icon: <FaUser className="text-4xl text-green-500" />,
      number: activeUsers.toLocaleString(),
      description: 'Unique Players',
    },
    {
      id: 2,
      icon: <FaServer className="text-4xl text-green-500" />,
      number: '4',
      description: 'Years Online',
    },
    {
      id: 3,
      icon: <FaStar className="text-4xl text-green-500" />,
      number: formatPlayTime(totalPlayTime),
      description: 'Total Playtime',
    },
    {
      id: 4,
      icon: <FaDollarSign className="text-4xl text-green-500" />,
      number: '$12,345',
      description: 'Revenue',
    },
  ];

  return (
    <div className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Statistics</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.id} className="bg-green-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <div className="mb-4">{stat.icon}</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-2">{stat.number}</h2>
              <p className="text-gray-600 text-center">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsPage;
