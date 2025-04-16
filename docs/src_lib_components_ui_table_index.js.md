# index.js

## Summary
This file serves as a central export point for all table-related components in the ui library. It exports individual components like `Root`, `Body`, `Caption`, `Cell`, `Footer`, `Head`, `Header`, and `Row`, and also exports them with `Table` prefixes for convenience.

## Purpose
The primary purpose of this file is to simplify the import process for developers using the table components. Instead of importing each component from its specific file, developers can import all table components from this single `index.js` file.

## Key Components
- Root: The main table component.
- Body: The table body component.
- Caption: The table caption component.
- Cell: The table cell component.
- Footer: The table footer component.
- Head: The table head component.
- Header: The table header component.
- Row: The table row component.

## Dependencies
- table.svelte
- table-body.svelte
- table-caption.svelte
- table-cell.svelte
- table-footer.svelte
- table-head.svelte
- table-header.svelte
- table-row.svelte

## Code Highlights
The file utilizes a simple export strategy to expose all table components. It also uses aliasing to provide more descriptive names for the components (e.g., `Root as Table`). This approach enhances code readability and developer experience.

## Detailed Documentation
# src\lib\components\ui\table\index.js

## Summary
This file is the main entry point for all table components. It exports each individual component and also provides aliases for more intuitive naming.

## Purpose
The purpose of this file is to aggregate and export all table-related components, making them easily accessible from a single import.

## Key Components
*   **Root**: The main `Table` component.
*   **Body**: The `TableBody` component.
*   **Caption**: The `TableCaption` component.
*   **Cell**: The `TableCell` component.
*   **Footer**: The `TableFooter` component.
*   **Head**: The `TableHead` component.
*   **Header**: The `TableHeader` component.
*   **Row**: The `TableRow` component.

## Dependencies
Each component listed above has a corresponding `.svelte` file dependency.

## Code Highlights
This file uses named exports and aliasing to provide a flexible and intuitive API for importing table components.

## Detailed Documentation
This file exports the following components:

*   `Root` (also exported as `Table`): The root table component. Use this as the main wrapper for your tables.
*   `Body` (also exported as `TableBody`): The body section of the table, containing the main data rows.
*   `Caption` (also exported as `TableCaption`):  The table caption, providing a title or description for the table.
*   `Cell` (also exported as `TableCell`):  An individual cell within a table row.
*   `Footer` (also exported as `TableFooter`): The footer section of the table, often used for summaries or additional information.
*   `Head` (also exported as `TableHead`): The head section of the table, containing the column headers.
*   `Header` (also exported as `TableHeader`): An individual header cell within the table head.
*   `Row` (also exported as `TableRow`): A row within the table.

**Usage Example:**

```javascript
import { Table, TableBody, TableHeader, TableRow, TableCell } from '$lib/components/ui/table';

// Example Svelte component

<Table>
    <TableHeader>
        <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Age</TableHeader>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow>
            <TableCell>John Doe</TableCell>
            <TableCell>30</TableCell>
        </TableRow>
        <TableRow>
            <TableCell>Jane Smith</TableCell>
            <TableCell>25</TableCell>
        </TableRow>
    </TableBody>
</Table>
```
