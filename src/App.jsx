import React, { useEffect, useState, useCallback } from 'react';

import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import HeroSection from './components/ui/HeroSection';
import AboutPage from './features/about/AboutPage';
import ProjectsPage from './features/projects/ProjectsPage';
import ProjectDetailPage from './features/projects/ProjectDetailPage';
import ResumePage from './features/resume/ResumePage';
import ReviewsPage from './features/reviews/ReviewsPage';
import ContactSection from './features/contact/ContactSection';
import { reviews as fallbackReviews } from './data/profile';
import projectsData from './data/projects';
import { fetchTestimonials } from './utils/googleSheet';
import NeuralBackground from './components/ui/NeuralBackground';
import InterestsStrip from './components/ui/InterestsStrip';
import DataTicker from './components/ui/DataTicker';
import ThePocket from './components/ui/ThePocket';
import SectionDivider from './components/ui/SectionDivider';
import StatementBand from './components/ui/StatementBand';
import AITerminal from './components/layout/AITerminal';
import CustomCursor from './components/ui/CustomCursor';

const sectionIds = ['home', 'about', 'projects', 'resume', 'skills', 'reviews', 'contact'];

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [reviews, setReviews] = useState(fallbackReviews);
  const [activeProjectId, setActiveProjectId] = useState(null);

  const activeProject = projectsData.find((project) => project.id === activeProjectId);

  useEffect(() => {
    fetchTestimonials().then((sheetReviews) => {
      if (sheetReviews.length > 0) {
        const existingKeys = new Set(fallbackReviews.map((r) => r.author + r.quote));
        const unique = sheetReviews.filter((r) => !existingKeys.has(r.author + r.quote));
        if (unique.length > 0) setReviews([...unique, ...fallbackReviews]);
      }
    });
  }, []);

  useEffect(() => {
    if (activeProjectId) return undefined;

    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -75% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [activeProjectId]);

  useEffect(() => {
    const syncProjectFromHash = () => {
      const match = window.location.hash.match(/^#project-(\d+)$/);
      const projectId = match ? Number(match[1]) : null;
      setActiveProjectId(projectsData.some((project) => project.id === projectId) ? projectId : null);
    };

    syncProjectFromHash();
    window.addEventListener('hashchange', syncProjectFromHash);
    return () => window.removeEventListener('hashchange', syncProjectFromHash);
  }, []);

  const handleNavigate = useCallback((sectionId) => {
    if (activeProjectId) {
      window.history.pushState('', document.title, window.location.pathname + window.location.search);
      setActiveProjectId(null);
    }

    setActiveSection(sectionId);
    window.setTimeout(() => {
      const target = document.getElementById(sectionId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 0);
  }, [activeProjectId]);

  const handleOpenProject = useCallback((projectId) => {
    setActiveProjectId(projectId);
    setActiveSection('projects');
    window.location.hash = `project-${projectId}`;
  }, []);

  const handleBackToProjects = useCallback(() => {
    window.history.pushState('', document.title, window.location.pathname + window.location.search);
    setActiveProjectId(null);
    setActiveSection('projects');
    window.setTimeout(() => {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 0);
  }, []);

  return (
    <>
    <CustomCursor />
    <div className="min-h-screen bg-navy-900 text-platinum-25">
      <NeuralBackground />
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isProjectOpen={!!activeProject}
        onBackFromProject={handleBackToProjects}
      />

      <main className="relative z-10 pt-24">
        {activeProject ? (
          <ProjectDetailPage project={activeProject} onBack={handleBackToProjects} />
        ) : (
          <>
            <section id="home" className="scroll-mt-24">
              <HeroSection />
            </section>

            <DataTicker />
            <StatementBand text="RAGHAV SETHI" sub="AI · ML · Systems" />

            <section id="about" className="scroll-mt-24">
              <AboutPage />
            </section>

            <SectionDivider label="01" />
            <InterestsStrip />
            <SectionDivider label="02" />

            <section id="projects" className="scroll-mt-24">
              <ProjectsPage onOpenProject={handleOpenProject} />
            </section>

            <SectionDivider label="03" />
            <StatementBand text="EXPERIENCE" sub="Four roles. One direction." />

            <section id="resume" className="scroll-mt-24">
              <ResumePage />
            </section>

            <SectionDivider label="04" />
            <ThePocket />
            <SectionDivider label="05" />

            <section id="reviews" className="scroll-mt-24">
              <ReviewsPage reviews={reviews} />
            </section>
            
            <StatementBand text="LET'S TALK" sub="Precision in every exchange." />

            <section id="contact" className="scroll-mt-24">
              <ContactSection />
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
    <AITerminal />
    </>
  );
};

export default App;
