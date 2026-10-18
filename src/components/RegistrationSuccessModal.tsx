import React from 'react';
import { CheckCircle2, ArrowRight, X, MessageCircle } from 'lucide-react';
import { RegistrationData } from '../types';
import { WHATSAPP_GROUP_INVITE_URL } from '../config';

interface RegistrationSuccessModalProps {
  data: RegistrationData;
  onClose: () => void;
  onViewPass: () => void;
}

export const RegistrationSuccessModal: React.FC<RegistrationSuccessModalProps> = ({
  data,
  onClose,
  onViewPass,
}) => {
  const whatsappUrl = WHATSAPP_GROUP_INVITE_URL;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="success-modal-title"
    >
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 md:p-9 shadow-2xl border border-slate-200 text-slate-900 animate-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors focus-visible:outline-2 focus-visible:outline-blue-600"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Success Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-emerald-50 text-emerald-600 border-2 border-emerald-200 flex items-center justify-center mx-auto mb-5 shadow-xs">
          <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12" />
        </div>

        {/* Title */}
        <h2
          id="success-modal-title"
          className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight text-center"
        >
          Registration Successful!
        </h2>

        {/* Message */}
        <p className="text-sm sm:text-base text-slate-600 text-center mt-3 leading-relaxed max-w-md mx-auto">
          Thank you for registering. Please join our official WhatsApp group to receive important updates, announcements, and information about the program.
        </p>

        {/* Attendee Confirmation Snapshot */}
        <div className="my-6 p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Registered Attendee
            </span>
            <span className="font-bold text-sm text-slate-900 truncate block">
              {data.fullName}
            </span>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              Pass ID
            </span>
            <span className="font-mono font-extrabold text-blue-900 text-sm">
              {data.id}
            </span>
          </div>
        </div>

        {/* Prominent "Join WhatsApp Group" Button */}
        <div className="space-y-3 pt-1">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Join official WhatsApp group (opens in a new tab)"
            className="w-full flex items-center justify-center gap-3 py-4 px-6 text-base sm:text-lg font-black text-white bg-[#25D366] hover:bg-[#20bd5a] active:bg-[#1da850] rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.01] active:scale-[0.99] text-center focus-visible:outline-2 focus-visible:outline-emerald-600"
          >
            <MessageCircle className="w-6 h-6 fill-white" />
            <span>Join WhatsApp Group</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" />
          </a>

          {/* Subtle "Continue" or "Maybe Later" Options */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-xs sm:text-sm">
            <button
              type="button"
              onClick={onViewPass}
              className="font-bold text-blue-900 hover:text-blue-700 hover:underline transition-colors py-1"
            >
              Continue to View Pass →
            </button>
            <span className="text-slate-300 hidden sm:inline" aria-hidden="true">·</span>
            <button
              type="button"
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors py-1"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
