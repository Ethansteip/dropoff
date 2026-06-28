<script lang="ts">
	import type { PageProps } from './$types';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HowItWorks from '$lib/components/HowItWorks.svelte';
	import WaitlistForm from '$lib/components/WaitlistForm.svelte';
	import { reveal } from '$lib/actions/reveal';

	let { form }: PageProps = $props();

	const title = 'DropOff — Order tracking links for repair shops';
	const description =
		'DropOff sends your customers an automatic SMS with a real-time status link the moment you take in their order. When it’s ready, they get another text. Stop playing phone tag.';
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<meta property="og:type" content="website" />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
</svelte:head>

<Nav />

<main>
	<!-- Hero -->
	<section class="px-5 pt-16 pb-20 sm:pt-24 sm:pb-28">
		<div class="mx-auto max-w-3xl text-center">
			<h1
				use:reveal
				class="font-serif text-[clamp(2.5rem,6vw,4rem)] font-semibold leading-[1.05] tracking-tight text-foreground text-balance"
			>
				Stop calling customers to tell them their order is ready.
			</h1>

			<p
				use:reveal={{ delay: 80 }}
				class="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty"
			>
				DropOff sends your customers an automatic SMS with a real-time status link the moment you
				take in their order. When it’s ready, they get another text. You stop playing phone tag.
			</p>

			<div use:reveal={{ delay: 140 }} class="mx-auto mt-9 max-w-md">
				<WaitlistForm {form} id="hero" />
			</div>

			<p use:reveal={{ delay: 200 }} class="mt-6 text-sm text-muted-foreground">
				Built for tailors · dry cleaners · cobblers · jewelers · watch repair · bike shops
			</p>
		</div>

		<!-- Subtle SMS illustration — reinforces the core image, decorative only -->
		<div use:reveal={{ delay: 260 }} class="mx-auto mt-16 max-w-sm" aria-hidden="true">
			<div class="space-y-3 rounded-2xl border border-border bg-card p-5 shadow-sm">
				<p class="text-xs font-medium uppercase tracking-wide text-muted-foreground">
					Text message · Bella’s Tailoring
				</p>
				<div
					class="max-w-[85%] rounded-2xl rounded-tl-sm bg-secondary px-4 py-2.5 text-sm text-foreground"
				>
					Hi Maria! Your dress hemming is in progress. Track it here: dropoff.to/r/8KQ2
				</div>
				<div
					class="ml-auto max-w-[85%] rounded-2xl rounded-tr-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground"
				>
					✅ Your order is ready for pickup!
				</div>
			</div>
		</div>
	</section>

	<HowItWorks />

	<!-- Who it's for -->
	<section aria-labelledby="who-heading" class="px-5 py-20 sm:py-24">
		<div class="mx-auto max-w-3xl">
			<h2 id="who-heading" class="sr-only">Who DropOff is for</h2>
			<blockquote
				use:reveal
				class="border-l-2 border-primary pl-6 font-serif text-[clamp(1.5rem,3.2vw,2.125rem)] font-medium leading-snug text-foreground text-balance"
			>
				If you’re running a tailor shop, shoe repair counter, dry cleaner, or jewelry bench and
				you’re still tracking orders in a notebook — DropOff is for you.
			</blockquote>
			<p use:reveal={{ delay: 80 }} class="mt-5 pl-6 text-lg text-muted-foreground">
				Setup takes 10 minutes. No training required.
			</p>
		</div>
	</section>

	<!-- Waitlist CTA -->
	<section id="waitlist" aria-labelledby="waitlist-heading" class="scroll-mt-20 px-5 pb-24">
		<div
			class="mx-auto max-w-2xl rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-12"
		>
			<h2
				id="waitlist-heading"
				use:reveal
				class="font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-semibold tracking-tight text-foreground"
			>
				Be the first to know when we launch.
			</h2>
			<p use:reveal={{ delay: 60 }} class="mx-auto mt-3 max-w-md text-muted-foreground">
				No spam. Just an update when DropOff is ready.
			</p>
			<div use:reveal={{ delay: 120 }} class="mx-auto mt-8 max-w-md text-left">
				<WaitlistForm {form} id="cta" />
			</div>
		</div>
	</section>
</main>

<Footer />
