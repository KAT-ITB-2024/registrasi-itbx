import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  angkatanEnum,
  fakultasEnum,
  lembagaEnum,
  lembagas,
  paymentOptionEnum,
  secondPartyContactAppEnum,
} from "~/server/db/schema";
import { hash } from "bcrypt";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const lembagaRouter = createTRPCRouter({
  registerLembaga: publicProcedure
    .input(
      z.object({
        name: z.string().min(1),
        nim: z.string().length(8),
        password: z.string().min(1),
        fakultas: z.enum(fakultasEnum.enumValues),
        programStudi: z.string().min(1),
        angkatan: z.enum(angkatanEnum.enumValues),
        lineId: z.string().min(1),
        phoneNumber: z.string().min(1),
        lembaga: z.enum(lembagaEnum.enumValues),
        lembagaName: z.string().min(1),
        secondPartyName: z.string().min(1),
        secondPartyNim: z.string().length(8),
        secondPartyContactApp: z.enum(secondPartyContactAppEnum.enumValues),
        secondPartyContact: z.string().min(1),
        position: z.string().min(1),
        isNoisy: z.boolean(),
        commitmentSheetPath: z.string().min(1),
        paymentOption: z.enum(paymentOptionEnum.enumValues),
        accountName: z.string().min(1),
        paymentProofPath: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const existingNim = await ctx.db
        .select({ nim: lembagas.nim })
        .from(lembagas)
        .where(eq(lembagas.nim, input.nim))
        .then((res) => res.length > 0);

      if (existingNim) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "NIM already exist",
        });
      }

      const hashedPassword = await hash(input.password, 10);

      await ctx.db.insert(lembagas).values({
        ...input,
        password: hashedPassword,
        boothId: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      return { message: "Registrant created" };
    }),

  getLatest: publicProcedure.query(({ ctx }) => {
    return ctx.db.query.itbGotTalentRegistrants.findFirst({
      orderBy: (itbGotTalentRegistrants, { desc }) => [
        desc(itbGotTalentRegistrants.createdAt),
      ],
    });
  }),
});
