<script lang="ts">
	import PhoneFrame from './PhoneFrame.svelte';
	import { Check, ChevronLeft, Scissors, Phone, StickyNote, MapPin } from '@lucide/svelte';
	import { fly } from 'svelte/transition';

	// Drives the looping demo: a clerk marks the order "ready for pickup" and the
	// customer's tracking page advances in step.
	let active = $state(false);
	let hovering = $state(false);
	let pressing = $state(false);
	let toast = $state(false);

	// Cursor travels (in % of the order window) from a resting corner to the button.
	const cursorX = $derived(hovering ? 31 : 45);
	const cursorY = $derived(hovering ? 90 : 75);

	type StepState = 'done' | 'current' | 'pending';
	const steps = $derived<{ label: string; when: string; state: StepState }[]>([
		{ label: 'Dropped off', when: 'Jun 24 · 9:14 AM', state: 'done' },
		{ label: 'In progress', when: 'Jun 25 · 11:02 AM', state: 'done' },
		{
			label: 'Ready for pickup',
			when: active ? 'Jun 26 · 2:30 PM' : 'We’ll text you',
			state: active ? 'current' : 'pending'
		}
	]);

	$effect(() => {
		const timers: ReturnType<typeof setTimeout>[] = [];
		const at = (ms: number, fn: () => void) => timers.push(setTimeout(fn, ms));

		// Reduced motion: skip the cursor choreography, just show the result.
		if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
			active = true;
			return;
		}

		const cycle = () => {
			active = false;
			hovering = false;
			pressing = false;
			toast = false;
			at(1000, () => (hovering = true));
			at(1950, () => (pressing = true));
			at(2150, () => {
				pressing = false;
				active = true;
				toast = true;
			});
			at(4600, () => (toast = false));
			at(4950, () => (hovering = false));
			at(6400, cycle);
		};
		cycle();

		return () => timers.forEach(clearTimeout);
	});
</script>

<div
	role="img"
	aria-label="A clerk marks an order ready for pickup and the customer's tracking page updates automatically"
	class="grid items-center gap-7 lg:grid-cols-[1.25fr_0.75fr] lg:gap-9"
>
	<!-- business: the inside of an order -->
	<div
		class="relative mx-auto w-full max-w-md overflow-hidden rounded-xl border border-border bg-card shadow-[0_30px_60px_-30px_rgba(28,32,45,0.45)]"
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

		<div class="p-5">
			<!-- back + ref -->
			<div class="flex items-center justify-between">
				<span class="flex items-center gap-1 text-xs text-muted-foreground">
					<ChevronLeft class="size-3.5" /> Today's orders
				</span>
				<span class="font-mono text-xs text-muted-foreground">#8KQ2</span>
			</div>

			<!-- customer -->
			<div class="mt-3">
				<h3 class="font-serif text-xl font-semibold leading-tight text-foreground">
					Maria Alvarez
				</h3>
				<p class="font-mono text-[0.7rem] text-muted-foreground">+1 (415) 555-0148</p>
			</div>

			<!-- item -->
			<div class="mt-4 rounded-lg border border-border bg-secondary/40 p-3.5">
				<p class="font-serif text-base font-semibold text-foreground">Navy wool coat</p>
				<p class="text-[0.8rem] text-muted-foreground">Hem &amp; replace two buttons</p>
			</div>

			<!-- current status -->
			<div class="mt-4 flex items-center justify-between">
				<span class="font-mono text-[0.62rem] uppercase tracking-wide text-muted-foreground">
					Status
				</span>
				<span
					class="rounded-full px-2.5 py-1 text-[0.7rem] font-medium transition-colors duration-300"
					style:color={active ? 'var(--status-ready)' : 'var(--status-progress)'}
					style:background={active ? 'var(--status-ready-soft)' : 'var(--status-progress-soft)'}
				>
					{active ? 'Ready for pickup' : 'In progress'}
				</span>
			</div>

			<!-- action button (cursor target) -->
			<div class="mt-4">
				<span
					class="flex w-full items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200"
					style:transform={pressing ? 'scale(0.97)' : 'scale(1)'}
					style:color={active ? 'var(--status-ready)' : 'var(--primary-foreground)'}
					style:background={active ? 'var(--status-ready-soft)' : 'var(--primary)'}
					style:box-shadow={pressing ? '0 0 0 4px var(--status-ready-soft)' : 'none'}
				>
					{#if active}
						<Check class="size-4" /> Marked ready for pickup
					{:else}
						Mark ready for pickup
					{/if}
				</span>
			</div>
		</div>

		<!-- toast: customer auto-notified -->
		{#if toast}
			<div
				transition:fly={{ y: 12, duration: 260 }}
				class="absolute top-10 left-1/2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full bg-foreground px-3.5 py-2 text-[0.72rem] font-medium text-background shadow-lg"
			>
				<Check class="size-3.5" /> Pickup text sent to Maria
			</div>
		{/if}

		<!-- animated cursor -->
		<span
			class="pointer-events-none absolute z-20 -ml-1 -mt-1 transition-[left,top] duration-700 ease-out"
			style:left="{cursorX}%"
			style:top="{cursorY}%"
			aria-hidden="true"
		>
			<svg width="22" height="22" viewBox="0 0 24 24" fill="none" class="drop-shadow-md">
				<path
					d="M5 3l14 8.5-6 1.2-3.2 6.3L5 3z"
					fill="#1a1a1a"
					stroke="#fff"
					stroke-width="1.4"
					stroke-linejoin="round"
				/>
			</svg>
		</span>
	</div>

	<!-- customer: the tracking page reacts -->
	<PhoneFrame label="The customer's tracking page, updating in real time">
		<div class="flex h-full flex-col px-4 pt-9 pb-5">
			<div class="flex items-center gap-2">
				<div
					class="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground"
					aria-hidden="true"
				>
					<Scissors class="size-4" />
				</div>
				<div class="leading-tight">
					<p class="font-serif text-sm font-semibold text-foreground">Bella's Tailoring</p>
					<p class="font-mono text-[0.52rem] uppercase tracking-wide text-muted-foreground">
						Order #8KQ2
					</p>
				</div>
			</div>

			<div class="mt-4 rounded-lg border border-border bg-secondary/50 p-3">
				<p class="font-serif text-base font-semibold leading-snug text-foreground">
					Navy wool coat
				</p>
				<p class="text-[0.72rem] text-muted-foreground">Hem &amp; replace two buttons</p>
			</div>

			<!-- note from the shop -->
			<div class="mt-3 rounded-lg border border-border bg-accent/40 p-3">
				<div class="flex items-center gap-1.5">
					<StickyNote class="size-3 text-primary" aria-hidden="true" />
					<span class="font-mono text-[0.52rem] uppercase tracking-wide text-muted-foreground">
						Note from the shop
					</span>
				</div>
				<p class="mt-1 text-[0.74rem] leading-relaxed text-foreground/90">
					All finished — new buttons on, hem set, and freshly pressed. See you in a bit! — Bella
				</p>
			</div>

			<ol class="mt-4 space-y-0">
				{#each steps as step, i (step.label)}
					<li class="relative flex gap-3 pb-4 last:pb-0">
						{#if i < steps.length - 1}
							<span
								class="absolute top-5 left-[0.5625rem] h-[calc(100%-0.75rem)] w-px transition-colors duration-500"
								style:background={step.state === 'done' ? 'var(--status-ready)' : 'var(--border)'}
								aria-hidden="true"
							></span>
						{/if}
						{#if step.state === 'current'}
							<span
								class="absolute top-[0.125rem] left-[0.0625rem] z-0 size-5 rounded-full motion-safe:animate-ping"
								style:background="var(--status-ready)"
								style:opacity="0.3"
								aria-hidden="true"
							></span>
						{/if}
						<span
							class="relative z-10 mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full transition-all duration-300"
							style:background={step.state === 'pending'
								? 'var(--muted)'
								: step.state === 'current'
									? 'var(--status-ready-soft)'
									: 'var(--status-ready)'}
							style:color={step.state === 'current' ? 'var(--status-ready)' : '#fff'}
							aria-hidden="true"
						>
							{#if step.state === 'done'}
								<Check class="size-3" />
							{:else if step.state === 'current'}
								<span class="size-1.5 rounded-full" style:background="var(--status-ready)"></span>
							{/if}
						</span>
						<div class="-mt-0.5">
							<p
								class="text-[0.82rem] font-semibold transition-colors duration-300"
								style:color={step.state === 'pending'
									? 'var(--muted-foreground)'
									: 'var(--foreground)'}
							>
								{step.label}
							</p>
							<p class="font-mono text-[0.6rem] text-muted-foreground">{step.when}</p>
						</div>
					</li>
				{/each}
			</ol>

			<div class="mt-auto space-y-2 pt-4">
				<div
					class="flex items-center gap-2 rounded-lg bg-secondary/60 px-3.5 py-2.5 text-[0.74rem] text-muted-foreground"
				>
					<Phone class="size-3.5 shrink-0" aria-hidden="true" />
					Questions? Call (415) 555-0148 · Open till 6 PM
				</div>
				<div
					class="flex items-center gap-2 rounded-lg bg-secondary/60 px-3.5 py-2.5 text-[0.74rem] text-muted-foreground"
				>
					<MapPin class="size-3.5 shrink-0" aria-hidden="true" />
					<!-- street number split out so iOS data detectors can't match an address -->
					<span>1142</span> Valencia St, San Francisco · Pickup anytime
				</div>
			</div>
		</div>
	</PhoneFrame>
</div>
