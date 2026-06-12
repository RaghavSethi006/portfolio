import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Github } from 'lucide-react';
import projectsData from '../../data/projects';
import SplitHeading from '../../components/ui/SplitHeading';

const ProjectsPage = ({ onOpenProject }) => {
  return (
    <section className="bg-[#050A18] py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[#8BA3C7] mb-4">Selected Work</p>
          <SplitHeading className="text-4xl font-serif text-[#EEF2F9] sm:text-5xl">Projects that move systems forward.</SplitHeading>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {projectsData.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group flex h-full flex-col border border-[#1A2744] bg-[#0B1428] p-7 transition hover:border-[#B8960C]/80 hover:bg-[#11213A]"
            >
              <span className="absolute right-4 top-4 select-none font-mono text-[9px] text-[#C8D8F0]/20">
                {String.fromCharCode(96 + ((project.id - 1) % 8) + 1)}{Math.ceil(project.id / 8)}
              </span>

              <div className="flex min-h-[34px] items-center gap-2">
                {project.featured && (
                  <span className="inline-flex rounded-full border border-[#B8960C]/30 bg-[#B8960C]/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-[#B8960C]">
                    Featured
                  </span>
                )}
                <span className="rounded-full border border-[#1A2744] bg-[#050A18] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.24em] text-[#7A8EAB]">
                  {project.status || 'Project'}
                </span>
              </div>

              <p className="mt-5 text-xs font-mono uppercase tracking-[0.35em] text-[#7A8EAB]">
                {project.category || 'ML System'}
              </p>

              <h3 className="mt-4 text-2xl font-serif text-[#EEF2F9]">{project.title}</h3>
              <p className="mt-4 text-[#CAD4E4] leading-7">{project.description}</p>

              {project.caseStudy?.metrics?.length > 0 && (
                <div className="mt-6 grid grid-cols-2 gap-3">
                  {project.caseStudy.metrics.slice(0, 2).map((metric) => (
                    <div key={`${project.id}-${metric.label}`} className="border border-[#1A2744] bg-[#050A18] p-3">
                      <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#7A8EAB]">{metric.label}</p>
                      <p className="mt-1 font-serif text-xl text-[#EEF2F9]">{metric.value}</p>
                    </div>
                  ))}
                </div>
              )}

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

              <div className="mt-auto flex flex-col gap-4 pt-8 opacity-75 transition-opacity group-hover:opacity-100 md:flex-row md:items-center md:justify-between">
                <button
                  type="button"
                  onClick={() => onOpenProject(project.id)}
                  className="inline-flex items-center gap-2 self-start font-mono text-xs uppercase tracking-[0.2em] text-[#C8D8F0] transition-colors hover:text-[#B8960C]"
                >
                  Open Case Study
                  <ArrowUpRight className="h-4 w-4" />
                </button>
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-[#1A2744] bg-[#050A18] px-4 py-2 text-[10px] uppercase tracking-[0.2em] text-[#7A8EAB] transition hover:border-[#B8960C] hover:text-[#EEF2F9]"
                  >
                    <Github className="h-3 w-3" />
                    Source Code
                  </a>
                )}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default React.memo(ProjectsPage);
