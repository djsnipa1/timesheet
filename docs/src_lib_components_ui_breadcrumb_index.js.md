# index.js

## Summary
This code serves as the main entry point for the Breadcrumb component in a Svelte application. It imports and re-exports all the sub-components that make up the Breadcrumb, providing a single module to import for easy use.

## Purpose
The primary purpose of this code is to aggregate and expose all the individual parts of the Breadcrumb component. This simplifies importing and using the Breadcrumb and its related elements throughout the application.

## Key Components
- Root: The main Breadcrumb container component.
- Ellipsis: A component to represent collapsed or hidden breadcrumb items.
- Item: A single breadcrumb item.
- Separator: The visual separator between breadcrumb items.
- Link: A breadcrumb item that is a clickable link.
- List: A component to render the list of breadcrumb items.
- Page: A breadcrumb item representing the current page.

## Dependencies
- svelte

## Code Highlights
This code utilizes Svelte components and the module pattern to export related components under a single namespace. It also uses aliasing to provide more descriptive names for the components when they are imported.

## Detailed Documentation
This module exports several Svelte components that, when used together, create a fully functional Breadcrumb navigation element. Each component serves a specific role in the overall structure and appearance of the Breadcrumb.

**Usage:**

To use the Breadcrumb, import the desired components from this module:

```javascript
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from './breadcrumb/index.js';
```

Then, use the components in your Svelte template:

```svelte
<Breadcrumb>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink href="/products">Products</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    Current Product
  </BreadcrumbItem>
</Breadcrumb>
```

**Components:**

*   `Root` (aliased as `Breadcrumb`): The main container for the breadcrumb.
*   `Ellipsis` (aliased as `BreadcrumbEllipsis`): Used to indicate that some breadcrumb items have been collapsed.
*   `Item` (aliased as `BreadcrumbItem`): Represents a single item in the breadcrumb.
*   `Separator` (aliased as `BreadcrumbSeparator`): The visual divider between items (e.g., '>').
*   `Link` (aliased as `BreadcrumbLink`): A breadcrumb item that navigates to a new page.
*   `List` (aliased as `BreadcrumbList`): Renders the list of breadcrumb items.
*   `Page` (aliased as `BreadcrumbPage`): Represents the current page in the breadcrumb.
