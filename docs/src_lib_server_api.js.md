# api.js

## Summary
This module provides a utility function, `apiRequest`, for making authenticated API calls to the Clockify API. It handles setting the API key in the headers and provides basic error handling.

## Purpose
The primary purpose of this code is to abstract away the complexities of making HTTP requests to the Clockify API, ensuring that all requests are properly authenticated and that errors are handled gracefully. It serves as a central point for interacting with the Clockify API throughout the application.

## Key Components
- apiRequest: An asynchronous function that makes HTTP requests to the Clockify API. It accepts an endpoint and an optional options object, sets the API key in the headers, and returns the JSON response. It also includes error handling for non-200 responses.

## Dependencies
- node-fetch (implicitly via global scope or a polyfill): Used to make HTTP requests.
- $env/static/private: Used to securely access the CLOCKIFY_API_KEY environment variable.

## Code Highlights
The code utilizes asynchronous JavaScript (async/await) for cleaner and more readable asynchronous operations. It also employs the spread operator (...) to merge default headers with user-provided headers, providing flexibility and ease of use. Environment variables are used to store the API key, promoting security by preventing hardcoding.

## Detailed Documentation
## src/lib/server/api.js

## Summary
This module provides a function to make authenticated API requests to Clockify.

## Purpose
To simplify and standardize API calls to Clockify, handling authentication and error checking.

## Key Components
*   **`apiRequest(endpoint, options = {})`**:  A function that sends a request to the Clockify API. It takes an `endpoint` (the API path) and an optional `options` object (like `method` and `body`). It automatically adds the API key to the request headers.

## Dependencies
*   `$env/static/private`:  Used to access the `CLOCKIFY_API_KEY` environment variable.
*   `fetch`: Native web API for making HTTP requests.

## Code Highlights
*   **Async/Await**: Uses `async` and `await` for cleaner asynchronous code.
*   **Header Management**:  Automatically includes the `X-Api-Key` header with the Clockify API key.
*   **Error Handling**: Checks the response status and throws an error if the request fails.

## Detailed Documentation

### `apiRequest(endpoint, options = {})`

This is the main function for interacting with the Clockify API.

**Parameters:**

*   `endpoint` (string): The API endpoint to call (e.g., `/workspaces`).  This is appended to the base URL (`https://api.clockify.me/api/v1`).
*   `options` (object, optional):  An object containing request options, such as:
    *   `method` (string):  HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE'). Defaults to 'GET' if not specified.
    *   `body` (string):  The request body, typically a JSON string for POST/PUT requests.
    *   `headers` (object):  Additional headers to include in the request.  These will be merged with the default headers (including the API key).

**Returns:**

A `Promise` that resolves to the JSON response from the API.

**Throws:**

An `Error` if the API request fails (i.e., the response status is not ok).

**Example Usage:**

```javascript
import { apiRequest } from '$lib/server/api';

async function getWorkspaces() {
  try {
    const workspaces = await apiRequest('/workspaces');
    console.log(workspaces);
    return workspaces;
  } catch (error) {
    console.error('Failed to fetch workspaces:', error);
    return [];
  }
}

async function createTimeEntry(timeEntryData) {
  try {
    const newTimeEntry = await apiRequest('/time-entries', {
      method: 'POST',
      body: JSON.stringify(timeEntryData)
    });
    console.log('Time entry created:', newTimeEntry);
    return newTimeEntry;
  } catch (error) {
    console.error('Failed to create time entry:', error);
    return null;
  }
}
```

**Notes:**

*   The `CLOCKIFY_API_KEY` environment variable must be set for this function to work.
*   All requests are automatically sent as `Content-Type: application/json`.
*   Error handling is basic; you might want to add more sophisticated error handling in your application code.

