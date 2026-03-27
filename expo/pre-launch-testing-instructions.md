# Pre-launch Testing Instructions for Gymaholic

## App Overview
Gymaholic is a fitness tracking app that stores data locally. No login required.

## Testing Flow
1. Launch the app
2. Tap "Start Training" button
3. Tap "Add Exercise" button
4. Select any exercise from the list (e.g., "Barbell Bench Press")
5. Enter weight and reps in the input fields
6. Mark sets as complete by tapping checkboxes
7. Navigate back to home screen
8. Tap "View History" to see workout log
9. Test the Privacy Policy link at the bottom

## Key Features to Test
- Workout timer functionality
- Exercise selection and search
- Set/rep input fields
- Workout history persistence
- Back navigation
- Privacy Policy page

## No Special Permissions Required
The app only requests:
- Vibration (for haptic feedback)
- Local storage (for workout data)

## Expected Behavior
- App should launch without crashes
- All navigation should work smoothly
- Data should persist between screens
- Timer should count up during workouts
