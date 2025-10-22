# NutritionAI - Smart Meal Tracking PWA

A Progressive Web App for tracking nutrition with AI-powered meal scanning. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

- 📸 **Photo Capture**: Scan your meals using your phone camera
- 🤖 **Mock AI Analysis**: Realistic nutrition data simulation (LogMeal API structure)
- 📊 **Calorie Gauge**: Interactive circular gauge with macro breakdown
- 📅 **Meal History**: Chronological timeline with meal type filtering
- 📈 **Statistics Dashboard**: Track your progress with charts
- 💾 **Offline-First**: Works offline with localStorage
- 📱 **PWA**: Installable on iOS and Android

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd nutrition-app

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🏗️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Chart.js + react-chartjs-2
- **PWA**: @ducanh2912/next-pwa
- **Storage**: localStorage (no backend)
- **Icons**: Heroicons (inline SVG)

## 📁 Project Structure

```
nutrition-app/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page
│   ├── history/           # Meal history page
│   ├── stats/             # Statistics page
│   └── layout.tsx         # Root layout with navigation
├── components/
│   ├── camera/            # Camera capture components
│   ├── nutrition/         # Calorie gauge, macro breakdown
│   ├── meals/             # Meal cards, timeline, filters
│   ├── stats/             # Charts and stats cards
│   └── layout/            # Navigation, header, ads
├── lib/
│   ├── types.ts           # TypeScript interfaces
│   ├── mock-ai.ts         # Mock AI responses
│   ├── storage.ts         # localStorage wrapper
│   ├── meal-classifier.ts # Meal type classification
│   └── nutrition-calc.ts  # Daily stats calculation
└── public/
    ├── manifest.json      # PWA manifest
    ├── icons/             # PWA icons
    └── mock-images/       # Sample meal images
```

## 🎨 Key Components

### Home Page
- Camera capture interface
- Today's calorie gauge with macro breakdown
- Recent meals (last 3)
- Quick stats summary

### History Page
- Meal type filter tabs
- Chronological timeline grouped by date
- Daily totals per section
- Delete meal functionality

### Statistics Page
- Date range filter (7d, 30d, All)
- Calorie trend chart (Line chart)
- Macro distribution (Bar chart)
- Summary stats cards

## 💾 Data Persistence

All data is stored in **localStorage**:
- `nutrition-app-meals`: Array of meal objects
- `nutrition-app-profile`: User profile with goals
- `nutrition-app-demo-seeded`: Demo data flag

**Demo Data**: On first load, the app seeds 21 meals (7 days × 3 meals/day) for demonstration.

## 🤖 Mock AI

The app uses **mock AI responses** simulating the LogMeal API:
- 8 realistic food scenarios
- Random delay (500-1500ms) for realism
- Confidence scores (0.85-0.95)
- Detailed nutrition data (calories, protein, carbs, fat, fiber, etc.)

## 🔧 Configuration

### User Profile (Default)
- Daily calorie goal: 2000 kcal
- Protein goal: 150g
- Carbs goal: 250g
- Fat goal: 65g

Can be modified in `lib/storage.ts` → `getProfile()`

### Meal Classification
Automatically classified by time:
- 🌅 Breakfast: 5am-11am
- 🌞 Lunch: 11am-3pm
- 🍿 Snack: 3pm-6pm
- 🌙 Dinner: 6pm-midnight
- 🌃 Late Night: midnight-5am

## 🌐 Deployment

### Deploy to Netlify

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Netlify**:
   - Go to [Netlify](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Select your GitHub repository
   - Build settings are auto-detected from `netlify.toml`
   - Click "Deploy site"

3. **Configure**:
   - Site name: `nutrition-ai` (or your choice)
   - Custom domain (optional)
   - HTTPS is automatic

### Build Commands

```bash
# Development
npm run dev

# Production build
npm run build

# Start production server
npm run start

# Linting
npm run lint
```

## 📱 PWA Installation

### iOS (Safari)
1. Open the app in Safari
2. Tap the Share button
3. Tap "Add to Home Screen"
4. Confirm

### Android (Chrome)
1. Open the app in Chrome
2. Tap the three dots menu
3. Tap "Install app" or "Add to Home Screen"
4. Confirm

## 🔮 Future Enhancements

Current implementation is **frontend-only with mock data**. Next steps:

1. **Real AI Integration**
   - Replace `lib/mock-ai.ts` with LogMeal API calls
   - Add API key management

2. **Backend**
   - FastAPI backend
   - PostgreSQL database
   - User authentication

3. **Features**
   - Cloud sync across devices
   - Barcode scanner
   - Recipe database
   - Social sharing
   - Export data (CSV, PDF)

## 🐛 Known Limitations

- No user authentication (single user)
- No cloud sync (localStorage only)
- Mock AI responses (no real food recognition)
- Storage limited to ~5-10MB (~50-100 meals)
- No push notifications
- Camera requires HTTPS (use localhost or deployed site)

## 📄 License

MIT License - feel free to use for your projects!

## 🙏 Credits

- UI/UX inspired by [Cal AI](https://www.calai.app/) and [Fitatu](https://www.fitatu.com)
- Mock AI structure based on [LogMeal API](https://logmeal.com/api/)
- Icons: Heroicons (inline SVG)

---

**Built with ❤️ using Next.js and TypeScript**

For questions or issues, please open a GitHub issue.
