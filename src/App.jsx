import React, { useEffect, useState } from 'react';

import Navigation from './components/layout/Navigation';
import Footer from './components/layout/Footer';
import HeroSection from './components/ui/HeroSection';
import AboutPage from './features/about/AboutPage';
import ProjectsPage from './features/projects/ProjectsPage';
import ResumePage from './features/resume/ResumePage';
import ReviewsPage from './features/reviews/ReviewsPage';
import ContactSection from './features/contact/ContactSection';
import { reviews as initialReviews } from './data/profile';
import NeuralBackground from './components/ui/NeuralBackground';
import InterestsStrip from './components/ui/InterestsStrip';
import DataTicker from './components/ui/DataTicker';
import ThePocket from './components/ui/ThePocket';
import SectionDivider from './components/ui/SectionDivider';
import StatementBand from './components/ui/StatementBand';

const sectionIds = ['home', 'about', 'projects', 'resume', 'reviews', 'contact'];

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [reviews, setReviews] = useState(initialReviews);

  useEffect(() => {
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
        rootMargin: '-35% 0px -55% 0px',
        threshold: 0.2,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (sectionId) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  useEffect(() => {
    const trail = [];
    let ticking = false;

    const onMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const dot = document.createElement('div');
          dot.className = 'cursor-trail-dot';
          dot.style.left = e.clientX + 'px';
          dot.style.top = e.clientY + 'px';
          document.body.appendChild(dot);
          trail.push(dot);
          if (trail.length > 4) {
            const old = trail.shift();
            old.remove();
          }
          setTimeout(() => {
            dot.style.opacity = '0';
            setTimeout(() => dot.remove(), 400);
          }, 60);
          ticking = false;
        });
        ticking = true;
      }
    };

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!mq.matches) {
      window.addEventListener('mousemove', onMouseMove);
    }
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-navy-900 text-platinum-25 overflow-x-hidden">
      <NeuralBackground />
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="relative z-10 pt-24">
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
          <ProjectsPage />
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
          <ReviewsPage reviews={reviews} setReviews={setReviews} />
        </section>
        
        <StatementBand text="LET'S TALK" sub="Precision in every exchange." />

        <section id="contact" className="scroll-mt-24">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
