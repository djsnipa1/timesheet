<script>
	import * as Card from '$lib/components/ui/card';
	import * as Table from '$lib/components/ui/table/index.js';
	import { Separator } from '$lib/components/ui/separator';
	import { onMount } from 'svelte';
	import { employeeStore } from '$lib/stores/employeeStore';
	import employeeData from '$lib/data/employee.json';

	const employeeStatic = employeeData.employee;

	// Add props
	export let year;
	export let month;

	// Helper functions for date/time formatting
	const formatDateOld = (date) => {
		if (!date) return '';
		try {
			const parsedDate = new Date(date);
			if (isNaN(parsedDate.getTime())) {
				return 'Invalid Date';
			}
			return parsedDate.toLocaleDateString('en-US', {
				month: 'numeric',
				day: 'numeric',
				year: 'numeric'
			});
		} catch (error) {
			console.error('Error formatting date:', error);
			return 'Invalid Date';
		}
	};

	const formatDate = (date) => {
		return new Date(date).toLocaleDateString('en-US', {
			month: 'long',
			day: 'numeric',
			year: 'numeric'
		});
	};

	const formatTime = (date) => {
		return new Date(date).toLocaleTimeString('en-US', {
			hour: '2-digit',
			minute: '2-digit'
		});
	};

	const calculateDuration = (duration) => {
		// Parse PT2H45M format
		const hours = duration.match(/(\d+)H/)?.[1] || 0;
		const minutes = duration.match(/(\d+)M/)?.[1] || 0;
		return `${hours}h ${minutes}m`;
	};

	const calculateTotalDuration = (entries) => {
		const totalMinutes = entries.reduce((total, entry) => {
			const hours = parseInt(entry.timeInterval.duration.match(/(\d+)H/)?.[1] || 0);
			const minutes = parseInt(entry.timeInterval.duration.match(/(\d+)M/)?.[1] || 0);
			return total + hours * 60 + minutes;
		}, 0);

		const hours = Math.floor(totalMinutes / 60);
		const minutes = totalMinutes % 60;
		return `${hours}h ${minutes}m`;
	};

	onMount(() => {
		employeeStore.fetchAll();
	});

	$: ({ employee, timeEntries, isLoading, error } = $employeeStore);
	$: console.log('Store Data:', {
		employee,
		timeEntries,
		isLoading,
		error
	});

	$: console.log('Time Entries before loop:', timeEntries);
	$: console.log('Debug Info:', {
		isStoreEmpty: !$employeeStore,
		isTimeEntriesArray: Array.isArray(timeEntries),
		timeEntriesLength: timeEntries?.length,
		timeEntriesData: timeEntries,
		storeState: $employeeStore
	});

	$: console.log('Debug Info:', {
		timeEntriesArray: Array.isArray(timeEntries),
		firstEntry: timeEntries?.[0],
		timeEntriesCount: timeEntries?.length
	});

	// Filter time entries for the selected month
	$: filteredEntries =
		timeEntries?.filter((entry) => {
			const entryDate = new Date(entry.timeInterval.start);
			return entryDate.getFullYear() === year && entryDate.getMonth() === month - 1;
		}) ?? [];

	// Add this function to group entries by date
	const groupEntriesByDate = (entries) => {
		return entries.reduce((acc, entry) => {
			const date = formatDate(entry.timeInterval.start);
			if (!acc[date]) {
				acc[date] = [];
			}
			acc[date].push(entry);
			return acc;
		}, {});
	};

	// Modify the filtered entries to be grouped
	$: groupedFilteredEntries = groupEntriesByDate(filteredEntries);
</script>

<div
	class="w-full min-h-screen p-2 bg-background text-foreground md:container md:mx-auto md:max-w-2xl"
>
	<div class="flex items-center justify-around mb-4">
		<h1 class="text-2xl font-bold text-center font-georama text-foreground">
			Employee Time Sheet
			<span class="hidden mx-4 text-3xl sm:block">&#x221e;</span>
			{new Date(year, month - 1).toLocaleString('default', { month: 'long', year: 'numeric' })}
		</h1>
	</div>

	{#if isLoading}
		<div class="p-4 text-center bg-muted text-muted-foreground">
			<span class="font-georama">Loading...</span>
		</div>
	{:else if error}
		<div class="p-4 text-center rounded-lg bg-secondary text-secondary-foreground">
			<span>Error: {error}</span>
		</div>
	{:else}
		<div class="space-y-4">
			<Card.Root class="overflow-hidden border-card-foreground bg-card">
				<Card.Header class="p-3 sm:p-4">
					<Card.Title class="text-lg text-gruvbox-purple">Employee Information</Card.Title>
				</Card.Header>
				<Card.Content class="p-3 sm:p-4">
					<div class="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 sm:gap-4">
						<div>
							<strong class="text-gruvbox-aqua">Name:</strong>
							<span class="ml-2">{employeeStatic?.name || ''}</span>
						</div>
						<!-- <div>
							<strong class="text-gruvbox-aqua">ID:</strong>
							<span class="ml-2">{employee?.id || ''}</span>
						</div> -->
						<div class="flex">
							<strong class="text-gruvbox-aqua shrink-0">Address:</strong>
							<div class="ml-2 whitespace-pre-line">{employeeStatic.address || ''}</div>
						</div>
						<div>
							<strong class="text-gruvbox-aqua">Phone:</strong>
							<span class="ml-2">{employeeStatic?.phone || ''}</span>
						</div>
						<div>
							<strong class="text-gruvbox-aqua">Email:</strong>
							<span class="ml-2">{employeeStatic.email || ''}</span>
						</div>
						<!-- <div> -->
						<!-- <strong class="text-gruvbox-aqua">Department:</strong> -->
						<!-- <span class="ml-2">{employeeStatic?.department || ''}</span> -->
						<!-- </div> -->
					</div>
				</Card.Content>
			</Card.Root>

			<!-- <Card.Root class="overflow-hidden bg-gruvbox-bg-soft">
				<Card.Header class="p-3 sm:p-4">
					<Card.Title class="text-lg text-gruvbox-purple">Time Entries</Card.Title>
				</Card.Header>
				<Card.Content class="p-3 sm:p-4">
					<div class="space-y-4">
						{#each Object.entries(groupedFilteredEntries) as [date, entries] (date)}
							<div class="p-3 rounded-lg bg-gruvbox-bg sm:p-4">
								<div class="mb-2 text-base font-semibold text-black sm:text-lg">
									{date}
								</div>
								<Separator class="my-2 bg-gruvbox-gray" />
								{#each entries as entry}
									<div class="mb-4">
										<div class="mb-2 text-base font-semibold text-gruvbox-blue sm:text-sm">
											Description: <span class="font-normal text-black">{entry.description}</span>
										</div>
										<div class="grid grid-cols-1 gap-1 sm:grid-cols-2">
											<div class="space-y-1">
												<span class="block text-sm font-semibold text-gruvbox-blue">
													Clock In: <span class="font-normal text-black"
														>{formatTime(entry.timeInterval?.start)}</span
													>
												</span>
											</div>
											<div class="space-y-1">
												<span class="block text-sm font-semibold text-gruvbox-blue">
													Clock Out: <span class="font-normal text-black"
														>{formatTime(entry.timeInterval?.end)}</span
													>
												</span>
											</div>
										</div>
										{#if entry !== entries[entries.length - 1]}
											<Separator class="my-2 bg-gruvbox-gray" />
										{/if}
									</div>
								{/each}
								<Separator class="my-2 bg-gruvbox-blue" />
								<div class="mb-2 text-sm font-semibold text-gruvbox-blue">
									Total Hours: <span class="font-normal text-black"
										>{calculateTotalDuration(entries)}</span
									>
								</div>
							</div>
						{/each}
					</div>
				</Card.Content>
			</Card.Root> -->

			<!-- <Card.Root class="overflow-hidden bg-gruvbox-blue text-gruvbox-bg">
				<Card.Content class="p-3 sm:p-4">
					<div class="flex items-center justify-between">
						<span class="text-base font-semibold sm:text-lg">Total Hours for Week:</span>
						<span class="text-lg font-bold sm:text-xl"></span>
					</div>
				</Card.Content>
			</Card.Root> -->
		</div>
	{/if}

	<!-- table starts here -->
	<Card.Root>
		<!-- <Card.Header class="px-7">
				<Card.Title>Orders</Card.Title>
				<Card.Description>Recent orders from your store.</Card.Description>
			</Card.Header> -->
<Card.Root class="overflow-hidden bg-gruvbox-blue text-gruvbox-bg">
				<Card.Content class="p-3 sm:p-4">
					<div class="flex items-center justify-between">
						<span class="text-base font-semibold sm:text-lg">Total Hours for Week:</span>
						<span class="text-lg font-bold sm:text-xl"></span>
					</div>
				</Card.Content>
			</Card.Root>

		<Card.Content>
			<!-- Desktop Table (hidden below sm breakpoint) -->
			<div class="hidden sm:block">
				<Table.Root class="font-georama">
					<Table.Header>
						<Table.Row>
							<Table.Head class="w-[35%] border-r p-2 sm:p-4 text-center text-xs sm:text-base">
								Date
							</Table.Head>
							<Table.Head class="w-[22%] border-r p-2 sm:p-4 text-center text-xs sm:text-base">
								Clock In
							</Table.Head>
							<Table.Head class="w-[22%] border-r p-2 sm:p-4 text-center text-xs sm:text-base">
								Clock Out
							</Table.Head>
							<Table.Head class="w-[21%] p-2 text-center text-xs sm:text-base">
								Hours
							</Table.Head>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each Object.entries(groupedFilteredEntries) as [date, entries] (date)}
							{#each entries as entry}
								<Table.Row class="min-h-[3rem] sm:min-h-[4rem] odd:bg-card even:bg-muted">
									<Table.Cell class="p-2 border-r sm:p-4">
										<div class="text-sm font-normal tracking-tight sm:text-lg">{date}</div>
										<div class="text-[10px] sm:text-xs tracking-tight text-muted-foreground">
											{entry.description}
										</div>
									</Table.Cell>
									<Table.Cell class="p-2 text-xs tracking-wider text-center border-r sm:p-4 sm:text-base whitespace-nowrap">
										{formatTime(entry.timeInterval?.start)}
									</Table.Cell>
									<Table.Cell class="p-2 text-xs tracking-wider text-center border-r sm:p-4 sm:text-base whitespace-nowrap">
										{formatTime(entry.timeInterval?.end)}
									</Table.Cell>
									<Table.Cell class="p-2 text-xs tracking-wider text-center sm:p-4 sm:text-base whitespace-nowrap">
										{calculateDuration(entry.timeInterval.duration)}
									</Table.Cell>
								</Table.Row>
							{/each}
						{/each}
					</Table.Body>
				</Table.Root>
			</div>

			<!-- Mobile Cards (hidden above sm breakpoint) -->
			<div class="space-y-4 sm:hidden">
				{#each Object.entries(groupedFilteredEntries) as [date, entries] (date)}
					{#each entries as entry}
						<Card.Root class="overflow-hidden bg-card">
							<Card.Content class="p-4">
								<div class="space-y-2">
									<div class="text-base font-semibold">{date}</div>
									<div class="text-xs text-muted-foreground">{entry.description}</div>
									
									<div class="grid grid-cols-2 gap-2 pt-2">
										<div>
											<div class="text-xs text-muted-foreground">Clock In</div>
											<div class="text-sm">{formatTime(entry.timeInterval?.start)}</div>
										</div>
										<div>
											<div class="text-xs text-muted-foreground">Clock Out</div>
											<div class="text-sm">{formatTime(entry.timeInterval?.end)}</div>
										</div>
									</div>
									
									<div class="pt-2">
										<div class="text-xs text-muted-foreground">Total Hours</div>
										<div class="text-sm font-medium">
											{calculateDuration(entry.timeInterval.duration)}
										</div>
									</div>
								</div>
							</Card.Content>
						</Card.Root>
					{/each}
				{/each}
			</div>
		</Card.Content>
	</Card.Root>
</div>
