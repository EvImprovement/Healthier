/**
 * LocalStorage service
 * Handles persistent storage with error handling and TypeScript safety
 */

import { Meal, UserProfile } from './types';

const STORAGE_KEYS = {
  MEALS: 'nutrition-app-meals',
  PROFILE: 'nutrition-app-profile',
  DEMO_SEEDED: 'nutrition-app-demo-seeded',
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

  // Clear all data
  clearAll(): void {
    if (typeof window === 'undefined') {
      return;
    }
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
  }
}

export const storage = new StorageService();
