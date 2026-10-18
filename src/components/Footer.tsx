import React from 'react';
import { Mail, Youtube, Instagram } from 'lucide-react';
import birthdayBadgeImg from '../assets/images/birthday_live_chat_footer_badge.png';
import thirdSectionBg from '../assets/images/third_section_bg.jpg';

interface FooterProps {
  onNavClick?: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="relative bg-[#020716] text-white pt-16 pb-12 border-t border-blue-900/40 overflow-hidden">
      {/* Background image applied strictly to third section with ~20% opacity & dark contrast overlay */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
        <img
          src={thirdSectionBg}
          alt=""
          className="w-full h-full object-cover object-center opacity-20"
        />
        {/* Semi-transparent overlay to ensure text, headings, links and icons remain clear and readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020716]/90 via-[#020716]/85 to-[#020716]/95" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 pb-12 border-b border-blue-900/30">
          {/* Column 1: Program Logo & Short Description */}
          <div className="space-y-4 max-w-md">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white rounded-xl p-1 flex items-center justify-center shrink-0 shadow-sm">
                <img
                  src="/src/assets/images/wise_leaders_logo.svg"
                  alt="Wise Leaders Workshop Logo"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="border-l border-blue-800/60 pl-3">
                <img
                  src={birthdayBadgeImg}
                  alt="Birthday Live Chat 2.0"
                  className="h-10 sm:h-12 w-auto object-contain drop-shadow-md select-none"
                />
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed">
              The annual value-driven gathering celebrating the birthday of Dr. Daniel Fadeyi. Inspiring emerging and established leaders to discover purpose, live intentionally, and lead with clarity and lasting impact.
            </p>
          </div>

          {/* Column 2: Contact Information */}
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                Contact Information
              </h4>
              <div className="space-y-3 text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-slate-400 text-xs block">Email</span>
                    <a href="mailto:wiseleadersworkshop@gmail.com" className="hover:text-white transition-colors">
                      wiseleadersworkshop@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Follow Us */}
            <div className="pt-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3">
                Follow Us
              </h4>
              <div className="flex items-center gap-3 text-slate-400">
                <a
                  href="https://youtube.com/@wiseleadersworkshop?si=SB42AgbcT0wXELWf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-900 hover:bg-red-700 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                  aria-label="Wise Leaders Workshop YouTube Channel"
                >
                  <Youtube className="w-4 h-4" />
                </a>
                <a
                  href="https://www.instagram.com/wise_leaders_workshop?dlrf=MWo0OGt1aGh6bGh0Zg=="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-slate-900 hover:bg-pink-700 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                  aria-label="Wise Leaders Workshop Instagram Profile"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© 2026 Wise Leaders Workshop. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};
