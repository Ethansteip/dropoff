<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';
	import { RadioGroup, RadioGroupItem } from '$lib/components/ui/radio-group';
	import { CircleCheck } from '@lucide/svelte';

	type WaitlistResult = { success?: boolean; error?: string; email?: string } | null;

	let {
		form = null,
		id = 'waitlist',
		class: className = ''
	}: { form?: WaitlistResult; id?: string; class?: string } = $props();

	let loading = $state(false);
	let submitted = $state(false);
	let clientError = $state('');
	let email = $state('');
	let shopType = $state('');
	let shopOther = $state('');
	let shopSaved = $state(false);

	// "Other" requires a written answer before the survey can be saved.
	const surveyIncomplete = $derived(!shopType || (shopType === 'other' && !shopOther.trim()));

	// On no-JS submits the page re-renders with the `form` prop; fall back to it.
	const showConfirmation = $derived(submitted || form?.success === true);
	const errorMessage = $derived(clientError || (!submitted ? (form?.error ?? '') : ''));

	const shopOptions = [
		{ value: 'tailor', label: 'Tailor / alterations' },
		{ value: 'dry-cleaner', label: 'Dry cleaner' },
		{ value: 'cobbler', label: 'Shoe repair / cobbler' },
		{ value: 'jewelry-watch', label: 'Jewelry / watch repair' },
		{ value: 'bike', label: 'Bike shop' },
		{ value: 'other', label: 'Other' }
	];
</script>

<div class={className}>
	{#if showConfirmation}
		<div class="space-y-5">
			<p class="flex items-center gap-2 text-base font-medium text-foreground">
				<CircleCheck class="size-5 text-primary" aria-hidden="true" />
				You're on the list. We'll be in touch.
			</p>

			{#if shopSaved}
				<p class="text-sm text-muted-foreground">Thanks — that helps us build the right thing.</p>
			{:else}
				<form
					method="POST"
					action="/?/joinWaitlist"
					class="space-y-3 rounded-lg border border-border bg-card/60 p-4"
					use:enhance={() => {
						loading = true;
						return async ({ result }) => {
							loading = false;
							if (result.type === 'success') shopSaved = true;
						};
					}}
				>
					<input type="hidden" name="email" value={email || form?.email || ''} />
					<p class="text-sm font-medium text-foreground">
						What kind of shop do you run?
						<span class="font-normal text-muted-foreground">(optional)</span>
					</p>

					<RadioGroup name="shopType" bind:value={shopType} class="grid gap-2 sm:grid-cols-2">
						{#each shopOptions as option (option.value)}
							<Label
								class="flex cursor-pointer items-center gap-2.5 rounded-md border border-border bg-background px-3 py-2 text-sm font-normal has-[:checked]:border-primary has-[:checked]:bg-secondary"
							>
								<RadioGroupItem value={option.value} id={`${id}-shop-${option.value}`} />
								{option.label}
							</Label>
						{/each}
					</RadioGroup>

					{#if shopType === 'other'}
						<div>
							<Label for={`${id}-shop-other`} class="sr-only"
								>Tell us what kind of shop you run</Label
							>
							<Input
								id={`${id}-shop-other`}
								name="shopTypeOther"
								bind:value={shopOther}
								placeholder="What kind of shop do you run?"
								maxlength={120}
								autocomplete="off"
								class="h-10 bg-background text-sm"
							/>
						</div>
					{/if}

					<Button
						type="submit"
						size="sm"
						variant="secondary"
						disabled={loading || surveyIncomplete}
					>
						{loading ? 'Saving…' : 'Save my answer'}
					</Button>
				</form>
			{/if}
		</div>
	{:else}
		<form
			method="POST"
			action="/?/joinWaitlist"
			class="space-y-2"
			use:enhance={() => {
				loading = true;
				clientError = '';
				return async ({ result, update }) => {
					loading = false;
					if (result.type === 'success') {
						submitted = true;
					} else if (result.type === 'failure') {
						clientError = String(result.data?.error ?? 'Something went wrong. Please try again.');
					} else {
						await update();
					}
				};
			}}
		>
			<Label for={`${id}-email`} class="sr-only">Email address</Label>
			<div class="flex flex-col gap-2 sm:flex-row">
				<Input
					id={`${id}-email`}
					name="email"
					type="email"
					inputmode="email"
					autocomplete="email"
					required
					bind:value={email}
					placeholder="you@yourshop.com"
					aria-invalid={errorMessage ? 'true' : undefined}
					aria-describedby={errorMessage ? `${id}-error` : undefined}
					class="h-11 w-full bg-card text-base sm:flex-1"
				/>
				<Button type="submit" disabled={loading} class="h-11 shrink-0">
					{loading ? 'Joining…' : 'Join the waitlist'}
				</Button>
			</div>
			{#if errorMessage}
				<p id={`${id}-error`} class="text-sm text-destructive">{errorMessage}</p>
			{/if}
		</form>
	{/if}
</div>
