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

const sectionIds = ['home', 'about', 'projects', 'resume', 'reviews', 'contact'];

const App = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [reviews, setReviews] = useState(
    initialReviews.map((review, index) => ({
      id: Date.now() + index,
      name: review.author,
      review: review.quote,
      rating: 5,
      date: new Date().toLocaleDateString(),
      verified: true,
    }))
  );

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

  return (
    <div className="min-h-screen bg-navy-900 text-platinum-25 overflow-x-hidden">
      <Navigation activeSection={activeSection} onNavigate={handleNavigate} />

      <main className="relative z-10 pt-24">
        <section id="home" className="scroll-mt-24">
          <HeroSection />
        </section>

        <section id="about" className="scroll-mt-24">
          <AboutPage />
        </section>

        <section id="projects" className="scroll-mt-24">
          <ProjectsPage />
        </section>

        <section id="resume" className="scroll-mt-24">
          <ResumePage />
        </section>

        <section id="reviews" className="scroll-mt-24">
          <ReviewsPage reviews={reviews} setReviews={setReviews} />
        </section>

        <section id="contact" className="scroll-mt-24">
          <ContactSection />
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default App;
