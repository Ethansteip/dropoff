<script lang="ts">
	import PhoneFrame from './PhoneFrame.svelte';
	import { Check, Scissors, Phone, StickyNote, MapPin } from '@lucide/svelte';

	const steps = [
		{ label: 'Dropped off', when: 'Tue, Jun 24 · 9:14 AM', state: 'done' },
		{ label: 'In progress', when: 'Wed, Jun 25 · 11:02 AM', state: 'current' },
		{ label: 'Ready for pickup', when: 'Est. ready Thu, Jun 26', state: 'pending' }
	] as const;
</script>

<PhoneFrame label="The order tracking page a customer opens from the text link">
	<div class="flex h-full flex-col px-5 pt-9 pb-6">
		<!-- mock shop brand -->
		<div class="flex items-center gap-2.5">
			<div
				class="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"
				aria-hidden="true"
			>
				<Scissors class="size-4.5" />
			</div>
			<div class="leading-tight">
				<p class="font-serif text-base font-semibold text-foreground">Bella's Tailoring</p>
				<p class="font-mono text-[0.58rem] uppercase tracking-wide text-muted-foreground">
					Est. 2009 · San Francisco
				</p>
			</div>
		</div>

		<!-- order summary -->
		<div class="mt-5 rounded-xl border border-border bg-secondary/50 p-4">
			<div class="flex items-center justify-between">
				<span class="font-mono text-[0.62rem] uppercase tracking-wide text-muted-foreground"
					>Order</span
				>
				<span class="font-mono text-sm font-medium text-foreground">#8KQ2</span>
			</div>
			<p class="mt-2 font-serif text-lg font-semibold leading-snug text-foreground">
				Navy wool coat
			</p>
			<p class="text-[0.8rem] text-muted-foreground">Hem &amp; replace two buttons</p>
		</div>

		<!-- note from the shop -->
		<div class="mt-4 rounded-xl border border-border bg-accent/40 p-3.5">
			<div class="flex items-center gap-1.5">
				<StickyNote class="size-3.5 text-primary" aria-hidden="true" />
				<span class="font-mono text-[0.58rem] uppercase tracking-wide text-muted-foreground">
					Note from the shop
				</span>
			</div>
			<p class="mt-1.5 text-[0.82rem] leading-relaxed text-foreground/90">
				Started on your coat this morning — the hem is done and the new buttons are going on now.
				Still on track for Thursday. — Bella
			</p>
		</div>

		<!-- status timeline -->
		<ol class="mt-5 space-y-0">
			{#each steps as step, i (step.label)}
				<li class="relative flex gap-3.5 pb-5 last:pb-0">
					{#if i < steps.length - 1}
						<span
							class="absolute left-[0.6875rem] top-6 h-[calc(100%-1rem)] w-px"
							style:background={step.state === 'done' ? 'var(--status-ready)' : 'var(--border)'}
							aria-hidden="true"
						></span>
					{/if}
					{#if step.state === 'current'}
						<span
							class="absolute top-[0.1875rem] left-[0.0625rem] z-0 size-5.5 rounded-full motion-safe:animate-ping"
							style:background="var(--status-progress)"
							style:opacity="0.3"
							aria-hidden="true"
						></span>
					{/if}
					<span
						class="relative z-10 mt-0.5 flex size-5.5 shrink-0 items-center justify-center rounded-full"
						style:background={step.state === 'pending'
							? 'var(--muted)'
							: step.state === 'current'
								? 'var(--status-progress-soft)'
								: 'var(--status-ready)'}
						style:color={step.state === 'current' ? 'var(--status-progress)' : '#fff'}
						style:box-shadow={step.state === 'current'
							? '0 0 0 3px var(--status-progress-soft)'
							: 'none'}
						aria-hidden="true"
					>
						{#if step.state === 'done'}
							<Check class="size-3.5" />
						{:else if step.state === 'current'}
							<span class="size-2 rounded-full" style:background="var(--status-progress)"></span>
						{/if}
					</span>
					<div class="-mt-0.5">
						<p
							class="text-[0.9rem] font-semibold"
							style:color={step.state === 'pending'
								? 'var(--muted-foreground)'
								: 'var(--foreground)'}
						>
							{step.label}
						</p>
						<p class="font-mono text-[0.66rem] text-muted-foreground">{step.when}</p>
					</div>
				</li>
			{/each}
		</ol>

		<!-- shop contact -->
		<div class="mt-auto space-y-2 pt-4">
			<div
				class="flex items-center gap-2 rounded-lg bg-secondary/60 px-3.5 py-2.5 text-[0.74rem] text-muted-foreground"
			>
				<Phone class="size-3.5 shrink-0" aria-hidden="true" />
				Questions? Call (415) 555-0148 · Open till 6 PM
			</div>
			<!-- <div
				class="flex items-center gap-2 rounded-lg bg-secondary/60 px-3.5 py-2.5 text-[0.74rem] text-muted-foreground"
			>
				<MapPin class="size-3.5 shrink-0" aria-hidden="true" />
				1142 Valencia St, San Francisco · Pickup anytime
			</div> -->
		</div>
	</div>
</PhoneFrame>
