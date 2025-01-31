<script>
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';

	const employee = {
		id: '1',
		name: 'Charles Boyce',
		address: '8830 Yardley Ct.\nIndianapolis, IN 46268',
		phone: '(317) 215-5569',
		email: 'chadboyce@gmail.com',
		department: 'Maintenance'
	};

	let timeEntries = [];
	let isLoading = true;
	let error = null;

	$: totalHours = 0;

	onMount(async () => {
		try {
			const response = await fetch('/api/user');
			if (!response.ok) throw new Error('Failed to fetch user data');
			employee = await response.json();
			isLoading = false;
		} catch (err) {
			error = err.message;
			isLoading = false;
		}
	});
</script>

<div class="container mx-auto max-w-2xl space-y-4 p-2">
	<h1 class="mb-2 text-xl font-bold">Employee Timesheet</h1>

	<Card.Root class="overflow-hidden">
		<Card.Header class="p-2">
			<Card.Title class="text-lg">Employee Information</Card.Title>
		</Card.Header>
		<Card.Content class="p-2">
			<div class="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
				<div>
					<strong>Name:</strong>
					{employee.name}
				</div>
				<div>
					<strong>ID:</strong>
					{employee.id}
				</div>
				<div>
					<strong>Address:</strong>
					{employee.address}
				</div>
				<div>
					<strong>Phone:</strong>
					{employee.phone}
				</div>
				<div>
					<strong>Email:</strong>
					{employee.email}
				</div>
				<div>
					<strong>Department:</strong>
					{employee.department}
				</div>
			</div>
		</Card.Content>
	</Card.Root>

		<Card.Root class="overflow-hidden">
			<Card.Header class="p-2">
				<Card.Title class="text-lg">Time Entries</Card.Title>
			</Card.Header>
			<Card.Content class="p-2">
				<div class="space-y-4">
					{#each timeEntries as entry (entry.id)}
					{/each}
				</div>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
