<script lang="ts">
	import PhoneFrame from './PhoneFrame.svelte';
	import { ChevronLeft, Link2, ArrowUp, MessageSquareText } from '@lucide/svelte';
</script>

{#snippet notification()}
	<!-- New-message notification badge that pops in on load -->
	<div class="notif-pop absolute -top-3.5 -right-3.5 z-30" aria-hidden="true">
		<div
			class="relative flex size-12 items-center justify-center rounded-[1.15rem] bg-primary text-primary-foreground shadow-xl shadow-primary/25 ring-4 ring-background"
		>
			<MessageSquareText class="size-6" />
			<span class="absolute -top-1 -right-1 flex size-5 items-center justify-center">
				<span
					class="absolute inline-flex size-full rounded-full bg-red-500/50 motion-safe:animate-ping"
				></span>
				<span
					class="relative flex size-5 items-center justify-center rounded-full bg-red-500 text-[0.62rem] font-bold leading-none text-white ring-2 ring-background"
				>
					1
				</span>
			</span>
		</div>
	</div>
{/snippet}

<PhoneFrame
	overlay={notification}
	label="Text message a customer receives from the shop, with a tracking link"
>
	<!-- status bar -->
	<div
		class="flex items-center justify-between px-5 pt-5 pb-1 font-mono text-[0.7rem] text-foreground/70"
	>
		<span>9:41</span>
	</div>

	<!-- conversation header -->
	<div class="flex items-center gap-2 border-b border-border/70 px-3 pb-2.5">
		<ChevronLeft class="size-4 text-primary" aria-hidden="true" />
		<div
			class="flex size-7 items-center justify-center rounded-full bg-primary font-serif text-sm font-semibold text-primary-foreground"
			aria-hidden="true"
		>
			B
		</div>
		<div class="leading-tight">
			<p class="text-[0.82rem] font-semibold text-foreground">Bella's Tailoring</p>
			<p class="font-mono text-[0.6rem] text-muted-foreground">+1 (415) 555-0148</p>
		</div>
	</div>

	<!-- thread -->
	<div class="flex-1 space-y-2.5 px-3 py-4">
		<p class="text-center font-mono text-[0.6rem] uppercase tracking-wide text-muted-foreground">
			Today 9:38 AM
		</p>

		<div
			class="max-w-[88%] rounded-2xl rounded-bl-md bg-secondary px-3.5 py-2.5 text-[0.8rem] leading-snug text-foreground"
		>
			Hi Maria — we've got your navy wool coat for a hem &amp; new buttons. We'll text the moment
			it's ready. Track it here anytime:
		</div>

		<!-- rich link preview card -->
		<div class="max-w-[88%] overflow-hidden rounded-2xl rounded-bl-md border border-border bg-card">
			<div class="flex items-center gap-2.5 bg-primary/5 px-3.5 py-3">
				<div
					class="flex size-9 items-center justify-center rounded-lg bg-primary font-serif text-base font-semibold text-primary-foreground"
					aria-hidden="true"
				>
					B
				</div>
				<div class="min-w-0">
					<p class="truncate text-[0.78rem] font-semibold text-foreground">
						Track your order · #8KQ2
					</p>
					<p class="truncate text-[0.68rem] text-muted-foreground">
						Navy wool coat — hem &amp; buttons
					</p>
				</div>
			</div>
			<div
				class="flex items-center gap-1.5 border-t border-border/70 px-3.5 py-2 font-mono text-[0.62rem] text-muted-foreground"
			>
				<Link2 class="size-3" aria-hidden="true" />
				dropoff.to/m/8KQ2
			</div>
		</div>

		<p class="font-mono text-[0.58rem] text-muted-foreground">Delivered</p>
	</div>

	<!-- faux message input bar -->
	<div class="flex items-center gap-2 border-t border-border/70 px-3 py-2.5" aria-hidden="true">
		<div
			class="flex-1 rounded-full border border-border px-3.5 py-1.5 text-[0.72rem] text-muted-foreground"
		>
			Text Message
		</div>
		<span
			class="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary/15 text-primary"
		>
			<ArrowUp class="size-3.5" />
		</span>
	</div>
</PhoneFrame>

<style>
	.notif-pop {
		animation: notif-pop 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.7s both;
	}

	@keyframes notif-pop {
		from {
			opacity: 0;
			transform: scale(0.4) translateY(0.5rem);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.notif-pop {
			animation: none;
		}
	}
</style>
