import { reservationRouter } from "./reservation-router";
import { consultationRouter } from "./consultation-router";
import { createRouter, publicQuery } from "./middleware";

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),
  reservation: reservationRouter,
  consultation: consultationRouter,
});

export type AppRouter = typeof appRouter;
