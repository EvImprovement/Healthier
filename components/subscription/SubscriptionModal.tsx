'use client';

/**
 * Subscription Modal Component
 * Shows pricing plan: 2 weeks free trial + 15€/month
 */

import { useState } from 'react';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: () => void;
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  onSubscribe,
}: SubscriptionModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSubscribe = async () => {
    setIsProcessing(true);
    // Simulate processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    onSubscribe();
    setIsProcessing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-brand-dark border-2 border-brand-lime rounded-2xl shadow-2xl max-w-md w-full overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-brand-light/60 hover:text-brand-light transition-colors z-10"
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Header */}
        <div className="bg-gradient-to-br from-brand-lime/20 to-brand-green/20 p-8 text-center border-b border-brand-lime/30">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-lime/20 mb-4">
            <svg className="w-8 h-8 text-brand-lime" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-brand-light mb-2">
            Unlock Premium Features
          </h2>
          <p className="text-brand-light/70 text-sm">
            Take your nutrition tracking to the next level
          </p>
        </div>

        {/* Pricing */}
        <div className="p-8">
          {/* Trial Badge */}
          <div className="inline-flex items-center gap-2 bg-brand-lime/10 border border-brand-lime/30 rounded-full px-4 py-2 mb-6">
            <svg className="w-4 h-4 text-brand-lime" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-brand-lime font-semibold text-sm">14 Days Free Trial</span>
          </div>

          {/* Price */}
          <div className="mb-6">
            <div className="flex items-baseline gap-2 mb-2">
              <span className="text-5xl font-bold text-brand-lime">15€</span>
              <span className="text-brand-light/60 text-lg">/month</span>
            </div>
            <p className="text-brand-light/50 text-sm">
              Cancel anytime • No commitment
            </p>
          </div>

          {/* Features */}
          <div className="space-y-3 mb-8">
            <FeatureItem text="Unlimited meal scans" />
            <FeatureItem text="Advanced nutrition insights" />
            <FeatureItem text="Personalized recommendations" />
            <FeatureItem text="Export your data" />
            <FeatureItem text="Ad-free experience" />
            <FeatureItem text="Priority support" />
          </div>

          {/* CTA Button */}
          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="w-full bg-brand-lime hover:bg-brand-green text-brand-dark font-bold py-4 rounded-xl transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-brand-lime/20"
          >
            {isProcessing ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </span>
            ) : (
              'Start Free Trial'
            )}
          </button>

          <p className="text-center text-brand-light/40 text-xs mt-4">
            Your trial starts today. We&apos;ll remind you 3 days before it ends.
          </p>
        </div>
      </div>
    </div>
  );
}

interface FeatureItemProps {
  text: string;
}

function FeatureItem({ text }: FeatureItemProps) {
  return (
    <div className="flex items-center gap-3">
      <svg className="w-5 h-5 text-brand-lime flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>
      <span className="text-brand-light">{text}</span>
    </div>
  );
}
