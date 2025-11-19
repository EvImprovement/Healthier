'use client';

/**
 * Upgrade Button Component
 * Displays upgrade prompt for non-subscribers
 */

import { useEffect, useState } from 'react';
import { storage } from '@/lib/storage';

interface UpgradeButtonProps {
  onClick: () => void;
  variant?: 'header' | 'inline';
}

export default function UpgradeButton({ onClick, variant = 'header' }: UpgradeButtonProps) {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isTrial, setIsTrial] = useState(false);

  useEffect(() => {
    const subscription = storage.getSubscription();
    setIsSubscribed(subscription.isActive);
    setIsTrial(subscription.isTrial);
  }, []);

  // Don't show button if user is already subscribed (but not in trial)
  if (isSubscribed && !isTrial) {
    return null;
  }

  if (variant === 'inline') {
    return (
      <button
        onClick={onClick}
        className="w-full bg-gradient-to-r from-brand-lime to-brand-green text-brand-dark font-bold py-3 px-6 rounded-xl transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-lime/20"
      >
        <div className="flex items-center justify-center gap-2">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM14 11a1 1 0 011 1v1h1a1 1 0 110 2h-1v1a1 1 0 11-2 0v-1h-1a1 1 0 110-2h1v-1a1 1 0 011-1z" />
          </svg>
          <span>{isTrial ? 'Manage Subscription' : 'Upgrade to Premium'}</span>
        </div>
      </button>
    );
  }

  // Header variant - compact badge style
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 bg-brand-lime/10 hover:bg-brand-lime/20 border border-brand-lime/30 hover:border-brand-lime/50 text-brand-lime px-3 py-1.5 rounded-full transition-all text-sm font-semibold"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
      <span>{isTrial ? 'Trial Active' : 'Upgrade'}</span>
    </button>
  );
}
