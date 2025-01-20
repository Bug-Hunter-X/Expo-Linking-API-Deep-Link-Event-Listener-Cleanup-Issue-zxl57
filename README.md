# Expo Linking API Deep Link Event Listener Cleanup Issue

This repository demonstrates a bug in the Expo `Linking` API related to deep link event listener cleanup.  After opening the app via a deep link and immediately closing it, subsequent attempts to open the app using the same deep link fail. This is likely due to improper cleanup of the event listener.

## How to Reproduce

1. Clone this repository.
2. Run the app on an iOS or Android device/simulator.
3. Open the app via a deep link (e.g., expo://...).
4. Immediately close the app.
5. Attempt to open the app again using the same deep link.
6. The deep link will likely fail to open the app correctly.

## Solution

The solution involves ensuring the `Linking.removeEventListener` is called properly and handles potential cleanup scenarios (checking null or undefined before removal, handling race conditions).  See `LinkingBugSolution.js` for the corrected implementation.