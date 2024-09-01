import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServerBanner = () => {
  const [serverData, setServerData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('offline');

  useEffect(() => {
    const fetchServerData = async () => {
      try {
        const response = await axios.get('https://cnapi.cheeselad.xyz/api/server');
        const data = response.data;

        setServerData(data);
        setStatus(data.is_online === '1' ? 'online' : 'offline');
      } catch (err) {
        setError('Failed to fetch server data.');
      } finally {
        setLoading(false);
      }
    };

    fetchServerData();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  const { id, address, port, hostname, players, maxplayers, score, rank, map } = serverData;

  const voteUrl = `https://unturned-servers.net/server/${id}/vote/`;
  const workshopUrl = "/mods";

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto my-8 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">{hostname}</h2>
        <div className={`w-4 h-4 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
      </div>
      <p className="text-lg text-gray-700 mb-4">Address: {address}:{port}</p>
      <p className="text-lg text-gray-700 mb-4">Players: {players} / {maxplayers}</p>
      <p className="text-lg text-gray-700 mb-4">Map: {map}</p>
      <p className="text-lg text-gray-700 mb-4">Vote Rank: #{rank}</p>
      <div className="flex items-center mt-4">
        <a
          href={`steam://connect/${address}:${port}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition"
        >
          Join Server
        </a>
        <a
          href={voteUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition"
        >
          Vote for Server
        </a>
        <a
          href={workshopUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 bg-gray-500 text-white py-2 px-4 rounded-full hover:bg-gray-600 transition"
        >
          View Workshop List
        </a>
      </div>
    </div>
  );
};

export default ServerBanner;
