<script lang="ts">
	import { Plus, Search } from '@lucide/svelte';

	type StatusKey = 'drop' | 'progress' | 'ready' | 'done';

	const status: Record<StatusKey, { label: string; fg: string; soft: string }> = {
		drop: { label: 'Dropped off', fg: 'var(--status-drop)', soft: 'var(--status-drop-soft)' },
		progress: { label: 'In progress', fg: 'var(--status-progress)', soft: 'var(--status-progress-soft)' },
		ready: { label: 'Ready', fg: 'var(--status-ready)', soft: 'var(--status-ready-soft)' },
		done: { label: 'Picked up', fg: 'var(--status-done)', soft: 'var(--status-done-soft)' }
	};

	const orders: { ref: string; name: string; item: string; status: StatusKey; date: string }[] = [
		{ ref: '8KQ2', name: 'Maria Alvarez', item: 'Navy wool coat — hem & buttons', status: 'progress', date: 'Jun 24' },
		{ ref: '8KP9', name: 'James Okafor', item: 'Charcoal suit — take in waist', status: 'ready', date: 'Jun 23' },
		{ ref: '8KN3', name: 'Priya Shah', item: 'Silk dress — hem', status: 'drop', date: 'Jun 25' },
		{ ref: '8KL1', name: 'Lena Vogt', item: 'Linen trousers — taper', status: 'progress', date: 'Jun 24' },
		{ ref: '8KM7', name: 'Tom Bauer', item: 'Leather jacket — new zipper', status: 'done', date: 'Jun 22' }
	];
</script>

<!-- Decorative product mockup of the shop's order dashboard. -->
<div
	role="img"
	aria-label="The shop's DropOff dashboard: a list of orders with customer, item, and status"
	class="mx-auto w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_60px_-30px_rgba(28,32,45,0.45)]"
>
	<!-- window chrome -->
	<div class="flex items-center gap-2 border-b border-border bg-secondary/60 px-4 py-2.5">
		<div class="flex gap-1.5" aria-hidden="true">
			<span class="size-2.5 rounded-full bg-border"></span>
			<span class="size-2.5 rounded-full bg-border"></span>
			<span class="size-2.5 rounded-full bg-border"></span>
		</div>
		<p class="flex-1 text-center font-mono text-[0.66rem] text-muted-foreground">
			DropOff · Bella's Tailoring
		</p>
		<div class="w-9" aria-hidden="true"></div>
	</div>

	<!-- toolbar -->
	<div class="flex items-center justify-between gap-3 px-4 py-3.5 sm:px-5">
		<div>
			<h3 class="font-serif text-lg font-semibold leading-none text-foreground">Today's orders</h3>
			<p class="mt-1 font-mono text-[0.66rem] text-muted-foreground">2 in progress · 1 ready</p>
		</div>
		<div class="flex items-center gap-2">
			<span
				class="hidden size-8 items-center justify-center rounded-md border border-border text-muted-foreground sm:flex"
				aria-hidden="true"
			>
				<Search class="size-4" />
			</span>
			<span
				class="flex items-center gap-1.5 rounded-md bg-primary px-3 py-2 text-xs font-medium text-primary-foreground"
				aria-hidden="true"
			>
				<Plus class="size-3.5" /> New order
			</span>
		</div>
	</div>

	<!-- column headers -->
	<div
		class="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-y border-border bg-secondary/30 px-4 py-2 font-mono text-[0.6rem] uppercase tracking-wide text-muted-foreground sm:grid-cols-[5rem_1fr_8rem_5rem] sm:px-5"
	>
		<span>Order</span>
		<span>Customer</span>
		<span class="text-right sm:text-left">Status</span>
		<span class="hidden sm:block">Dropped</span>
	</div>

	<!-- rows -->
	<ul>
		{#each orders as order (order.ref)}
			<li
				class="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-border/60 px-4 py-3 last:border-0 sm:grid-cols-[5rem_1fr_8rem_5rem] sm:px-5"
			>
				<span class="font-mono text-xs text-muted-foreground">#{order.ref}</span>
				<div class="min-w-0">
					<p class="truncate text-sm font-medium text-foreground">{order.name}</p>
					<p class="truncate text-xs text-muted-foreground">{order.item}</p>
				</div>
				<span
					class="justify-self-end whitespace-nowrap rounded-full px-2.5 py-1 text-[0.68rem] font-medium sm:justify-self-start"
					style:color={status[order.status].fg}
					style:background={status[order.status].soft}
				>
					{status[order.status].label}
				</span>
				<span class="hidden font-mono text-xs text-muted-foreground sm:block">{order.date}</span>
			</li>
		{/each}
	</ul>
</div>
