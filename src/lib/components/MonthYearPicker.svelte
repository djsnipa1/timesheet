<script>
	import { goto } from '$app/navigation';

	let {
		month = $bindable(new Date().getMonth()),
		year = $bindable(new Date().getFullYear()),
		onchange
	} = $props();

	const months = [
		{ name: 'January', short: 'Jan' },
		{ name: 'February', short: 'Feb' },
		{ name: 'March', short: 'Mar' },
		{ name: 'April', short: 'Apr' },
		{ name: 'May', short: 'May' },
		{ name: 'June', short: 'Jun' },
		{ name: 'July', short: 'Jul' },
		{ name: 'August', short: 'Aug' },
		{ name: 'September', short: 'Sep' },
		{ name: 'October', short: 'Oct' },
		{ name: 'November', short: 'Nov' },
		{ name: 'December', short: 'Dec' }
	];

	// Generate year range (current year ± 50 years)
	const currentYear = new Date().getFullYear();
	const years = Array.from({ length: 101 }, (_, i) => currentYear - 50 + i);

	function selectMonth(monthIndex) {
		month = monthIndex;
		onchange?.({ detail: { month, year } });

		// Navigate to the selected month/year route
		// Note: monthIndex is 0-based, but URL uses 1-based month
		const monthForUrl = monthIndex + 1;
		goto(`/${year}/${monthForUrl.toString().padStart(2, '0')}`);
	}

	function handleYearChange(event) {
		year = parseInt(event.target.value);
		onchange?.({ detail: { month, year } });
	}

	function setCurrentMonth() {
		const now = new Date();
		month = now.getMonth();
		year = now.getFullYear();
		onchange?.({ detail: { month, year } });

		// Navigate to current month
		const currentMonth = now.getMonth() + 1;
		goto(`/${year}/${currentMonth.toString().padStart(2, '0')}`);
	}
</script>

<div class="space-y-6 bg-gruvbox-bg-soft">
	<!-- Header with Year Selector -->
	<div
		class="flex flex-col gap-4 bg-gruvbox-bg-soft sm:flex-row sm:items-center sm:justify-between"
	>
		<h3 class="text-lg font-semibold text-gray-900">Select Year & Month</h3>
		<div class="mx-auto block items-center gap-2">
			<label for="year-select" class="text-sm font-medium text-gray-700">Year:</label>
			<select
				id="year-select"
				bind:value={year}
				onchange={handleYearChange}
				class="min-w-[100px] rounded-md border border-gray-300 bg-white px-3 py-2 font-medium text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
			>
				{#each years as yearOption}
					<option value={yearOption}>{yearOption}</option>
				{/each}
			</select>
		</div>
	</div>

	<!-- Month Grid -->
	<div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
		{#each months as monthData, index}
			<button
				onclick={() => selectMonth(index)}
				class="relative min-h-[70px] rounded-lg border-2 p-4 transition-all duration-200 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-gruvbox-blue focus:ring-offset-2 sm:p-4 {month ===
				index
					? 'border-gruvbox-border/50 bg-gruvbox-bg-soft brightness-90 text-gruvbox-orange shadow-sm'
					: 'border-gruvbox-border bg-gruvbox-bg text-gruvbox-aqua hover:border-gruvbox-blue hover:bg-gruvbox-red hover:text-gruvbox-green'}"
			>
				<div class="text-center">
					<div class="text-base font-medium sm:text-sm">{monthData.name}</div>
					<!-- <div class="mt-1 text-sm text-gruvbox-red sm:text-xs">{monthData.name}</div> -->
				</div>

				{#if month === index}
					<div class="absolute right-2 top-2">
						<svg class="h-4 w-4 text-gruvbox-green" fill="currentColor" viewBox="0 0 20 20">
							<path
								fill-rule="evenodd"
								d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
								clip-rule="evenodd"
							/>
						</svg>
					</div>
				{/if}
			</button>
		{/each}
	</div>

	<!-- Quick Actions -->
	<div class="flex justify-center pt-2">
		<button
			onclick={setCurrentMonth}
			class="w-full rounded-md bg-gray-100 px-6 py-3 text-sm text-gray-700 transition-colors hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 sm:w-auto"
		>
			Go to Current Month
		</button>
	</div>
</div>
