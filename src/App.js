import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsPage from "./components/StatsPage";
import Footer from "./components/Footer";
import ServerRulesPage from "./components/ServerRulesPage";
import ServerBanner from "./components/ServerBanner";
import StaffPage from "./components/StaffPage";
import DiscordRulesPage from "./components/DiscordRulesPage";
import SteamWorkshopGrid from "./components/SteamWorkshopGrid";
import LeaderboardPage from "./components/LeaderboardPage";
import ItemTable from "./components/ItemTable";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Navbar />
              <HeroSection />
              <ServerBanner />
              <StatsPage />
              <LeaderboardPage />
              
              <Footer />
            </div>
          }
        />
        <Route
          path="/economy"
          element={
            <div>
              <Navbar />
              <ItemTable />
              <Footer />
            </div>
          }
        />
        <Route 
          path="/mods"
          element={
            <div>
              <Navbar />
              <SteamWorkshopGrid />
              <Footer />
            </div>
          }
        />
        <Route
          path="/server-rules"
          element={
            <div>
              <Navbar />
              <ServerRulesPage />
              <Footer />
            </div>
          }
        />
        <Route
          path="/discord-rules"
          element={
            <div>
              <Navbar />
              <DiscordRulesPage />
              <Footer />
            </div>
          }
        />
        <Route
          path="/staff"
          element={
            <div>
              <Navbar />
              <StaffPage />
              <Footer />
            </div>
          }
        />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
