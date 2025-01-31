const API_BASE_URL = 'https://your-api-base-url.com';

export async function fetchWithAuth(endpoint, options = {}) {
    const headers = {
        'X-Api-Key': import.meta.env.VITE_CLOCKIFY_API_KEY,
        'Content-Type': 'application/json',
        ...options.headers
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers
    });

    if (!response.ok) {
        throw new Error(`API call failed: ${response.statusText}`);
    }

    return response.json();
} 