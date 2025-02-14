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
        const response = await fetchData(
          `/api/time-entries/${employeeId}`,
          'Failed to fetch time entries'
        );
        console.log('Raw Time Entries:', JSON.stringify(response, null, 2));
        
        // Extract timeEntries array from the response
        const timeEntries = response.timeEntries || [];
        
        // Parse the time entries
        const parsedTimeEntries = timeEntries.map(entry => ({
          id: entry.id,
          description: entry.description,
          start: new Date(entry.timeInterval.start),
          end: new Date(entry.timeInterval.end),
          duration: entry.timeInterval.duration,
          workspaceId: entry.workspaceId,
          userId: entry.userId,
          billable: entry.billable,
          projectId: entry.projectId,
          isLocked: entry.isLocked
        }));
        
        // Log parsed entries in a more readable format
        console.log('Parsed Time Entries:', JSON.stringify(parsedTimeEntries.map(entry => ({
          id: entry.id,
          description: entry.description,
          start: entry.start.toLocaleString(),
          end: entry.end.toLocaleString(),
          duration: entry.duration
        })), null, 2));

        update(state => ({ ...state, timeEntries: parsedTimeEntries, isLoading: false }));
      } catch (err) {
        console.error('Error in fetchTimeEntries:', err);
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
          ? await fetchData(`/api/time-entries`, 'Failed to fetch time entries')
          : [];

        console.log('Raw Time Entries:', timeEntries); // Log the raw time entries
        // Check if timeEntries is an array before mapping
        const parsedTimeEntries = Array.isArray(timeEntries) ? timeEntries.map(entry => ({
          id: entry.id,
          description: entry.description,
          start: new Date(entry.timeInterval.start),
          end: new Date(entry.timeInterval.end),
          duration: entry.timeInterval.duration,
          workspaceId: entry.workspaceId,
          userId: entry.userId,
          billable: entry.billable,
          projectId: entry.projectId,
          isLocked: entry.isLocked
        })) : [];
        console.log('Parsed Time Entries:', JSON.stringify(parsedTimeEntries, null, 2)); // Log the parsed time entries

        update(state => ({
          employee,
          timeEntries: parsedTimeEntries,
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