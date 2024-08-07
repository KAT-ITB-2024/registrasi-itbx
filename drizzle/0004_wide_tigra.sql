DO $$ BEGIN
 CREATE TYPE "public"."angkatan" AS ENUM('2021', '2022', '2023', '2024', '2025');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."fakultas" AS ENUM('FITB', 'FMIPA', 'FSRD', 'FTMD', 'FTTM', 'FTSL', 'FTI', 'SAPPK', 'SBM', 'SF', 'SITH', 'STEI');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."lembaga" AS ENUM('Lembaga 1', 'Lembaga 2', 'Lembaga 3');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."paymentOption" AS ENUM('Lembaga 2', 'Eksternal');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."secondPartyContactApp" AS ENUM('Nomor WhatsApp', 'ID Line');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "booths" (
	"id" text PRIMARY KEY NOT NULL,
	"code" varchar(6) NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "lembagas" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"nim" varchar(8) NOT NULL,
	"password" varchar(255) NOT NULL,
	"fakultas" "fakultas" NOT NULL,
	"programStudi" varchar(255) NOT NULL,
	"angkatan" varchar(4) NOT NULL,
	"lineId" varchar(255) NOT NULL,
	"phoneNumber" varchar(20) NOT NULL,
	"lembaga" "lembaga" NOT NULL,
	"lembagaName" varchar(255) NOT NULL,
	"secondPartyName" varchar(255) NOT NULL,
	"secondPartyNim" varchar(8) NOT NULL,
	"secondPartyContactApp" "secondPartyContactApp" NOT NULL,
	"secondPartyContact" varchar(255) NOT NULL,
	"position" varchar(255) NOT NULL,
	"isNoisy" boolean NOT NULL,
	"commitmentSheetPath" varchar(1000) NOT NULL,
	"paymentType" "paymentOption" NOT NULL,
	"paymentOption" "paymentOption" NOT NULL,
	"accountName" varchar(255) NOT NULL,
	"paymentProofPath" varchar(1000) NOT NULL,
	"boothId" text NOT NULL,
	"createdAt" timestamp with time zone DEFAULT now() NOT NULL,
	"updatedAt" timestamp with time zone NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "lembagas" ADD CONSTRAINT "lembagas_boothId_booths_id_fk" FOREIGN KEY ("boothId") REFERENCES "public"."booths"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
