# Project Overview

## Project Purpose

This project is a SvelteKit application designed to track and manage employee time entries, likely integrated with the Clockify API. It aims to provide a user-friendly interface for employees to view and manage their time, and for administrators to gain insights into team productivity. The application emphasizes a consistent and customizable user experience through the use of Tailwind CSS and a well-defined UI component library.

## Key Features

*   **Time Entry Management:** Allows users to view and potentially manage their time entries, fetched from the Clockify API.
*   **User Authentication:** Securely authenticates users via API keys to access their data.
*   **Theming Support:** Offers both light and dark themes, customizable through CSS variables.
*   **Reusable UI Components:** Provides a library of pre-styled UI components (buttons, cards, dropdowns, etc.) for a consistent look and feel.
*   **Date-Based Routing:** Organizes and displays data based on year and month, allowing for easy navigation through historical time entries.

## Architecture

The application follows a typical SvelteKit structure, leveraging server-side rendering (SSR) for improved performance and SEO. The frontend, built with Svelte, consumes data from API endpoints defined within the `src/routes/api` directory. These endpoints act as a bridge to the Clockify API, handling authentication and data transformation. The UI is constructed using reusable Svelte components, styled with Tailwind CSS, and organized into a component library for easy reuse and maintainability. The application uses Svelte stores to manage application state, such as employee data and time entries.

## Technical Stack

*   **Frontend Framework:** SvelteKit
*   **UI Library:** Custom component library built with Svelte and Tailwind CSS, leveraging `bits-ui` for some components.
*   **Styling:** Tailwind CSS with custom theme configuration.
*   **API Communication:** `fetch` API (browser and Node.js), `node-fetch` (server-side).
*   **Build Tool:** Vite
*   **Deployment:** Cloudflare
*   **Configuration:** ESLint, Prettier, PostCSS

## Getting Started

1.  **Clone the repository.**
2.  **Install dependencies:** `npm install` or `yarn install` or `pnpm install`.
3.  **Set up environment variables:** Create a `.env` file and add your Clockify API key (`CLOCKIFY_API_KEY`).
4.  **Run the development server:** `npm run dev` or `yarn dev` or `pnpm dev`.
5.  **Open your browser** to the address shown in the console (usually `http://localhost:5173`).

## Project Structure

*   **`src/`:** Contains the main application code.
    *   **`app.html`:** The root HTML document.
    *   **`app.css`:** Global CSS styles, including theme definitions.
    *   **`lib/`:** Reusable modules and components.
        *   **`api/`:** API utility functions (e.g., `timeEntryApi.js`, `api.js`).
        *   **`components/ui/`:** Reusable UI components (buttons, cards, etc.).
        *   **`server/`:** Server-side utility functions (e.g., `api.js`).
        *   **`stores/`:** Svelte stores for managing application state (e.g., `employeeStore.js`).
        *   **`utils.js`:** Utility functions (e.g., `cn` for class name management).
    *   **`routes/`:** SvelteKit routes and API endpoints.
        *   **`+page.server.js`:** Server-side logic for the root page (redirects to current month).
        *   **`api/`:** API endpoints (e.g., `time-entries/+server.js`, `user/+server.js`).
        *   **`[year]/[month]/+page.server.js`:** Server-side logic for date-based routes.
*   **`svelte.config.js`:** SvelteKit configuration file.
*   **`tailwind.config.js`:** Tailwind CSS configuration file.
*   **`vite.config.js`:** Vite configuration file.
*   **`eslint.config.js`:** ESLint configuration file.
*   **`postcss.config.js`:** PostCSS configuration file.
