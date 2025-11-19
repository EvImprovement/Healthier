'use client';

/**
 * Navigation Component
 * Bottom navigation bar for mobile-first design with upgrade button
 */

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import SubscriptionModal from '@/components/subscription/SubscriptionModal';
import { storage } from '@/lib/storage';

export default function Navigation() {
  const pathname = usePathname();
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const subscription = storage.getSubscription();
    // Only hide upgrade button if fully subscribed (not in trial)
    setIsSubscribed(subscription.isActive && !subscription.isTrial);
  }, []);

  const handleOpenModal = () => {
    setShowSubscriptionModal(true);
  };

  const handleCloseModal = () => {
    storage.dismissModal();
    setShowSubscriptionModal(false);
  };

  const handleSubscribe = () => {
    storage.startTrial();
    setShowSubscriptionModal(false);
    setIsSubscribed(true);
    alert('Welcome to your 14-day free trial! 🎉');
  };

  const navItems = [
    {
      href: '/',
      label: 'Home',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      href: '/history',
      label: 'History',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      href: '/stats',
      label: 'Stats',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
      ),
    },
  ];

  return (
    <>
      <SubscriptionModal
        isOpen={showSubscriptionModal}
        onClose={handleCloseModal}
        onSubscribe={handleSubscribe}
      />

      <nav className="fixed bottom-0 left-0 right-0 bg-brand-dark/95 border-t border-brand-light/20 z-50 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-4">
          <div className="flex justify-around">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex flex-col items-center justify-center py-3 px-4 transition-colors
                    ${isActive
                      ? 'text-brand-lime'
                      : 'text-brand-light/60 hover:text-brand-light'
                    }
                  `}
                >
                  {item.icon}
                  <span className="text-xs mt-1 font-medium">{item.label}</span>
                </Link>
              );
            })}

            {/* Upgrade Button - Only show if not subscribed */}
            {!isSubscribed && (
              <button
                onClick={handleOpenModal}
                className="flex flex-col items-center justify-center py-3 px-4 transition-colors text-brand-lime hover:text-brand-green"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xs mt-1 font-medium">Upgrade</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
