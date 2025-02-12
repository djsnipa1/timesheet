import { error, json } from '@sveltejs/kit';
import { apiRequest } from '$lib/server/api.js';

export async function GET() {
  try {
    // Fetch user data from Clockify
    const userData = await apiRequest('/user');
    console.log('User Data:', userData);

    // Extract userId and workspaceId from the response
    const userId = userData.id;
    const workspaceId = userData.activeWorkspace;

    // Use the userId and workspaceId to fetch time entries
    const timeEntries = await apiRequest(`/workspaces/${workspaceId}/user/${userId}/time-entries`);
    console.log('Time Entries:', timeEntries);

    // Return the combined data
    return json({ user: userData, timeEntries });
  } catch (e) {
    console.error('API Error:', e);
    throw error(500, 'Failed to fetch user data');
  }
}