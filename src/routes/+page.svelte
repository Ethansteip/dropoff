<script lang="ts">
	import type { PageProps } from './$types';
	import Nav from '$lib/components/Nav.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import HowItWorks from '$lib/components/HowItWorks.svelte';
	import WaitlistForm from '$lib/components/WaitlistForm.svelte';
	import PhoneSms from '$lib/components/mock/PhoneSms.svelte';
	import StatusPage from '$lib/components/mock/StatusPage.svelte';
	import Dashboard from '$lib/components/mock/Dashboard.svelte';
	import OrderFlow from '$lib/components/mock/OrderFlow.svelte';
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
	<section class="px-5 pt-14 pb-20 sm:pt-20 sm:pb-28">
		<div class="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
			<div class="text-center lg:text-left">
				<p
					use:reveal
					class="mb-5 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground"
				>
					Order tracking for repair shops
				</p>
				<h1
					use:reveal={{ delay: 60 }}
					class="font-serif text-[clamp(2.5rem,5.5vw,4rem)] font-semibold leading-[1.05] tracking-tight text-foreground text-balance"
				>
					Stop calling customers to tell them their order is ready.
				</h1>

				<p
					use:reveal={{ delay: 120 }}
					class="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground text-pretty lg:mx-0"
				>
					DropOff texts your customers a real-time tracking link the moment you take in their order.
					When it's ready, they get another text. You stop playing phone tag.
				</p>

				<div use:reveal={{ delay: 180 }} class="mx-auto mt-9 max-w-md lg:mx-0">
					<WaitlistForm {form} id="hero" />
				</div>

				<p use:reveal={{ delay: 240 }} class="mt-6 text-sm text-muted-foreground">
					Built for tailors · dry cleaners · cobblers · jewelers · watch repair · bike shops
				</p>
			</div>

			<div use:reveal={{ delay: 200 }} class="lg:pl-6">
				<PhoneSms />
			</div>
		</div>
	</section>

	<HowItWorks />

	<!-- What your customers see -->
	<section aria-labelledby="customer-heading" class="px-5 py-20 sm:py-28">
		<div class="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-16">
			<div use:reveal class="order-2 flex justify-center lg:order-1">
				<StatusPage />
			</div>
			<div class="order-1 lg:order-2">
				<p class="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
					What your customers see
				</p>
				<h2
					id="customer-heading"
					use:reveal={{ delay: 60 }}
					class="font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-foreground text-balance"
				>
					They just tap the link. No app, no account.
				</h2>
				<p use:reveal={{ delay: 120 }} class="mt-5 text-lg leading-relaxed text-muted-foreground">
					The text opens a simple page with your shop’s name on it. Your customer watches their
					order move from dropped off to ready — and gets a text the second it’s done. They never
					have to call to check.
				</p>
			</div>
		</div>
	</section>

	<!-- What you run -->
	<section aria-labelledby="business-heading" class="bg-secondary/40 px-5 py-20 sm:py-28">
		<div class="mx-auto max-w-5xl">
			<div class="mx-auto max-w-2xl text-center">
				<p class="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
					Your side of the counter
				</p>
				<h2
					id="business-heading"
					use:reveal
					class="font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-foreground text-balance"
				>
					Every order on one screen.
				</h2>
				<p
					use:reveal={{ delay: 60 }}
					class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
				>
					Take in a new order in under a minute — name, phone, what they dropped off. DropOff texts
					the customer for you and tracks where everything stands.
				</p>
			</div>
			<div use:reveal={{ delay: 120 }} class="mt-12">
				<Dashboard />
			</div>
		</div>
	</section>

	<!-- One click, both sides update -->
	<section aria-labelledby="flow-heading" class="px-5 py-20 sm:py-28">
		<div class="mx-auto max-w-5xl">
			<div class="mx-auto max-w-2xl text-center">
				<p class="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
					From your counter to their phone
				</p>
				<h2
					id="flow-heading"
					use:reveal
					class="font-serif text-[clamp(1.75rem,4vw,2.5rem)] font-semibold leading-tight tracking-tight text-foreground text-balance"
				>
					One click, and your customer already knows.
				</h2>
				<p
					use:reveal={{ delay: 60 }}
					class="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
				>
					Open an order, mark where it stands, and DropOff texts the customer and updates their
					tracking page at the same moment. No extra step, no second tool.
				</p>
			</div>
			<div use:reveal={{ delay: 120 }} class="mt-14">
				<OrderFlow />
			</div>
		</div>
	</section>

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
