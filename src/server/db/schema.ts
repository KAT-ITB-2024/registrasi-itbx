import { sql, relations } from "drizzle-orm";
import { createId } from "@paralleldrive/cuid2";
import {
  pgTableCreator,
  pgEnum,
  text,
  timestamp,
  varchar,
  boolean,
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

export const fakultasEnum = pgEnum("fakultas", [
  "FITB",
  "FMIPA",
  "FSRD",
  "FTMD",
  "FTTM",
  "FTSL",
  "FTI",
  "SAPPK",
  "SBM",
  "SF",
  "SITH",
  "STEI",
]);

export const angkatanEnum = pgEnum("angkatan", ["2021", "2022", "2023"]);

export const lembagaEnum = pgEnum("lembaga", [
  "Lembaga 1",
  "Lembaga 2",
  "Lembaga 3",
]);

export const secondPartyContactAppEnum = pgEnum("secondPartyContactApp", [
  "Nomor WhatsApp",
  "ID Line",
]);

export const paymentTypeEnum = pgEnum("paymentType", [
  "Lembaga 2",
  "Eksternal",
]);

export const paymentOptionEnum = pgEnum("paymentOption", ["QRIS", "Transfer"]);

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

export const lembagas = createTable("lembagas", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: varchar("name", { length: 255 }).notNull(),
  nim: varchar("nim", { length: 8 }).notNull().unique(),
  password: varchar("password", { length: 255 }).notNull(),
  fakultas: fakultasEnum("fakultas").notNull(),
  programStudi: varchar("programStudi", { length: 255 }).notNull(),
  angkatan: varchar("angkatan", { length: 4 }).notNull(),
  lineId: varchar("lineId", { length: 255 }).notNull(),
  phoneNumber: varchar("phoneNumber", { length: 20 }).notNull(),
  lembaga: lembagaEnum("lembaga").notNull(),
  lembagaName: varchar("lembagaName", { length: 255 }).notNull(),
  secondPartyName: varchar("secondPartyName", { length: 255 }).notNull(),
  secondPartyNim: varchar("secondPartyNim", { length: 8 }).notNull(),
  secondPartyContactApp: secondPartyContactAppEnum(
    "secondPartyContactApp",
  ).notNull(),
  secondPartyContact: varchar("secondPartyContact", { length: 255 }).notNull(),
  position: varchar("position", { length: 255 }).notNull(),
  isNoisy: boolean("isNoisy").notNull(),
  commitmentSheetPath: varchar("commitmentSheetPath", {
    length: 1000,
  }).notNull(),
  paymentType: paymentTypeEnum("paymentType").notNull(),
  paymentOption: paymentOptionEnum("paymentOption").notNull(),
  accountName: varchar("accountName", { length: 255 }).notNull(),
  paymentProofPath: varchar("paymentProofPath", { length: 1000 }).notNull(),
  boothId: text("boothId").references(() => booths.id, { onDelete: "cascade" }),
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

export const booths = createTable("booths", {
  id: text("id").primaryKey().$defaultFn(createId),
  code: varchar("code", { length: 6 }).notNull(),
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

export const lembagaBoothRelation = relations(lembagas, ({ one }) => ({
  booth: one(booths, {
    fields: [lembagas.boothId],
    references: [booths.id],
  }),
}));

export type ItbGotTalentRegistrants =
  typeof itbGotTalentRegistrants.$inferSelect;
export type Lembagas = typeof lembagas.$inferSelect;
export type Booths = typeof booths.$inferSelect;
