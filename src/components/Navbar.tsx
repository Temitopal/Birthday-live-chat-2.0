import React, { useState, useEffect } from 'react';
import { WiseLeadersLogo } from './WiseLeadersLogo';
import birthdayBadgeImg from '../assets/images/birthday_live_chat_header_badge.png';

interface NavbarProps {
  onNavClick?: (href: string) => void;
}

export const Navbar: React.FC<NavbarProps> = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#040E26]/95 backdrop-blur-md shadow-lg border-b border-white/10 py-2.5'
          : 'bg-[#040E26]/80 backdrop-blur-sm border-b border-white/10 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Brand Zone with Official Wise Leaders Logo & Drive Birthday Live Chat Badge */}
          <a
            href="#hero"
            className="flex items-center gap-3 group whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-blue-400 rounded-md"
            aria-label="Wise Leaders Workshop Home"
          >
            <WiseLeadersLogo size="md" theme="dark" />
            <div className="flex items-center pl-3 sm:pl-4 border-l border-white/20">
              <img
                src={birthdayBadgeImg}
                alt="Birthday Live Chat 2.0"
                className="h-9 sm:h-12 w-auto object-contain drop-shadow-md select-none"
              />
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};
