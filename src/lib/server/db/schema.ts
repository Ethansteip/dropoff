import { pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const waitlist = pgTable('waitlist', {
	id: serial('id').primaryKey(),
	email: text('email').notNull().unique(),
	shopType: text('shop_type'),
	shopTypeOther: text('shop_type_other'),
	createdAt: timestamp('created_at').notNull().defaultNow()
});
