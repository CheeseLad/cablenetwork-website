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
import DocViewer from './components/DocViewer';
import PageTitleUpdater from './components/PageTitleUpdater';
import { DOCS } from './config/docsConfig';

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
                  <DocViewer
                    title={DOCS.commands.title}
                    description={DOCS.commands.description}
                    docUrl={DOCS.commands.docUrl}
                    githubUrl={DOCS.commands.githubUrl}
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
                  <DocViewer
                    title={DOCS.donationInfo.title}
                    description={DOCS.donationInfo.description}
                    docUrl={DOCS.donationInfo.docUrl}
                    githubUrl={DOCS.donationInfo.githubUrl}
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
                  <DocViewer
                    title={DOCS.serverRules.title}
                    description={DOCS.serverRules.description}
                    docUrl={DOCS.serverRules.docUrl}
                    githubUrl={DOCS.serverRules.githubUrl}
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
                  <DocViewer
                    title={DOCS.discordRules.title}
                    description={DOCS.discordRules.description}
                    docUrl={DOCS.discordRules.docUrl}
                    githubUrl={DOCS.discordRules.githubUrl}
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
                  <DocViewer
                    title={DOCS.bypasses.title}
                    description={DOCS.bypasses.description}
                    docUrl={DOCS.bypasses.docUrl}
                    githubUrl={DOCS.bypasses.githubUrl}
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
