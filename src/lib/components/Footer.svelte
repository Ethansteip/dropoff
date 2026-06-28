<script lang="ts">
	const year = new Date().getFullYear();
</script>

<footer class="border-t border-border/60">
	<div
		class="mx-auto flex max-w-5xl flex-col items-start gap-3 px-5 py-10 sm:flex-row sm:items-center sm:justify-between"
	>
		<span class="font-serif text-lg font-semibold tracking-tight text-foreground">DropOff</span>
		<div class="flex flex-col gap-1 text-sm text-muted-foreground sm:items-end">
			<span>© {year} DropOff. All rights reserved.</span>
		</div>
	</div>
</footer>
