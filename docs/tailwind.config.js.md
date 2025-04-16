# tailwind.config.js

## Summary
This file is the Tailwind CSS configuration file. It defines the design system's look and feel, including colors, fonts, spacing, and breakpoints, for the entire project. It also configures dark mode and specifies which files to scan for Tailwind classes.

## Purpose
The primary purpose of this file is to centralize and customize the Tailwind CSS framework. It allows developers to tailor the framework to the specific needs of the project, ensuring a consistent and maintainable design system across all components.

## Key Components
- darkMode: Configures dark mode settings, enabling class-based dark mode.
- content: Specifies the files to be scanned for Tailwind CSS class names, ensuring that only used styles are included in the final CSS bundle.
- safelist: Forces specific class names to be included in the CSS bundle, regardless of whether they are found in the content files.
- theme.container: Configures the default container styles, including centering and padding, and defines screen breakpoints.
- theme.extend.colors: Extends the default Tailwind CSS color palette with custom colors defined using the oklch color format.
- theme.extend.borderRadius: Extends the default border radius scale with custom values.
- theme.extend.fontFamily: Extends the default font family configuration with custom font families, including web fonts.

## Dependencies
- tailwindcss: The core Tailwind CSS framework.
- tailwindcss/defaultTheme: Provides access to the default Tailwind CSS theme values.
- ./src/lib/themes.json: A local JSON file containing theme definitions, likely for light and dark mode.

## Code Highlights
The configuration utilizes the `oklch` color format, which offers a perceptually uniform color space, making color adjustments more predictable. It also uses the `extend` property within the `theme` configuration to add custom styles without overriding the default Tailwind CSS styles. The safelist ensures that the 'dark' class is always included, which is important for dark mode functionality.

## Detailed Documentation
# tailwind.config.js

## Summary
This file configures Tailwind CSS for the project, defining the design system's core aspects like colors, fonts, and breakpoints. It also handles dark mode setup and specifies which files to scan for Tailwind classes.

## Purpose
The main goal is to customize Tailwind CSS to fit the project's specific design needs. This ensures a consistent and maintainable look and feel across all components.

## Key Components
*   **darkMode**: Enables dark mode using class-based activation (e.g., `<body class="dark">`).

    ```javascript
    darkMode: ["class"]
    ```
*   **content**: Specifies which files Tailwind CSS should scan for class names. This is crucial for Tailwind's tree-shaking to remove unused styles.

    ```javascript
    content: ["./src/**/*.{html,js,svelte,ts}"]
    ```

    This example tells Tailwind to look for class names in all `html`, `js`, `svelte`, and `ts` files within the `src` directory and its subdirectories.
*   **safelist**: Forces specific class names to be included in the final CSS, even if Tailwind doesn't find them in the content files. This is useful for dynamic class names or classes added via JavaScript.

    ```javascript
    safelist: ["dark"]
    ```

    Here, the `dark` class is always included, which is essential for dark mode functionality.
*   **theme.container**: Configures the default container styles, centering content and adding padding. It also defines screen breakpoints for responsive design.

    ```javascript
    container: {
        center: true,
        padding: "2rem",
        screens: {
            "2xl": "1400px"
        }
    }
    ```

    This sets up a container that's centered on the page, has `2rem` of padding, and uses a `2xl` breakpoint at `1400px`.
*   **theme.extend.colors**: Extends Tailwind's default color palette with custom colors. The colors are defined using the `oklch` color format.

    ```javascript
    colors: {
        border: "oklch(var(--border))",
        input: "oklch(var(--input))",
        // ... other colors
    }
    ```

    `oklch` provides a perceptually uniform color space, making color adjustments more predictable. The values are likely CSS variables defined elsewhere.
*   **theme.extend.borderRadius**: Extends the default border radius scale with custom values.

    ```javascript
    borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
    }
    ```

    This defines `lg`, `md`, and `sm` border radius sizes based on a CSS variable `--radius`.
*   **theme.extend.fontFamily**: Extends the default font family configuration with custom font families.

    ```javascript
    fontFamily: {
        sans: [...fontFamily.sans],
        se: ["Special Elite", "serif"],
        georama: ["Georama Variable", ...fontFamily.sans]
    }
    ```

    This adds `Special Elite` and `Georama Variable` fonts to the available font families. `fontFamily.sans` is the default sans-serif font from Tailwind.

## Dependencies
*   **tailwindcss**: The core Tailwind CSS framework.
*   **tailwindcss/defaultTheme**: Provides access to the default Tailwind CSS theme values.
*   **./src/lib/themes.json**: A local JSON file containing theme definitions, likely for light and dark mode.

## Code Highlights
*   **OKLCH Color Format**: The use of `oklch` for defining colors is a modern approach, offering better perceptual uniformity compared to traditional color formats like `hex` or `rgb`.
*   **Theme Extension**: The `extend` property is used to add custom styles without overriding Tailwind's defaults, ensuring compatibility and maintainability.
*   **CSS Variables**: The configuration relies heavily on CSS variables (e.g., `var(--border)`), allowing for dynamic theme switching and easier customization.
*   **Safelist for Dark Mode**: The `safelist` ensures that the `dark` class is always included, which is crucial for enabling dark mode functionality.

## Detailed Documentation
This `tailwind.config.js` file is the heart of the project's design system. By customizing the theme, you can control the look and feel of every component. The `content` setting is critical for performance, as it tells Tailwind which files to scan for used classes, allowing it to remove unused styles and reduce the final CSS bundle size. The `extend` property is your friend when you want to add custom styles without clashing with Tailwind's defaults. Remember to use CSS variables for values that might change based on the theme, such as colors and spacing. Finally, always test your changes thoroughly to ensure they work as expected in both light and dark modes.
