import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import StatsPage from "./components/StatsPage";
import Footer from "./components/Footer";
import StaffPage from "./components/StaffPage";
import SteamWorkshopGrid from "./components/SteamWorkshopGrid";
import LeaderboardPage from "./components/LeaderboardPage";
import ItemTable from "./components/ItemTable";
import PermissionGenerator from "./components/PermissionGenerator";
import GoogleDocViewer from './components/GoogleDocViewer';
import PageTitleUpdater from './components/PageTitleUpdater';
import { GOOGLE_DOCS } from './config/docsConfig';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <PageTitleUpdater />
        <div className="min-h-screen bg-white dark:bg-[#09090b] text-gray-900 dark:text-[#fafafa] flex flex-col justify-between transition-colors duration-200">
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <Navbar />
                  <HeroSection />
                  {/*<ServerBanner />*/}
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
              path="/permission-generator"
              element={
                <div>
                  <Navbar />
                  <PermissionGenerator />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/commands"
              element={
                <div>
                  <Navbar />
                  <GoogleDocViewer
                    title={GOOGLE_DOCS.commands.title}
                    description={GOOGLE_DOCS.commands.description}
                    docUrl={GOOGLE_DOCS.commands.docUrl}
                  />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/donation-info"
              element={
                <div>
                  <Navbar />
                  <GoogleDocViewer
                    title={GOOGLE_DOCS.donationInfo.title}
                    description={GOOGLE_DOCS.donationInfo.description}
                    docUrl={GOOGLE_DOCS.donationInfo.docUrl}
                  />
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
              path="/workshop"
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
                  <GoogleDocViewer
                    title={GOOGLE_DOCS.serverRules.title}
                    description={GOOGLE_DOCS.serverRules.description}
                    docUrl={GOOGLE_DOCS.serverRules.docUrl}
                  />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/discord-rules"
              element={
                <div>
                  <Navbar />
                  <GoogleDocViewer
                    title={GOOGLE_DOCS.discordRules.title}
                    description={GOOGLE_DOCS.discordRules.description}
                    docUrl={GOOGLE_DOCS.discordRules.docUrl}
                  />
                  <Footer />
                </div>
              }
            />
            <Route
              path="/bypasses"
              element={
                <div>
                  <Navbar />
                  <GoogleDocViewer
                    title={GOOGLE_DOCS.bypasses.title}
                    description={GOOGLE_DOCS.bypasses.description}
                    docUrl={GOOGLE_DOCS.bypasses.docUrl}
                  />
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
            <Route
              path="*"
              element={
                <div>
                  <Navbar />
                  <div className="text-center py-24 px-4">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-[#fafafa] mb-4">
                      404 - Page Not Found
                    </h1>
                    <p className="text-gray-600 dark:text-[#a1a1aa] mb-8 max-w-md mx-auto">
                      The page you are looking for does not exist or has been moved.
                    </p>
                    <Link
                      to="/"
                      className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 px-6 rounded-lg transition duration-200"
                    >
                      Return Home
                    </Link>
                  </div>
                  <Footer />
                </div>
              }
            />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
