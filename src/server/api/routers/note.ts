// import { z } from "zod";

// import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

// export const noteRouter = createTRPCRouter({
//   getAll: protectedProcedure.query(({ ctx }) => {
//       return ctx.prisma.note.findMany({
//         where: {
//           fermentId: ctx.prisma.note.fermentId,
//         },
//       });
//     }),
// });
