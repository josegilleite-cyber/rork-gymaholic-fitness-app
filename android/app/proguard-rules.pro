# Tailored proguard-rules.pro for rork-gymaholic-fitness-app (Expo / React Native)
# Place this in android/app/proguard-rules.pro (recommended for Android builds).
# Adjust package names if you know exact native package names for specific modules.

# Preserve runtime attributes commonly required by reflection/deserializers
-keepattributes Signature,RuntimeVisibleAnnotations,RuntimeInvisibleAnnotations,RuntimeVisibleParameterAnnotations,SourceFile,LineNumberTable,EnclosingMethod,InnerClasses

# Kotlin metadata
-keep class kotlin.Metadata { *; }
-keepattributes KotlinMetadata

# React Native core & bridge (preserve modules / classes used by the JS <-> native bridge)
-keep class com.facebook.react.** { *; }
-keep class com.facebook.hermes.** { *; }
-keepclassmembers class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.bridge.JavaScriptModule { *; }
-keep class com.facebook.react.bridge.NativeModule { *; }

# Expo / unimodules (covers many expo.* native modules)
-keep class expo.modules.** { *; }
-keep class org.unimodules.** { *; }

# AsyncStorage native module (package pattern)
-keep class com.reactnativeasyncstorage.** { *; }

# react-native-gesture-handler
-keep class com.swmansion.gesturehandler.** { *; }

# react-native-screens
-keep class com.swmansion.rnscreens.** { *; }

# react-native-svg (Android native implementation)
-keep class com.horcrux.svg.** { *; }

# react-native-safe-area-context (common Android package pattern)
-keep class com.th3rdwave.safeareacontext.** { *; }

# react-native datetimepicker (Android)
-keep class com.reactcommunity.rndatetimepicker.** { *; }

# Common HTTP/JSON/I/O libraries often pulled in transitively by native modules
-keep class com.squareup.okhttp3.** { *; }
-keep class okio.** { *; }
-keep class com.google.gson.** { *; }

# If your app or a native library creates instances reflectively by calling no-arg constructors,
# make sure to keep those constructors. Example:
# -keep class com.example.yourapp.SomeTask { <init>(); }

# If you use fields annotated with @SerializedName (Gson) and your Gson version < 2.11,
# keep those fields. For Gson >= 2.11, consumer proguard rules are usually bundled by the library.
# -keepclassmembers class * {
#     @com.google.gson.annotations.SerializedName <fields>;
# }

# Optional: keep all members of a class used via reflection (use sparingly)
# -keepclassmembers class com.example.yourapp.** {
#     private *;
#     <methods>;
# }

# Debugging helper (use locally only):
# -whyareyoukeeping class com.example.yourapp.**
