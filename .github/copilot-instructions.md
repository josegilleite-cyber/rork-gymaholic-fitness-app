# Copilot Instructions for Gymaholic Fitness App

## Project Overview

This is a **React Native + Expo Router** fitness tracking app built and deployed with [Rork](https://rork.com). The app tracks workouts, exercises, sets/reps, and progressive overload using a file-based routing system.

**Tech Stack**: React Native 0.81.5, Expo ~54, Expo Router ~6, TypeScript, React Query, AsyncStorage, Lucide icons

## Architecture & Data Flow

### State Management Pattern
- **Global State**: React Context via `@nkzw/create-context-hook` (see [contexts/WorkoutContext.tsx](../contexts/WorkoutContext.tsx))
- **Server State**: TanStack Query (`@tanstack/react-query`) for AsyncStorage persistence
- **Local State**: useState for UI-only state like modals and form inputs

**Critical Pattern**: The WorkoutContext uses a dual-layer approach:
1. React Query handles AsyncStorage reads/writes (`queryKey: ['workouts']`)
2. Local useState maintains optimistic UI updates
3. Mutations sync back to AsyncStorage via `syncMutation.mutate(updated)`

### Data Model (See [constants/types.ts](../constants/types.ts))
```
Workout
  ├── id: string (timestamp)
  ├── date: Date
  ├── exercises: WorkoutExercise[]
  │    ├── exerciseId: string (refs EXERCISES constant)
  │    └── sets: WorkoutSet[] (weight, reps, completed, rpe?)
  └── totalVolume: number (calculated on save)
```

## File-Based Routing

Uses Expo Router with typed routes (`experiments.typedRoutes: true` in [app.json](../app.json)).

**Navigation Pattern**:
- [app/_layout.tsx](../app/_layout.tsx): Root layout wraps all screens with `WorkoutProvider` → `QueryClientProvider` → `GestureHandlerRootView`
- [app/index.tsx](../app/index.tsx): Welcome screen (entry point)
- [app/workout.tsx](../app/workout.tsx): Active workout session with live timer and volume tracking
- [app/history.tsx](../app/history.tsx): Past workout list

**Animation Convention**: Use `animation: 'slide_from_right'` for main screens, `'slide_from_bottom'` with `presentation: 'modal'` for overlay screens.

## Development Workflow

### Running the App
```bash
# Web preview (fast iteration, limited native features)
bun run start-web

# Native preview with tunnel (required for AsyncStorage/haptics testing)
bun run start  # then press 'i' for iOS, 'a' for Android

# Debug mode for web
bun run start-web-dev  # enables DEBUG=expo*
```

**Important**: This project uses `bunx rork start` with a project-specific token (`-p nlio4jd4d2w7tq3u73yoc`). Changes pushed to GitHub sync to Rork's hosted version.

### Building for Production
Uses EAS Build ([eas.json](../eas.json)):
- `production`: APK builds (Android)
- `production-aab`: App Bundle for Google Play (auto-increments version)
- Deploy to Google Play Internal track via `eas submit`

## Code Conventions

### Styling Pattern
**No theme system** - all styles use inline `StyleSheet.create()` at bottom of each screen file. 

**Color Palette** (from [app/index.tsx](../app/index.tsx), [app/workout.tsx](../app/workout.tsx)):
- Background: `#0F0F0F`, `#1A1A1A` (LinearGradient dark theme)
- Primary: `#FF6B35` → `#F7931E` (gradient orange/amber)
- Text: `#FFFFFF`, `#999999` (secondary)
- Surface: `#1E1E1E` (cards), `rgba(255,255,255,0.1)` (borders)

### Component Patterns
1. **Haptic Feedback**: Use `expo-haptics` for user interactions:
   ```tsx
   Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);  // UI feedback
   Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);  // confirmations
   ```

2. **Pressable over TouchableOpacity**: All buttons use `Pressable` with `({ pressed })` for press states

3. **Timer Implementation**: Use `setInterval` + `useRef` pattern (see [app/workout.tsx](../app/workout.tsx) lines 22-36)

### Constants Organization
- [constants/exercises.ts](../constants/exercises.ts): All available exercises (categorized by Push/Pull/Legs/Core/Cardio)
- [constants/workout-templates.ts](../constants/workout-templates.ts): Pre-built workout plans
- [constants/types.ts](../constants/types.ts): Shared TypeScript interfaces
- [constants/colors.ts](../constants/colors.ts): Legacy file (not actively used - inline styles preferred)

## Critical Implementation Details

### Workout Volume Calculation
Total volume = Σ (weight × reps) for all **completed** sets only:
```tsx
const volume = exercises.reduce((total, exercise) => {
  const exVolume = exercise.sets
    .filter(set => set.completed)  // Only count completed
    .reduce((sum, set) => sum + (set.weight * set.reps), 0);
  return total + exVolume;
}, 0);
```

### Exercise Selection Pattern
Uses modal picker with search filter:
1. Filter `EXERCISES` array by `searchQuery.toLowerCase()` match on name/category/muscleGroup
2. Add selected exercise with initial empty sets array
3. Generate unique IDs using `Date.now() + index` pattern

### AsyncStorage Key
Single key for all workouts: `@gymaholic_workouts` (see STORAGE_KEY in [contexts/WorkoutContext.tsx](../contexts/WorkoutContext.tsx))

## External Dependencies & Integrations

### Rork Platform Integration
- **SDK**: `@rork-ai/toolkit-sdk` v0.2.51 included in dependencies (not currently used in UI)
- **Development Flow**: Project uses Rork's custom CLI (`bunx rork start -p nlio4jd4d2w7tq3u73yoc`)
- **Deployment**: Changes pushed to GitHub automatically sync to Rork's hosted environment
- **Origin**: Deep links configured for `https://rork.com/` (see [app.json](../app.json) `extra.router.origin`)

### Google Play Services
**Configuration Files**:
- [google-services.json](../google-services.json): Root-level Firebase config (Play Integrity API)
- [android/app/google-services.json](../android/app/google-services.json): Android build config
- [google-play-service-account.json](../google-play-service-account.json): Service account for `eas submit` automation

**Purpose**: Currently configured for Play Integrity API (app verification), not push notifications or analytics.

**Key Details**:
- Project ID: `gymaholic-fitness-app`
- Package: `app.rork.gymaholic_fitness_app`
- API Key in config is dummy/placeholder (Play Integrity only)
- No Firebase SDK imported - config is for Play Store compliance only

### EAS Build & Submit
- **Project ID**: `16a115ee-0bc7-4cef-82ab-acf00553c897` (Expo account: `kalimators-organization`)
- **Auto-versioning**: `autoIncrement: true` in production builds - managed by EAS, don't manually edit
- **Submission**: Configured for Google Play Internal track via service account credentials
- **Build variants**: 
  - `production`: APK for testing
  - `production-aab`: App Bundle for Play Store (uses `gradleCommand: ":app:bundleRelease"`)

### Expo Managed Dependencies
**Active Plugins** (see [app.json](../app.json) plugins array):
- `expo-router`: File-based navigation with typed routes
- `expo-build-properties`: Adds Maven repositories for Android builds
- `expo-font`: Custom font loading (if needed)
- `expo-web-browser`: In-app browser for privacy policy links

**Unused but Installed**:
- `expo-location`, `expo-image-picker`: Installed in package.json but not implemented in UI
- `@rork-ai/toolkit-sdk`: Future expansion potential

### Native Permissions
**Android** (see [app.json](../app.json) `android.permissions`):
- `android.permission.VIBRATE`: Required for haptic feedback via `expo-haptics`
- **No location/camera**: Despite dependencies being present, no permissions declared or used

### Storage & Persistence
- **AsyncStorage**: Single source of truth - no cloud sync/backend
- **Storage Key**: `@gymaholic_workouts` (all workout data in one JSON blob)
- **No Authentication**: Local-only app, no user accounts or API calls

### Adding New External Services

**If adding Firebase features (push notifications, analytics)**:
1. Update `google-services.json` with real project credentials
2. Install Firebase SDK: `bun add @react-native-firebase/app @react-native-firebase/messaging`
3. Add Firebase plugin to [app.json](../app.json): `"@react-native-firebase/app"`
4. Request notification permissions in [app.json](../app.json): `"android.permission.POST_NOTIFICATIONS"`

**If adding backend API**:
1. Use React Query for data fetching (already configured in [app/_layout.tsx](../app/_layout.tsx))
2. Follow existing mutation pattern in [contexts/WorkoutContext.tsx](../contexts/WorkoutContext.tsx)
3. Add environment variables via `expo-constants` and EAS Secrets

## Testing Notes

- **Pre-launch testing**: See [pre-launch-testing-instructions.md](../pre-launch-testing-instructions.md)
- **Robo script**: [robo-script.json](../robo-script.json) for automated Google Play Console testing
- **Android-only**: No iOS builds configured (see [app.json](../app.json): `ios.supportsTablet: false`)

## Common Pitfalls

1. **Don't mutate state directly** - always create new arrays/objects when updating workouts:
   ```tsx
   const updated = [...workouts, newWorkout];  // ✅
   workouts.push(newWorkout);                   // ❌
   ```

2. **Date serialization**: AsyncStorage can't store Date objects - handle JSON.stringify/parse carefully

3. **Tunnel required for native testing** - `--tunnel` flag needed for Expo Go connection (see package.json scripts)

4. **EAS Build version**: `autoIncrement: true` in production builds - don't manually bump version numbers
