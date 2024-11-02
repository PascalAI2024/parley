# 🎲 BetSmart Assistant

<div align="center">

![Project Banner](https://raw.githubusercontent.com/stackblitz/stackblitz-logo/main/StackBlitz-Color.svg)

[![Status](https://img.shields.io/badge/status-in_development-orange.svg)]()
[![License](https://img.shields.io/badge/license-MIT-blue.svg)]()

A modern, AI-powered sports betting assistant for NFL and College Football
</div>

## 🌟 Features

### ✅ Completed
- 🎨 Modern, responsive UI with Tailwind CSS
- 🏈 NFL & College Football odds integration
- 📊 Interactive bet slip with calculations
- 🔄 Real-time odds updates (with API key)
- 🎯 Advanced match filtering and sorting
- 💡 Basic match analysis
- ⚙️ Settings panel for API configuration
- 🎨 Team-specific colors and logos
- 📱 Mobile-first responsive design

### 🚧 In Progress
- 📈 Advanced statistics dashboard
- 🤖 AI-powered betting insights
- 📰 Live news integration
- 🏃 Real-time injury updates
- 📊 Historical performance analysis

### 🗓️ Upcoming Features
- 📱 Mobile app version
- 🌐 Multi-sport support
- 🎨 Dark/Light theme
- 📊 Advanced analytics
- 🔔 Custom alerts
- 💰 Bankroll management
- 📈 Trend analysis
- 🤖 AI predictions

## 🎯 App Preview

### Current Design Layout
```
┌────────────────────────────────┐
│           Header Bar           │
│    [Logo]  [Nav]  [Settings]  │
├────────────────────────────────┤
│        Quick Stats Bar         │
│  [Active]  [Win Rate]  [ROI]  │
├─────────────┬──────────────────┤
│   Matches   │    Bet Slip      │
│   List &    │    & Analysis    │
│   Filters   │                  │
│             │    [Odds]        │
│  [Search]   │    [Stats]       │
│  [League]   │    [News]        │
│  [Sort]     │                  │
└─────────────┴──────────────────┘
```

### Design Principles
- 🎨 Clean, minimalist interface
- ⚡ Fast, real-time updates
- 📱 Responsive on all devices
- 🌙 Dark mode support (coming)
- ♿ Full accessibility
- 🔒 Secure data handling

## 🛠️ Tech Stack

- ⚛️ React 18 with TypeScript
- 🎨 Tailwind CSS
- 📦 Vite
- 📊 SportsData.io API Integration
- 📅 date-fns
- 🔄 React Query
- 🎭 React Transition Group

## 📈 Project Status

- 📋 Planning: ██████████ 100%
- 🎨 Design: ████████░░ 80%
- 🛠️ Core Features: ██████░░░░ 60%
- 🤖 AI Integration: ██░░░░░░░░ 20%
- 🧪 Testing: ░░░░░░░░░░ 0%

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Add your API key to .env

# Start development server
npm run dev
```

## 📝 Project Structure
```
src/
├── components/
│   ├── betting/
│   │   ├── MatchesList.tsx
│   │   ├── BetSlip.tsx
│   │   ├── Analysis.tsx
│   │   └── OddsDisplay.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── QuickStats.tsx
│   └── settings/
│       └── Settings.tsx
├── services/
│   ├── api.ts
│   ├── cache.ts
│   └── teamData.ts
├── hooks/
│   └── useApiMode.ts
└── types/
    └── index.ts
```

---

<div align="center">
Built with 🎲 by BetSmart Team
</div>