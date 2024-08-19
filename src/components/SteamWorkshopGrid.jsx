import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SteamWorkshopGrid = ({ collectionId }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkshopItems = async () => {
      try {
        // Replace this URL with the appropriate Steam API endpoint
        const response = await axios.get(`https://api.steampowered.com/ISteamRemoteStorage/GetCollectionDetails/v1/?collectioncount=1&publishedfileids[0]=${collectionId}`);
        setItems(response.data.response.collectiondetails[0].children);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch workshop items');
        setLoading(false);
      }
    };

    fetchWorkshopItems();
  }, [collectionId]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.publishedfileid} className="bg-white shadow-md rounded-lg overflow-hidden">
            <img src={item.preview_url} alt={item.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="font-bold text-xl mb-2">{item.title}</h2>
              <p className="text-gray-700 text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SteamWorkshopGrid;