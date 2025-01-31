import { writable } from 'svelte/store';

function createEmployeeStore() {
  const { subscribe, set, update } = writable({
    employee: null,
    timeEntries: [],
    isLoading: false,
    error: null
  });

  const fetchData = async (endpoint, errorMessage) => {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error(errorMessage);
      return await response.json();
    } catch (err) {
      throw new Error(errorMessage + ': ' + err.message);
    }
  };

  return {
    subscribe,
    fetchEmployee: async () => {
      update(state => ({ ...state, isLoading: true, error: null }));
      try {
        const employee = await fetchData('/api/user', 'Failed to fetch employee data');
        update(state => ({ ...state, employee, isLoading: false }));
        // After getting employee data, fetch their time entries
        if (employee?.id) {
          await this.fetchTimeEntries(employee.id);
        }
      } catch (err) {
        update(state => ({ ...state, error: err.message, isLoading: false }));
      }
    },
    fetchTimeEntries: async (employeeId) => {
      if (!employeeId) {
        throw new Error('Employee ID is required to fetch time entries');
      }
      update(state => ({ ...state, isLoading: true, error: null }));
      try {
        const timeEntries = await fetchData(
          `/api/timeentries/${employeeId}`,
          'Failed to fetch time entries'
        );
        update(state => ({ ...state, timeEntries, isLoading: false }));
      } catch (err) {
        update(state => ({ ...state, error: err.message, isLoading: false }));
      }
    },
    fetchAll: async () => {
      update(state => ({ ...state, isLoading: true, error: null }));
      try {
        // First get employee data
        const employee = await fetchData('/api/user', 'Failed to fetch employee data');

        // Then use the employee ID to get time entries
        const timeEntries = employee?.id
          ? await fetchData(`/api/timeentries/${employee.id}`, 'Failed to fetch time entries')
          : [];

        update(state => ({
          employee,
          timeEntries,
          isLoading: false,
          error: null
        }));
      } catch (err) {
        update(state => ({
          ...state,
          error: err.message,
          isLoading: false
        }));
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