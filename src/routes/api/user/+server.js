import { error, json } from '@sveltejs/kit';
import { apiRequest } from '$lib/server/api.js';

export async function GET() {
  try {
    const data = await apiRequest('/user');
    console.log('API Response:', data);
    return json(data);
  } catch (e) {
    console.error('API Error:', e);
    throw error(500, 'Failed to fetch user data');
  }
}