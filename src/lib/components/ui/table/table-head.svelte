<script>
	import { cn } from "$lib/utils.js";
	let className = undefined;
	export { className as class };
</script>

<th
	class={cn(
		"text-muted-foreground h-10 px-4 text-left align-middle text-sm font-light tracking-wider [&:has([role=checkbox])]:pr-0",
		className
	)}
	{...$$restProps}
>
	<slot />
</th>
