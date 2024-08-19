// src/ServerBanner.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ServerBanner = () => {
  const [status, setStatus] = useState('checking'); // 'online', 'offline', 'checking'
  const serverIP = '45.43.163.72:27019';
  const steamLink = `steam://rungameid/304930//+connect%20${serverIP}`;

  useEffect(() => {
    const checkServerStatus = async () => {
      try {
        const response = await axios.get(`https://api.mcsrvstat.us/2/${serverIP.split(':')[0]}`);
        if (response.data.online) {
          setStatus('online');
        } else {
          setStatus('offline');
        }
      } catch (error) {
        setStatus('offline');
      }
    };

    checkServerStatus();
    const interval = setInterval(checkServerStatus, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [serverIP]);

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-md mx-auto my-8 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Cable Creative Roleplay</h2>
        <div className={`w-4 h-4 rounded-full ${status === 'online' ? 'bg-green-500' : 'bg-red-500'}`} />
      </div>
      <p className="text-lg text-gray-700 mb-4">IP: {serverIP}</p>
      <a
        href={steamLink}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition"
      >
        Connect in Steam
      </a>
      <a
        href="https://steamcommunity.com/sharedfiles/filedetails/?id=2071736126"
        target="_blank"
        rel="noopener noreferrer"
        className="ml-4 bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 transition"
      >
        View Workshop List
      </a>
    </div>
  );
};

export default ServerBanner;
