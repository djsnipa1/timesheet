<!-- <script>
	import NewTimesheet from '../lib/components/NewTimesheet.svelte';
</script>

<NewTimesheet /> -->

<script>
	import MonthYearPicker from '$lib/components/MonthYearPicker.svelte';

	let selectedDate = $state({ month: new Date().getMonth(), year: new Date().getFullYear() });

	function handleDateChange(event) {
		selectedDate = event.detail;
		console.log('Selected:', selectedDate);
	}
</script>

<div class="min-h-screen bg-gray-50 p-4 sm:p-8">
	<div class="mx-auto w-full max-w-lg">
		<!-- <h1 class="mb-6 text-2xl font-bold text-gray-900">Month & Year Picker</h1> -->

		<div class="rounded-lg border bg-white p-4 shadow-sm sm:p-6">
			<MonthYearPicker
				bind:month={selectedDate.month}
				bind:year={selectedDate.year}
				onchange={handleDateChange}
			/>

			<div class="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4">
				<div class="flex items-center gap-2">
					<svg class="h-5 w-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
						/>
					</svg>
					<span class="text-sm font-medium text-blue-900">Selected Date:</span>
				</div>
				<p class="mt-1 text-lg font-semibold text-blue-900">
					{new Date(selectedDate.year, selectedDate.month).toLocaleDateString('en-US', {
						month: 'long',
						year: 'numeric'
					})}
				</p>
			</div>
		</div>
	</div>
</div>
