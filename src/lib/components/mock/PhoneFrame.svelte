<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children,
		label = 'Phone preview',
		class: className = ''
	}: { children: Snippet; label?: string; class?: string } = $props();
</script>

<!-- Decorative product mockup; not real interactive chrome. -->
<div
	role="img"
	aria-label={label}
	class={[
		'relative mx-auto w-full max-w-[19rem] rounded-[2.5rem] border border-black/10 bg-[#23262d] p-2.5 shadow-[0_30px_60px_-25px_rgba(28,32,45,0.55)]',
		className
	]}
>
	<!-- speaker / camera -->
	<div
		class="absolute left-1/2 top-3.5 z-10 flex h-5 -translate-x-1/2 items-center gap-1.5 rounded-full bg-black/85 px-3"
		aria-hidden="true"
	>
		<span class="h-1.5 w-1.5 rounded-full bg-white/25"></span>
		<span class="h-1 w-20 rounded-full bg-white/15"></span>
	</div>
	<div class="flex min-h-[37rem] flex-col overflow-hidden rounded-[2rem] bg-background">
		{@render children()}
	</div>
</div>
