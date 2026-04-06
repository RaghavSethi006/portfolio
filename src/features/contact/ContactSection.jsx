import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { socialLinks, email } from '../../data/profile';

const ContactSection = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20">
      <div className="grid gap-10 lg:grid-cols-[1.6fr_1fr] items-start">
        <div>
          <p className="text-sm uppercase tracking-[0.35em] text-[#8BA3C7] mb-4">Let’s Talk</p>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#EEF2F9] leading-tight">
            Precision in code. Clarity in collaboration.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#CAD4E4]">
            If you want work that is deliberate, readable, and engineered to last, send a note. I respond like a well-designed system: quickly, clearly, and with purpose.
          </p>
        </div>

        <div className="rounded-2xl border border-[#1A2744] bg-[#0B1428] p-8">
          <div className="space-y-6">
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-3 rounded-xl border border-[#C8D8F0]/20 bg-[#050A18] px-5 py-4 text-sm font-medium text-[#EEF2F9] transition hover:border-[#B8960C] hover:text-[#EEF2F9]"
            >
              <Mail className="w-5 h-5 text-[#B8960C]" />
              {email}
            </a>

            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-[#7A8EAB]">
                <Github className="w-5 h-5 text-[#C8D8F0]" />
                <a
                  href={socialLinks.github}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-[#EEF2F9]"
                >
                  GitHub
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-[#7A8EAB]">
                <Linkedin className="w-5 h-5 text-[#C8D8F0]" />
                <a
                  href={socialLinks.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="transition hover:text-[#EEF2F9]"
                >
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-[#C8D8F0]/10 bg-[#050A18]/60 px-5 py-4 text-sm text-[#CAD4E4]">
              <p>
                I keep conversations direct. No long forms. No confusing tiers. If you have a challenge that needs smarter systems, this is the right place.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
