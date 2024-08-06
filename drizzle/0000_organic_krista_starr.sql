DO $$ BEGIN
 CREATE TYPE "public"."itbGotTalentCategory" AS ENUM('Individu', 'Kelompok');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."itbGotTalentInstance" AS ENUM('Lembaga', 'Non-Lembaga');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "itbGotTalentRegistrants" (
	"id" text PRIMARY KEY NOT NULL,
	"instance" "itbGotTalentInstance" NOT NULL,
	"category" "itbGotTalentCategory" NOT NULL,
	"name" varchar(255) NOT NULL,
	"nim" varchar(100) NOT NULL,
	"programStudi" varchar(255) NOT NULL,
	"lineId" varchar(255) NOT NULL,
	"phoneNumber" varchar(20) NOT NULL,
	"instagram" varchar(255) NOT NULL,
	"members" varchar(255)[] DEFAULT ARRAY[]::varchar[],
	"ktmPath" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"videoLink" varchar(255) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
