import { createCallerFactory, createTRPCRouter } from "~/server/api/trpc";
import { itbGotTalentRouter } from "./routers/itbGotTalent";
import { StorageRouter } from "./routers/storage";
import { lembagaRouter } from "./routers/lembaga";
import { boothRouter } from "./routers/booth";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  itbGotTalent: itbGotTalentRouter,
  lembaga: lembagaRouter,
  booth: boothRouter,
  storage: StorageRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
