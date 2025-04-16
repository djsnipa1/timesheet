# utils.js

## Summary
This file provides utility functions for a Svelte application. It includes a function for conditionally applying CSS class names and a Svelte transition for creating a 'fly and scale' animation effect.

## Purpose
The primary goal is to offer reusable utility functions that enhance the styling and animation capabilities within the Svelte application, promoting code reusability and a consistent user experience.

## Key Components
- cn: A function that combines class names using clsx and tailwind-merge for efficient CSS management.
- flyAndScale: A Svelte transition function that creates a 'fly and scale' animation when elements enter the DOM.

## Dependencies
- clsx: A utility for constructing className strings conditionally.
- tailwind-merge: A utility to merge Tailwind CSS classes, resolving conflicts and removing duplicates.
- svelte/easing: Provides easing functions for Svelte transitions, specifically cubicOut.

## Code Highlights
The `cn` function demonstrates a practical application of functional composition, combining the functionalities of `clsx` and `tailwind-merge` into a single, easy-to-use utility. The `flyAndScale` function showcases how to create custom Svelte transitions using JavaScript and CSS transformations, offering a flexible way to animate elements.

## Detailed Documentation
# src/lib/utils.js

## Summary
This file contains utility functions for a Svelte application, focusing on CSS class management and custom transitions.

## Purpose
The purpose is to provide reusable tools that simplify common tasks like combining CSS classes and creating engaging animations.

## Key Components
*   **cn(...inputs)**: A function to conditionally apply CSS class names. It uses `clsx` to handle conditional class names and `tailwind-merge` to resolve conflicts between Tailwind CSS classes.

    *   **Parameters**: Accepts any number of arguments that `clsx` can handle (strings, objects, arrays).
    *   **Returns**: A string containing the merged and processed class names.
    *   **Example**:

        ```javascript
        import { cn } from '$lib/utils';

        // Basic usage
        const className = cn('bg-blue-500', 'text-white', { 'font-bold': true });
        // Result: 'bg-blue-500 text-white font-bold'
        ```
*   **flyAndScale(node, params = { y: -8, x: 0, start: 0.95, duration: 150 })**: A Svelte transition function that makes an element 'fly' in and scale up as it appears.

    *   **Parameters**:
        *   `node`: The DOM node to which the transition is applied. (Svelte provides this automatically)
        *   `params`: (Optional) An object with the following properties:
            *   `y`: The vertical distance the element flies from (default: -8).
            *   `x`: The horizontal distance the element flies from (default: 0).
            *   `start`: The initial scale of the element (default: 0.95).
            *   `duration`: The duration of the animation in milliseconds (default: 150).
    *   **Returns**: An object with `duration`, `delay`, `css`, and `easing` properties, as expected by Svelte transitions.
    *   **Example**:

        ```svelte
        <!-- Apply the transition to a div -->
        <div transition:flyAndScale={{ y: -20, duration: 300 }}>
            Content to animate
        </div>
        ```

## Dependencies
*   `clsx`: For conditionally joining class names.
*   `tailwind-merge`: For merging Tailwind CSS classes and resolving conflicts.
*   `svelte/easing`: For smooth animation easing (specifically, `cubicOut`).

## Code Highlights
*   The `cn` function efficiently combines class name utilities for cleaner code.
*   The `flyAndScale` function uses `scaleConversion` to map the transition's progress (0 to 1) to the desired `y`, `x`, and `scale` values, creating a smooth animation.
*   The `styleToString` helper function converts a JavaScript style object into a CSS string, which is necessary for Svelte transitions.

## Detailed Documentation

### cn Function
The `cn` function simplifies the process of applying CSS classes conditionally. It leverages `clsx` to handle various input types (strings, objects, arrays) and `tailwind-merge` to resolve any conflicting Tailwind CSS classes, ensuring a consistent and predictable styling outcome.

### flyAndScale Transition
The `flyAndScale` transition provides an elegant way to introduce elements into the DOM with a smooth flying and scaling effect. It calculates the intermediate `y`, `x`, and `scale` values based on the transition's progress, using the `cubicOut` easing function for a natural feel. The `scaleConversion` function is a key part of this, mapping the transition's time (0 to 1) to the desired animation range for each property.

#### Customizing the Transition
You can customize the animation by adjusting the `params` object. For example, you can change the starting position, scale, and duration of the animation to fit your specific design needs.

#### How it Works
The transition function returns an object that Svelte uses to animate the element. The `css` function is called repeatedly during the transition, with `t` representing the progress of the animation (a value between 0 and 1). The function calculates the `y`, `x`, and `scale` values based on `t` and applies them to the element's `transform` style. The `opacity` is also set to `t`, so the element fades in as it flies and scales.
