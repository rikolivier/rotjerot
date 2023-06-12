import { z } from 'zod';

import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc';

export const fermentRouter = createTRPCRouter({
    getAll: protectedProcedure
   .query(({ ctx }) => {
    return ctx.prisma.ferment.findMany({
        where: {
            id: ctx.session.user.id,
        }
    });
    }),
    create: protectedProcedure
    .input(z.object({ title: z.string()}))
    .mutation(({ctx, input}) => {
        return ctx.prisma.ferment.create({
        data: {
            title: input.title,
            userId: ctx.session.user.id,
        },
    });
})
});