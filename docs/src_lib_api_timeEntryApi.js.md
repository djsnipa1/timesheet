# timeEntryApi.js

## Summary
This file provides utility functions for making API requests and parsing time entry data. It includes a generic fetch function for handling JSON responses and a specific function for transforming time entry objects into a standardized format.

## Purpose
The primary purpose of this code is to simplify API interactions and data processing related to time entries. It promotes code reusability and consistency across the application by providing pre-built functions for common tasks.

## Key Components
- fetchJson: A generic function for fetching JSON data from an API endpoint and handling potential errors.
- parseTimeEntry: A function that transforms a time entry object into a standardized format, extracting and renaming specific properties.

## Dependencies
No external dependencies.

## Code Highlights
The `fetchJson` function demonstrates error handling using try-catch blocks and asynchronous programming with `async/await`. The `parseTimeEntry` function showcases object destructuring and property renaming for data transformation.

## Detailed Documentation
## `src/lib/api/timeEntryApi.js`

## Summary
This file contains functions to fetch JSON data from an API endpoint and parse time entry objects.

## Purpose
The purpose of this file is to provide reusable functions for interacting with the API and transforming time entry data into a consistent format.

## Key Components
*   **`fetchJson(endpoint, errorMessage)`**: Fetches JSON data from a given endpoint.
*   **`parseTimeEntry(entry)`**: Parses a time entry object and returns a new object with a standardized format.

## Dependencies
This file does not have any external library dependencies.

## Code Highlights
*   **Error Handling**: The `fetchJson` function uses `try...catch` to handle potential errors during the API request.
*   **Asynchronous Operations**: The `fetchJson` function uses `async/await` to handle asynchronous operations.
*   **Data Transformation**: The `parseTimeEntry` function transforms the structure of the input `entry` object.

## Detailed Documentation

### `fetchJson(endpoint, errorMessage)`

Fetches JSON data from the specified API endpoint.

**Parameters:**

*   `endpoint` (string): The URL of the API endpoint.
*   `errorMessage` (string): A custom error message to be used if the API request fails.

**Returns:**

A promise that resolves to the JSON data from the API.

**Example:**

```javascript
const data = await fetchJson('/api/time-entries', 'Failed to fetch time entries');
console.log(data);
```

**Usage Notes:**

*   This function handles network errors and API response errors.
*   It throws an error with a custom message if the API request fails.

### `parseTimeEntry(entry)`

Parses a time entry object and returns a new object with a standardized format.

**Parameters:**

*   `entry` (object): The time entry object to parse.

**Returns:**

A new object with the following properties:

*   `id` (string): The ID of the time entry.
*   `description` (string): The description of the time entry.
*   `timeInterval` (object): An object containing the start, end, and duration of the time entry.
    *   `start` (string): The start time of the time entry.
    *   `end` (string): The end time of the time entry.
    *   `duration` (number): The duration of the time entry.
*   `workspaceId` (string): The ID of the workspace.
*   `userId` (string): The ID of the user.
*   `billable` (boolean): Indicates whether the time entry is billable.
*   `projectId` (string): The ID of the project.
*   `isLocked` (boolean): Indicates whether the time entry is locked.

**Example:**

```javascript
const rawEntry = {
    id: '123',
    description: 'Coding',
    timeInterval: { start: '2024-01-01T10:00:00Z', end: '2024-01-01T12:00:00Z', duration: 7200 },
    workspaceId: '456',
    userId: '789',
    billable: true,
    projectId: '101',
    isLocked: false
};
const parsedEntry = parseTimeEntry(rawEntry);
console.log(parsedEntry);
```

**Usage Notes:**

*   This function ensures that time entry objects have a consistent structure.
*   It extracts and renames properties from the input object to match the desired format.
