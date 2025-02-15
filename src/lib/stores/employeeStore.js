import { writable } from 'svelte/store';
import { fetchJson, parseTimeEntry } from '$lib/api/timeEntryApi';

function createEmployeeStore() {
  const { subscribe, set, update } = writable({
    employee: null,
    timeEntries: [],
    isLoading: false,
    error: null
  });

  const setLoading = () => update(state => ({ ...state, isLoading: true, error: null }));
  const setError = (error) => update(state => ({ ...state, error, isLoading: false }));

  const fetchTimeEntries = async (employee) => {
    if (!employee?.id) return [];
    
    const timeEntries = await fetchJson(
      `/api/time-entries`,
      'Failed to fetch time entries'
    );
    
    return Array.isArray(timeEntries) 
      ? timeEntries.map(parseTimeEntry)
      : [];
  };

  return {
    subscribe,
    
    fetchAll: async () => {
      setLoading();
      try {
        const employee = await fetchJson('/api/user', 'Failed to fetch employee data');
        const timeEntries = await fetchTimeEntries(employee);

        update(state => ({
          employee,
          timeEntries,
          isLoading: false,
          error: null
        }));
      } catch (err) {
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