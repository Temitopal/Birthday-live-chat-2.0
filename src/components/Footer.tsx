import React from 'react';
import { Mail, Phone, MapPin, Youtube, Linkedin, Instagram, Twitter, Facebook, ArrowUp } from 'lucide-react';
import { BirthdayLiveChatBadge } from './BirthdayLiveChatBadge';

interface FooterProps {
  onNavClick: (href: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#020716] text-white pt-16 pb-12 border-t border-blue-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-blue-900/30">
          {/* Column 1: Program Logo & Short Description (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-4">
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

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              The annual value-driven gathering celebrating the birthday of Pst. Dr. Daniel Fadeyi. Inspiring emerging and established leaders to discover purpose, live intentionally, and lead with clarity and lasting impact.
            </p>

            <div className="pt-2 flex items-center gap-3 text-slate-400">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-blue-900 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-red-700 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-pink-700 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="X / Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-slate-900 hover:bg-blue-800 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (lg:col-span-3) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-slate-300">
              <li>
                <button
                  onClick={() => onNavClick('#hero')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Program Overview
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('#register')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Registration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavClick('#faq')}
                  className="hover:text-amber-400 transition-colors text-left"
                >
                  Frequently Asked Questions
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Information (lg:col-span-4) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400">
              Contact Information
            </h4>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 text-xs block">Secretariat Email</span>
                  <a href="mailto:info@wiseleadersworkshop.org" className="hover:text-white transition-colors">
                    info@wiseleadersworkshop.org
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 text-xs block">Attendee Support</span>
                  <span className="text-slate-200">+234 (0) 803 200 4589</span>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-slate-400 text-xs block">Global Fellowship Headquarters</span>
                  <span className="text-slate-200">Wise Leaders Workshop Center, Lagos, Nigeria</span>
                </div>
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
