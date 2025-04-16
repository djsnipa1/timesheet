# employeeStore.js

## Summary
This code defines a Svelte store called `employeeStore` that manages employee data and their time entries. It handles fetching data from an API, managing loading states, and handling errors, providing a centralized way to access and update employee-related information within the application.

## Purpose
The primary purpose of `employeeStore.js` is to provide a reactive data store for employee information and time entries. It encapsulates the logic for fetching, updating, and managing this data, making it easily accessible and consistent across different components of the Svelte application.

## Key Components
- createEmployeeStore: A function that creates and returns the employee store with methods to subscribe to changes, fetch all data, and reset the store.
- writable: A Svelte store function used to create a writable store that holds the employee data, time entries, loading state, and error information.
- fetchAll: An asynchronous function that fetches employee data and time entries from the API (or mock data in development) and updates the store.
- reset: A function that resets the store to its initial state, clearing employee data and time entries.

## Dependencies
- svelte/store: Used for creating reactive stores in Svelte.
- $lib/api/timeEntryApi: Contains functions for fetching JSON data from the API.
- $lib/data/mockTimeEntries.json: Provides mock data for development purposes.

## Code Highlights
The code utilizes the Svelte store `writable` to create a reactive data store. It employs asynchronous functions with `async/await` for handling API requests. Conditional logic is used to switch between using mock data in development and fetching real data from the API in production. Error handling is implemented using try/catch blocks and a dedicated `setError` function to update the store's error state.

## Detailed Documentation
# src\lib\stores\employeeStore.js

## Summary
This code defines a Svelte store called `employeeStore` that manages employee data and their time entries. It handles fetching data from an API, managing loading states, and handling errors, providing a centralized way to access and update employee-related information within the application.

## Purpose
The primary purpose of `employeeStore.js` is to provide a reactive data store for employee information and time entries. It encapsulates the logic for fetching, updating, and managing this data, making it easily accessible and consistent across different components of the Svelte application.

## Key Components
*   **createEmployeeStore**: This function is the factory for creating the employee store. It initializes the store with default values (employee: null, timeEntries: [], isLoading: false, error: null) and defines methods for interacting with the store.

*   **writable**: This is a Svelte store function that creates a writable store. The `employeeStore` uses `writable` to hold the application's state, including employee details, time entries, loading status, and any errors that occur.

*   **fetchAll**: This asynchronous function is responsible for fetching employee data and time entries. In development, it uses mock data. In production, it fetches data from the API endpoints `/api/time-entries`. It updates the store with the fetched data or sets an error state if something goes wrong.

*   **reset**: This function resets the `employeeStore` to its initial state, effectively clearing any stored employee data, time entries, and error messages. It's useful for scenarios like logging out a user.

## Dependencies
*   `svelte/store`:  Svelte's built-in module for creating reactive stores.
*   `$lib/api/timeEntryApi`: A custom module (likely containing `fetchJson`) for making API requests.
*   `$lib/data/mockTimeEntries.json`: A JSON file containing mock data for use during development.

## Code Highlights
*   **Svelte Store**: The code leverages Svelte's store system to create a reactive data container.  Components can subscribe to the `employeeStore` and automatically update when the store's data changes.
*   **Asynchronous Data Fetching**: The `fetchAll` function uses `async/await` to handle asynchronous API calls, making the code more readable and easier to follow.
*   **Environment-Based Configuration**: The code checks `import.meta.env.DEV` to determine whether to use mock data (in development) or fetch data from the API (in production).
*   **Error Handling**: The code includes error handling using `try...catch` blocks and the `setError` function to update the store's error state, providing a mechanism for displaying error messages in the UI.

## Detailed Documentation

### 1. createEmployeeStore Function
This function encapsulates the store's logic. It initializes the store with the following structure:

```javascript
{
  employee: null, // Employee data (initially null)
  timeEntries: [], // Array of time entries (initially empty)
  isLoading: false, // Boolean indicating whether data is being loaded
  error: null      // Error message, if any
}
```

It then defines the following methods:

*   **subscribe**: Inherited from `writable`. Allows components to subscribe to store updates.
*   **fetchAll**: Fetches employee data and time entries from the API or mock data.
*   **reset**: Resets the store to its initial state.

### 2. fetchAll Function
This function fetches data and updates the store. Here's a breakdown:

1.  **Set Loading State**: `setLoading()` is called to set `isLoading` to `true` and clear any existing errors.
2.  **Conditional Data Source**:
    *   If `import.meta.env.DEV` is true (i.e., in development), it uses mock data from `mockTimeEntriesData` to update the store.
    *   Otherwise, it fetches data from the `/api/time-entries` endpoint using `fetchJson`.
3.  **Update Store**: If the API call is successful, it updates the store with the fetched employee data and time entries.
4.  **Error Handling**: If any error occurs during the process, it calls `setError` to update the store's error state.

Example Usage:

```javascript
import { employeeStore } from './employeeStore';

// In a Svelte component:

$: {
  employeeStore.fetchAll(); // Fetch data when the component initializes
}

// Accessing store values:

let employee;
let timeEntries;

employeeStore.subscribe(value => {
  employee = value.employee;
  timeEntries = value.timeEntries;
});
```

### 3. reset Function
This function resets the store to its initial state. This is useful for scenarios like user logout or when you need to clear the store's data.

Example Usage:

```javascript
import { employeeStore } from './employeeStore';

// Reset the store:
employeeStore.reset();
```

### 4. Data Structures

*   **Employee Data**: The structure of the employee data is determined by the API response or the `mockTimeEntriesData.user` object.  It's assumed to be a JavaScript object with properties like `id`, `name`, `email`, etc.
*   **Time Entries**: The `timeEntries` array contains objects representing individual time entries. Each time entry object has the following properties:
    *   `id`: Unique identifier for the time entry.
    *   `description`: Description of the work done.
    *   `timeInterval`: An object containing `start`, `end`, and `duration` properties.
    *   `workspaceId`: ID of the workspace.
    *   `userId`: ID of the user.
    *   `billable`: Boolean indicating whether the time entry is billable.
    *   `projectId`: ID of the project.
    *   `isLocked`: Boolean indicating whether the time entry is locked.

### 5. Error Handling
The code includes basic error handling. When an error occurs during data fetching, the `setError` function is called to update the store's `error` property. This allows components to display error messages to the user.

Example:

```svelte
{#if $employeeStore.error}
  <p class="error">Error: {$employeeStore.error}</p>
{/if}
```

### 6.  fetchTimeEntries Function
This function is responsible for fetching time entries from the API and parsing the response. It addresses a specific structure of the API response where time intervals are nested. It extracts and restructures the data into a more manageable format for the application.

Key aspects:

*   **API Endpoint**: It fetches data from the `/api/time-entries` endpoint.
*   **Response Validation**: It checks if the response contains a `timeEntries` array.
*   **Data Transformation**: It transforms the structure of each time entry to include a `timeInterval` object with `start`, `end`, and `duration` properties.

This function ensures that the time entry data is consistently formatted before being stored in the `employeeStore`.

