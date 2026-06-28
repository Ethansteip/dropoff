/**
 * Subtle fade-and-rise on scroll into view. Runs only in the browser, so SSR
 * markup is visible by default (no-JS friendly). Honors prefers-reduced-motion.
 */
export function reveal(node: HTMLElement, options: { delay?: number } = {}) {
	const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (reduce) return;

	const delay = options.delay ?? 0;
	node.style.opacity = '0';
	node.style.transform = 'translateY(14px)';
	node.style.transition = `opacity 600ms ease ${delay}ms, transform 600ms ease ${delay}ms`;

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (entry.isIntersecting) {
					node.style.opacity = '1';
					node.style.transform = 'none';
					observer.unobserve(node);
				}
			}
		},
		{ threshold: 0.12 }
	);

	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
