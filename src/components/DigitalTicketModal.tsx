import React, { useState } from 'react';
import { X, Calendar, Clock, MapPin, Check, Copy, Download, Share2, Sparkles, ExternalLink, QrCode } from 'lucide-react';
import { RegistrationData } from '../types';

interface DigitalTicketModalProps {
  data: RegistrationData;
  onClose: () => void;
}

export const DigitalTicketModal: React.FC<DigitalTicketModalProps> = ({ data, onClose }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyPass = () => {
    navigator.clipboard.writeText(
      `Birthday Live Chat 2.0 Pass\nAttendee: ${data.fullName}\nPass ID: ${data.id}\nCode: ${data.accessPassCode}\nTheme: PURPOSEFUL LIVING, PURPOSEFUL LEADING`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateICS = () => {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Wise Leaders Workshop//Birthday Live Chat 2.0//EN',
      'BEGIN:VEVENT',
      `UID:${data.id}@wiseleadersworkshop.org`,
      'DTSTAMP:20261010T120000Z',
      'DTSTART:20261024T180000Z',
      'DTEND:20261024T210000Z',
      'SUMMARY:Birthday Live Chat 2.0: PURPOSEFUL LIVING, PURPOSEFUL LEADING with Pst. Dr. Daniel Fadeyi',
      'DESCRIPTION:Celebrating the birthday of Pst. Dr. Daniel Fadeyi with an executive live session on PURPOSEFUL LIVING, PURPOSEFUL LEADING. Your Pass ID is ' + data.id,
      'LOCATION:Live on Zoom',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Birthday_Live_Chat_2.0_Pass_${data.id}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    'Birthday Live Chat 2.0: Purposeful Living and Leading'
  )}&dates=20261024T090000Z/20261024T130000Z&details=${encodeURIComponent(
    `Official leadership session with Pst. Dr. Daniel Fadeyi. Attendee Pass: ${data.id} - ${data.accessPassCode}`
  )}&location=${encodeURIComponent('Wise Leaders Live Portal / Lagos, Nigeria')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Registration Confirmed
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-200/60 transition-colors"
            aria-label="Close pass modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Digital Boarding Pass */}
        <div className="p-6 sm:p-8">
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg relative overflow-hidden border border-blue-800/40">
            {/* Ambient Graphic Accent */}
            <div
              className="absolute -top-16 -right-16 w-44 h-44 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Pass Header */}
            <div className="flex items-start justify-between gap-4 border-b border-slate-700/60 pb-5 mb-5">
              <div>
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest block">
                  Official Attendee Pass
                </span>
                <h3 className="text-lg sm:text-xl font-bold tracking-tight text-white mt-0.5">
                  Birthday Live Chat 2.0
                </h3>
                <p className="text-xs text-amber-300 font-semibold">
                  Theme: "PURPOSEFUL LIVING, PURPOSEFUL LEADING"
                </p>
              </div>
              <div className="text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block">
                  Pass ID
                </span>
                <span className="text-base sm:text-lg font-mono font-extrabold text-amber-300">
                  {data.id}
                </span>
              </div>
            </div>

            {/* Attendee Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-xs mb-6">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Attendee Name</span>
                <span className="font-bold text-sm text-white truncate block">{data.fullName}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Registration Status</span>
                <span className="font-bold text-sm text-emerald-400 uppercase tracking-wide">
                  Confirmed Attendee
                </span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Date &amp; Time</span>
                <span className="font-medium text-slate-200">Oct 24, 2026 · 7:00 PM WAT</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Security Access Code</span>
                <span className="font-mono text-slate-200">{data.accessPassCode}</span>
              </div>
            </div>

            {/* Simulated QR Code / Ticket Stub Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-dashed border-slate-700/80">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white p-1 rounded-lg text-slate-900 flex items-center justify-center">
                  <QrCode className="w-10 h-10" />
                </div>
                <div className="text-[11px] text-slate-300 leading-tight">
                  <span className="font-semibold text-white block">Wise Leaders Workshop</span>
                  Valid for 1 confirmed attendee
                </div>
              </div>
              <button
                onClick={handleCopyPass}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors border border-white/20"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={googleCalendarUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-blue-900 bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors"
              >
                <Calendar className="w-4 h-4" />
                <span>Add to Google Calendar</span>
              </a>

              <button
                onClick={generateICS}
                className="flex items-center justify-center gap-2 py-3 px-4 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download .ICS File</span>
              </button>
            </div>

            <button
              onClick={() => window.print()}
              className="w-full py-3 px-4 text-xs font-semibold text-slate-600 hover:text-slate-900 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Print / Save Confirmation Receipt
            </button>
          </div>
        </div>

        {/* Modal Footer Note */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-500">
            A confirmation email with session access details has been prepared for <strong className="text-slate-700">{data.email}</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
