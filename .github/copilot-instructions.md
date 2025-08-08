# Brain Board - Memory Game Pro

## Project Overview

Brain Board is a React Native memory game built with Expo, featuring a 3x3 grid-based number sequence challenge. It uses Expo Router for navigation, Zustand for state management, and a robust theming system for dark/light mode support. The app is designed for mobile platforms with a focus on performance and accessibility.

## Core Technologies

- **Framework/Platform**: React Native with Expo
- **Navigation**: Expo Router (file-based navigation)
- **State Management**: Zustand
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **Icons**: Lucide React Native
- **Theming**: Custom dark/light mode with centralized color constants
- **Build Tools**: Expo CLI, Expo Application Services (EAS)

## UI/Styling Approach

- **Component Libraries**: Custom Themed Components (`ThemedText`, `ThemedView`, `ThemedButton`, etc.)
- **Styling Framework**: NativeWind for Tailwind-like utility classes
- **Theming**:
  - Centralized color system in `constants/Colors.ts` and `constants/myColors.ts`
  - Dynamic theming using `useColorScheme` hook
  - Consistent dark/light mode implementation across all components
- **Typography**: Custom text variants (e.g., `text-foreground`, `text-muted`) with reusable `Text` components

## Data Architecture

- **State Management**: Zustand for managing game phases, grid state, and user interactions
- **Local Storage**: AsyncStorage (if used for persistence, though not explicitly mentioned)
- **API Layer**: No external API integration; game logic is self-contained
- **Game Logic**:
  - Fisher-Yates shuffle for randomizing grid numbers
  - Zustand store for managing game phases (`setup`, `memorizing`, `playing`, `victory`)

## Key Development Patterns

- **File Structure**:
  - `app/`: Screens and navigation (e.g., `game.tsx`, `about.tsx`, `settings.tsx`)
  - `components/`: Reusable UI components (e.g., `GameButton`, `GameGrid`, `DurationInput`)
  - `constants/`: Theming and layout constants (e.g., `Colors.ts`, `myColors.ts`)
  - `stores/`: Zustand stores for state management
  - `services/`: Utility services (e.g., `soundService.ts`)
- **Component Patterns**:
  - Themed components (`ThemedText`, `ThemedView`) for consistent styling
  - Utility-first styling with NativeWind
- **Error Handling**: Minimal error handling; focus on game logic
- **Code Quality**:
  - TypeScript for type safety
  - ESLint for linting
  - Prettier for code formatting

## Build & Deployment

- **Build Process**:
  - `expo start` for development
  - `expo run:android` and `expo run:ios` for platform-specific builds
  - EAS for managed builds and deployments
- **Environment Management**:
  - Expo configuration in `app.json` and `eas.json`
  - Dark/light mode toggles based on system preferences
- **Deployment Platform**: Expo Application Services (EAS)

## Getting Started

### **Setup**

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd brain-board
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### **Development**

- Start the development server:
  ```bash
  expo start
  ```

### **Build**

- Build for Android:
  ```bash
  expo run:android
  ```
- Build for iOS:
  ```bash
  expo run:ios
  ```

### **Linting & Formatting**

- Run ESLint:
  ```bash
  npm run lint
  ```
- Format code with Prettier:
  ```bash
  npm run format
  ```
