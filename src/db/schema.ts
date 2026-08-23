import { pgTable, text, boolean, timestamp } from "drizzle-orm/pg-core";

export const applications = pgTable("applications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  xUsername: text("x_username").notNull().unique(),
  walletAddress: text("wallet_address").notNull().unique(),
  commentUrl: text("comment_url").notNull(),
  taskFollowX: boolean("task_follow_x").default(true).notNull(),
  taskLikeRepost: boolean("task_like_repost").default(true).notNull(),
  taskComment: boolean("task_comment").default(true).notNull(),
  status: text("status").default("pending").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Application = typeof applications.$inferSelect;
export type NewApplication = typeof applications.$inferInsert;

// Separate table for the partner-collection holder claim flow.
// Intentionally independent from `applications` — no shared columns,
// no cross-table foreign keys, no cross-table duplicate checks.
export const claimApplications = pgTable("claim_applications", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  discordId: text("discord_id").notNull().unique(),
  discordUsername: text("discord_username").notNull(),
  walletAddress: text("wallet_address").notNull().unique(),
  verifiedCollection: text("verified_collection"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type ClaimApplication = typeof claimApplications.$inferSelect;
export type NewClaimApplication = typeof claimApplications.$inferInsert;
