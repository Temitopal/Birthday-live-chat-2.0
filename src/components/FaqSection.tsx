import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '../types';
import secondSectionBg from '../assets/images/second_section_bg.jpg';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'What is Birthday Live Chat 2.0 and who should attend?',
      answer:
        'Birthday Live Chat 2.0 is an annual value-driven leadership gathering celebrating the birthday of Dr. Daniel Fadeyi. It is designed for emerging leaders, executives, professionals, entrepreneurs, and anyone yearning to discover their authentic purpose, live deliberately, and lead with clarity and lasting impact.',
      category: 'general',
    },
    {
      id: 'faq-3',
      question: 'How do I join the live session?',
      answer:
        'The program will be hosted live on Zoom on Saturday, 24th October 2026 at 7:00 PM WAT. Upon submitting your registration, you will receive your official attendee pass and direct Zoom session access link.',
      category: 'logistics',
    },
    {
      id: 'faq-5',
      question: 'Can I submit questions in advance for Dr. Daniel Fadeyi?',
      answer:
        'Absolutely. You can submit questions directly during the interactive Q&A session on Zoom, or submit them through the official WhatsApp group.',
      category: 'materials',
    },
  ];

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-20 md:py-28 bg-[#040E26] text-white border-t border-blue-900/40 overflow-hidden">
      {/* Background image applied strictly to second section with 18% opacity & dark contrast overlay */}
      <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden" aria-hidden="true">
        <img
          src={secondSectionBg}
          alt=""
          className="w-full h-full object-cover object-center opacity-20"
        />
        {/* Semi-transparent overlay to ensure text and buttons remain crisp and highly legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#040E26]/90 via-[#040E26]/80 to-[#040E26]/95" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block mb-2">
            Frequently Asked Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
            Everything You Need To Know
          </h2>
          <p className="text-base text-slate-300 max-w-xl mx-auto">
            Got questions about joining Birthday Live Chat 2.0? Find quick answers below.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden backdrop-blur-md ${
                  isOpen
                    ? 'border-blue-600/60 bg-blue-950/75 shadow-lg'
                    : 'border-blue-900/50 bg-[#061536]/80 hover:border-blue-700/60'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(faq.id)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 focus-visible:outline-2 focus-visible:outline-blue-400"
                  aria-expanded={isOpen}
                >
                  <span className="text-base sm:text-lg font-bold text-white leading-snug">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-amber-400 text-slate-950 rotate-180'
                        : 'bg-blue-900/60 text-slate-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-300 leading-relaxed border-t border-blue-900/40 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
