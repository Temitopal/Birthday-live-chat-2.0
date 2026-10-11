import React, { useState } from 'react';
import { X, Search, Ticket, Mail, AlertCircle, ArrowRight } from 'lucide-react';
import { RegistrationData } from '../types';

interface LoginModalProps {
  onClose: () => void;
  onSuccess: (data: RegistrationData) => void;
  onOpenRegister: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  onClose,
  onSuccess,
  onOpenRegister,
}) => {
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      setError('Please enter your email or Pass ID.');
      return;
    }

    try {
      const stored = localStorage.getItem('wl_registrations');
      const list: RegistrationData[] = stored ? JSON.parse(stored) : [];
      const match = list.find(
        (item) =>
          item.email.toLowerCase() === trimmed ||
          item.id.toLowerCase() === trimmed ||
          item.accessPassCode.toLowerCase() === trimmed
      );

      if (match) {
        onSuccess(match);
      } else {
        // If none found in localStorage, check if user wants demo access or prompt registration
        setError('No registration record found matching this email or Pass ID. Please register or verify spelling.');
      }
    } catch {
      setError('An error occurred during lookup. Please try again.');
    }
  };

  const handleDemoLookup = () => {
    const demoData: RegistrationData = {
      id: 'WL-7821',
      fullName: 'Pst. Dr. Daniel Fadeyi VIP Guest',
      email: query.trim() || 'attendee@wiseleaders.org',
      phone: '+234 802 345 6789',
      referralSource: 'Wise Leaders Workshop Alumni Network',
      interestReason: 'Passionate about aligning purpose and multiplying organizational leadership capacity.',
      attendanceMode: 'virtual',
      agreeToUpdates: true,
      registeredAt: new Date().toISOString(),
      accessPassCode: 'WL2026-PREVIEW',
    };
    onSuccess(demoData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 block">
              Attendee Access
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Lookup Your Registration
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="Close login modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-slate-600 mb-6 leading-relaxed">
            Enter the email address or Pass ID you used when registering for Birthday Live Chat 2.0 to access your attendee pass and meeting details.
          </p>

          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label htmlFor="loginQuery" className="block text-xs font-bold uppercase text-slate-500 mb-1.5">
                Registered Email or Pass ID
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="loginQuery"
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="name@organization.com or WL-XXXX"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-slate-900 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent"
                  autoFocus
                />
              </div>
              {error && (
                <div className="mt-2 flex items-start gap-1.5 text-xs text-red-600 font-medium">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-4 text-sm font-bold text-white bg-blue-900 hover:bg-blue-800 rounded-full transition-colors shadow-sm"
            >
              <Search className="w-4 h-4" />
              <span>Find My Attendee Pass</span>
            </button>
          </form>

          {/* Quick Demo Option for convenience */}
          <div className="mt-6 pt-5 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={handleDemoLookup}
              className="text-xs text-blue-900 hover:underline font-semibold"
            >
              First time here? Preview sample attendee pass
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 text-center">
          <p className="text-xs text-slate-600">
            Don't have a pass yet?{' '}
            <button
              onClick={() => {
                onClose();
                onOpenRegister();
              }}
              className="font-bold text-blue-900 hover:underline"
            >
              Register here now
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
