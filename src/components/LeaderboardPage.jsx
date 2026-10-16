import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Filter } from "bad-words";

const LeaderboardPage = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await fetch(
          "https://cablenetwork-api.jakefarrell.ie/api/leaderboard"
        );
        const data = await response.json();
        setLeaderboard(Array.isArray(data) ? data : []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const filter = new Filter();

  const filterProfanity = (name) => {
    try {
      return filter.clean(name || "Anonymous");
    } catch {
      return name || "Anonymous";
    }
  };

  return (
    <div className="bg-white dark:bg-[#09090b] py-10 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-[#fafafa] mb-8 text-center">
          Economy Leaderboard
        </h1>
        {loading ? (
          <p className="text-center text-gray-600 dark:text-[#a1a1aa]" role="status" aria-busy="true">
            Loading...
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leaderboard.map((player, index) => (
              <div
                key={player.SteamID || index}
                className="bg-green-100 dark:bg-[#131316] dark:border dark:border-[#27272a] rounded-lg shadow-lg p-6 flex flex-col items-center hover:shadow-xl transition-shadow"
              >
                <div className="mb-4">
                  <FaUser className="text-4xl text-green-500" />
                </div>
                <h2 className="text-2xl font-bold text-gray-800 dark:text-[#fafafa] mb-1 text-center truncate max-w-full">
                  {filterProfanity(player.CharacterName)}
                </h2>
                <h2 className="text-3xl font-bold text-gray-800 dark:text-[#fafafa] mb-2">{`$${Number(
                  player.Balance || 0
                ).toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}`}</h2>
                <p className="text-gray-600 dark:text-[#a1a1aa] text-center">Rank #{index + 1}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
