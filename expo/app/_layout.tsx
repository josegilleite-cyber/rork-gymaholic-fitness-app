import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { WorkoutProvider } from '@/contexts/WorkoutContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'fade' }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="workout" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="history" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="progress" options={{ animation: 'slide_from_right' }} />
      <Stack.Screen name="exercises" options={{ animation: 'slide_from_bottom', presentation: 'modal' }} />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <WorkoutProvider>
        <GestureHandlerRootView>
          <RootLayoutNav />
        </GestureHandlerRootView>
      </WorkoutProvider>
    </QueryClientProvider>
  );
}
