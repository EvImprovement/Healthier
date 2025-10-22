/**
 * Mock LogMeal AI service
 * Simulates realistic API responses for food recognition
 */

import { NutritionData, Meal, MealType } from './types';
import { classifyMealByTime } from './meal-classifier';

/**
 * Mock LogMeal AI analysis - simulates realistic API response
 * In production, this would call: https://api.logmeal.com/v2/recognition/dish
 *
 * @param imageBase64 - Base64 encoded image data
 * @returns NutritionData with realistic nutrition information
 */
export async function analyzeFoodImage(imageBase64: string): Promise<NutritionData> {
  // Simulate API delay (500-1500ms for realism)
  await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));

  // Random realistic food scenarios
  const scenarios: NutritionData[] = [
    {
      calories: 650,
      protein: 35,
      carbohydrates: 60,
      fat: 22,
      fiber: 8,
      sugar: 5,
      sodium: 450,
      foodItems: ['Grilled chicken breast', 'Brown rice', 'Steamed broccoli'],
      confidence: 0.92,
    },
    {
      calories: 420,
      protein: 12,
      carbohydrates: 55,
      fat: 18,
      fiber: 4,
      sugar: 8,
      sodium: 320,
      foodItems: ['Pasta carbonara', 'Side salad'],
      confidence: 0.87,
    },
    {
      calories: 280,
      protein: 8,
      carbohydrates: 45,
      fat: 9,
      fiber: 3,
      sugar: 12,
      sodium: 180,
      foodItems: ['Oatmeal', 'Banana', 'Almonds'],
      confidence: 0.95,
    },
    {
      calories: 520,
      protein: 28,
      carbohydrates: 48,
      fat: 20,
      fiber: 6,
      sugar: 3,
      sodium: 680,
      foodItems: ['Beef burger', 'French fries', 'Coleslaw'],
      confidence: 0.89,
    },
    {
      calories: 180,
      protein: 15,
      carbohydrates: 12,
      fat: 8,
      fiber: 2,
      sugar: 8,
      sodium: 120,
      foodItems: ['Greek yogurt', 'Honey', 'Berries'],
      confidence: 0.93,
    },
    {
      calories: 750,
      protein: 40,
      carbohydrates: 85,
      fat: 25,
      fiber: 10,
      sugar: 6,
      sodium: 580,
      foodItems: ['Salmon fillet', 'Quinoa', 'Roasted vegetables'],
      confidence: 0.91,
    },
    {
      calories: 320,
      protein: 10,
      carbohydrates: 42,
      fat: 14,
      fiber: 5,
      sugar: 18,
      sodium: 250,
      foodItems: ['Avocado toast', 'Poached egg', 'Cherry tomatoes'],
      confidence: 0.88,
    },
    {
      calories: 480,
      protein: 22,
      carbohydrates: 52,
      fat: 18,
      fiber: 7,
      sugar: 4,
      sodium: 420,
      foodItems: ['Chicken stir-fry', 'White rice', 'Mixed vegetables'],
      confidence: 0.94,
    },
  ];

  // Return random scenario
  return scenarios[Math.floor(Math.random() * scenarios.length)];
}

/**
 * Generate mock historical meals for demo purposes
 *
 * @param days - Number of days of history to generate
 * @returns Array of Meal objects
 */
export function generateMockMealHistory(days: number = 7): Meal[] {
  const meals: Meal[] = [];
  const now = new Date();

  for (let i = 0; i < days * 3; i++) {
    const daysAgo = Math.floor(i / 3);
    const capturedAt = new Date(now);
    capturedAt.setDate(capturedAt.getDate() - daysAgo);

    // Set time based on meal of day
    const mealIndex = i % 3;
    if (mealIndex === 0) capturedAt.setHours(8, 30, 0, 0); // Breakfast
    if (mealIndex === 1) capturedAt.setHours(13, 0, 0, 0); // Lunch
    if (mealIndex === 2) capturedAt.setHours(19, 30, 0, 0); // Dinner

    const baseCalories = 300 + Math.random() * 500;

    meals.push({
      id: `meal-${i}`,
      imageUrl: `/mock-images/meal-${(i % 5) + 1}.jpg`,
      mealType: classifyMealByTime(capturedAt),
      capturedAt,
      createdAt: capturedAt,
      nutrition: {
        calories: Math.round(baseCalories),
        protein: Math.round(15 + Math.random() * 30),
        carbohydrates: Math.round(40 + Math.random() * 60),
        fat: Math.round(10 + Math.random() * 30),
        fiber: Math.round(3 + Math.random() * 10),
        foodItems: ['Mock food item'],
        confidence: 0.85 + Math.random() * 0.15,
      },
    });
  }

  return meals;
}
