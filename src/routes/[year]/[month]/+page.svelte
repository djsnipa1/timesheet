<script>
    import NewTimesheet from '$lib/components/NewTimesheet.svelte';
    export let data;
  
    // Format month name
    const monthName = new Date(data.year, data.month - 1).toLocaleString('default', { month: 'long' });
  </script>
  
  <div class="container px-4 mx-auto">
    <h1 class="mb-4 text-2xl font-bold">Timesheet for {monthName} {data.year}</h1>
    <NewTimesheet year={data.year} month={data.month} />
  </div>