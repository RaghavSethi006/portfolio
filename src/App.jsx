import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Layout Components
import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import GlobalStyles from './components/layout/GlobalStyles';
import HUDOverlay from './components/layout/HUDOverlay';
import FloatingAIAssistant from './components/layout/FloatingAIAssistant';

// UI Components
import HolographicBackground from './components/ui/backgrounds/HolographicBackground';
import ParticleSystem from './components/ui/backgrounds/ParticleSystem';
import ScanningSystem from './components/ui/backgrounds/ScanningSystem';
import FloatingHexagons from './components/ui/backgrounds/FloatingHexagons';
import CircularHUD from './components/ui/backgrounds/CircularHUD';
import LoadingInterface from './components/ui/LoadingInterface';

// Feature Pages
import AboutPage from './features/about/AboutPage';
import ProjectsPage from './features/projects/ProjectsPage';
import ResumePage from './features/resume/ResumePage';
import ReviewsPage from './features/reviews/ReviewsPage';

const App = () => {
    const [currentPage, setCurrentPage] = useState('about');
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    // Page transition handler with loading animation
    const handlePageChange = (newPage) => {
        if (newPage !== currentPage) {
            setIsLoading(true);
            setTimeout(() => {
                setCurrentPage(newPage);
                setIsLoading(false);
            }, 800);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-cyan-300 overflow-x-hidden relative">
            {/* ===== LAYERED BACKGROUND SYSTEM ===== */}
            <HolographicBackground />
            <ParticleSystem />
            <ScanningSystem />
            <FloatingHexagons />
            <CircularHUD />

            {/* ===== MAIN INTERFACE ===== */}
            <Navigation
                currentPage={currentPage}
                setCurrentPage={handlePageChange}
                isLoading={isLoading}
            />

            {/* ===== PAGE CONTENT WITH LOADING ===== */}
            <main className="relative z-20 pt-28">
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <LoadingInterface key="loading" />
                    ) : (
                        <>
                            {currentPage === 'about' && <AboutPage key="about" />}
                            {currentPage === 'projects' && <ProjectsPage key="projects" />}
                            {currentPage === 'resume' && <ResumePage key="resume" />}
                            {currentPage === 'reviews' && <ReviewsPage key="reviews" reviews={reviews} setReviews={setReviews} />}
                        </>
                    )}
                </AnimatePresence>
            </main>

            <Footer />
            <FloatingAIAssistant currentPage={currentPage} />
            <HUDOverlay />
            <GlobalStyles />
        </div>
    );
};

export default App;
