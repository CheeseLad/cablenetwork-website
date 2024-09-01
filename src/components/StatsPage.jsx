import React, { useEffect, useState } from 'react';
import { FaUser, FaServer, FaStar, FaDiscord } from 'react-icons/fa';

const StatsPage = () => {
  const [activeUsers, setActiveUsers] = useState(0);
  const [totalPlayTime, setTotalPlayTime] = useState(0);
  const [discordMembers, setDiscordMembers] = useState(0);

  useEffect(() => {
    const fetchActiveUsers = async () => {
      try {
        const response = await fetch('https://cnapi.cheeselad.xyz/api/active-users');
        const data = await response.json();
        setActiveUsers(data.activeUsersCount);
      } catch (error) {
        console.error('Error fetching active users count:', error);
      }
    };

    const fetchTotalPlayTime = async () => {
      try {
        const response = await fetch('https://cnapi.cheeselad.xyz/api/total-playtime');
        const data = await response.json();
        setTotalPlayTime(data.totalPlayTime);
      } catch (error) {
        console.error('Error fetching total playtime:', error);
      }
    };

    const fetchDiscordMembers = async () => {
      try {
        const response = await fetch('https://discord.com/api/guilds/702877615136178326/widget.json');
        const data = await response.json();
        setDiscordMembers(data.presence_count || data.members.length);
      } catch (error) {
        console.error('Error fetching Discord members count:', error);
      }
    };

    fetchActiveUsers();
    fetchTotalPlayTime();
    fetchDiscordMembers();
  }, []);

  const formatPlayTime = (seconds) => {
    const days = seconds / 86400;
    return `${days.toFixed(2)} days`;
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
      icon: <FaDiscord className="text-4xl text-green-500" />,
      number: discordMembers.toLocaleString(),
      description: 'Discord Members Online',
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
