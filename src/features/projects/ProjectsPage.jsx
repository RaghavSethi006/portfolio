import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ExternalLink } from 'lucide-react';
import { loadProjectsData } from '../../utils/excelLoader';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await loadProjectsData();
        setProjects(data);
      } catch (error) {
        console.error('Failed to load projects', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[24rem] items-center justify-center py-20">
        <div className="h-14 w-14 animate-spin rounded-full border-t-2 border-[#C8D8F0]" />
      </div>
    );
  }

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
          <h2 className="text-4xl font-serif text-[#EEF2F9] sm:text-5xl">Projects that move systems forward.</h2>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.7, delay: index * 0.1 }}
              className="group rounded-2xl border border-[#1A2744] bg-[#0B1428] p-8 transition hover:border-[#B8960C] hover:bg-[#11213A]"
            >
              {project.featured && (
                <span className="inline-flex rounded-full border border-[#B8960C]/30 bg-[#B8960C]/10 px-3 py-1 text-[10px] uppercase tracking-[0.35em] text-[#B8960C]">
                  Featured
                </span>
              )}

              <p className="mt-5 text-xs font-mono uppercase tracking-[0.35em] text-[#7A8EAB]">
                {project.category || 'ML System'}
              </p>

              <h3 className="mt-4 text-2xl font-serif text-[#EEF2F9]">{project.title}</h3>

              <p className="mt-4 text-[#CAD4E4] leading-7">{project.description}</p>

              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-[#1A2744] bg-[#050A18] px-3 py-1 text-xs text-[#C8D8F0]"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-full border border-[#C8D8F0]/25 bg-[#0B1428] px-5 py-3 text-sm uppercase tracking-[0.3em] text-[#EEF2F9] transition hover:border-[#B8960C] hover:bg-[#13213F]"
                  >
                    View Project
                  </a>
                )}
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-[#1A2744] bg-[#050A18] px-5 py-3 text-sm uppercase tracking-[0.3em] text-[#7A8EAB] transition hover:border-[#B8960C] hover:text-[#EEF2F9]"
                  >
                    <Github className="h-4 w-4" />
                    GitHub
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

export default ProjectsPage;
