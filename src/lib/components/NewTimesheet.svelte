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
	// Add this function to group entries by date and sort them
	const groupEntriesByDate = (entries) => {
		// First sort the entries by date
		const sortedEntries = [...entries].sort(
			(a, b) => new Date(a.timeInterval.start) - new Date(b.timeInterval.start)
		);

		// Then group them
		return sortedEntries.reduce((acc, entry) => {
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
	class="min-h-screen w-full bg-gruvbox-bg p-2 text-gruvbox-fg md:container md:mx-auto md:max-w-2xl"
>
	<div class="mb-4 flex items-center justify-around">
		<h1
			class="text-center font-georama text-2xl font-bold text-gruvbox-fg md:flex md:items-center md:justify-center"
		>
			<span class="md:mr-2">Employee Time Sheet</span>
			<br class="md:hidden" />
			<span class="hidden md:inline">-&nbsp;</span>
			<span class="md:flex-grow md:text-left"
				>{new Date(year, month - 1).toLocaleString('default', {
					month: 'long',
					year: 'numeric'
				})}</span
			>
		</h1>
	</div>
	{#if isLoading}
		<div class="bg-muted p-4 text-center text-muted-foreground">
			<span class="font-georama">Loading...</span>
		</div>
	{:else if error}
		<div class="rounded-lg bg-secondary p-4 text-center text-secondary-foreground">
			<span>Error: {error}</span>
		</div>
	{:else}
		<div class="space-y-4 pb-4">
			<Card.Root class="overflow-hidden border border-gruvbox-border bg-gruvbox-bg-soft">
				<Card.Header class="p-3 pb-0 sm:p-4">
					<Card.Title class="text-lg text-gruvbox-accent">Employee Information</Card.Title>
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
							<strong class="shrink-0 text-gruvbox-aqua">Address:</strong>
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
	<Card.Root class="bg-gruvbox-bg">
		<Card.Header class="p-3">
			<Card.Title class="text-xl font-bold text-gruvbox-fg">Hours Worked</Card.Title>
			<div class="my-2 border-b border-gruvbox-gray opacity-80"></div>
		</Card.Header>

		<Card.Content>
			<!-- Desktop Table (hidden below sm breakpoint) -->
			<div class="hidden sm:block">
				<Table.Root class="border border-gruvbox-border bg-gruvbox-bg font-georama">
					<Table.Header>
						<Table.Row class="bg-gruvbox-bg-soft">
							<Table.Head
								class="w-[35%] border-r border-gruvbox-border p-2 text-center text-xs font-bold text-gruvbox-fg sm:p-4 sm:text-base"
							>
								Date
							</Table.Head>
							<Table.Head
								class="w-[22%] border-r border-gruvbox-border p-2 text-center text-xs font-bold text-gruvbox-fg sm:p-4 sm:text-base"
							>
								Clock In
							</Table.Head>
							<Table.Head
								class="w-[22%] border-r border-gruvbox-border p-2 text-center text-xs font-bold text-gruvbox-fg sm:p-4 sm:text-base"
							>
								Clock Out
							</Table.Head>
							<Table.Head
								class="w-[21%] p-2 text-center text-xs font-bold text-gruvbox-fg sm:p-4 sm:text-base"
								>Hours</Table.Head
							>
						</Table.Row>
					</Table.Header>
					<Table.Body>
						{#each Object.entries(groupedFilteredEntries) as [date, entries] (date)}
							{#each entries as entry}
								<Table.Row
									class="min-h-[3rem] odd:bg-gruvbox-bg even:bg-gruvbox-bg-soft sm:min-h-[4rem]"
								>
									<Table.Cell class="border-r border-gruvbox-border p-2 sm:p-4">
										<div class="text-sm font-normal tracking-tight text-gruvbox-fg sm:text-lg">
											{date}
										</div>
										<div class="text-[10px] tracking-tight text-gruvbox-gray sm:text-xs">
											{entry.description}
										</div>
									</Table.Cell>
									<Table.Cell
										class="whitespace-nowrap border-r border-gruvbox-border p-2 text-center text-xs tracking-wider text-gruvbox-fg sm:p-4 sm:text-base"
									>
										{formatTime(entry.timeInterval?.start)}
									</Table.Cell>
									<Table.Cell
										class="whitespace-nowrap border-r border-gruvbox-border p-2 text-center text-xs tracking-wider text-gruvbox-fg sm:p-4 sm:text-base"
									>
										{formatTime(entry.timeInterval?.end)}
									</Table.Cell>
									<Table.Cell
										class="whitespace-nowrap p-2 text-center text-xs tracking-wider text-gruvbox-fg sm:p-4 sm:text-base"
									>
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
						<Card.Root class="overflow-hidden border border-gruvbox-border bg-gruvbox-bg-soft">
							<Card.Content class="p-4">
								<div class="space-y-2">
									<div class="text-base font-semibold text-gruvbox-fg">{date}</div>
									<div class="text-xs text-gruvbox-gray">{entry.description}</div>

									<div class="grid grid-cols-2 gap-2 pt-2">
										<div>
											<div class="text-xs text-gruvbox-gray">Clock In</div>
											<div class="text-sm text-gruvbox-fg">
												{formatTime(entry.timeInterval?.start)}
											</div>
										</div>
										<div>
											<div class="text-xs text-gruvbox-gray">Clock Out</div>
											<div class="text-sm text-gruvbox-fg">
												{formatTime(entry.timeInterval?.end)}
											</div>
										</div>
									</div>

									<div class="pt-2">
										<div class="text-xs text-gruvbox-gray">Total Hours</div>
										<div class="text-sm font-medium text-gruvbox-fg">
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

	<!-- Total Hours Summary Card -->
	<Card.Root class="mt-4 overflow-hidden border border-gruvbox-border bg-gruvbox-bg-soft">
		<Card.Content class="p-4">
			<div class="flex items-center justify-between">
				<span class="text-lg font-semibold text-gruvbox-accent">Total Hours for Month:</span>
				<span class="text-xl font-bold text-gruvbox-aqua"
					>{calculateTotalDuration(filteredEntries)}</span
				>
			</div>
		</Card.Content>
	</Card.Root>
</div>
