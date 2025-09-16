import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ChatbotWidget from './components/widgets/ChatbotWidget';
import SOSWidget from './components/widgets/SOSWidget';
import HomePage from './pages/RouterHomePage';
import PlannerPage from './pages/PlannerPage';
import CleanSuperEnhancedPlannerPage from './pages/CleanSuperEnhancedPlannerPage';
import ExplorePage from './pages/ExplorePage';
import MarketplacePage from './pages/MarketplacePage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Global Navigation */}
        <Navbar />
        
        {/* Main Content */}
        <main className="pt-16">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/planner" element={<CleanSuperEnhancedPlannerPage />} />
            <Route path="/planner-basic" element={<PlannerPage />} />
            <Route path="/explore" element={<ExplorePage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </main>
        
        {/* Global Footer */}
        <Footer />
        
        {/* Floating Widgets */}
        <ChatbotWidget />
        <SOSWidget />
      </div>
    </Router>
  );
}

export default App;
