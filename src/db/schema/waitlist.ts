import { pgTable, uuid, varchar, timestamp } from "drizzle-orm/pg-core";

export const waitlist = pgTable("waitlist", {
  id:        uuid("id").primaryKey().defaultRandom(),
  email:     varchar("email", { length: 255 }).notNull().unique(),
  name:      varchar("name", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type Waitlist = typeof waitlist.$inferSelect;
