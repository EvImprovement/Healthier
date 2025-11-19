/**
 * TypeScript types for NutritionAI app
 */

export enum MealType {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  SNACK = 'snack',
  DINNER = 'dinner',
  LATE_NIGHT = 'late_night',
}

export interface NutritionData {
  calories: number;
  protein: number;      // grams
  carbohydrates: number;
  fat: number;
  fiber?: number;
  sugar?: number;
  sodium?: number;      // mg
  foodItems: string[];  // Detected food names
  confidence: number;   // 0-1 (AI confidence)
}

export interface Meal {
  id: string;                    // UUID
  imageUrl: string;              // base64 or blob URL
  thumbnailUrl?: string;
  mealType: MealType;
  capturedAt: Date;
  createdAt: Date;
  nutrition: NutritionData;
}

export interface DailyStats {
  date: string;                  // YYYY-MM-DD
  totalCalories: number;
  totalProtein: number;
  totalCarbs: number;
  totalFat: number;
  mealCounts: Record<MealType, number>;
  meals: Meal[];
}

export interface UserProfile {
  id: string;
  name: string;
  dailyCalorieGoal: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
}

export interface SubscriptionStatus {
  isActive: boolean;
  isTrial: boolean;
  trialEndsAt: Date | null;
  subscribedAt: Date | null;
  hasSeenModal: boolean;
  modalDismissedCount: number;
}

// Mock AI Response (simulating LogMeal API)
export interface MockAIResponse {
  recognition: {
    foodItems: Array<{
      name: string;
      confidence: number;
    }>;
  };
  nutrition: {
    calories: number;
    proteins: number;
    carbs: number;
    fats: number;
    fiber: number;
  };
  processingTime: number; // ms
}
