const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const axios = require('axios');

require('dotenv').config(); 

const app = express();

const port = process.env.API_PORT || 5000;
const apiKey = process.env.STEAM_API_KEY;
const collectionId = process.env.STEAM_WORKSHOP_COLLECTION_ID;
const UapiKey = process.env.UNTURNED_API_KEY;
const serverID = process.env.SERVER_ID;


app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.UNTURNED_SERVER_DATABASE_HOST,
  user: process.env.UNTURNED_SERVER_DATABASE_USER,
  password: process.env.UNTURNED_SERVER_DATABASE_PASSWORD,
  database: process.env.UNTURNED_SERVER_DATABASE_NAME
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

app.get('/api/leaderboard', (req, res) => {
  const query = `
    SELECT e.SteamID, e.Balance, m.CharacterName
    FROM Economy e
    JOIN Moderation_PlayerInfo m ON e.SteamID = m.PlayerID
    ORDER BY e.Balance DESC
    LIMIT 10;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/active-users', (req, res) => {
  const query = `
    SELECT COUNT(*) AS activeUsersCount 
    FROM Moderation_PlayerInfo;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching active users count:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json({ activeUsersCount: results[0].activeUsersCount });
  });
});

app.get('/api/total-playtime', (req, res) => {
  const query = `
    SELECT SUM(PlayTime) AS totalPlayTime 
    FROM Moderation_PlayerInfo;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching total playtime:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json({ totalPlayTime: results[0].totalPlayTime });
  });
});

app.get('/api/items', (req, res) => {
  const { sortBy = 'Id', sortOrder = 'asc', search = '' } = req.query;
  
  const query = `
    SELECT * FROM ItemShop
    WHERE ItemName LIKE ?
    ORDER BY ${sortBy} ${sortOrder}
  `;

  db.query(query, [`%${search}%`], (err, results) => {
    if (err) {
      console.error('Error fetching item shop data:', err);
      res.status(500).json({ error: 'Database error' });
      return;
    }
    res.json(results);
  });
});

app.get('/api/workshop-mods', async (req, res) => {
  try {
    const collectionUrl = 'https://api.steampowered.com/IPublishedFileService/GetDetails/v1/';
    const collectionResponse = await axios.get(collectionUrl, {
      params: {
        key: apiKey,
        includevotes: true,
        includechildren: true,
        "publishedfileids[0]": collectionId
      }
    });

    const modIds = collectionResponse.data.response.publishedfiledetails[0].children.map(child => child.publishedfileid);

    const modDetailsPromises = modIds.map(modId =>
      axios.get(collectionUrl, {
        params: {
          key: apiKey,
          includevotes: true,
          includechildren: false,
          "publishedfileids[0]": modId
        }
      })
    );

    const modDetailsResponses = await Promise.all(modDetailsPromises);

    const mods = modDetailsResponses.flatMap(response => response.data.response.publishedfiledetails);

    res.json(mods);
  } catch (error) {
    console.error('Error fetching workshop mods:', error);
    res.status(500).json({ error: 'Failed to fetch workshop mods' });
  }
});

app.get('/api/server', async (req, res) => {

  try {
    const response = await axios.get(`https://unturned-servers.net/api/?object=servers&element=detail&key=${UapiKey}`);
    const data = response.data;

    if (data && data.id === serverID) {
      res.json({
        id: data.id,
        address: data.address,
        port: data.port,
        hostname: data.hostname,
        players: data.players,
        maxplayers: data.maxplayers,
        score: data.score,
        rank: data.rank,
        map: data.map,
        is_online: data.is_online
      });
    } else {
      res.status(404).json({ error: 'Server data not found.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch server data.' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
