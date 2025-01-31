<script>
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { onMount } from 'svelte';
	import { employeeStore } from '$lib/stores/employeeStore';

	onMount(() => {
		employeeStore.fetchAll();
	});

	$: ({ employee, timeEntries, isLoading, error } = $employeeStore);
</script>

<div
	class="bg-gruvbox-bg text-gruvbox-fg min-h-screen w-full p-2 md:container md:mx-auto md:max-w-2xl"
>
	<h1 class="text-gruvbox-blue mb-4 text-xl font-bold">Employee Timesheet</h1>

	{#if isLoading}
		<div class="p-4 text-center">
			<span class="text-gruvbox-blue">Loading...</span>
		</div>
	{:else if error}
		<div class="bg-gruvbox-red/10 text-gruvbox-red rounded-lg p-4 text-center">
			<span>Error: {error}</span>
		</div>
	{:else}
		<div class="space-y-4">
			<Card.Root class="bg-gruvbox-bg-soft overflow-hidden">
				<Card.Header class="p-3 sm:p-4">
					<Card.Title class="text-gruvbox-purple text-lg">Employee Information</Card.Title>
				</Card.Header>
				<Card.Content class="p-3 sm:p-4">
					<div class="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 sm:gap-4">
						<div>
							<strong class="text-gruvbox-aqua">Name:</strong>
							<span class="ml-2">{employee?.name || ''}</span>
						</div>
						<div>
							<strong class="text-gruvbox-aqua">ID:</strong>
							<span class="ml-2">{employee?.id || ''}</span>
						</div>
						<div>
							<strong class="text-gruvbox-aqua">Address:</strong>
							<span class="ml-2">{employee?.address || ''}</span>
						</div>
						<div>
							<strong class="text-gruvbox-aqua">Phone:</strong>
							<span class="ml-2">{employee?.phone || ''}</span>
						</div>
						<div>
							<strong class="text-gruvbox-aqua">Email:</strong>
							<span class="ml-2">{employee?.email || ''}</span>
						</div>
						<div>
							<strong class="text-gruvbox-aqua">Department:</strong>
							<span class="ml-2">{employee?.department || ''}</span>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="bg-gruvbox-bg-soft overflow-hidden">
				<Card.Header class="p-3 sm:p-4">
					<Card.Title class="text-gruvbox-purple text-lg">Time Entries</Card.Title>
				</Card.Header>
				<Card.Content class="p-3 sm:p-4">
					<div class="space-y-4">
						<div class="bg-gruvbox-bg rounded-lg p-3 sm:p-4">
							<div class="text-gruvbox-blue mb-2 text-base font-semibold sm:text-lg">
								Jan 11, 2000
							</div>
							<Separator class="bg-gruvbox-gray my-2" />
							<div class="space-y-4">
								<div class="space-y-1">
									<span class="text-gruvbox-gray-light block text-sm sm:text-base"
										>Description:</span
									>
									<span></span>
								</div>
								<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
									<div class="space-y-1">
										<span class="text-gruvbox-green block text-sm sm:text-base">Clock In:</span>
										<span></span>
									</div>
									<div class="space-y-1">
										<span class="text-gruvbox-green block text-sm sm:text-base">Clock Out:</span>
										<span></span>
									</div>
								</div>
								<div class="flex justify-between font-medium">
									<span class="text-gruvbox-yellow text-sm sm:text-base">Total Hours:</span>
									<span class="text-gruvbox-fg font-se text-sm sm:text-base">42</span>
								</div>
							</div>
						</div>
					</div>
				</Card.Content>
			</Card.Root>

			<Card.Root class="bg-gruvbox-blue text-gruvbox-bg overflow-hidden">
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
