import React, { useState, useMemo, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowUpRight, 
  Search, 
  ExternalLink, 
  Github, 
  Layers, 
  X
} from 'lucide-react';
import projectsData from '../../data/projects';

const SU = [
  <React.Fragment key="s0">
    <path d="M50 4L92 62H8Z" />
    <circle cx="33" cy="64" r="17" />
    <circle cx="67" cy="64" r="17" />
    <path d="M50 64V96M34 96H66" />
  </React.Fragment>,
  <React.Fragment key="s1">
    <path d="M50 4L94 50L50 96L6 50Z" />
    <path d="M50 28L72 50L50 72L28 50Z" />
  </React.Fragment>,
  <React.Fragment key="s2">
    <circle cx="50" cy="30" r="19" />
    <circle cx="29" cy="64" r="19" />
    <circle cx="71" cy="64" r="19" />
    <path d="M50 64V96" />
  </React.Fragment>,
  <React.Fragment key="s3">
    <circle cx="33" cy="36" r="19" />
    <circle cx="67" cy="36" r="19" />
    <path d="M15 50L50 96L85 50" />
  </React.Fragment>,
];

// Generative Blueprint Visual with custom seed
function Vis({ i }) {
  const a = (n) => {
    const x = Math.sin((n + 1) * 12.9898 + i * 78.233) * 43758.5453;
    return x - Math.floor(x);
  };
  const pt = [0, 1, 2, 3, 4, 5, 6].map((n) => [
    (10 + n * 13 + a(n) * 6).toFixed(1),
    (24 + a(n + 9) * 52).toFixed(1),
  ]);

  return (
    <svg className="pim-vis" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <g transform="translate(29 29) scale(.42)">{SU[i % 4]}</g>
      <polyline points={pt.map((p) => p.join(',')).join(' ')} />
      {pt.map((p, k) => (
        <circle key={k} className="n" cx={p[0]} cy={p[1]} r="1.4" />
      ))}
    </svg>
  );
}

const CATEGORIES = [
  { id: 'all', label: 'All Systems' },
  { id: 'ai', label: 'AI & Agents' },
  { id: 'local', label: 'Local-First OS' },
  { id: 'cv', label: 'Computer Vision' },
  { id: 'systems', label: 'Systems & P2P' },
  { id: 'tools', label: 'Developer Tools' },
];

const matchesCategory = (project, catId) => {
  if (catId === 'all') return true;
  const c = (project.category || '').toLowerCase();
  const desc = (project.description || '').toLowerCase();

  if (catId === 'ai') {
    return c.includes('agent') || c.includes('ai') || c.includes('rag') || desc.includes('llm') || desc.includes('gemini');
  }
  if (catId === 'local') {
    return c.includes('local') || c.includes('desktop') || c.includes('os') || desc.includes('tauri') || desc.includes('offline');
  }
  if (catId === 'cv') {
    return c.includes('vision') || c.includes('biometric') || c.includes('photo') || desc.includes('opencv') || desc.includes('onnx');
  }
  if (catId === 'systems') {
    return c.includes('p2p') || c.includes('cryptography') || c.includes('network') || desc.includes('webrtc') || desc.includes('rust');
  }
  if (catId === 'tools') {
    return c.includes('design') || c.includes('code gen') || c.includes('productivity') || desc.includes('generator') || desc.includes('framework');
  }
  return true;
};

// Quick Case Study Modal in Demo Style
function CaseModal({ project, close, onOpenDetail }) {
  const closeBtnRef = useRef(null);

  useEffect(() => {
    closeBtnRef.current?.focus();
    const handleKey = (e) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [close]);

  const study = project.caseStudy || {};

  return (
    <motion.div
      className="pim-ov"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={close}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label={`${project.title} overview`}
        className="pim-cs max-w-3xl"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.96 }}
        transition={{ type: 'spring', duration: 0.55, bounce: 0.1 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          ref={closeBtnRef}
          className="pim-x"
          type="button"
          aria-label="Close case study"
          onClick={close}
        >
          <X className="w-4 h-4" />
        </button>

        <div className="pim-cv">
          <Vis i={project.id} />
        </div>

        <div className="pim-cb">
          <div className="pim-meta">
            <span className="pim-num">#{String(project.id).padStart(2, '0')}</span>
            <span className="pim-cat">{project.category}</span>
          </div>

          <h3 className="pim-h3">{project.title}</h3>
          <p className="pim-sub">{study.tagline || project.description}</p>

          <div className="pim-cols">
            <div>
              <h4 className="pim-h4">OVERVIEW</h4>
              <p>{study.overview || project.description}</p>
            </div>
            <div>
              <h4 className="pim-h4">PROBLEM</h4>
              <p>{study.problem || 'Standard workflows lacked offline reliability, structured memory, or multi-step execution.'}</p>
            </div>
            <div>
              <h4 className="pim-h4">APPROACH</h4>
              <p>{study.solution || study.howIBuiltIt || 'Engineered modular architecture with tight feedback loops and strict separation of concerns.'}</p>
            </div>
            <div>
              <h4 className="pim-h4">STATUS & METRICS</h4>
              <p>{project.status} — {study.metrics?.[0] ? `${study.metrics[0].label}: ${study.metrics[0].value}` : 'Production architecture'}.</p>
            </div>
          </div>

          <div>
            <h4 className="pim-h4">TECHNOLOGY STACK</h4>
            <div className="flex flex-wrap gap-2 mt-2">
              {project.tech.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full text-xs font-mono bg-[#050A18] border border-[#1A2744] text-[#C8D8F0]">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 pt-5 mt-2 border-t border-[#1A2744]">
            <button
              type="button"
              onClick={() => {
                close();
                onOpenDetail(project.id);
              }}
              className="pim-btn"
            >
              Open Full Engineering Spec <ArrowUpRight className="w-4 h-4" />
            </button>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="pim-lnk"
              >
                GitHub Source ↗
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

const AllProjectsPage = ({ onOpenProject, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [quickViewProject, setQuickViewProject] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Search
      const term = searchTerm.trim().toLowerCase();
      const matchesSearch = !term || (
        project.title.toLowerCase().includes(term) ||
        project.description.toLowerCase().includes(term) ||
        project.category?.toLowerCase().includes(term) ||
        project.tech.some(t => t.toLowerCase().includes(term))
      );

      // Category
      const matchesCat = matchesCategory(project, selectedCategory);

      // Status
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'completed' && (project.status === 'Completed' || project.status === 'Complete')) ||
        (statusFilter === 'in-progress' && project.status === 'In Progress');

      return matchesSearch && matchesCat && matchesStatus;
    });
  }, [searchTerm, selectedCategory, statusFilter]);

  const totalCount = projectsData.length;

  return (
    <div className="min-h-screen bg-[#050A18] text-[#EEF2F9] pt-24 pb-28 px-4 sm:px-6 lg:px-12">
      {/* Background blueprint aesthetics */}
      <div className="pointer-events-none fixed inset-0 opacity-40">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(184,150,12,0.12),transparent_40%)]" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(200,216,240,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(200,216,240,0.025) 1px, transparent 1px)',
            backgroundSize: '48px 48px'
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Top bar with back affordance */}
        <div className="flex items-center justify-between gap-4 mb-8 pb-5 border-b border-[#1A2744]">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-[#1A2744] bg-[#0B1428] text-xs font-mono uppercase tracking-[0.2em] text-[#C8D8F0] hover:text-[#EEF2F9] hover:border-[#B8960C] transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#B8960C]" />
            Back to featured deck
          </button>

          <span className="font-mono text-xs text-[#8BA3C7] tracking-wider">
            ARCHIVE // <span className="text-[#E6D08A]">{totalCount} TOTAL SYSTEMS</span>
          </span>
        </div>

        {/* Hero Header */}
        <div className="max-w-3xl mb-10">
          <p className="pim-eye text-[#B8960C] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B8960C] animate-pulse" />
            ALL PROJECTS & SYSTEMS
          </p>
          <h1 className="text-4xl sm:text-6xl font-serif text-[#EEF2F9] tracking-tight leading-tight">
            The Complete Index
          </h1>
          <p className="mt-3 text-base sm:text-lg text-[#CAD4E4] leading-relaxed">
            A comprehensive catalog of autonomous agent runtimes, local-first operating systems, computer vision models, and distributed networks.
          </p>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-[#0B1428] border border-[#1A2744] rounded-2xl p-5 mb-10 shadow-[0_16px_40px_rgba(0,0,0,0.4)]">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Search Input */}
            <div className="relative flex-1 min-w-[260px]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#7A8EAB]" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search across all 13 systems by title, tech, or architecture..."
                className="w-full pl-11 pr-4 py-2.5 bg-[#050A18] border border-[#1A2744] rounded-xl text-sm text-[#EEF2F9] placeholder-[#7A8EAB] focus:outline-none focus:border-[#B8960C] focus:ring-1 focus:ring-[#B8960C] transition"
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-[#7A8EAB] hover:text-[#EEF2F9]"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Status toggle */}
            <div className="flex items-center rounded-xl bg-[#050A18] border border-[#1A2744] p-1 text-xs">
              <button
                type="button"
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1.5 rounded-lg transition ${statusFilter === 'all' ? 'bg-[#11213A] text-[#EEF2F9] font-medium' : 'text-[#7A8EAB] hover:text-[#C8D8F0]'}`}
              >
                All Status
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('completed')}
                className={`px-3 py-1.5 rounded-lg transition ${statusFilter === 'completed' ? 'bg-[#11213A] text-[#E6D08A] font-medium' : 'text-[#7A8EAB] hover:text-[#C8D8F0]'}`}
              >
                Completed
              </button>
              <button
                type="button"
                onClick={() => setStatusFilter('in-progress')}
                className={`px-3 py-1.5 rounded-lg transition ${statusFilter === 'in-progress' ? 'bg-[#11213A] text-[#8BA3C7] font-medium' : 'text-[#7A8EAB] hover:text-[#C8D8F0]'}`}
              >
                In Progress
              </button>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pt-4 mt-3 border-t border-[#1A2744]/70">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                    active
                      ? 'bg-[#B8960C]/20 border border-[#B8960C] text-[#E6D08A]'
                      : 'bg-[#050A18] border border-[#1A2744] text-[#8BA3C7] hover:border-[#7A8EAB]/40 hover:text-[#EEF2F9]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results summary bar */}
        <div className="flex items-center justify-between mb-6 px-1 text-xs font-mono text-[#7A8EAB]">
          <span>
            SHOWING <span className="text-[#EEF2F9] font-semibold">{filteredProjects.length}</span> OF {totalCount} SYSTEMS
          </span>
          {(searchTerm || selectedCategory !== 'all' || statusFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setStatusFilter('all');
              }}
              className="text-[#B8960C] hover:underline"
            >
              Reset filters
            </button>
          )}
        </div>

        {/* Empty state */}
        {filteredProjects.length === 0 && (
          <div className="bg-[#0B1428] border border-[#1A2744] rounded-2xl p-12 text-center my-8">
            <Layers className="w-12 h-12 text-[#7A8EAB]/40 mx-auto mb-4" />
            <h3 className="text-xl font-serif text-[#EEF2F9] mb-2">No systems match your criteria</h3>
            <p className="text-sm text-[#8BA3C7] max-w-md mx-auto mb-6">
              Try adjusting your search terms or selecting "All Systems".
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setStatusFilter('all');
              }}
              className="px-5 py-2.5 rounded-full bg-[#B8960C] text-[#050A18] font-semibold text-xs tracking-wider uppercase hover:bg-[#E6D08A] transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ── The Hybrid Cards Grid: Mix of Previous Rich Cards & Demo Blueprint Visuals ── */}
        <div className="grid gap-8 lg:grid-cols-2">
          {filteredProjects.map((project, index) => {
            const metrics = project.caseStudy?.metrics || [];
            return (
              <motion.article
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col border border-[#1A2744] bg-[#0B1428] rounded-xl overflow-hidden transition-all duration-300 hover:border-[#B8960C]/80 hover:bg-[#11213A] hover:shadow-[0_20px_48px_rgba(0,0,0,0.5)]"
              >
                {/* ── Demo Feature: Generative Blueprint Artwork Banner ── */}
                <div className="relative h-44 w-full bg-[#08101F] border-b border-[#1A2744] overflow-hidden">
                  <Vis i={project.id} />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1428] via-transparent to-transparent pointer-events-none" />

                  {/* Top line with coordinate & number */}
                  <div className="absolute top-3 left-4 right-4 flex items-center justify-between">
                    <span className="font-mono text-xs text-[#E6D08A] bg-[#050A18]/80 backdrop-blur px-2.5 py-0.5 rounded border border-[#1A2744]">
                      #{String(project.id).padStart(2, '0')}
                    </span>
                    <span className="select-none font-mono text-[10px] text-[#C8D8F0]/40">
                      {String.fromCharCode(96 + ((project.id - 1) % 8) + 1)}{Math.ceil(project.id / 8)}
                    </span>
                  </div>

                  {/* Status & Featured badges overlay */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    {project.featured && (
                      <span className="inline-flex rounded-full border border-[#B8960C]/40 bg-[#B8960C]/20 px-3 py-0.5 text-[10px] uppercase tracking-[0.28em] text-[#E6D08A] backdrop-blur">
                        Featured
                      </span>
                    )}
                    <span className={`rounded-full border px-3 py-0.5 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur ${
                      project.status === 'Completed' || project.status === 'Complete'
                        ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400'
                        : 'border-[#1A2744] bg-[#050A18]/80 text-[#7A8EAB]'
                    }`}>
                      {project.status || 'Project'}
                    </span>
                  </div>
                </div>

                {/* ── Previous Feature: Rich Body with Metrics & Stack ── */}
                <div className="p-7 flex flex-col flex-1">
                  <p className="text-xs font-mono uppercase tracking-[0.32em] text-[#8BA3C7] transition-colors group-hover:text-[#B8960C]">
                    {project.category || 'Software Architecture'}
                  </p>

                  <h3 className="mt-3 text-2xl font-serif text-[#EEF2F9] group-hover:text-white transition-colors">
                    {project.title}
                  </h3>

                  {project.caseStudy?.tagline && (
                    <p className="mt-1 text-xs text-[#B8960C] font-mono tracking-wide">
                      {project.caseStudy.tagline}
                    </p>
                  )}

                  <p className="mt-4 text-[#CAD4E4] leading-7 text-sm line-clamp-3">
                    {project.description}
                  </p>

                  {/* Two-metric snapshot grid from previous version */}
                  {metrics.length > 0 && (
                    <div className="mt-6 grid grid-cols-2 gap-3">
                      {metrics.slice(0, 2).map((metric) => (
                        <div key={`${project.id}-${metric.label}`} className="border border-[#1A2744] bg-[#050A18] p-3 rounded-lg">
                          <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#7A8EAB]">{metric.label}</p>
                          <p className="mt-1 font-serif text-xl text-[#EEF2F9]">{metric.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tech stack badges with +N more */}
                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-[#1A2744] bg-[#050A18] px-3 py-1 text-xs text-[#C8D8F0]"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 5 && (
                      <span className="rounded-full border border-[#1A2744] bg-[#050A18] px-3 py-1 text-xs text-[#7A8EAB]">
                        +{project.tech.length - 5} more
                      </span>
                    )}
                  </div>

                  {/* Footer actions: Open Case Study, Quick Preview, Demo, Source */}
                  <div className="mt-auto flex flex-col gap-4 pt-7 border-t border-[#1A2744]/70 mt-6 md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => onOpenProject(project.id)}
                        className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-[#EEF2F9] hover:text-[#B8960C] transition-colors"
                      >
                        Open Case Study
                        <ArrowUpRight className="h-4 w-4 text-[#B8960C]" />
                      </button>

                      <button
                        type="button"
                        onClick={() => setQuickViewProject(project)}
                        className="inline-flex items-center gap-1 text-[11px] font-mono text-[#7A8EAB] hover:text-[#E6D08A] underline underline-offset-4 decoration-[#7A8EAB]/40 transition"
                      >
                        Quick Specs
                      </button>
                    </div>

                    <div className="flex flex-wrap gap-2.5">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#B8960C] bg-[#B8960C]/10 px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#E6D08A] transition hover:bg-[#B8960C] hover:text-[#050A18]"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Demo
                        </a>
                      )}
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#1A2744] bg-[#050A18] px-3.5 py-1.5 text-[10px] uppercase tracking-[0.18em] text-[#7A8EAB] transition hover:border-[#B8960C] hover:text-[#EEF2F9]"
                        >
                          <Github className="h-3 w-3" />
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        {/* Back to Deck Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-[#B8960C] bg-[#B8960C]/10 text-xs font-mono uppercase tracking-[0.24em] text-[#E6D08A] hover:bg-[#B8960C] hover:text-[#050A18] transition-all shadow-[0_8px_24px_rgba(184,150,12,0.2)]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to featured deck
          </button>
        </div>
      </div>

      {/* Quick Specs Case Modal */}
      <AnimatePresence>
        {quickViewProject && (
          <CaseModal
            project={quickViewProject}
            close={() => setQuickViewProject(null)}
            onOpenDetail={onOpenProject}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default AllProjectsPage;
