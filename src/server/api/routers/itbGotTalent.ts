import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  itbGotTalentCategoryEnum,
  itbGotTalentInstanceEnum,
  itbGotTalentRegistrants,
} from "~/server/db/schema";

export const itbGotTalentRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  create: publicProcedure
    .input(
      z.object({
        instance: z.enum(itbGotTalentInstanceEnum.enumValues),
        category: z.enum(itbGotTalentCategoryEnum.enumValues),
        name: z.string().min(1),
        nim: z.string().min(1),
        programStudi: z.string().min(1),
        lineId: z.string().min(1),
        phoneNumber: z.string().min(1),
        instagram: z.string().min(1),
        members: z.array(z.string()).default([]),
        ktmPath: z.string().min(1),
        description: z.string().min(1),
        videoLink: z.string().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.db.insert(itbGotTalentRegistrants).values({
        instance: input.instance,
        category: input.category,
        name: input.name,
        nim: input.nim,
        programStudi: input.programStudi,
        lineId: input.lineId,
        phoneNumber: input.phoneNumber,
        instagram: input.instagram,
        members: input.members,
        ktmPath: input.ktmPath,
        description: input.description,
        videoLink: input.videoLink,
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
