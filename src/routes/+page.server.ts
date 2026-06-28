import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

// Simple, permissive email check — good enough for a waitlist gate.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const actions: Actions = {
	joinWaitlist: async ({ request }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '').trim();
		const shopType = formData.get('shopType') ? String(formData.get('shopType')) : null;

		if (!EMAIL_RE.test(email)) {
			return fail(400, { error: 'Please enter a valid email address.', email });
		}

		try {
			// TODO: replace with Drizzle insert — e.g.
			// await db
			//   .insert(waitlist)
			//   .values({ email, shopType, createdAt: new Date() })
			//   .onConflictDoUpdate({ target: waitlist.email, set: { shopType } });
		} catch {
			return fail(500, { error: 'Something went wrong. Please try again.', email });
		}

		return { success: true, email };
	}
};
