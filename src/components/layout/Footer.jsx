import React from 'react';
import { Github, Linkedin } from 'lucide-react';
import { socialLinks } from '../../data/profile';
import CardFlipEgg from '../ui/CardFlipEgg';

const Footer = () => {
  return (
    <footer className="border-t border-[#1A2744] bg-[#050A18]">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-10 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p className="text-sm text-[#7A8EAB]">
          © 2026 Raghav Sethi. Quiet confidence through careful design.
        </p>

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
