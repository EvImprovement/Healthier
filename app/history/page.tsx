'use client';

/**
 * History Page
 * Display all meals with filtering
 */

import { useState, useEffect } from 'react';
import { Meal, MealType } from '@/lib/types';
import { storage } from '@/lib/storage';
import Header from '@/components/layout/Header';
import MealTimeline from '@/components/meals/MealTimeline';
import MealTypeFilter from '@/components/meals/MealTypeFilter';

export default function HistoryPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [filter, setFilter] = useState<MealType | 'all'>('all');

  // Load meals from storage
  useEffect(() => {
    setMeals(storage.getMeals());
  }, []);

  const handleDeleteMeal = (mealId: string) => {
    storage.deleteMeal(mealId);
    setMeals(meals.filter(m => m.id !== mealId));
  };

  // Calculate meal counts for filter badges
  const mealCounts = {
    all: meals.length,
    [MealType.BREAKFAST]: meals.filter(m => m.mealType === MealType.BREAKFAST).length,
    [MealType.LUNCH]: meals.filter(m => m.mealType === MealType.LUNCH).length,
    [MealType.SNACK]: meals.filter(m => m.mealType === MealType.SNACK).length,
    [MealType.DINNER]: meals.filter(m => m.mealType === MealType.DINNER).length,
    [MealType.LATE_NIGHT]: meals.filter(m => m.mealType === MealType.LATE_NIGHT).length,
  };

  return (
    <div className="min-h-screen bg-brand-light pb-20">
      <Header title="Meal History" subtitle={`${meals.length} meals logged`} />

      <div className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Filter */}
        <div className="mb-6">
          <MealTypeFilter
            selected={filter}
            onChange={setFilter}
            counts={mealCounts}
          />
        </div>

        {/* Timeline */}
        <MealTimeline
          meals={meals}
          onDeleteMeal={handleDeleteMeal}
          filter={filter}
        />
      </div>
    </div>
  );
}
