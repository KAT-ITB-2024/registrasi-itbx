ALTER TYPE "paymentOption" ADD VALUE 'BRI';--> statement-breakpoint
ALTER TYPE "paymentOption" ADD VALUE 'Gopay';--> statement-breakpoint
ALTER TABLE "lembagas" DROP COLUMN IF EXISTS "paymentType";