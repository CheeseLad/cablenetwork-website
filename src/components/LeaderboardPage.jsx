import React, { useEffect, useState } from 'react';
import { FaUser, FaDollarSign } from 'react-icons/fa';
import { Filter } from 'bad-words';

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch('https://cnapi.cheeselad.xyz/api/leaderboard');
        const data = await response.json();
        setLeaderboard(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leaderboard:', error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const filter = new Filter();

  const filterProfanity = (name) => {
    return filter.clean(name);
  };

  return (
    <div className="bg-white py-10">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Economy Leaderboard</h1>
        {loading ? (
          <p className="text-center text-gray-600">Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaderboard.map((player, index) => (
              <div key={player.SteamID} className="bg-green-100 rounded-lg shadow-lg p-6 flex flex-col items-center">
                <div className="mb-4">
                  <FaUser className="text-4xl text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">
                  {filterProfanity(player.CharacterName)}
                </h2>
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  ${player.Balance.toLocaleString()}
                </h2>
                <p className="text-gray-600 text-center">Rank #{index + 1}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
