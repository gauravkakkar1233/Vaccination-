import { Platform } from 'react-native';
import Constants from 'expo-constants';

/**
 * API base URL for the backend.
 * - Web: uses localhost
 * - Phone/Device: uses the same machine's IP as the Expo dev server (when running via Expo Go)
 *   so the phone can reach your computer's backend. Ensure backend runs on port 3000.
 * - Override: set EXPO_PUBLIC_API_URL in app.json extra or .env for custom URL
 */
function getApiUrl() {
    const override = Constants.expoConfig?.extra?.apiUrl ?? process.env.EXPO_PUBLIC_API_URL;
    if (override) return override;

    if (Platform.OS === 'web') {
        return 'http://localhost:3000';
    }

    // On device: use same host as Expo bundler (your computer's IP on local network)
    const hostUri = Constants.expoConfig?.hostUri
        ?? Constants.manifest2?.extra?.expoGo?.debuggerHost
        ?? Constants.manifest?.debuggerHost ?? '';
    const host = (hostUri || '').split(':')[0];
    if (host && host !== 'localhost') {
        return `http://${host}:3000`;
    }

    // Fallback if host not detected (e.g. production build) - replace with your server URL
    return 'http://localhost:3000';
}

export const API_URL = getApiUrl();
