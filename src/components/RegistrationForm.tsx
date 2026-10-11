import React, { useState, useEffect } from 'react';
import { ShieldCheck, Send, User, Mail, Phone, HelpCircle, Ticket, CheckCircle2 } from 'lucide-react';
import { RegistrationData } from '../types';
import { appendRegistrationToGoogleSheet } from '../services/googleSheets';
import { initAuth, googleSignIn, getAccessToken } from '../services/auth';

interface RegistrationFormProps {
  onSuccess: (data: RegistrationData) => void;
  existingRegistration: RegistrationData | null;
  onViewPass: () => void;
}

export const RegistrationForm: React.FC<RegistrationFormProps> = ({
  onSuccess,
  existingRegistration,
  onViewPass,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [referralSource, setReferralSource] = useState('');
  const [agreeToUpdates, setAgreeToUpdates] = useState(true);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sheetsConnected, setSheetsConnected] = useState(false);
  const [isConnectingSheets, setIsConnectingSheets] = useState(false);
  const [sheetSyncSuccess, setSheetSyncSuccess] = useState(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      () => setSheetsConnected(true),
      () => setSheetsConnected(false)
    );
    // Check if token already present
    getAccessToken().then((tok) => {
      if (tok) setSheetsConnected(true);
    });
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const handleConnectSheets = async () => {
    setIsConnectingSheets(true);
    try {
      const res = await googleSignIn();
      if (res) {
        setSheetsConnected(true);
      }
    } catch (err) {
      console.warn('Google sign-in dismissed or failed:', err);
    } finally {
      setIsConnectingSheets(false);
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      errs.fullName = 'Please enter your full name.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email.trim())) {
      errs.email = 'Please provide a valid email address.';
    }

    const cleanedPhone = phone.replace(/[^0-9+]/g, '');
    if (!phone.trim() || cleanedPhone.length < 7) {
      errs.phone = 'Please enter a valid phone number (min 7 digits).';
    }

    if (!referralSource) {
      errs.referralSource = 'Please let us know how you heard about us.';
    }

    if (!agreeToUpdates) {
      errs.agreeToUpdates = 'You must agree to receive communications.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newRegistration: RegistrationData = {
      id: `WL-${randomId}`,
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      referralSource,
      agreeToUpdates,
      registeredAt: new Date().toISOString(),
      accessPassCode: `WL2026-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
    };

    // 1. Save locally for instant offline availability & backup
    try {
      const stored = localStorage.getItem('wl_registrations');
      const list: RegistrationData[] = stored ? JSON.parse(stored) : [];
      list.push(newRegistration);
      localStorage.setItem('wl_registrations', JSON.stringify(list));
      localStorage.setItem('wl_current_user', JSON.stringify(newRegistration));
    } catch (err) {
      console.error('Failed to save registration locally', err);
    }

    // 2. Automatically sync to Google Sheets
    try {
      const syncResult = await appendRegistrationToGoogleSheet(newRegistration);
      if (syncResult.success) {
        setSheetSyncSuccess(true);
      }
    } catch (sheetErr) {
      console.warn('Google Sheets background sync notice:', sheetErr);
    }

    setIsSubmitting(false);
    onSuccess(newRegistration);
  };

  return (
    <div id="register" className="w-full h-full flex flex-col">
      {/* Existing Registration Banner (if user already registered) */}
      {existingRegistration && (
        <div className="mb-6 p-4 rounded-2xl bg-blue-900 text-white flex flex-col sm:flex-row items-center justify-between gap-3 shadow-sm border border-blue-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-800 text-amber-400 flex items-center justify-center shrink-0">
              <Ticket className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-bold text-white">
                You are registered as {existingRegistration.fullName}
              </p>
              <p className="text-[11px] text-blue-200">
                Pass ID: <span className="font-mono text-amber-300 font-bold">{existingRegistration.id}</span>
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onViewPass}
            className="px-4 py-2 text-xs font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-full transition-colors whitespace-nowrap shadow-xs"
          >
            View My Pass
          </button>
        </div>
      )}

      {/* Main Registration Card */}
      <div className="bg-white text-slate-900 rounded-3xl p-6 sm:p-8 md:p-9 shadow-xl border border-slate-200/90 relative h-full flex flex-col justify-between">
        {/* Card Header: "Registration" */}
        <div className="mb-6 pb-5 border-b border-slate-100">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Registration
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
            Fill in your details below to secure your seat for <strong>Birthday Live Chat 2.0</strong>.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5 flex-1 flex flex-col justify-between">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <User className="w-4 h-4" />
              </div>
              <input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Dr. Jane Doe"
                className={`w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm text-slate-900 bg-slate-50/50 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent ${
                  errors.fullName ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200'
                }`}
              />
            </div>
            {errors.fullName && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName}</p>
            )}
          </div>

          {/* Email & Phone in 2 Columns on Tablet/Desktop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Email Address */}
            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@example.com"
                  className={`w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm text-slate-900 bg-slate-50/50 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent ${
                    errors.email ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
              )}
            </div>

            {/* Phone Number */}
            <div>
              <label htmlFor="phone" className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+234 803 000 0000"
                  className={`w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm text-slate-900 bg-slate-50/50 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent ${
                    errors.phone ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200'
                  }`}
                />
              </div>
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600 font-medium">{errors.phone}</p>
              )}
            </div>
          </div>

          {/* How did you hear about us? (Alumni network removed as requested) */}
          <div>
            <label htmlFor="referralSource" className="block text-xs sm:text-sm font-semibold text-slate-800 mb-1">
              How did you hear about us? <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <HelpCircle className="w-4 h-4" />
              </div>
              <select
                id="referralSource"
                value={referralSource}
                onChange={(e) => setReferralSource(e.target.value)}
                className={`w-full pl-10 pr-3.5 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm text-slate-900 bg-slate-50/50 focus:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-blue-900 focus:border-transparent ${
                  errors.referralSource ? 'border-red-400 ring-1 ring-red-400' : 'border-slate-200'
                }`}
              >
                <option value="">Select how you heard about us...</option>
                <option value="Social Media (Instagram, LinkedIn, X, Facebook)">Social Media (Instagram, LinkedIn, X, Facebook)</option>
                <option value="Colleague or Friend Recommendation">Colleague or Friend Recommendation</option>
                <option value="Church or Fellowship Community">Church or Fellowship Community</option>
                <option value="Email Invitation / Newsletter">Email Invitation / Newsletter</option>
                <option value="Direct Word of Mouth from Pst. Dr. Fadeyi">Direct Word of Mouth from Pst. Dr. Fadeyi</option>
                <option value="Other">Other</option>
              </select>
            </div>
            {errors.referralSource && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.referralSource}</p>
            )}
          </div>

          {/* Checkbox: Agreement */}
          <div>
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeToUpdates}
                onChange={(e) => setAgreeToUpdates(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-900 focus:ring-blue-900"
              />
              <span className="text-xs text-slate-600 leading-normal">
                I agree to receive updates and information about the program.
              </span>
            </label>
            {errors.agreeToUpdates && (
              <p className="mt-1 text-xs text-red-600 font-medium">{errors.agreeToUpdates}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-6 text-sm sm:text-base font-bold text-white bg-blue-900 hover:bg-blue-800 active:bg-blue-950 rounded-full shadow-md hover:shadow-lg transition-all duration-150 disabled:opacity-70 focus-visible:outline-2 focus-visible:outline-blue-600"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>Submit</span>
                  <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </div>

          {/* Footnote */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-center text-xs text-slate-500">
            <div className="flex items-center gap-1.5 text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Confidential · Secure Registration</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
