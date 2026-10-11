import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FaqItem } from '../types';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const faqs: FaqItem[] = [
    {
      id: 'faq-1',
      question: 'What is Birthday Live Chat 2.0 and who should attend?',
      answer:
        'Birthday Live Chat 2.0 is an annual value-driven leadership gathering celebrating the birthday of Pst. Dr. Daniel Fadeyi. It is designed for emerging leaders, executives, church workers, professionals, entrepreneurs, and anyone yearning to discover their authentic purpose, live deliberately, and lead with clarity and lasting impact.',
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
      id: 'faq-4',
      question: 'Will replay recordings and session workbooks be provided?',
      answer:
        'Yes. All registered attendees receive complimentary access to the downloadable "Purpose Blueprint" digital workbook prior to the event, as well as priority access to post-session recap materials and key wisdom highlights.',
      category: 'materials',
    },
    {
      id: 'faq-5',
      question: 'Can I submit questions in advance for Pst. Dr. Daniel Fadeyi?',
      answer:
        'Absolutely. During the registration process, you can outline your key leadership questions in the "Why are you interested in this program?" field, or submit live questions during the interactive Q&A session.',
      category: 'materials',
    },
    {
      id: 'faq-6',
      question: 'Can I invite members of my executive team or church fellowship?',
      answer:
        'Yes! We encourage leaders to invite their teams. Each participant should register individually so they receive their unique Attendee Pass and personalized session materials.',
      category: 'logistics',
    },
  ];

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-[#040E26] text-white border-t border-blue-900/40">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'border-blue-600/60 bg-blue-950/60 shadow-lg'
                    : 'border-blue-900/50 bg-[#061536]/70 hover:border-blue-700/60'
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
