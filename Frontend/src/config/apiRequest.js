import { API_URL } from './api';

const REQUEST_TIMEOUT = 15000; // 15 seconds

/**
 * Fetch with timeout. Fails fast instead of hanging.
 */
async function fetchWithTimeout(url, options = {}) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT);

    try {
        const response = await fetch(url, {
            ...options,
            signal: controller.signal,
        });
        clearTimeout(timeoutId);
        return response;
    } catch (err) {
        clearTimeout(timeoutId);
        if (err.name === 'AbortError') {
            const e = new Error('Connection timed out. Check that your phone and PC are on the same Wi-Fi and the backend is running.');
            e.isNetwork = true;
            throw e;
        }
        const e = new Error('Connection failed. Check that your phone and PC are on the same Wi-Fi and the backend is running.');
        e.isNetwork = true;
        throw e;
    }
}

export async function apiPost(path, body) {
    const response = await fetchWithTimeout(`${API_URL}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
    });
    let data;
    try {
        data = await response.json();
    } catch {
        data = { message: 'Invalid response from server' };
    }
    return { response, data };
}

/** Authenticated GET - pass token from AsyncStorage */
export async function apiGet(path, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await fetchWithTimeout(`${API_URL}${path}`, { method: 'GET', headers });
    let data;
    try {
        data = await response.json();
    } catch {
        data = { message: 'Invalid response from server' };
    }
    return { response, data };
}

/** Authenticated POST - pass token from AsyncStorage */
export async function apiPostAuth(path, body, token) {
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    const response = await fetchWithTimeout(`${API_URL}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(body),
    });
    let data;
    try {
        data = await response.json();
    } catch {
        data = { message: 'Invalid response from server' };
    }
    return { response, data };
}
