'use client';

/**
 * Statistics Page
 * Display nutrition statistics and charts
 */

import { useState, useEffect, useMemo } from 'react';
import { Meal } from '@/lib/types';
import { storage } from '@/lib/storage';
import { calculateDailyStats } from '@/lib/nutrition-calc';
import { format, subDays } from 'date-fns';
import Header from '@/components/layout/Header';
import CalorieChart from '@/components/stats/CalorieChart';
import MacroDistribution from '@/components/stats/MacroDistribution';
import StatsCard from '@/components/stats/StatsCard';
import AdPlaceholder from '@/components/layout/AdPlaceholder';

type DateRange = '7d' | '30d' | 'all';

export default function StatsPage() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [dateRange, setDateRange] = useState<DateRange>('7d');
  const profile = storage.getProfile();

  // Load meals from storage
  useEffect(() => {
    setMeals(storage.getMeals());
  }, []);

  // Calculate statistics based on date range
  const stats = useMemo(() => {
    const now = new Date();
    let filteredMeals = meals;

    // Filter by date range
    if (dateRange === '7d') {
      const sevenDaysAgo = subDays(now, 7);
      filteredMeals = meals.filter(
        m => new Date(m.capturedAt) >= sevenDaysAgo
      );
    } else if (dateRange === '30d') {
      const thirtyDaysAgo = subDays(now, 30);
      filteredMeals = meals.filter(
        m => new Date(m.capturedAt) >= thirtyDaysAgo
      );
    }

    // Calculate totals
    const totalCalories = filteredMeals.reduce(
      (sum, m) => sum + m.nutrition.calories,
      0
    );
    const totalProtein = filteredMeals.reduce(
      (sum, m) => sum + m.nutrition.protein,
      0
    );
    const totalCarbs = filteredMeals.reduce(
      (sum, m) => sum + m.nutrition.carbohydrates,
      0
    );
    const totalFat = filteredMeals.reduce(
      (sum, m) => sum + m.nutrition.fat,
      0
    );

    // Calculate averages
    const daysCount = dateRange === '7d' ? 7 : dateRange === '30d' ? 30 : Math.max(1, filteredMeals.length / 3);
    const avgCalories = totalCalories / daysCount;
    const avgProtein = totalProtein / daysCount;
    const avgCarbs = totalCarbs / daysCount;
    const avgFat = totalFat / daysCount;

    // Prepare chart data (last 7 days)
    const chartDates: string[] = [];
    const chartCalories: number[] = [];

    for (let i = 6; i >= 0; i--) {
      const date = subDays(now, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      const dayStats = calculateDailyStats(meals, dateStr);

      chartDates.push(format(date, 'EEE'));
      chartCalories.push(dayStats.totalCalories);
    }

    return {
      totalMeals: filteredMeals.length,
      avgCalories,
      avgProtein,
      avgCarbs,
      avgFat,
      totalProtein,
      totalCarbs,
      totalFat,
      chartDates,
      chartCalories,
    };
  }, [meals, dateRange]);

  return (
    <div className="min-h-screen bg-brand-dark pb-20">
      <Header title="Statistics" subtitle="Track your nutrition progress" />

      <div className="max-w-screen-xl mx-auto px-4 py-6 space-y-6">
        {/* Date Range Filter */}
        <div className="flex gap-2 bg-brand-dark/60 rounded-lg border border-brand-light/20 p-1 backdrop-blur-sm">
          {(['7d', '30d', 'all'] as DateRange[]).map((range) => (
            <button
              key={range}
              onClick={() => setDateRange(range)}
              className={`
                flex-1 px-4 py-2 rounded-md text-sm font-medium transition-colors
                ${dateRange === range
                  ? 'bg-brand-lime text-brand-dark'
                  : 'text-brand-light/70 hover:bg-brand-light/10'
                }
              `}
            >
              {range === '7d' ? 'Last 7 Days' : range === '30d' ? 'Last 30 Days' : 'All Time'}
            </button>
          ))}
        </div>

        {/* Stats Cards Grid */}
        <div className="grid grid-cols-2 gap-4">
          <StatsCard
            title="Avg Calories"
            value={stats.avgCalories}
            unit="kcal"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            }
          />

          <StatsCard
            title="Total Meals"
            value={stats.totalMeals}
            unit="meals"
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            }
          />

          <StatsCard
            title="Avg Protein"
            value={stats.avgProtein}
            unit="g"
          />

          <StatsCard
            title="Goal Progress"
            value={(stats.avgCalories / profile.dailyCalorieGoal) * 100}
            unit="%"
          />
        </div>

        {/* Calorie Trend Chart */}
        <div className="bg-brand-dark/60 rounded-lg border border-brand-light/20 p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-brand-light mb-4">
            Calorie Trend (Last 7 Days)
          </h2>
          <CalorieChart
            dates={stats.chartDates}
            calories={stats.chartCalories}
            goal={profile.dailyCalorieGoal}
          />
        </div>

        {/* Ad Placement */}
        <AdPlaceholder />

        {/* Macro Distribution */}
        <div className="bg-brand-dark/60 rounded-lg border border-brand-light/20 p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-brand-light mb-4">
            Macro Distribution (Total)
          </h2>
          <MacroDistribution
            protein={stats.totalProtein}
            carbs={stats.totalCarbs}
            fat={stats.totalFat}
          />
        </div>

        {/* Summary */}
        <div className="bg-brand-dark/60 rounded-lg border border-brand-light/20 p-6 backdrop-blur-sm">
          <h2 className="text-lg font-semibold text-brand-light mb-4">
            Summary
          </h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-light/70">Average daily calories</span>
              <span className="font-medium text-brand-lime">
                {Math.round(stats.avgCalories)} kcal
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-light/70">Average daily protein</span>
              <span className="font-medium text-brand-lime">
                {Math.round(stats.avgProtein)}g
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-light/70">Average daily carbs</span>
              <span className="font-medium text-brand-lime">
                {Math.round(stats.avgCarbs)}g
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-light/70">Average daily fat</span>
              <span className="font-medium text-brand-lime">
                {Math.round(stats.avgFat)}g
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
