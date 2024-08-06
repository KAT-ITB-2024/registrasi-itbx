import { sql } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import {
  pgTableCreator,
  pgEnum,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `${name}`);

export const itbGotTalentInstanceEnum = pgEnum("itbGotTalentInstance", [
  "UKM",
  "Non-Lembaga",
]);
export const itbGotTalentCategoryEnum = pgEnum("itbGotTalentCategory", [
  "Individu",
  "Kelompok",
]);

export const itbGotTalentRegistrants = createTable("itbGotTalentRegistrants", {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  id: text("id").primaryKey().$defaultFn(createId),
  instance: itbGotTalentInstanceEnum("instance").notNull(),
  category: itbGotTalentCategoryEnum("category").notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  nim: varchar("nim", { length: 8 }).notNull(),
  programStudi: varchar("programStudi", { length: 255 }).notNull(),
  lineId: varchar("lineId", { length: 255 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull(),
  instagram: varchar("instagram", { length: 255 }).notNull(),
  groupName: varchar("groupName", { length: 255 }),
  members: varchar("members", { length: 255 })
    .array()
    .default(sql`ARRAY[]::varchar[]`),
  ktmPath: varchar("ktmPath", { length: 1000 }).notNull(),
  description: text("description").notNull(),
  videoLink: varchar("videoLink", { length: 255 }).notNull(),
  createdAt: timestamp("createdAt", {
    mode: "date",
    withTimezone: true,
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updatedAt", {
    mode: "date",
    withTimezone: true,
  }).notNull(),
});

export type ItbGotTalentRegistrants =
  typeof itbGotTalentRegistrants.$inferSelect;
