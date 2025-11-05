'use client';

/**
 * Home Page
 * Main page with camera capture and calorie gauge
 */

import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import CameraCapture from '@/components/camera/CameraCapture';
import CalorieGauge from '@/components/nutrition/CalorieGauge';
import MealCard from '@/components/meals/MealCard';
import AdPlaceholder from '@/components/layout/AdPlaceholder';
import { Meal, NutritionData } from '@/lib/types';
import { storage } from '@/lib/storage';
import { classifyMealByTime } from '@/lib/meal-classifier';
import { calculateDailyStats, getTodayDateString } from '@/lib/nutrition-calc';
import { generateMockMealHistory } from '@/lib/mock-ai';
import Link from 'next/link';

export default function HomePage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [profile, setProfile] = useState(storage.getProfile());
  const [todayStats, setTodayStats] = useState({
    totalCalories: 0,
    totalProtein: 0,
    totalCarbs: 0,
    totalFat: 0,
  });

  // Load meals from storage on mount
  useEffect(() => {
    const storedMeals = storage.getMeals();

    // If no meals, seed with demo data
    if (storedMeals.length === 0 && !storage.isDemoSeeded()) {
      const demoMeals = generateMockMealHistory(7);
      demoMeals.forEach(meal => storage.saveMeal(meal));
      storage.markDemoSeeded();
      setMeals(demoMeals);
    } else {
      setMeals(storedMeals);
    }
  }, []);

  // Calculate today's stats whenever meals change
  useEffect(() => {
    const today = getTodayDateString();
    const stats = calculateDailyStats(meals, today);
    setTodayStats({
      totalCalories: stats.totalCalories,
      totalProtein: stats.totalProtein,
      totalCarbs: stats.totalCarbs,
      totalFat: stats.totalFat,
    });
  }, [meals]);

  const handleAnalysisComplete = (imageUrl: string, nutrition: NutritionData) => {
    const now = new Date();
    const newMeal: Meal = {
      id: uuidv4(),
      imageUrl,
      mealType: classifyMealByTime(now),
      capturedAt: now,
      createdAt: now,
      nutrition,
    };

    // Save to storage
    storage.saveMeal(newMeal);

    // Update state
    setMeals([newMeal, ...meals]);
  };

  const handleDeleteMeal = (mealId: string) => {
    storage.deleteMeal(mealId);
    setMeals(meals.filter(m => m.id !== mealId));
  };

  // Get recent meals (last 3)
  const recentMeals = meals.slice(0, 3);

  return (
    <div className="min-h-screen bg-brand-dark pb-20">
      {/* Header */}
      <header className="bg-brand-dark/95 border-b border-brand-light/20 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-screen-xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-brand-light">NutritionAI</h1>
          <p className="text-sm text-brand-light/70">Track your meals with AI</p>
        </div>
      </header>

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-8">
        {/* Camera Section */}
        <section>
          <h2 className="text-lg font-semibold text-brand-light mb-4">
            Scan Your Meal
          </h2>
          <CameraCapture onAnalysisComplete={handleAnalysisComplete} />
        </section>

        {/* Calorie Gauge Section */}
        <section className="bg-brand-dark/60 rounded-lg border border-brand-light/20 p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-brand-light mb-4 text-center">
            Today&apos;s Progress
          </h2>
          <CalorieGauge
            current={todayStats.totalCalories}
            goal={profile.dailyCalorieGoal}
            protein={todayStats.totalProtein}
            carbs={todayStats.totalCarbs}
            fat={todayStats.totalFat}
            proteinGoal={profile.proteinGoal}
            carbsGoal={profile.carbsGoal}
            fatGoal={profile.fatGoal}
          />
        </section>

        {/* Recent Meals Section */}
        {recentMeals.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-brand-light">
                Recent Meals
              </h2>
              <Link
                href="/history"
                className="text-sm text-brand-lime hover:text-brand-green font-medium"
              >
                View all →
              </Link>
            </div>
            <div className="space-y-3">
              {recentMeals.map((meal) => (
                <MealCard
                  key={meal.id}
                  meal={meal}
                  onDelete={handleDeleteMeal}
                />
              ))}
            </div>
          </section>
        )}

        {/* Ad Placement */}
        <AdPlaceholder />

        {/* Quick Stats */}
        <section className="bg-brand-dark/60 rounded-lg border border-brand-light/20 p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-brand-light mb-4">
            Quick Stats
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-lime">{meals.length}</div>
              <div className="text-sm text-brand-light/70">Total Meals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-brand-lime">
                {calculateDailyStats(meals, getTodayDateString()).meals.length}
              </div>
              <div className="text-sm text-brand-light/70">Today</div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
