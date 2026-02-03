import { pgTable, text, varchar, timestamp, integer } from 'drizzle-orm/pg-core';

export const links = pgTable('links', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  userId: text('user_id').notNull(),
  originalUrl: text('original_url').notNull(),
  shortCode: varchar('short_code', { length: 20 }).notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

// TypeScript types for type-safe database operations
export type Link = typeof links.$inferSelect;
export type NewLink = typeof links.$inferInsert;
