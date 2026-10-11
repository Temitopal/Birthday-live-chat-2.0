/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import mainPageBg from './assets/images/custom_bg_flyer.png';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { DigitalTicketModal } from './components/DigitalTicketModal';
import { LoginModal } from './components/LoginModal';
import { RegistrationData } from './types';

export default function App() {
  const [currentRegistration, setCurrentRegistration] = useState<RegistrationData | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('wl_current_user');
      if (stored) {
        setCurrentRegistration(JSON.parse(stored));
      }
    } catch {
      // Ignore local storage parse errors
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  const handleRegistrationSuccess = (data: RegistrationData) => {
    setCurrentRegistration(data);
    setShowTicketModal(true);
    showToast(`Welcome ${data.fullName}! Your registration has been confirmed.`);
  };

  const handleLoginSuccess = (data: RegistrationData) => {
    setCurrentRegistration(data);
    setShowLoginModal(false);
    setShowTicketModal(true);
    showToast(`Welcome back, ${data.fullName}! Here is your Attendee Pass.`);
  };

  const scrollToSection = (selector: string) => {
    const el = document.querySelector(selector);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen relative text-white flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* Main Page Background Image (Replaces the Blue Background) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden select-none" aria-hidden="true">
        <img
          src={mainPageBg}
          alt=""
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle Darkening Scrim for Crisp Contrast on Foreground Elements */}
        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[2px]" />
      </div>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-blue-500/40 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shrink-0" />
          <p className="text-xs sm:text-sm font-medium">{toastMessage}</p>
        </div>
      )}

      {/* Navigation Bar */}
      <Navbar onNavClick={(href) => scrollToSection(href)} />

      {/* Main Single-Page Experience */}
      <main className="flex-1">
        {/* 1. First Page: Welcome Hero + Typewriter Text + Flyer beside Registration Form */}
        <Hero
          onRegistrationSuccess={handleRegistrationSuccess}
          existingRegistration={currentRegistration}
          onViewPass={() => setShowTicketModal(true)}
          onOpenLookup={() => setShowLoginModal(true)}
        />

        {/* 2. Frequently Asked Questions */}
        <FaqSection />
      </main>

      {/* 3. Footer */}
      <Footer onNavClick={(href) => scrollToSection(href)} />

      {/* Digital Attendee Ticket Modal */}
      {showTicketModal && currentRegistration && (
        <DigitalTicketModal
          data={currentRegistration}
          onClose={() => setShowTicketModal(false)}
        />
      )}

      {/* Lookup / Pass Recovery Modal */}
      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onSuccess={handleLoginSuccess}
          onOpenRegister={() => scrollToSection('#register')}
        />
      )}
    </div>
  );
}
