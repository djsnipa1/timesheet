# index.js

## Summary
This file serves as a central module for exporting all the components related to the dropdown menu in the application. It imports individual components and primitives from 'bits-ui' and re-exports them under both their original names and more descriptive `DropdownMenu`-prefixed names for easier use throughout the project.

## Purpose
The primary purpose of this file is to aggregate and provide a single point of access for all dropdown menu-related components. This simplifies importing and using these components in other parts of the application, promoting code organization and discoverability.

## Key Components
- DropdownMenuPrimitive: Provides the base functionality for dropdown menus from the 'bits-ui' library.
- Item: Represents a standard item within the dropdown menu.
- Label: Represents a label within the dropdown menu, often used to group related items.
- Content: The container for the dropdown menu items, appearing when the menu is opened.
- Shortcut: Displays a keyboard shortcut associated with a dropdown menu item.
- RadioItem: Represents a radio button item within the dropdown menu.
- Separator: A visual separator to divide sections within the dropdown menu.
- RadioGroup: A group of radio items, ensuring only one item can be selected at a time.
- SubContent: The content area for a submenu within the dropdown menu.
- SubTrigger: The element that triggers the display of a submenu.
- CheckboxItem: Represents a checkbox item within the dropdown menu.
- Root: The main dropdown menu container.
- Trigger: The element that triggers the dropdown menu to open.
- Group: A group of related items within the dropdown menu.

## Dependencies
- bits-ui: A UI library providing the foundational dropdown menu primitives.
- ./dropdown-menu-item.svelte
- ./dropdown-menu-label.svelte
- ./dropdown-menu-content.svelte
- ./dropdown-menu-shortcut.svelte
- ./dropdown-menu-radio-item.svelte
- ./dropdown-menu-separator.svelte
- ./dropdown-menu-radio-group.svelte
- ./dropdown-menu-sub-content.svelte
- ./dropdown-menu-sub-trigger.svelte
- ./dropdown-menu-checkbox-item.svelte

## Code Highlights
The file utilizes a simple aggregation and re-export pattern. It imports specific components and primitives and then re-exports them with more descriptive names (e.g., `Root` as `DropdownMenu`) to improve code readability and maintainability. This approach avoids deeply nested imports in other modules and provides a clear, consistent API for using the dropdown menu components.

## Detailed Documentation
This module exports a set of components for creating dropdown menus. It leverages components from the `bits-ui` library and Svelte components to provide a flexible and customizable dropdown menu system.

**Usage:**

To use the dropdown menu components, import them from this module:

```javascript
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuShortcut,
} from './path/to/this/file';
```

**Example:**

Here's a basic example of how to use the components:

```svelte
<DropdownMenu>
  <DropdownMenuTrigger>Open Menu</DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Profile</DropdownMenuItem>
    <DropdownMenuItem>Settings</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Logout</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Components:**

*   `DropdownMenu`: The root component for the dropdown menu.
*   `DropdownMenuTrigger`: The trigger element that opens the dropdown menu.
*   `DropdownMenuContent`: The container for the dropdown menu items.
*   `DropdownMenuItem`: A standard item in the dropdown menu.
*   `DropdownMenuLabel`: A label for grouping items in the dropdown menu.
*   `DropdownMenuSeparator`: A visual separator between items.
*   `DropdownMenuRadioGroup`: A group of radio button items.
*   `DropdownMenuRadioItem`: A radio button item.
*   `DropdownMenuCheckboxItem`: A checkbox item.
*   `DropdownMenuSub`: The root component for a submenu.
*   `DropdownMenuSubTrigger`: The trigger element for a submenu.
*   `DropdownMenuSubContent`: The content container for a submenu.
    * `DropdownMenuShortcut`: Displays a keyboard shortcut associated with a dropdown menu item.

Each component can be further customized with attributes and styling as needed. Refer to the `bits-ui` documentation for more details on the underlying primitives.
