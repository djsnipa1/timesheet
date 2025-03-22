<script>
	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
</script>

<div class="p-4">
<Card.Root>
	<Card.Header class="px-7">
		<Card.Title>Orders</Card.Title>
		<Card.Description>Recent orders from your store.</Card.Description>
	</Card.Header>
	<Card.Content>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[40%] text-center border-r">Date</Table.Head>
					<Table.Head class="w-[20%] text-center border-r">Clock In</Table.Head>
					<Table.Head class="w-[20%] text-center border-r">Clock Out</Table.Head>
					<Table.Head class="w-[20%] text-center">Total Hours</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				<Table.Row class="bg-muted">
					<Table.Cell class="border-r">
						<div class="text-lg font-semibold">March 4, 2025</div>
						<div class="text-xs text-muted-foreground md:inline">Picked up sticks at 8830 & 8840</div>
					</Table.Cell>
					<Table.Cell class="table-cell border-r whitespace-nowrap">10:05 AM</Table.Cell>
					<Table.Cell class="table-cell border-r whitespace-nowrap">12:00 PM</Table.Cell>
					<Table.Cell class="text-right whitespace-nowrap">8.25 hours</Table.Cell>
				</Table.Row>
				<Table.Row class="bg-card">
					<Table.Cell class="border-r">
						<div class="font-medium">March 4, 2025</div>
						<div class="text-xs text-muted-foreground md:inline">Picked up sticks at 8830 & 8840</div>
					</Table.Cell>
					<Table.Cell class="table-cell border-r">10:05 AM</Table.Cell>
					<Table.Cell class="table-cell border-r">12:00 PM</Table.Cell>
					<Table.Cell class="text-right">8.25 hours</Table.Cell>

				</Table.Row>

			</Table.Body>
		</Table.Root>
	</Card.Content>
</Card.Root>
</div>