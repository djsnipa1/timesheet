# api.js

## Summary
This code defines a utility function, `fetchWithAuth`, for making authenticated API requests to a backend server. It handles setting necessary headers, including an API key, and provides basic error handling.

## Purpose
The primary purpose of this code is to simplify and standardize API calls within the application, ensuring that all requests are properly authenticated and that errors are handled consistently. It acts as a wrapper around the standard `fetch` API.

## Key Components
- fetchWithAuth: An asynchronous function that makes API requests with authentication headers. It takes an endpoint and optional request options as parameters.

## Dependencies
- fetch API (built-in to browsers and Node.js)
- import.meta.env (for accessing environment variables)

## Code Highlights
The code utilizes the spread operator (`...`) to merge default headers with user-provided headers, providing flexibility in configuring requests. It also uses `async/await` for cleaner asynchronous code and includes basic error handling by checking the `response.ok` property.

## Detailed Documentation
## `src/lib/api.js`

### Summary
This file contains the `fetchWithAuth` function, which is a wrapper around the standard `fetch` API. It simplifies making authenticated API requests by automatically adding necessary headers, such as the API key, and handling basic error checking.

### Function: `fetchWithAuth`

#### Purpose
The `fetchWithAuth` function is designed to streamline API calls within the application. It ensures that all requests are properly authenticated and that errors are handled consistently.

#### Parameters
*   `endpoint` (string): The API endpoint to which the request is made (e.g., `/users`, `/products`). This will be appended to the `API_BASE_URL`.
*   `options` (object, optional): An object containing request options, such as `method` (e.g., 'GET', 'POST', 'PUT', 'DELETE'), `body`, and any custom `headers`.  Defaults to an empty object.

#### Returns
*   A Promise that resolves to the JSON response from the API if the request is successful.

#### Throws
*   An Error object if the API call fails (i.e., the response status is not ok).

#### Usage

```javascript
import { fetchWithAuth } from './api.js';

async function getData() {
  try {
    const data = await fetchWithAuth('/data', {
      method: 'GET',
      headers: {
        'Custom-Header': 'CustomValue'
      }
    });
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error; // Re-throw to allow calling functions to handle the error as well
  }
}

// Example of a POST request
async function postData(payload) {
    try {
        const response = await fetchWithAuth('/items', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        console.log('Success:', response);
        return response;
    } catch (error) {
        console.error('Error posting data:', error);
        throw error;
    }
}

```

#### Details

1.  **API Base URL:** The `API_BASE_URL` constant defines the base URL for all API requests.  It's assumed this is defined elsewhere (e.g., at the top of the `api.js` file).
2.  **Headers:** The function automatically adds the `X-Api-Key` header using the value from the `VITE_CLOCKIFY_API_KEY` environment variable. It also sets the `Content-Type` to `application/json` by default.  Any headers provided in the `options` parameter will override these defaults.
3.  **Error Handling:** If the API response has a status code that indicates an error (i.e., `response.ok` is false), the function throws an error with a descriptive message.
4. **Environment Variables:** The code relies on `import.meta.env.VITE_CLOCKIFY_API_KEY` to access the API key. Ensure that this environment variable is properly set in your project's `.env` file or environment configuration.

