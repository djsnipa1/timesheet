import { error, json } from '@sveltejs/kit';
import { apiRequest } from '$lib/server/api.js';

export async function GET() {
  try {
    console.log('Fetching user data...');
    const userData = await apiRequest('/user');
    console.log('User Data Response:', userData);

    const { defaultWorkspace, id } = userData;
    console.log('Extracted IDs:', { workspaceId: defaultWorkspace, userId: id });

    console.log('Fetching time entries...');
    const timeEntries = await apiRequest(`/workspaces/${defaultWorkspace}/user/${id}/time-entries`);
    console.log('Time Entries Response:', timeEntries);

    return json(timeEntries);
  } catch (e) {
    console.error('Full API Error:', {
      message: e.message,
      stack: e.stack,
      userData: e.userData
    });
    throw error(500, 'Failed to fetch time entries: ' + e.message);
  }
}