import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { waitlist } from '$lib/server/db/schema';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const actions: Actions = {
	joinWaitlist: async ({ request }) => {
		const formData = await request.formData();
		const email = String(formData.get('email') ?? '').trim();
		const shopType = formData.get('shopType') ? String(formData.get('shopType')) : null;
		// Only keep the free-text answer when the user picked "Other".
		const otherText = String(formData.get('shopTypeOther') ?? '')
			.trim()
			.slice(0, 120);
		const shopTypeOther = shopType === 'other' && otherText ? otherText : null;

		if (!EMAIL_RE.test(email)) {
			return fail(400, { error: 'Please enter a valid email address.', email });
		}

		try {
			await db
				.insert(waitlist)
				.values({ email, shopType, shopTypeOther, createdAt: new Date() })
				.onConflictDoUpdate({ target: waitlist.email, set: { shopType, shopTypeOther } });
		} catch {
			return fail(500, { error: 'Something went wrong. Please try again.', email });
		}

		return { success: true, email };
	}
};
