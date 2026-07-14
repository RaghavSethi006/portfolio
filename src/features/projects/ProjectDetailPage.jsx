import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  Code2,
  ExternalLink,
  Github,
  GitPullRequest,
  Layers,
  Lightbulb,
  ShieldCheck,
  Sparkles,
  Wrench,
  Zap,
} from 'lucide-react';

const pageSections = [
  { id: 'overview', label: 'Overview', sub: 'Introduction', icon: Layers },
  { id: 'problem', label: 'Problem', sub: 'Pain points', icon: ShieldCheck },
  { id: 'solution', label: 'Solution', sub: 'Approach', icon: Lightbulb },
  { id: 'built', label: 'How I Built It', sub: 'Engineering', icon: Wrench },
  { id: 'features', label: 'Features', sub: 'Capabilities', icon: Sparkles },
  { id: 'tech', label: 'Tech Stack', sub: 'Architecture', icon: Code2 },
  { id: 'impact', label: 'Impact', sub: 'Outcomes', icon: BarChart3 },
  { id: 'contribute', label: 'Contribute', sub: 'Get involved', icon: GitPullRequest },
];

const getCaseStudy = (project) => {
  if (project.caseStudy) return project.caseStudy;

  return {
    tagline: 'Engineering precise solutions for complex systemic challenges.',
    overview: project.description || 'A technical project built with modern tools and frameworks.',
    problem: 'The existing workflow lacked the clarity, speed, and cohesive experience demanded by the problem space.',
    solution: 'Designed a focused architecture with strong separation of concerns, clear user flows, and reliable state management.',
    metrics: [{ label: 'Stack', value: project.tech ? project.tech.length.toString() : 'Multiple' }],
    howIBuiltIt: 'Built iteratively with an emphasis on maintainable architecture, tight feedback loops, and production-ready implementation details.',
    features: ['Core functionality', 'Clean UI', 'Performance-minded architecture'],
    techStack: project.tech ? project.tech.map((tech) => ({ name: tech, detail: '' })) : [],
    status: project.status || 'Project',
  };
};

const SectionHeader = ({ eyebrow, title, children }) => (
  <div className="max-w-3xl">
    <p className="font-mono text-[10px] uppercase tracking-[0.34em] text-[#B8960C]">{eyebrow}</p>
    <h2 className="mt-4 text-4xl font-serif leading-tight text-[#EEF2F9] sm:text-5xl">{title}</h2>
    {children && <div className="mt-6 text-[15px] leading-8 text-[#CAD4E4]">{children}</div>}
  </div>
);

const DetailSection = ({ id, eyebrow, title, children, className = '' }) => (
  <section
    id={id}
    className={`scroll-mt-32 border-b border-[#1A2744]/55 px-5 py-12 sm:px-8 lg:px-12 xl:px-16 ${className}`}
  >
    {title && <SectionHeader eyebrow={eyebrow} title={title} />}
    {children}
  </section>
);

const ProjectClock = () => {
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-4 flex items-center gap-2">
      <span className="h-1.5 w-1.5 rounded-full bg-[#B8960C] shadow-[0_0_12px_rgba(184,150,12,0.85)]" />
      <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#7A8EAB]">Live - {time}</span>
    </div>
  );
};

const ProjectDetailPage = ({ project, onBack }) => {
  const [active, setActive] = useState('overview');
  const contentRef = useRef(null);
  const study = useMemo(() => getCaseStudy(project), [project]);

  const activeIdx = Math.max(0, pageSections.findIndex((section) => section.id === active));
  const progress = ((activeIdx + 1) / pageSections.length) * 100;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [project.id]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        });
      },
      {
        root: null,
        rootMargin: '-25% 0px -70% 0px',
        threshold: 0,
      }
    );

    pageSections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [project.id]);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="relative min-h-screen bg-[#050A18] text-[#EEF2F9] pb-20 lg:pb-0" ref={contentRef}>
      <div className="pointer-events-none fixed inset-0 opacity-60">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_8%,rgba(184,150,12,0.13),transparent_28%),radial-gradient(circle_at_18%_35%,rgba(122,142,171,0.11),transparent_30%)]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(rgba(200,216,240,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,216,240,0.025) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative z-10">
        <aside className="hidden h-[calc(100vh-6rem)] border-r border-[#1A2744]/80 bg-[#070D1B]/88 backdrop-blur-xl lg:fixed lg:top-24 lg:left-0 lg:z-40 lg:w-[268px] lg:flex lg:flex-col">
          <div className="border-b border-[#1A2744]/70 p-4 pt-6">
            <button
              type="button"
              onClick={onBack}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-[#1A2744] bg-[#0B1428]/80 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.22em] text-[#C8D8F0] transition hover:border-[#B8960C] hover:text-[#EEF2F9]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Work
            </button>
          </div>
          <div className="relative border-b border-[#1A2744]/70 p-4">
            <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-[#B8960C]/70" />
            <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-[#B8960C]/70" />
            <p className="font-mono text-[8px] uppercase tracking-[0.3em] text-[#B8960C]/70">Navigator</p>
            <h2 className="mt-2 font-serif text-2xl text-[#EEF2F9]">Project Docs</h2>
            <ProjectClock />
          </div>

          <div className="border-b border-[#1A2744]/55 px-4 py-3">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-mono text-[8px] uppercase tracking-[0.24em] text-[#7A8EAB]">Read progress</span>
              <span className="font-mono text-[10px] text-[#B8960C]">{Math.round(progress)}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-[#1A2744]/70">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#B8960C] via-[#E6D08A] to-[#8BA3C7]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.35 }}
              />
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto scrollbar-none p-1.5">
            {pageSections.map((section, index) => {
              const isActive = active === section.id;
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => scrollTo(section.id)}
                  className={`group relative flex w-full items-center gap-3 rounded px-3 py-2 text-left transition ${
                    isActive ? 'bg-[#B8960C]/10' : 'hover:bg-[#EEF2F9]/[0.025]'
                  }`}
                >
                  <span
                    className={`absolute bottom-1 left-0 top-1 w-px transition ${
                      isActive ? 'bg-[#B8960C] shadow-[0_0_12px_rgba(184,150,12,0.85)]' : 'bg-transparent group-hover:bg-[#B8960C]/30'
                    }`}
                  />
                  <span className={`w-6 font-mono text-[9px] ${isActive ? 'text-[#B8960C]' : 'text-[#C8D8F0]/25 group-hover:text-[#C8D8F0]/50'}`}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className={`block font-mono text-[10px] uppercase tracking-[0.18em] ${isActive ? 'text-[#EEF2F9]' : 'text-[#8BA3C7]'}`}>
                      {section.label}
                    </span>
                    <span className={`mt-1 block font-mono text-[8px] uppercase tracking-[0.18em] ${isActive ? 'text-[#B8960C]/70' : 'text-[#7A8EAB]/50'}`}>
                      {section.sub}
                    </span>
                  </span>
                  <span className={`h-1.5 w-1.5 rounded-full transition ${isActive ? 'bg-[#B8960C]' : 'bg-[#C8D8F0]/10 group-hover:bg-[#C8D8F0]/30'}`} />
                </button>
              );
            })}
          </nav>

          <div className="border-t border-[#1A2744]/60 p-3">
            <div className="mb-3 flex gap-1">
              {pageSections.map((section, index) => (
                <button
                  key={section.id}
                  type="button"
                  aria-label={`Jump to ${section.label}`}
                  onClick={() => scrollTo(section.id)}
                  className={`h-1 rounded-full transition-all ${
                    index === activeIdx
                      ? 'flex-[2] bg-[#B8960C] shadow-[0_0_10px_rgba(184,150,12,0.6)]'
                      : index < activeIdx
                        ? 'flex-1 bg-[#B8960C]/30'
                        : 'flex-1 bg-[#C8D8F0]/10'
                  }`}
                />
              ))}
            </div>
            <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#7A8EAB]">
              {activeIdx + 1} / {pageSections.length} sections
            </p>
          </div>
        </aside>

        <main className="lg:ml-[268px]">
          <section className="px-5 pb-10 pt-6 sm:px-8 lg:px-12 xl:px-16">

            <div className="mt-8 grid gap-10 xl:grid-cols-[minmax(0,1fr)_360px] xl:items-end">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.36em] text-[#B8960C]">{study.status || project.status || 'Case Study'}</p>
                <h1 className="mt-5 max-w-5xl font-serif text-5xl leading-[0.95] text-[#EEF2F9] sm:text-7xl lg:text-8xl">
                  {project.title}
                </h1>
                <p className="mt-8 max-w-3xl text-xl leading-8 text-[#CAD4E4] sm:text-2xl sm:leading-10">
                  {study.tagline || project.description}
                </p>
              </div>

              <div className="border-l border-[#1A2744] pl-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.28em] text-[#7A8EAB]">Architecture Snapshot</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {project.tech?.slice(0, 8).map((tech) => (
                    <span key={tech} className="rounded border border-[#1A2744] bg-[#0B1428] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-[#C8D8F0]">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-7 flex flex-wrap gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#1A2744] bg-[#0B1428] px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#C8D8F0] transition hover:border-[#B8960C] hover:text-[#EEF2F9]"
                    >
                      <Github className="h-4 w-4" />
                      Source
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[#B8960C] bg-[#B8960C]/10 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-[#E6D08A] transition hover:bg-[#B8960C] hover:text-[#050A18]"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-14 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {(study.metrics || []).slice(0, 4).map((metric) => (
                <div key={`${metric.label}-${metric.value}`} className="border border-[#1A2744] bg-[#0B1428]/70 p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#7A8EAB]">{metric.label}</p>
                  <p className="mt-3 font-serif text-3xl text-[#EEF2F9]">{metric.value}</p>
                </div>
              ))}
            </div>

          </section>

          <DetailSection id="overview" eyebrow="01 - Introduction" title="Overview">
            <p>{study.overview || project.description}</p>
          </DetailSection>

          <DetailSection id="problem" eyebrow="02 - Pain points" title="The Problem">
            <p>{study.problem}</p>
          </DetailSection>

          <DetailSection id="solution" eyebrow="03 - Approach" title="The Solution">
            <p>{study.solution}</p>
          </DetailSection>

          <DetailSection id="built" eyebrow="04 - Engineering" title="How I Built It">
            <p className="max-w-4xl text-[15px] leading-8 text-[#CAD4E4]">{study.howIBuiltIt}</p>
            {study.challenge && (
              <div className="mt-10 border border-[#B8960C]/25 bg-[#B8960C]/5 p-6 sm:p-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#B8960C]">Critical challenge</p>
                <p className="mt-4 text-[15px] leading-8 text-[#C8D8F0]">{study.challenge}</p>
              </div>
            )}
          </DetailSection>

          <DetailSection id="features" eyebrow="05 - Capabilities" title="Key Features">
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {(study.features || []).map((feature, index) => (
                <div key={feature} className="group border border-[#1A2744]/80 bg-[#0B1428]/75 p-5 transition hover:border-[#B8960C]/45">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-[10px] text-[#B8960C]">0{index + 1}</span>
                    <Zap className="h-4 w-4 text-[#7A8EAB] transition group-hover:text-[#B8960C]" />
                  </div>
                  <p className="text-sm leading-7 text-[#CAD4E4]">{feature}</p>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection id="tech" eyebrow="06 - Architecture" title="Tech Stack">
            <div className="mt-10 divide-y divide-[#1A2744]/70 border-y border-[#1A2744]/70">
              {(study.techStack || []).map((item) => (
                <div key={item.name} className="grid gap-3 py-5 md:grid-cols-[220px_minmax(0,1fr)]">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#EEF2F9]">{item.name}</p>
                  <p className="text-sm leading-7 text-[#8BA3C7]">{item.detail || 'Used as part of the project architecture.'}</p>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection id="impact" eyebrow="07 - Outcomes" title="Impact">
            <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {(study.metrics || []).map((metric) => (
                <div key={`${metric.label}-${metric.value}-impact`} className="border border-[#1A2744] bg-[#0B1428] p-6">
                  <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#7A8EAB]">{metric.label}</p>
                  <p className="mt-3 font-serif text-3xl text-[#EEF2F9]">{metric.value}</p>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection id="contribute" eyebrow="08 - Get involved" title="Contribute">
            <div className="mt-10 max-w-4xl border border-[#1A2744] bg-[#0B1428]/85 p-8 sm:p-10">
              <p className="text-[15px] leading-8 text-[#CAD4E4]">
                Want to inspect the implementation, suggest an improvement, or talk through the architecture? Start with the source repository, then reach out if you want the deeper engineering story.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-3 rounded-full border border-[#B8960C] bg-[#B8960C] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#050A18] transition hover:bg-[#E6D08A]"
                  >
                    <Github className="h-4 w-4" />
                    Open Repository
                  </a>
                )}
                <button
                  type="button"
                  onClick={() => {
                    onBack();
                    setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 50);
                  }}
                  className="inline-flex items-center gap-3 rounded-full border border-[#1A2744] bg-[#050A18] px-6 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-[#C8D8F0] transition hover:border-[#B8960C] hover:text-[#EEF2F9]"
                >
                  Contact Raghav
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </DetailSection>
        </main>
      </div>

      {createPortal(
        <div className="lg:hidden" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 9999 }}>
          {/* Section label row */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'rgba(5,10,24,0.97)', backdropFilter: 'blur(12px)', borderTop: '1px solid #1A2744', padding: '10px 20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {(() => {
                const Icon = pageSections[activeIdx]?.icon;
                return Icon ? <Icon style={{ width: 14, height: 14, color: '#B8960C' }} /> : null;
              })()}
              <span style={{ fontFamily: 'monospace', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.22em', color: '#C8D8F0' }}>
                {pageSections[activeIdx]?.label || 'Overview'}
              </span>
            </div>
            <span style={{ fontFamily: 'monospace', fontSize: 9, color: '#7A8EAB', fontVariantNumeric: 'tabular-nums' }}>
              {activeIdx + 1} / {pageSections.length}
            </span>
          </div>
          {/* Segmented progress track */}
          <div style={{ display: 'flex', height: 4, background: '#0B1428' }}>
            {pageSections.map((section, index) => (
              <button
                key={section.id}
                type="button"
                aria-label={`Jump to ${section.label}`}
                onClick={() => scrollTo(section.id)}
                style={{
                  flex: 1,
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                  background:
                    index < activeIdx
                      ? 'rgba(184,150,12,0.5)'
                      : index === activeIdx
                      ? '#B8960C'
                      : '#1A2744',
                }}
              />
            ))}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ProjectDetailPage;
