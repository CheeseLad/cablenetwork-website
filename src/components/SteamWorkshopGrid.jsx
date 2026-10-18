import React, { useState, useEffect } from 'react';
import axios from 'axios';
import background1 from '../assets/background1.jpg';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const SteamWorkshopGrid = () => {
  useDocumentTitle('Workshop Mods');
  const [mods, setMods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMods = async () => {
      try {
        const response = await axios.get('https://cablenetwork-api.jakefarrell.ie/api/workshop-mods');
        setMods(response.data || []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch workshop mods');
        setLoading(false);
      }
    };

    fetchMods();
  }, []);

  const stripTags = (text) => {
    if (!text) return '';
    const tagRegex = /\[\/?[a-zA-Z0-9]+\s*(?:=[^\]]*)?\]/g;
    return text.replace(tagRegex, '');
  };

  if (loading) return <div className="text-center py-10 text-gray-800 dark:text-[#fafafa]">Loading...</div>;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-6 transition-colors duration-200">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-[#fafafa] mb-8 text-center">Server Workshop Mods</h1>
      <div className="flex justify-center pb-4">
        <a
          href={`https://steamcommunity.com/sharedfiles/filedetails/?edit=true&id=2071736126`}
          target="_blank"
          rel="noopener noreferrer"
          className="mb-4 inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          View Steam Workshop Collection
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mods.map((mod) => (
          <div key={mod.publishedfileid} className="bg-white dark:bg-[#131316] shadow-md rounded-lg overflow-hidden dark:border dark:border-[#27272a] flex flex-col">
            <img
              src={mod.preview_url || background1}
              alt={mod.title || 'No Title'}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-1">
              <h2 className="font-bold text-xl mb-2 text-gray-900 dark:text-[#fafafa]">{mod.title || 'No Title'}</h2>
              {/*<p className="text-gray-700 dark:text-[#a1a1aa] text-base mb-2">
                {mod.file_description
                  ? stripTags(mod.file_description).split('\n').slice(0, 3).join('\n')
                  : 'No Description Available'}
              </p>
              <div className="text-gray-600 dark:text-[#a1a1aa] text-sm mb-2">
                <p><strong>Author:</strong> {mod.creator || 'No Author'}</p>
                <p><strong>Rating:</strong> {mod.vote_data ? (mod.vote_data.score * 100).toFixed(2) + '%' : 'No ratings'}</p>
              </div> */}
              <div className="mt-auto pt-4 flex justify-center">
                <a
                  href={`https://steamcommunity.com/sharedfiles/filedetails/?id=${mod.publishedfileid}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                >
                  View Workshop Page
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SteamWorkshopGrid;
