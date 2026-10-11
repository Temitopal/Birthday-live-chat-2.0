import React from 'react';
import { Mail, Youtube, Instagram } from 'lucide-react';
import { BirthdayLiveChatBadge } from './BirthdayLiveChatBadge';

interface FooterProps {
  onNavClick?: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="bg-[#020716] text-white pt-16 pb-12 border-t border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                <BirthdayLiveChatBadge size="sm" />
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
