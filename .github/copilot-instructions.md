# Copilot Instructions for Gymaholic Fitness App

## Project Overview

This is a cross-platform fitness tracking mobile app built with React Native and Expo, focused on progressive overload tracking. The app allows users to log workouts, track their strength progress, and visualize their gains.

## Technology Stack

- **React Native** (0.81.5) - Cross-platform mobile framework
- **Expo** (~54.0) - React Native tooling and SDK
- **Expo Router** (~6.0) - File-based navigation
- **TypeScript** (~5.9) - Type-safe development
- **React Query** (@tanstack/react-query) - Server state management
- **Zustand** - Client state management
- **AsyncStorage** - Local data persistence
- **Lucide React Native** - Icon library
- **Bun** - Package manager and runtime

## Project Structure

```
├── app/                    # Expo Router screens
│   ├── _layout.tsx        # Root layout with navigation setup
│   ├── index.tsx          # Welcome/home screen
│   ├── workout.tsx        # Active workout screen
│   ├── history.tsx        # Workout history screen
│   └── +not-found.tsx     # 404 screen
├── constants/             # App constants
│   ├── types.ts          # TypeScript interfaces
│   ├── exercises.ts      # Exercise definitions
│   └── colors.ts         # Color palette
├── contexts/             # React contexts
│   └── WorkoutContext.tsx # Workout state management
├── assets/               # Static assets (images, fonts)
└── build/                # Build outputs (ignored in git)
```

## Development Guidelines

### Code Style

1. **TypeScript**
   - Always use TypeScript for new files
   - Use strict mode (`strict: true` in tsconfig.json)
   - Define proper interfaces in `constants/types.ts`
   - Use type assertions sparingly

2. **React/React Native**
   - Use functional components with hooks
   - Use `React.` prefix for React hooks (e.g., `React.useEffect`, `React.useState`)
   - Import types with `import type` for better tree-shaking
   - Use `StyleSheet.create()` for component styles
   - Define styles at the bottom of component files

3. **File Naming**
   - Components: PascalCase with `.tsx` extension
   - Utilities/Constants: camelCase with `.ts` extension
   - Use lowercase with hyphens for special Expo Router files (e.g., `+not-found.tsx`)

4. **Import Organization**
   - External packages first
   - React Native core imports
   - Local imports with `@/` alias
   - Type imports separately with `import type`

### Navigation

- Use Expo Router's file-based routing system
- Navigation configured in `app/_layout.tsx`
- Use `useRouter()` hook for programmatic navigation
- Screen transitions use fade/slide animations

### State Management

1. **Local State**: Use React Context with `@nkzw/create-context-hook`
   - See `WorkoutContext.tsx` as reference
   - Contexts should export both Provider and hook

2. **Server State**: Use React Query
   - Query keys in array format: `['workouts']`
   - Mutations for data updates
   - Integrate with AsyncStorage for persistence

3. **Async Storage**
   - Key format: `@gymaholic_<feature>`
   - Always parse/stringify JSON data
   - Handle null/undefined cases

### UI/UX Patterns

1. **Colors & Theming**
   - Primary: `#FF6B35` (orange)
   - Accent: `#F7931E` (gold)
   - Background: Dark theme (`#0F0F0F`, `#1A1A1A`)
   - Text: White (`#FFFFFF`) and gray (`#999999`, `#666666`)

2. **Components**
   - Use `LinearGradient` for buttons and backgrounds
   - Use `SafeAreaView` for screen containers
   - Icons from `lucide-react-native` with consistent sizing
   - Animations with `Animated` API

3. **Buttons & Interactions**
   - Use `Pressable` instead of `TouchableOpacity`
   - Include pressed states with opacity/scale transforms
   - Rounded corners: 12-16px border radius

### Data Models

Key interfaces (see `constants/types.ts`):
- `Workout`: Contains date, name, exercises, duration, totalVolume
- `WorkoutExercise`: Exercise within a workout with sets
- `WorkoutSet`: Individual set with weight, reps, completion status

### Commands

- **Start dev server**: `bun start` (with tunnel for mobile testing)
- **Start web preview**: `bun run start-web`
- **Lint**: `bun run lint` (uses ESLint with Expo config)
- **Build**: Use EAS CLI for production builds

### Testing & Development

- Test on physical devices using Expo Go app
- Use `--tunnel` flag for device testing on different networks
- Web preview available but some native features may not work
- iOS Simulator and Android Emulator supported

## Common Patterns

### Adding a New Screen

1. Create `.tsx` file in `app/` directory
2. Export default function component
3. Add to navigation stack in `app/_layout.tsx`
4. Use `SafeAreaView` and follow color scheme
5. Import types from `@/constants/types`

### Working with Workouts

1. Use `useWorkouts()` hook from WorkoutContext
2. Access `workouts`, `addWorkout()`, `deleteWorkout()` methods
3. Calculate `totalVolume` as sum of weight × reps across all sets
4. Store workouts with unique IDs (use UUID or timestamp)

### Styling Guidelines

- Use `StyleSheet.create()` at bottom of file
- Group related styles together
- Use flexbox for layouts
- Consistent spacing: 8, 12, 16, 20, 24, 32px
- Font sizes: 14, 16, 18, 24, 48px
- Font weights: '500', '600', '700', '800' (cast as const)

## Best Practices

1. **Performance**
   - Use `React.memo()` for expensive components
   - Avoid inline functions in render for frequently updating lists
   - Use `useCallback` and `useMemo` appropriately

2. **Accessibility**
   - Provide accessible labels for interactive elements
   - Use semantic component names
   - Test with device accessibility features

3. **Error Handling**
   - Handle AsyncStorage failures gracefully
   - Provide loading states for async operations
   - Use React Query's `isLoading` and `error` states

4. **Code Organization**
   - Keep components focused and single-purpose
   - Extract reusable components to separate files
   - Use constants for magic numbers and strings

## Rork Platform Integration

- This app is managed via Rork.com platform
- Changes pushed to GitHub sync with Rork
- Use `bunx rork start` commands as defined in package.json
- Project ID: `nlio4jd4d2w7tq3u73yoc`

## Notes

- Path alias `@/*` maps to project root (configured in tsconfig.json)
- ESLint uses Expo flat config (eslint.config.js)
- Git LFS used for large build artifacts
- Node modules and build outputs excluded from git
