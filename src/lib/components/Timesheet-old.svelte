<script>
	import { onMount } from 'svelte';
	import { PlusCircle, Trash2 } from 'lucide-svelte';

	const employee = {
		id: '1',
		name: 'Charles Boyce',
		address: '8830 Yardley Ct.\nIndianapolis, IN 46268',
		phone: '(317) 215-5569',
		email: 'chadboyce@gmail.com',
		department: 'Maintenance'
	};

	// interface Employee {
	// 	id: string;
	// 	name: string;
	// 	address: string;
	// 	phone: string;
	// 	email: string;
	// 	department: string;
	// }
	//
	// interface TimeEntry {
	// 	id: string;
	// 	date: string;
	// 	clockIn: string;
	// 	clockOut: string;
	// }

	// let employee: Employee | null = null;
	// let timeEntries: TimeEntry[] = [];
	// let isLoading = true;
	// let error: string | null = null;

	let timeEntries, error;
	let isLoading = false;

	// onMount(async () => {
	// 	try {
	// 		// Simulating API calls - replace these with actual API endpoints
	// 		const employeeResponse = await fetch('/api/employee');
	// 		employee = await employeeResponse.json();

	// 		const timeEntriesResponse = await fetch('/api/timeentries');
	// 		timeEntries = await timeEntriesResponse.json();

	// 		isLoading = false;
	// 	} catch (err) {
	// 		error = 'Failed to fetch data. Please try again later.';
	// 		isLoading = false;
	// 	}
	// });

	function addTimeEntry() {
		const newEntry = {
			id: Date.now().toString(), // Temporary ID, should be replaced with server-generated ID in production
			date: new Date().toISOString().split('T')[0],
			clockIn: '',
			clockOut: ''
		};
		timeEntries = [...timeEntries, newEntry];
	}

	function removeTimeEntry(id) {
		timeEntries = timeEntries.filter((entry) => entry.id !== id);
	}

	function updateTimeEntry(id, field, value) {
		timeEntries = timeEntries.map((entry) =>
			entry.id === id ? { ...entry, [field]: value } : entry
		);
	}
</script>

<div class="container mx-auto space-y-6 p-4">
	<h1 class="mb-4 text-2xl font-bold">Employee Timesheet</h1>

	{#if isLoading}
		<div class="p-4 text-center">Loading...</div>
	{:else if error}
		<div class="p-4 text-center text-red-500">{error}</div>
	{:else if employee}
		<div class="card">
			<div class="card-header">
				<h2 class="card-title">Employee Information</h2>
			</div>
			<div class="card-content">
				<div class="grid grid-cols-1 gap-4 md:grid-cols-2">
					<div><strong>Name:</strong> {employee.name}</div>
					<div><strong>Employee ID:</strong> {employee.id}</div>
					<div><strong>Address:</strong> {employee.address}</div>
					<div><strong>Phone:</strong> {employee.phone}</div>
					<div><strong>Email:</strong> {employee.email}</div>
					<div><strong>Department:</strong> {employee.department}</div>
				</div>
			</div>
		</div>

		<div class="card">
			<div class="card-header">
				<h2 class="card-title">Time Entries</h2>
			</div>
			<div class="card-content">
				<table class="w-full">
					<thead>
						<tr>
							<th>Date</th>
							<th>Clock In</th>
							<th>Clock Out</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{#each timeEntries as entry (entry.id)}
							<tr>
								<td>
									<input
										type="date"
										value={entry.date}
										on:input={(e) => updateTimeEntry(entry.id, 'date', e.currentTarget.value)}
										class="w-full rounded border px-2 py-1"
									/>
								</td>
								<td>
									<input
										type="time"
										value={entry.clockIn}
										on:input={(e) => updateTimeEntry(entry.id, 'clockIn', e.currentTarget.value)}
										class="w-full rounded border px-2 py-1"
									/>
								</td>
								<td>
									<input
										type="time"
										value={entry.clockOut}
										on:input={(e) => updateTimeEntry(entry.id, 'clockOut', e.currentTarget.value)}
										class="w-full rounded border px-2 py-1"
									/>
								</td>
								<td>
									<button
										class="btn btn-destructive btn-sm"
										on:click={() => removeTimeEntry(entry.id)}
									>
										<Trash2 class="h-4 w-4" />
									</button>
								</td>
							</tr>
						{/each}
					</tbody>
				</table>
				<button class="btn mt-4" on:click={addTimeEntry}>
					<PlusCircle class="mr-2 h-4 w-4" /> Add Time Entry
				</button>
			</div>
		</div>

		<button class="btn w-full">Submit Timesheet</button>
	{:else}
		<div class="p-4 text-center">No employee data found.</div>
	{/if}
</div>

<style>
	.card {
		@apply overflow-hidden rounded-lg bg-white shadow;
	}
	.card-header {
		@apply p-4;
	}
	.card-title {
		@apply text-lg font-semibold;
	}
	.card-content {
		@apply p-4;
	}
	.btn {
		@apply inline-flex items-center justify-center rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600;
	}
	.btn-destructive {
		@apply bg-red-500 hover:bg-red-600;
	}
	.btn-sm {
		@apply px-2 py-1 text-sm;
	}
</style>
