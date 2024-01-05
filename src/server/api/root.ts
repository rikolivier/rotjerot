import { createTRPCRouter } from "./trpc";
import { fermentRouter } from "./routers/ferment";
import { noteRouter } from "./routers/note";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  ferment: fermentRouter,
  note: noteRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
