import React, { useState } from 'react';
import { Github, Linkedin } from 'lucide-react';
import { socialLinks } from '../../data/profile';
import { downloadPortfolioMarkdown } from '../../utils/exportPortfolioMarkdown';
import CardFlipEgg from '../ui/CardFlipEgg';

const Footer = ({ reviews }) => {
  const [exported, setExported] = useState(false);

  const handleExport = () => {
    downloadPortfolioMarkdown(reviews);
    setExported(true);
    window.setTimeout(() => setExported(false), 1800);
  };

  return (
    <footer className="border-t border-[#1A2744] bg-[#050A18]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <p className="text-sm text-[#7A8EAB]">
            © 2026 Raghav Sethi. Quiet confidence through careful design.
          </p>
          <span aria-hidden="true" className="text-[#1A2744] select-none">·</span>
          <button
            type="button"
            onClick={handleExport}
            aria-label="Export complete portfolio as Markdown"
            className="bg-transparent border-0 p-0 font-mono text-[11px] tracking-[0.14em] lowercase text-[#7A8EAB]/60 transition-colors duration-300 hover:text-[#B8960C] focus:outline-none cursor-pointer"
          >
            {exported ? 'exported .md' : 'export portfolio'}
          </button>
        </div>

        <div className="flex items-end justify-center">
          <CardFlipEgg />
        </div>

        <div className="flex items-center gap-4">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#1A2744] bg-[#0B1428] p-3 text-[#EEF2F9] transition hover:border-[#B8960C] hover:text-[#EEF2F9]"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[#1A2744] bg-[#0B1428] p-3 text-[#EEF2F9] transition hover:border-[#B8960C] hover:text-[#EEF2F9]"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
