# Brain Board - Memory Game Pro

## Architecture Overview

This is an **Expo React Native** memory game with **Expo Router** file-based navigation. The app uses a tabbed layout with Game and About screens, implementing a 3x3 grid number sequence memory challenge.

### Core Tech Stack

- **Expo 53** with new architecture enabled
- **Expo Router 5** for navigation (tabs in `app/(tabs)/`)
- **Zustand** for state management (`stores/gameStore.ts`)
- **Lucide React Native** for consistent iconography
- **TypeScript** throughout

## Essential Patterns

### Theme System

The app uses a comprehensive theme system in `constants/Colors.ts` with **dark/light mode support**:

```tsx
// Always follow this pattern for theme-aware components
const colorScheme = useColorScheme();
const theme = colorScheme === 'dark' ? Colors.dark : Colors.light;

// Separate static styles from dynamic theme styles
const dynamicStyles = StyleSheet.create({
  text: { color: theme.onBackground },
  surface: { backgroundColor: theme.surface },
});

// Combine with style arrays: [staticStyles.layout, dynamicStyles.colors]
```

**Key theme tokens**: Use `theme.onBackground` for primary text, `theme.onSurfaceVariant` for secondary text, `theme.surface`/`theme.surfaceVariant` for backgrounds.

### Themed Components

- **ThemedText**: Has semantic props (`title`, `secondary`, `tertiary`) and typography variants (`heading`, `numbers`, `score`, `body`, `caption`)
- **ThemedView**: Auto-applies theme background, supports `safe` prop for SafeArea insets
- All custom components follow `Themed*` naming and implement theme switching

### Game State Architecture

The game uses **Zustand** with a single store (`gameStore.ts`) managing:

- **Game phases**: `setup` → `memorizing` → `playing` → `victory`
- **Cell grid**: Array of `GameCell` objects with Fisher-Yates shuffle
- **Sound integration**: Automatic sound/haptic feedback via `SoundService`

### Layout Constants

Game grid sizing is calculated dynamically in `constants/layouts.ts` based on screen dimensions. Always import layout constants rather than hardcoding sizes.

## Development Workflows

### Build Commands

- `expo start` - Development server
- `expo run:android` - Android build
- `expo run:ios` - iOS build
- `expo lint` - ESLint

### Key Files to Understand

- `stores/gameStore.ts` - Complete game logic and state
- `constants/Colors.ts` - Comprehensive theme system
- `components/GameCell.tsx` - Complex positioned grid cell with theme integration
- `app/(tabs)/_layout.tsx` - Expo Router tabs setup with Lucide icons

### Debugging Game Logic

The game phases follow a strict sequence. Debug by checking:

1. `gamePhase` state in store
2. `cells` array structure (9 items, shuffled values 1-9)
3. `currentTarget` progression (1→9)
4. Sound/haptic integration via `SoundService`

## Project Conventions

### Icon Usage

- **Exclusively use Lucide React Native** - never Expo vector icons
- Common icons: `Gamepad2`, `Info`, `Plus`, `Minus`, `Play`, `RotateCcw`
- Always implement focused/unfocused states for tab icons

### Styling Patterns

- **Split static vs dynamic styles**: Layout properties in `StyleSheet.create()`, colors in component-level `dynamicStyles`
- **Use style arrays**: `style={[staticStyles.layout, dynamicStyles.colors]}`
- **Typography**: Leverage `ThemedText` variants rather than custom text styling

### Component Organization

- Themed components in `components/` with consistent `Themed*` naming
- Game-specific components: `GameGrid`, `GameCell`, `GameStatus`, `GameButton`, `DurationInput`
- Services in `services/` (currently `soundService.ts` and `authService.ts`)

### File Structure

- `app/(tabs)/` - Tab screens (game.tsx, about.tsx)
- `constants/` - Colors, Fonts, layouts
- `stores/` - Zustand stores
- `components/` - Reusable UI components
- `services/` - Business logic services

### Audio Integration

Sound effects are managed by `SoundService` class with automatic cleanup. Haptic feedback is integrated for error states. Always call `SoundService.initialize()` in game screens.

## Critical Implementation Details

### Grid Positioning

Game cells use **absolute positioning** calculated from `constants/layouts.ts`. The 3x3 grid is rendered as positioned children within a container, not a traditional grid layout.

### State Management

Zustand store uses `combine` middleware pattern. Game logic handles Fisher-Yates shuffling, error states with timeouts, and automatic sound triggering.

### Navigation Structure

- Root: Stack navigator with tabs and error handling
- Tabs: Game (default) and About screens
- Redirects: `app/index.tsx` redirects to `(tabs)/game`
