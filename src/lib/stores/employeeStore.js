import { writable } from 'svelte/store';
import { fetchJson, parseTimeEntry } from '$lib/api/timeEntryApi';
import mockTimeEntriesData from '$lib/data/mockTimeEntries.json';

function createEmployeeStore() {
  const { subscribe, set, update } = writable({
    employee: null,
    timeEntries: /** @type {Array<{id: any, description: any, start: Date, end: Date, duration: any, workspaceId: any, userId: any, billable: any, projectId: any, isLocked: any}>} */ ([]),
    isLoading: false,
    error: null
  });

  const setLoading = () => update(state => ({ ...state, isLoading: true, error: null }));
  const setError = (error) => update(state => ({ ...state, error, isLoading: false }));

  const fetchTimeEntries = async () => {
    const response = await fetchJson(
        `/api/time-entries`,
        'Failed to fetch time entries'
    );
    
    console.log('Raw API Response:', response);
    
    // Check if response has timeEntries array
    if (!response?.timeEntries || !Array.isArray(response.timeEntries)) {
        console.error('Invalid response structure:', response);
        return [];
    }
    
    const entries = response.timeEntries;
    console.log('Entries before parsing:', entries);
    
    const parsedEntries = entries.map(entry => ({
        id: entry.id,
        description: entry.description,
        timeInterval: {
            start: entry.timeInterval?.start,
            end: entry.timeInterval?.end,
            duration: entry.timeInterval?.duration
        },
        workspaceId: entry.workspaceId,
        userId: entry.userId,
        billable: entry.billable,
        projectId: entry.projectId,
        isLocked: entry.isLocked
    }));
    
    console.log('Parsed Entries:', parsedEntries);
    return parsedEntries;
  };

  return {
    subscribe,
    
    fetchAll: async () => {
      setLoading();
      try {
        if (import.meta.env.DEV && !import.meta.env.VITE_USE_PRODUCTION_API) {
          // Use mock data in development unless VITE_USE_PRODUCTION_API is true
          update(state => ({
            ...state,
            employee: mockTimeEntriesData.user,
            timeEntries: mockTimeEntriesData.timeEntries,
            isLoading: false,
            error: null
          }));
          return;
        }

        const response = await fetchJson('/api/time-entries', 'Failed to fetch data');
        console.log('API Response:', response);
        
        const employee = response.user;
        const timeEntries = await fetchTimeEntries();

        if (!Array.isArray(timeEntries)) {
            throw new Error('Time entries must be an array');
        }

        update(state => ({
            ...state,
            employee,
            timeEntries,
            isLoading: false,
            error: null
        }));
      } catch (err) {
        console.error('Error in fetchAll:', err);
        setError(err.message);
      }
    },

    reset: () => {
      set({
        employee: null,
        timeEntries: [],
        isLoading: false,
        error: null
      });
    }
  };
}

export const employeeStore = createEmployeeStore();