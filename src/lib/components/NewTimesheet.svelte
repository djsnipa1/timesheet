<script>
	import * as Card from '$lib/components/ui/card';
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
	        return total + (hours * 60) + minutes;
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
	$: filteredEntries = timeEntries?.filter(entry => {
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
	class="w-full min-h-screen p-2 bg-gruvbox-bg text-gruvbox-fg md:container md:mx-auto md:max-w-2xl"
>
	<h1 class="mb-4 text-xl font-bold text-gruvbox-blue">Employee Timesheet</h1>

	{#if isLoading}
		<div class="p-4 text-center">
			<span class="text-gruvbox-blue">Loading...</span>
		</div>
	{:else if error}
		<div class="p-4 text-center rounded-lg bg-gruvbox-red/10 text-gruvbox-red">
			<span>Error: {error}</span>
		</div>
	{:else}
		<div class="space-y-4">
			<Card.Root class="overflow-hidden bg-gruvbox-bg-soft">
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
							<strong class="shrink-0 text-gruvbox-aqua">Address:</strong>
							<div class="ml-2 whitespace-pre-line">{employeeStatic.address || ''}</div>
						</div>
						<div>
							<strong class="text-gruvbox-aqua">Phone:</strong>
							<span class="ml-2">{employeeStatic?.phone || ''}</span>
						</div>
						<div>
							<strong class="text-gruvbox-aqua">Email:</strong>
							<span class="ml-2">{employee?.email || ''}</span>
						</div>
						<!-- <div> -->
							<!-- <strong class="text-gruvbox-aqua">Department:</strong> -->
							<!-- <span class="ml-2">{employeeStatic?.department || ''}</span> -->
						<!-- </div> -->
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden bg-gruvbox-bg-soft">
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
				                                    Clock In: <span class="font-normal text-black">{formatTime(entry.timeInterval?.start)}</span>
				                                </span>
				                            </div>
				                            <div class="space-y-1">
				                                <span class="block text-sm font-semibold text-gruvbox-blue">
				                                    Clock Out: <span class="font-normal text-black">{formatTime(entry.timeInterval?.end)}</span>
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
				                    Total Hours: <span class="font-normal text-black">{calculateTotalDuration(entries)}</span>
				                </div>
				            </div>
				        {/each}
				    </div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="overflow-hidden bg-gruvbox-blue text-gruvbox-bg">
				<Card.Content class="p-3 sm:p-4">
					<div class="flex items-center justify-between">
						<span class="text-base font-semibold sm:text-lg">Total Hours for Week:</span>
						<span class="text-lg font-bold sm:text-xl"></span>
					</div>
				</Card.Content>
			</Card.Root>
		</div>
	{/if}
</div>