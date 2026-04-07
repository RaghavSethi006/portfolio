import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { loadResumeData } from '../../utils/excelLoader';
import SplitHeading from '../../components/ui/SplitHeading';

const technicalSkills = [
  {
    category: 'Languages',
    skills: [
      { type: 'skillicon', icons: ['py', 'js', 'cpp', 'cs', 'c', 'rust'] },
      { type: 'shield', url: 'https://img.shields.io/badge/RISC--V%20Assembly-283272?style=flat-square&logo=riscv&logoColor=white' },
    ]
  },
  {
    category: 'Frontend',
    skills: [
      { type: 'skillicon', icons: ['react', 'angular', 'tailwind', 'html', 'css', 'bootstrap'] }
    ]
  },
  {
    category: 'Backend',
    skills: [
      { type: 'skillicon', icons: ['nodejs', 'express', 'django', 'fastapi'] }
    ]
  },
  {
    category: 'Desktop',
    skills: [
      { type: 'skillicon', icons: ['tauri', 'electron'] }
    ]
  },
  {
    category: 'AI / Machine Learning',
    skills: [
      { type: 'skillicon', icons: ['tensorflow', 'sklearn', 'opencv'] },
      { type: 'shield', url: 'https://img.shields.io/badge/Pandas-150458?style=flat-square&logo=pandas&logoColor=white' },
      { type: 'shield', url: 'https://img.shields.io/badge/NumPy-013243?style=flat-square&logo=numpy&logoColor=white' },
      { type: 'shield', url: 'https://img.shields.io/badge/Plotly-3F4F75?style=flat-square&logo=plotly&logoColor=white' }
    ]
  },
  {
    category: 'Databases & Cloud',
    skills: [
      { type: 'skillicon', icons: ['mongodb', 'mysql', 'sqlite', 'firebase'] }
    ]
  },
  {
    category: 'Tools & Deployment',
    skills: [
      { type: 'skillicon', icons: ['git', 'github', 'gitlab', 'vercel', 'blender'] }
    ]
  }
];

const ResumePage = () => {
  const [profileData, setProfileData] = useState({ experience: [], education: {}, skills: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResumeData = async () => {
      try {
        const data = await loadResumeData();
        setProfileData(data);
      } catch (error) {
        console.error('Failed to load resume data', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResumeData();
  }, []);

  const { experience, education } = profileData;

  if (loading) {
    return (
      <div className="flex min-h-[24rem] items-center justify-center py-20">
        <div className="h-14 w-14 animate-spin rounded-full border-t-2 border-[#C8D8F0]" />
      </div>
    );
  }

  return (
    <section className="py-20" id="resume">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-[#8BA3C7] mb-4">Resume</p>
          <SplitHeading className="text-4xl font-serif text-[#EEF2F9] sm:text-5xl">Professional Experience</SplitHeading>
          <a
            href={`${process.env.PUBLIC_URL}/assets/Raghav_Sethi_Resume.pdf`}
            download="Raghav_Sethi_Resume.pdf"
            className="mt-8 inline-flex items-center justify-center gap-3 rounded-full border border-[#C8D8F0]/30 bg-[#0B1428] px-6 py-3 text-sm uppercase tracking-[0.3em] text-[#EEF2F9] transition hover:border-[#B8960C] hover:bg-[#13213F]"
          >
            <Download className="h-5 w-5" />
            Download Resume
          </a>
        </motion.div>

        <div className="space-y-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-1 rounded-full bg-[#B8960C]" />
              <h3 className="text-2xl font-serif text-[#EEF2F9]">Experience</h3>
            </div>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <article key={index} className="rounded-xl border border-[#1A2744] bg-[#0B1428] p-8">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm uppercase tracking-[0.35em] text-[#8BA3C7]">{job.company}</p>
                      <h4 className="mt-3 text-2xl font-serif text-[#EEF2F9]">{job.title}</h4>
                    </div>
                    <p className="text-xs uppercase tracking-[0.35em] text-[#7A8EAB]">{job.period}</p>
                  </div>
                  <p className="mt-5 text-[#CAD4E4] leading-7">{job.description}</p>
                  <div className="mt-5 space-y-3 text-sm leading-7 text-[#CED9EB]">
                    {job.achievements.map((item, idx) => (
                      <p key={idx}>• {item}</p>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-1 rounded-full bg-[#B8960C]" />
              <h3 className="text-2xl font-serif text-[#EEF2F9]">Education</h3>
            </div>
            <article className="rounded-xl border border-[#1A2744] bg-[#0B1428] p-8">
              <p className="text-sm uppercase tracking-[0.35em] text-[#8BA3C7]">{education.school}</p>
              <h4 className="mt-3 text-2xl font-serif text-[#EEF2F9]">{education.degree}</h4>
              <p className="mt-3 text-sm uppercase tracking-[0.35em] text-[#7A8EAB]">{education.period}</p>
              <p className="mt-5 text-[#CAD4E4] leading-7">{education.description}</p>
            </article>
          </motion.div>

          <motion.div
            id="skills"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.8, delay: 0.15 }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-1 rounded-full bg-[#B8960C]" />
              <h3 className="text-2xl font-serif text-[#EEF2F9]">Technical Skills</h3>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {technicalSkills.map((group) => (
                <div key={group.category} className="rounded-xl border border-[#1A2744] bg-[#0B1428] p-6 transition-all hover:border-[#B8960C]/50 hover:shadow-[0_0_15px_rgba(184,150,12,0.1)]">
                  <p className="text-sm uppercase tracking-[0.35em] text-[#8BA3C7] mb-6">{group.category}</p>
                  <div className="flex flex-wrap items-center gap-3">
                    {group.skills.map((skillGroup, idx) => (
                      <React.Fragment key={idx}>
                        {skillGroup.type === 'skillicon' ? (
                          skillGroup.icons.map(icon => {
                            const tsMap = { py: 'python', js: 'js', cs: 'csharp', html: 'html5', css: 'css3', tailwind: 'tailwindcss' };
                            const tsIcon = tsMap[icon] || icon;
                            return (
                              <img 
                                key={icon} 
                                src={`https://techstack-generator.vercel.app/${tsIcon}-icon.svg`} 
                                onError={(e) => { e.target.onerror = null; e.target.src = `https://skillicons.dev/icons?i=${icon}&theme=dark`; }}
                                alt={icon} 
                                title={icon}
                                className="h-11 w-11 hover:-translate-y-1 transition-transform cursor-pointer" 
                              />
                            );
                          })
                        ) : (
                          <img 
                            src={skillGroup.url} 
                            alt="shield" 
                            className="h-7 rounded opacity-90 hover:opacity-100 hover:-translate-y-1 transition-all cursor-pointer shadow-sm" 
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumePage;
