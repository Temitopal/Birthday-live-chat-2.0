import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock } from 'lucide-react';
import flyerBesideReg from '../assets/images/flyer_beside_reg.png';
import { RegistrationForm } from './RegistrationForm';
import { RegistrationData } from '../types';

interface HeroProps {
  onRegistrationSuccess: (data: RegistrationData) => void;
  existingRegistration: RegistrationData | null;
  onViewPass: () => void;
  onOpenLookup?: () => void;
}

/**
 * Prominent Typewriter Animation for "You Are Welcome"
 * Types character-by-character on page load with prominent text size and blinking cursor.
 */
const TypewriterWelcome: React.FC = () => {
  const fullText = 'You Are Welcome';
  const [displayedText, setDisplayedText] = useState('');
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    let index = 0;
    // Types character by character smoothly in real time
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayedText(fullText.slice(0, index));
        index++;
      } else {
        setIsDone(true);
        clearInterval(interval);
      }
    }, 90);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center min-h-[46px] py-1.5 px-4 sm:px-5 rounded-full bg-amber-400/20 border-2 border-amber-400/40 backdrop-blur-md shadow-lg select-none">
      <span className="text-base sm:text-lg md:text-xl font-black text-amber-300 tracking-wider uppercase font-mono">
        {displayedText}
      </span>
      {/* Blinking Typewriter Cursor */}
      <span
        className={`inline-block w-1.5 sm:w-2 h-4 sm:h-5 bg-amber-300 ml-1.5 rounded-2xs align-middle ${
          isDone ? 'animate-pulse' : 'animate-ping'
        }`}
      />
    </div>
  );
};

export const Hero: React.FC<HeroProps> = ({
  onRegistrationSuccess,
  existingRegistration,
  onViewPass,
}) => {
  return (
    <section
      id="hero"
      className="relative pt-28 pb-16 md:pt-36 md:pb-24 text-white overflow-hidden min-h-[92vh] bg-transparent"
    >
      {/* Subtle Floating Ambient Motion Lights */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -40, 20, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-10 left-10 w-[500px] h-[500px] bg-blue-500/15 rounded-full blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-2">
        {/* Top Header Zone: Prominent Typewriter Eyebrow, Main Headline, Copy, Logistics */}
        <div className="max-w-4xl mb-10 md:mb-12">
          {/* Prominent Typewriter "You Are Welcome" (Automatically types on load, larger text) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="mb-5"
          >
            <TypewriterWelcome />
          </motion.div>

          {/* Main Headline with Motion */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
            className="text-3xl sm:text-4xl md:text-5xl xl:text-[3.4rem] font-black tracking-tight leading-[1.08] mb-6"
          >
            <span className="block text-amber-400 drop-shadow-md">
              PURPOSEFUL LIVING
            </span>
            <span className="block text-white drop-shadow-md mt-1.5">
              PURPOSEFUL LEADING
            </span>
          </motion.h1>

          {/* Supporting Copy */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
            className="space-y-3.5 text-base sm:text-lg text-slate-200 leading-relaxed max-w-3xl"
          >
            <p>
              The <strong className="font-semibold text-white">Birthday Live Chat 2.0</strong> is the second edition of the annual value-driven program celebrating the birthday of <strong className="font-semibold text-amber-300">Pst. Dr. Daniel Fadeyi</strong>, Visionary Leader of Wise Leaders Workshop.
            </p>
            <p>
              This year’s theme, <span className="font-bold text-amber-400">“PURPOSEFUL LIVING, PURPOSEFUL LEADING,”</span> explores how to discover your purpose, live intentionally, and lead with clarity and impact.
            </p>
            <p>
              Join us for insightful conversations and practical wisdom to inspire personal growth and effective leadership.
            </p>
            <p className="font-bold text-amber-400 text-base sm:text-lg flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping inline-block" />
              Register now and book your seat!
            </p>
          </motion.div>

          {/* Event Logistics: Date, 7:00 PM, and Zoom Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45, ease: 'easeOut' }}
            className="pt-6 mt-6 border-t border-white/15 flex flex-wrap items-center gap-y-3 gap-x-5 text-xs sm:text-sm text-slate-200"
          >
            {/* Date */}
            <div className="flex items-center gap-2 font-semibold bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-sm">
              <Calendar className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Saturday, October 24, 2026</span>
            </div>

            {/* Time: 7:00 PM */}
            <div className="flex items-center gap-2 font-semibold bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-sm">
              <Clock className="w-4 h-4 text-blue-300 shrink-0" />
              <span>7:00 PM (WAT / GMT+1)</span>
            </div>

            {/* Zoom Official Logo Badge */}
            <div className="flex items-center gap-2 bg-slate-900/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/15 shadow-sm">
              <div className="w-5 h-5 bg-[#2D8CFF] rounded-md flex items-center justify-center shrink-0 shadow-xs">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 text-white" fill="currentColor">
                  <path d="M4.5 7.5A2.5 2.5 0 0 1 7 5h7a2.5 2.5 0 0 1 2.5 2.5v9A2.5 2.5 0 0 1 14 19H7a2.5 2.5 0 0 1-2.5-2.5v-9z" />
                  <path d="M17.5 10.134l3.5-2.042A1 1 0 0 1 22.5 8.96v6.08a1 1 0 0 1-1.5.868l-3.5-2.042V10.134z" />
                </svg>
              </div>
              <span>
                Live on <strong className="font-black text-[#38BDF8]">Zoom</strong>
              </span>
            </div>
          </motion.div>
        </div>

        {/* First Page Two-Column Grid: Heights Perfectly Aligned on Desktop (lg:items-stretch) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 lg:items-stretch items-start">
          {/* Left Column: Uploaded Flyer in Rounded Rectangle with Exact Matching Height */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
            className="lg:col-span-5 h-full flex flex-col"
          >
            {/* Masked into a rounded rectangle, exactly equal in height to the registration rounded rectangle */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-2 border-white/20 bg-slate-950/80 group h-full w-full flex flex-col">
              <img
                src={flyerBesideReg}
                alt="Birthday Live Chat 2.0 with Dr. Daniel Fadeyi - Official Event Flyer"
                className="w-full h-full object-cover rounded-3xl transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </div>
          </motion.div>

          {/* Right Column: Registration Form */}
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
            className="lg:col-span-7 h-full flex flex-col"
          >
            <div className="relative h-full flex flex-col">
              {/* Ambient Glowing Rim behind Form */}
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/30 to-amber-500/20 rounded-3xl blur-xl opacity-75 pointer-events-none" />

              {/* Registration Form Card Container */}
              <div className="relative h-full flex flex-col">
                <RegistrationForm
                  onSuccess={onRegistrationSuccess}
                  existingRegistration={existingRegistration}
                  onViewPass={onViewPass}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
