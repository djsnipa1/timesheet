<script>
	import * as Card from '$lib/components/ui/card';
	import { Separator } from '$lib/components/ui/separator';
	import { onMount } from 'svelte';
	import { employeeStore } from '$lib/stores/employeeStore';

	const employeeStatic = {
		id: '1',
		name: 'Charles Boyce',
		address: '8830 Yardley Ct.\nIndianapolis, IN 46268',
		phone: '(317) 215-5569',
		email: 'chadboyce@gmail.com',
		department: 'Maintenance'
	};

	onMount(() => {
		employeeStore.fetchAll();
	});

	$: ({ employee, timeEntries, isLoading, error } = $employeeStore);
</script>

<div
	class="min-h-screen w-full bg-gruvbox-bg p-2 text-gruvbox-fg md:container md:mx-auto md:max-w-2xl"
>
	<h1 class="mb-4 text-xl font-bold text-gruvbox-blue">Employee Timesheet</h1>

	{#if isLoading}
		<div class="p-4 text-center">
			<span class="text-gruvbox-blue">Loading...</span>
		</div>
	{:else if error}
		<div class="rounded-lg bg-gruvbox-red/10 p-4 text-center text-gruvbox-red">
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
							<span class="ml-2">{employee?.name || ''}</span>
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

			<Card.Root class="overflow-hidden bg-gruvbox-bg-soft">
				<Card.Header class="p-3 sm:p-4">
					<Card.Title class="text-lg text-gruvbox-purple">Time Entries</Card.Title>
				</Card.Header>
				<Card.Content class="p-3 sm:p-4">
					<div class="space-y-4">
						<div class="rounded-lg bg-gruvbox-bg p-3 sm:p-4">
							<div class="mb-2 text-base font-semibold text-gruvbox-blue sm:text-lg">
								Jan 11, 2000
							</div>
							<Separator class="my-2 bg-gruvbox-gray" />
							<div class="space-y-4">
								<div class="space-y-1">
									<span class="block text-sm text-gruvbox-gray-light sm:text-base"
										>Description:</span
									>
									<span></span>
								</div>
								<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
									<div class="space-y-1">
										<span class="block text-sm text-gruvbox-green sm:text-base">Clock In:</span>
										<span></span>
									</div>
									<div class="space-y-1">
										<span class="block text-sm text-gruvbox-green sm:text-base">Clock Out:</span>
										<span></span>
									</div>
								</div>
								<div class="flex justify-between font-medium">
									<span class="text-sm text-gruvbox-yellow sm:text-base">Total Hours:</span>
									<span class="font-se text-sm text-gruvbox-fg sm:text-base">42</span>
								</div>
							</div>
						</div>
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
