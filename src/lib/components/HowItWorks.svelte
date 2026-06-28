<script lang="ts">
	import { ClipboardPen, MessageSquareText, CircleCheck } from '@lucide/svelte';
	import { reveal } from '$lib/actions/reveal';

	const steps = [
		{
			icon: ClipboardPen,
			title: 'Take in the order',
			body: "Enter the customer's name, phone, and what they dropped off. Takes under 60 seconds."
		},
		{
			icon: MessageSquareText,
			title: 'Customer gets a text',
			body: 'They receive an SMS with a link to track their order in real time. No app. No account.'
		},
		{
			icon: CircleCheck,
			title: 'Mark it ready',
			body: 'One click sends a “Your order is ready for pickup” text automatically.'
		}
	];
</script>

<section aria-labelledby="how-it-works-heading" class="px-5 py-20 sm:py-28">
	<div class="mx-auto max-w-5xl">
		<h2
			id="how-it-works-heading"
			use:reveal
			class="font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-foreground"
		>
			How it works
		</h2>
		<p use:reveal={{ delay: 60 }} class="mt-3 max-w-xl text-base text-muted-foreground sm:text-lg">
			Three steps from drop-off to pickup. No training required.
		</p>

		<!-- Receipt-tape connector: vertical on mobile, horizontal on desktop -->
		<ol
			class="relative mt-14 grid gap-12 sm:grid-cols-3 sm:gap-8
				before:absolute before:left-[1.75rem] before:top-4 before:bottom-4 before:w-px
				before:border-l before:border-dashed before:border-border
				sm:before:left-12 sm:before:right-12 sm:before:top-[1.75rem] sm:before:bottom-auto
				sm:before:h-px sm:before:w-auto sm:before:border-l-0 sm:before:border-t sm:before:border-dashed"
		>
			{#each steps as step, i (step.title)}
				<li use:reveal={{ delay: i * 100 }} class="relative flex gap-5 sm:flex-col sm:gap-5">
					<div
						class="relative z-10 flex size-14 shrink-0 items-center justify-center rounded-full border border-border bg-card text-primary shadow-sm"
					>
						<step.icon class="size-6" aria-hidden="true" />
						<span
							class="absolute -right-1 -top-1 flex size-6 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
						>
							{i + 1}
						</span>
					</div>
					<div>
						<h3 class="font-serif text-xl font-semibold text-foreground">{step.title}</h3>
						<p class="mt-1.5 text-[0.975rem] leading-relaxed text-muted-foreground">{step.body}</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>
