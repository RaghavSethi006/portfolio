import React from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Github, ExternalLink, X, Activity, Zap, BarChart3, Wrench, Sparkles, Layers, Code2 } from 'lucide-react';

const getCaseStudy = (project) => {
  if (project.caseStudy) return project.caseStudy;
  return {
    tagline: 'Engineering precise solutions for complex systemic challenges.',
    overview: project.description || 'A technical project built with modern tools and frameworks.',
    problem: 'Existing implementations lacked the necessary throughput and cohesive experience demanded by the problem space.',
    solution: 'Developed a high-performance architecture separating concerns at the edge while maintaining state securely in-memory.',
    metrics: [
       { label: 'Stack', value: project.tech ? project.tech.length.toString() : 'Multiple' }
    ],
    howIBuiltIt: 'Iterative development with a focus on clean architecture and separation of concerns.',
    features: ['Core functionality', 'Clean UI', 'Performance optimized'],
    techStack: project.tech ? project.tech.map(t => ({ name: t, detail: '' })) : [],
    status: 'Deployed'
  };
};

const SectionHeading = ({ icon: Icon, label }) => (
  <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#B8960C] mb-6 flex items-center gap-2.5">
    <Icon className="w-4 h-4" />
    {label}
  </h4>
);

const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const study = getCaseStudy(project);

  return createPortal(
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-[#050A18]/95 p-4 sm:p-6"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98, y: 20 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-[95vw] max-w-7xl max-h-[92vh] md:max-h-[85vh] rounded-3xl border border-[#1A2744]/60 bg-[#0A1122] flex flex-col overflow-hidden shadow-2xl"
        >
          {/* Static Header Strip */}
          <div className="flex-none flex items-center justify-between border-b border-[#1A2744] bg-[#0A1122] px-8 py-6 z-20">
             <div className="flex items-center gap-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#B8960C]">
                  {study.status || 'Case Study'}
                </span>
                <span className="h-4 w-px bg-[#1A2744]"></span>
                <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#7A8EAB]">
                  ID: {String.fromCharCode(96 + ((project.id - 1) % 8) + 1)}{Math.ceil((project.id || 1) / 8)}
                </span>
             </div>
             <button
              onClick={onClose}
              className="rounded-full bg-[#050A18] p-2 text-[#7A8EAB] border border-[#1A2744] transition-colors hover:border-[#B8960C] hover:text-[#EEF2F9]"
             >
               <X className="h-5 w-5" />
             </button>
          </div>

          {/* Scrollable Content Body */}
          <div className="flex-1 overflow-y-auto custom-modal-scrollbar p-8 md:p-12 lg:p-16 flex flex-col gap-16 relative">
            
            {/* ── Title & Tagline ── */}
            <div className="max-w-3xl space-y-6">
              <h2 className="text-4xl md:text-6xl font-serif text-[#EEF2F9] leading-[1.1]">{project.title}</h2>
              <p className="text-xl md:text-2xl text-[#8BA3C7] leading-relaxed font-light italic">
                {study.tagline}
              </p>
              
              <div className="flex flex-wrap gap-2 pt-4">
                {project.tech?.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-[#1A2744] bg-[#050A18] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-[#C8D8F0]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* ── Overview ── */}
            {study.overview && (
              <div>
                <SectionHeading icon={Layers} label="Overview" />
                <p className="text-[#CAD4E4] leading-8 text-[15px] max-w-4xl">{study.overview}</p>
              </div>
            )}

            {/* ── Problem & Solution ── */}
            <div className="grid md:grid-cols-2 gap-12">
               <div>
                  <SectionHeading icon={Activity} label="The Problem" />
                  <p className="text-[#CAD4E4] leading-8 text-[15px]">{study.problem}</p>
               </div>
               <div>
                  <SectionHeading icon={Zap} label="The Solution" />
                  <p className="text-[#CAD4E4] leading-8 text-[15px]">{study.solution}</p>
               </div>
            </div>

            {/* ── Impact / Metrics ── */}
            {study.metrics && study.metrics.length > 0 && (
              <div>
                <SectionHeading icon={BarChart3} label="Impact / Metrics" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {study.metrics.map((metric, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-[#050A18] border border-[#1A2744]/50 flex flex-col justify-center">
                       <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#7A8EAB] mb-2">{metric.label}</p>
                       <p className="text-2xl font-serif text-[#EEF2F9]">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── How I Built It ── */}
            {study.howIBuiltIt && (
              <div className="rounded-3xl border border-[#1A2744] bg-[#050A18] p-8 md:p-12">
                 <SectionHeading icon={Wrench} label="How I Built It" />
                 <p className="text-[#CAD4E4] leading-8 text-[15px] max-w-4xl">{study.howIBuiltIt}</p>
              </div>
            )}

            {/* ── Key Features ── */}
            {study.features && study.features.length > 0 && (
              <div>
                <SectionHeading icon={Sparkles} label="Key Features" />
                <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                  {study.features.map((feature, i) => (
                    <div key={i} className="flex items-start gap-4 group">
                      <span className="font-mono text-[10px] text-[#B8960C] bg-[#B8960C]/10 px-2 py-1 rounded shrink-0 mt-0.5">
                        0{i + 1}
                      </span>
                      <p className="text-[#8BA3C7] text-sm leading-7 group-hover:text-[#C8D8F0] transition-colors">
                        {feature}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── Tech Stack (Detailed) ── */}
            {study.techStack && study.techStack.length > 0 && (
              <div className="rounded-3xl border border-[#1A2744] bg-[#050A18] p-8 md:p-12">
                 <SectionHeading icon={Code2} label="Tech Stack" />
                 <div className="space-y-6">
                    {study.techStack.map((item, i) => (
                       <div key={i} className="flex flex-col md:flex-row md:items-start gap-3 md:gap-8 group border-b border-[#1A2744]/30 pb-6 last:border-b-0 last:pb-0">
                          <div className="md:w-44 shrink-0 flex items-center gap-3">
                             <span className="font-mono text-xs uppercase tracking-[0.1em] text-[#EEF2F9]">{item.name}</span>
                          </div>
                          <p className="text-[#8BA3C7] text-sm leading-7 group-hover:text-[#C8D8F0] transition-colors">
                            {item.detail}
                          </p>
                       </div>
                    ))}
                 </div>
              </div>
            )}

            {/* ── The Challenge callout ── */}
            {study.challenge && (
              <div className="rounded-2xl bg-[#B8960C]/5 border border-[#B8960C]/20 p-8 md:p-10">
                 <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[#B8960C] mb-4">Critical Challenge</h4>
                 <p className="text-[#C8D8F0] leading-8">{study.challenge}</p>
              </div>
            )}

            {/* External Links */}
            <div className="flex flex-wrap gap-4 pt-4">
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-transparent bg-[#EEF2F9] px-8 py-4 text-sm font-bold uppercase tracking-[0.2em] text-[#050A18] transition hover:bg-[#C8D8F0]"
                >
                  <ExternalLink className="h-4 w-4" />
                  View Deployment
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-[#1A2744] bg-[#050A18] px-8 py-4 text-sm uppercase tracking-[0.2em] text-[#7A8EAB] transition hover:border-[#B8960C] hover:text-[#EEF2F9]"
                >
                  <Github className="h-4 w-4" />
                  Source Code
                </a>
              )}
            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export default ProjectModal;
