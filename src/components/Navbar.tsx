import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { WiseLeadersLogo } from './WiseLeadersLogo';
import birthdayBadgeImg from '../assets/images/birthday_live_chat_header_badge.png';

interface NavbarProps {
  onNavClick?: (href: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Register', href: '#register' },
    { label: 'FAQ', href: '#faq' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    if (onNavClick) {
      onNavClick(href);
    } else {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

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
            <div className="hidden sm:flex items-center pl-4 border-l border-white/20">
              <img
                src={birthdayBadgeImg}
                alt="Birthday Live Chat 2.0"
                className="h-10 sm:h-12 w-auto object-contain drop-shadow-md select-none"
              />
            </div>
          </a>

          {/* Center / Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-200"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-amber-400 focus-visible:outline-2 focus-visible:outline-blue-400 rounded-xs"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Mobile Hamburger Toggle */}
          <div className="flex md:hidden items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-200 hover:text-white focus-visible:outline-2 focus-visible:outline-blue-400 rounded-lg border border-white/20 bg-slate-900/60"
              aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#040E26] px-6 pt-3 pb-6 shadow-2xl">
          <div className="pb-3 mb-3 border-b border-white/10">
            <img
              src={birthdayBadgeImg}
              alt="Birthday Live Chat 2.0"
              className="h-9 w-auto object-contain drop-shadow-md"
            />
          </div>
          <nav className="flex flex-col space-y-3 pt-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleLinkClick(link.href);
                }}
                className="text-base font-semibold text-slate-200 hover:text-amber-400 py-2 border-b border-white/10 last:border-b-0"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};
