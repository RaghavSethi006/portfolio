import {
  bio,
  education,
  email,
  experience,
  interests,
  philosophy,
  reviews as defaultReviews,
  skills as coreSkillCategories,
  socialLinks,
} from '../data/profile';
import projects from '../data/projects';
import { EVID, SECTORS_RAW, SKILLS_RAW } from '../features/skills/SkillsHUD';
import { ROLES } from '../features/resume/NajdorfResume';

const ABOUT_NARRATIVE = [
  'I am a Computer Science Honours student at the University of Alberta, specializing in Artificial Intelligence. Currently, I serve as Founder & President of the IBM Z UAlberta Chapter, an IBM Z Ambassador, and Vice President of Technology for the Undergraduate Artificial Intelligence Society (UAIS), overseeing technical operations and cloud infrastructure.',
  'My work involves architecting retrieval-augmented generation (RAG) pipelines, building secure enterprise features, and designing scalable full-stack applications. I work primarily with Python, React, and Node.js, focusing on creating robust systems where every component serves a clear functional purpose.',
  'I am currently exploring autonomous agent workflows and optimizations for large-scale data retrieval. My goal is to engineer high-performance software that integrates sophisticated AI logic into stable, production-ready environments.',
];

export function buildPortfolioMarkdown(customReviews) {
  const activeReviews =
    Array.isArray(customReviews) && customReviews.length > 0
      ? customReviews
      : defaultReviews;

  const lines = [];

  // Header & Identity
  lines.push(`# ${bio.name}`);
  lines.push(`**${bio.title}**`);
  lines.push('');
  lines.push(`> ${bio.description}`);
  lines.push('');
  lines.push(`- **Email:** ${email}`);
  lines.push(`- **GitHub:** ${socialLinks.github}`);
  lines.push(`- **LinkedIn:** ${socialLinks.linkedin}`);
  lines.push(`- **Portfolio:** https://raghavsethi.me/`);
  if (Array.isArray(bio.highlights) && bio.highlights.length > 0) {
    lines.push(`- **Core Highlights:** ${bio.highlights.join(', ')}`);
  }
  lines.push('');

  // About
  lines.push('---');
  lines.push('');
  lines.push('## About');
  lines.push('');
  ABOUT_NARRATIVE.forEach((paragraph) => {
    lines.push(paragraph);
    lines.push('');
  });

  // Education
  lines.push('---');
  lines.push('');
  lines.push('## Education');
  lines.push('');
  lines.push(`### ${education.degree}`);
  lines.push(`- **Institution:** ${education.school}`);
  lines.push(`- **Period:** ${education.period}`);
  lines.push(`- **Focus:** ${education.description}`);
  lines.push('');

  // Experience (enriched with NajdorfResume figures, tags, and notes where matching)
  lines.push('---');
  lines.push('');
  lines.push(`## Experience (${experience.length} Roles)`);
  lines.push('');

  experience.forEach((exp, idx) => {
    const matchedRole = ROLES.find(
      (r) =>
        r.title.toLowerCase() === exp.title.toLowerCase() &&
        (r.org.toLowerCase() === exp.company.toLowerCase() ||
          r.dates === exp.period)
    );

    lines.push(`### ${idx + 1}. ${exp.title} — ${exp.company}`);
    lines.push(`**Period:** ${exp.period}`);
    lines.push('');
    lines.push(exp.description);
    lines.push('');

    if (matchedRole?.figs && matchedRole.figs.length > 0) {
      const figsText = matchedRole.figs
        .map(([val, label]) => `${val} (${label})`)
        .join(' · ');
      lines.push(`- **Key Figures:** ${figsText}`);
    }
    if (matchedRole?.tags && matchedRole.tags.length > 0) {
      lines.push(`- **Technologies / Focus:** ${matchedRole.tags.join(', ')}`);
    }
    if (matchedRole?.note) {
      lines.push(`- **Chess Line Note (${matchedRole.san}):** _"${matchedRole.note}"_`);
    }

    if (Array.isArray(exp.achievements) && exp.achievements.length > 0) {
      lines.push('');
      lines.push('**Key Achievements & Responsibilities:**');
      exp.achievements.forEach((item) => {
        lines.push(`- ${item}`);
      });
    }
    lines.push('');
  });

  // Projects (Complete Case Studies)
  lines.push('---');
  lines.push('');
  lines.push(`## Projects & Engineering Case Studies (${projects.length} Projects)`);
  lines.push('');

  projects.forEach((project, idx) => {
    lines.push(`### ${idx + 1}. ${project.title}`);
    lines.push(`- **Category:** ${project.category}`);
    lines.push(
      `- **Status:** ${project.status}${
        typeof project.progress === 'number' ? ` (${project.progress}% complete)` : ''
      }${project.featured ? ' · Featured' : ''}`
    );
    if (project.github) {
      lines.push(`- **Source Code:** ${project.github}`);
    }
    if (project.demo) {
      lines.push(`- **Live Demo:** ${project.demo}`);
    }
    if (Array.isArray(project.tech) && project.tech.length > 0) {
      lines.push(`- **Tech Stack:** ${project.tech.join(', ')}`);
    }
    lines.push('');
    lines.push(`**Summary:** ${project.description}`);
    lines.push('');

    const cs = project.caseStudy;
    if (cs) {
      if (cs.tagline) {
        lines.push(`> ${cs.tagline}`);
        lines.push('');
      }
      if (cs.metrics && cs.metrics.length > 0) {
        lines.push('**Metrics:**');
        cs.metrics.forEach((m) => {
          lines.push(`- **${m.label}:** ${m.value}`);
        });
        lines.push('');
      }
      if (cs.overview) {
        lines.push(`#### Overview`);
        lines.push(cs.overview);
        lines.push('');
      }
      if (cs.problem) {
        lines.push(`#### Problem`);
        lines.push(cs.problem);
        lines.push('');
      }
      if (cs.solution) {
        lines.push(`#### Solution`);
        lines.push(cs.solution);
        lines.push('');
      }
      if (cs.howIBuiltIt) {
        lines.push(`#### Architecture & Implementation`);
        lines.push(cs.howIBuiltIt);
        lines.push('');
      }
      if (Array.isArray(cs.features) && cs.features.length > 0) {
        lines.push(`#### Key Features`);
        cs.features.forEach((feat) => {
          lines.push(`- ${feat}`);
        });
        lines.push('');
      }
      if (Array.isArray(cs.techStack) && cs.techStack.length > 0) {
        lines.push(`#### Detailed Technology Breakdown`);
        cs.techStack.forEach((t) => {
          lines.push(`- **${t.name}:** ${t.detail}`);
        });
        lines.push('');
      }
      if (cs.challenge) {
        lines.push(`#### Engineering Challenge & Trade-offs`);
        lines.push(cs.challenge);
        lines.push('');
      }
    }
  });

  // Technical Skills
  lines.push('---');
  lines.push('');
  lines.push('## Technical Skills & Discipline');
  lines.push('');

  lines.push('### Core Proficiencies');
  coreSkillCategories.forEach((cat) => {
    const items = cat.skills.map((s) => `${s.name} (${s.level}%)`).join(', ');
    lines.push(`- **${cat.category}:** ${items}`);
  });
  lines.push('');

  lines.push('### Complete Technical Inventory');
  SECTORS_RAW.forEach((sector) => {
    const sectorSkills = SKILLS_RAW.filter((s) => s[3] === sector.id);
    const primary = sectorSkills.filter((s) => s[4] === 'd').map((s) => s[1]);
    const secondary = sectorSkills.filter((s) => s[4] === 't').map((s) => s[1]);
    lines.push(`#### ${sector.name}`);
    if (primary.length > 0) {
      lines.push(`- **Primary / Daily:** ${primary.join(', ')}`);
    }
    if (secondary.length > 0) {
      lines.push(`- **Additional Toolkit:** ${secondary.join(', ')}`);
    }
    lines.push('');
  });

  if (Array.isArray(EVID) && EVID.length > 0) {
    lines.push('### Applied Skill Evidence');
    EVID.forEach((ev) => {
      const linkStr =
        ev.links && ev.links.length > 0
          ? ` (${ev.links.map(([lbl, url]) => `[${lbl}](${url})`).join(' · ')})`
          : '';
      lines.push(`- **${ev.name}** [${ev.kind}]${linkStr}: ${ev.line}`);
    });
    lines.push('');
  }

  // Engineering Philosophy
  lines.push('---');
  lines.push('');
  lines.push('## Engineering Philosophy');
  lines.push('');
  philosophy.forEach((p) => {
    lines.push(`- **${p.title}:** ${p.description}`);
  });
  lines.push('');

  // Personal Interests
  lines.push('---');
  lines.push('');
  lines.push('## Personal Interests');
  lines.push('');
  interests.forEach((interest) => {
    lines.push(`- ${interest}`);
  });
  lines.push('');

  // Reviews & Testimonials
  if (activeReviews.length > 0) {
    lines.push('---');
    lines.push('');
    lines.push('## Testimonials & Reviews');
    lines.push('');
    activeReviews.forEach((r) => {
      const meta = [r.role, r.company, r.relationship].filter(Boolean).join(' · ');
      lines.push(`> "${r.quote}"`);
      lines.push(`> — **${r.author}**${meta ? ` (${meta})` : ''}`);
      lines.push('');
    });
  }

  lines.push('---');
  lines.push(
    `_Exported from Raghav Sethi's portfolio on ${new Date().toISOString().split('T')[0]}._`
  );

  return lines.join('\n');
}

export function downloadPortfolioMarkdown(customReviews) {
  const markdown = buildPortfolioMarkdown(customReviews);
  const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = 'Raghav_Sethi_Portfolio.md';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  return markdown;
}
