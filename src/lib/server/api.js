import { CLOCKIFY_API_KEY } from '$env/static/private';

const API_BASE_URL = 'https://api.clockify.me/api/v1';

export async function apiRequest(endpoint, options = {}) {
  const headers = {
    'X-Api-Key': CLOCKIFY_API_KEY,
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