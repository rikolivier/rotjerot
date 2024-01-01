import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const fermentRouter = createTRPCRouter({
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.ferment.delete({
        where: {
          id: input.id,
        },
      });
    }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.ferment.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  create: protectedProcedure
    .input(z.object({ title: z.string() }))
    .mutation(({ ctx, input }) => {
      return ctx.prisma.ferment.create({
        data: {
          title: input.title,
          userId: ctx.session.user.id,
        },
      });
    }),
//   update: protectedProcedure
//     .input(z.object({ note: z.string() }))
//     .mutation(({ ctx, input }) => {
//       return ctx.prisma.ferment.update({select.ctx.userId
//     }),
});
