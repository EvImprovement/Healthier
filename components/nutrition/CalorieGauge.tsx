'use client';

/**
 * Calorie Gauge Component
 * Interactive circular gauge showing calorie progress
 */

import { useState } from 'react';
import { calculatePercentage, getColorByPercentage } from '@/lib/nutrition-calc';

interface CalorieGaugeProps {
  current: number;
  goal: number;
  protein: number;
  carbs: number;
  fat: number;
  proteinGoal: number;
  carbsGoal: number;
  fatGoal: number;
}

export default function CalorieGauge({
  current,
  goal,
  protein,
  carbs,
  fat,
  proteinGoal,
  carbsGoal,
  fatGoal,
}: CalorieGaugeProps) {
  const [expanded, setExpanded] = useState(false);

  const percentage = calculatePercentage(current, goal);
  const color = getColorByPercentage(percentage);

  // SVG circle calculations
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (Math.min(percentage, 100) / 100) * circumference;

  return (
    <div className="w-full">
      {/* Gauge */}
      <div
        onClick={() => setExpanded(!expanded)}
        className="relative w-64 h-64 mx-auto cursor-pointer"
      >
        <svg className="w-full h-full transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="128"
            cy="128"
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth="16"
          />
          {/* Progress circle */}
          <circle
            cx="128"
            cy="128"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="16"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-500 ease-out"
          />
        </svg>

        {/* Center Text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold" style={{ color }}>
            {Math.round(current)}
          </div>
          <div className="text-sm text-gray-500">/ {goal} kcal</div>
          <div className="text-xs text-gray-400 mt-1">{percentage}%</div>
        </div>
      </div>

      {/* Macro Breakdown (expandable) */}
      {expanded && (
        <div className="mt-6 space-y-4 animate-fadeIn">
          {/* Protein */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Protein</span>
              <span className="text-gray-600">
                {Math.round(protein)}g / {proteinGoal}g
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((protein / proteinGoal) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Carbs */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Carbs</span>
              <span className="text-gray-600">
                {Math.round(carbs)}g / {carbsGoal}g
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((carbs / carbsGoal) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          {/* Fat */}
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium text-gray-700">Fat</span>
              <span className="text-gray-600">
                {Math.round(fat)}g / {fatGoal}g
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{
                  width: `${Math.min((fat / fatGoal) * 100, 100)}%`,
                }}
              />
            </div>
          </div>

          <button
            onClick={() => setExpanded(false)}
            className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700"
          >
            Hide details
          </button>
        </div>
      )}

      {!expanded && (
        <div className="text-center mt-4">
          <button
            onClick={() => setExpanded(true)}
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            View macro breakdown
          </button>
        </div>
      )}
    </div>
  );
}
