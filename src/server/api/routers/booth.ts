import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import { lembagas } from "~/server/db/schema";
import { eq } from "drizzle-orm";
import { TRPCError } from "@trpc/server";

export const boothRouter = createTRPCRouter({
  getAvailableBooths: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.query.booths.findMany({
      where: (booths, { isNull }) => 
        isNull(
          ctx.db.select({ boothId: lembagas.boothId })
            .from(lembagas)
            .where(eq(lembagas.boothId, booths.id))
        )
    });
  }),

  registerLembagaBooth: protectedProcedure
    .input(
      z.object({
        boothId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { boothId } = input;
      const booth = await ctx.db.query.booths.findFirst({
        where: (booths, { eq }) => eq(booths.id, boothId),
      });

      if (!booth) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Booth not found",
        });
      }

      const lembaga = await ctx.db.query.lembagas.findFirst({
        where: (lembagas, { eq }) => eq(lembagas.id, ctx.session.user.id),
      });

      if (!lembaga) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Lembaga not found",
        });
      }

      if (lembaga.boothId) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Booth already registered",
        });
      }

      const lembagaWithBooth = await ctx.db.query.lembagas.findFirst({
        where: (lembagas, { eq }) => eq(lembagas.boothId, boothId),
      });

      if (lembagaWithBooth) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Booth already taken",
        });
      }

      await ctx.db
        .update(lembagas)
        .set({ boothId })
        .where(eq(lembagas.id, ctx.session.user.id));

      return { message: "Booth registered", booth };
    }),
});
