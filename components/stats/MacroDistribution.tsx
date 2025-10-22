'use client';

/**
 * Macro Distribution Component
 * Bar chart showing macro distribution
 */

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface MacroDistributionProps {
  protein: number;
  carbs: number;
  fat: number;
}

export default function MacroDistribution({ protein, carbs, fat }: MacroDistributionProps) {
  const data = {
    labels: ['Protein', 'Carbs', 'Fat'],
    datasets: [
      {
        label: 'Grams',
        data: [protein, carbs, fat],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)', // blue for protein
          'rgba(245, 158, 11, 0.8)', // yellow for carbs
          'rgba(168, 85, 247, 0.8)', // purple for fat
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(245, 158, 11)',
          'rgb(168, 85, 247)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: function (context: any) {
            return `${Math.round(context.parsed.y)}g`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value: any) {
            return value + 'g';
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-64">
      <Bar data={data} options={options} />
    </div>
  );
}
