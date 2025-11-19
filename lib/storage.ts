/**
 * LocalStorage service
 * Handles persistent storage with error handling and TypeScript safety
 */

import { Meal, UserProfile, SubscriptionStatus } from './types';

const STORAGE_KEYS = {
  MEALS: 'nutrition-app-meals',
  PROFILE: 'nutrition-app-profile',
  DEMO_SEEDED: 'nutrition-app-demo-seeded',
  SUBSCRIPTION: 'nutrition-app-subscription',
} as const;

/**
 * LocalStorage wrapper with error handling and TypeScript safety
 */
class StorageService {
  private getItem<T>(key: string, defaultValue: T): T {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      return defaultValue;
    }

    try {
      const item = localStorage.getItem(key);
      if (!item) {
        return defaultValue;
      }

      const parsed = JSON.parse(item);

      // Convert date strings back to Date objects for meals
      if (key === STORAGE_KEYS.MEALS && Array.isArray(parsed)) {
        return parsed.map((meal: any) => ({
          ...meal,
          capturedAt: new Date(meal.capturedAt),
          createdAt: new Date(meal.createdAt),
        })) as T;
      }

      return parsed;
    } catch (error) {
      console.error(`Error reading ${key} from localStorage:`, error);
      return defaultValue;
    }
  }

  private setItem<T>(key: string, value: T): void {
    // Check if we're in browser environment
    if (typeof window === 'undefined') {
      return;
    }

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error writing ${key} to localStorage:`, error);
      // Handle quota exceeded error
      if (error instanceof Error && error.name === 'QuotaExceededError') {
        alert('Storage limit reached. Please delete old meals.');
      }
    }
  }

  // Meals
  getMeals(): Meal[] {
    return this.getItem<Meal[]>(STORAGE_KEYS.MEALS, []);
  }

  saveMeal(meal: Meal): void {
    const meals = this.getMeals();
    meals.unshift(meal); // Add to beginning
    this.setItem(STORAGE_KEYS.MEALS, meals);
  }

  deleteMeal(mealId: string): void {
    const meals = this.getMeals().filter(m => m.id !== mealId);
    this.setItem(STORAGE_KEYS.MEALS, meals);
  }

  // User Profile
  getProfile(): UserProfile {
    return this.getItem<UserProfile>(STORAGE_KEYS.PROFILE, {
      id: 'user-1',
      name: 'User',
      dailyCalorieGoal: 2000,
      proteinGoal: 150,
      carbsGoal: 250,
      fatGoal: 65,
    });
  }

  updateProfile(profile: Partial<UserProfile>): void {
    const current = this.getProfile();
    this.setItem(STORAGE_KEYS.PROFILE, { ...current, ...profile });
  }

  // Demo data flag
  isDemoSeeded(): boolean {
    return this.getItem<boolean>(STORAGE_KEYS.DEMO_SEEDED, false);
  }

  markDemoSeeded(): void {
    this.setItem(STORAGE_KEYS.DEMO_SEEDED, true);
  }

  // Subscription
  getSubscription(): SubscriptionStatus {
    const defaultStatus: SubscriptionStatus = {
      isActive: false,
      isTrial: false,
      trialEndsAt: null,
      subscribedAt: null,
      hasSeenModal: false,
      modalDismissedCount: 0,
    };

    const subscription = this.getItem<SubscriptionStatus>(STORAGE_KEYS.SUBSCRIPTION, defaultStatus);

    // Convert date strings back to Date objects
    if (subscription.trialEndsAt) {
      subscription.trialEndsAt = new Date(subscription.trialEndsAt);
    }
    if (subscription.subscribedAt) {
      subscription.subscribedAt = new Date(subscription.subscribedAt);
    }

    return subscription;
  }

  updateSubscription(updates: Partial<SubscriptionStatus>): void {
    const current = this.getSubscription();
    this.setItem(STORAGE_KEYS.SUBSCRIPTION, { ...current, ...updates });
  }

  startTrial(): void {
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 14); // 14 days from now

    this.updateSubscription({
      isActive: true,
      isTrial: true,
      trialEndsAt,
      subscribedAt: new Date(),
    });
  }

  activateSubscription(): void {
    this.updateSubscription({
      isActive: true,
      isTrial: false,
      trialEndsAt: null,
    });
  }

  dismissModal(): void {
    const current = this.getSubscription();
    this.updateSubscription({
      hasSeenModal: true,
      modalDismissedCount: current.modalDismissedCount + 1,
    });
  }

  shouldShowSubscriptionModal(): boolean {
    const subscription = this.getSubscription();
    const meals = this.getMeals();

    // Don't show if already subscribed or in trial
    if (subscription.isActive) {
      return false;
    }

    // Show after 3 meals if never seen
    if (!subscription.hasSeenModal && meals.length >= 3) {
      return true;
    }

    // Show every 10 meals after first dismissal
    if (subscription.hasSeenModal && subscription.modalDismissedCount < 3) {
      const mealsSinceDismissal = meals.length % 10;
      return mealsSinceDismissal === 0 && meals.length > 0;
    }

    return false;
  }

  // Clear all data
  clearAll(): void {
    if (typeof window === 'undefined') {
      return;
    }
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  }
}

export const storage = new StorageService();
