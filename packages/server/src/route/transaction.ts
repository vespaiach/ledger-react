// const getTransactions: RequestHandler<
//   unknown,
//   ResponseData<Transaction[]>,
//   unknown,
//   { year: number },
//   RootContext
// > = async (req, res, next) => {
//   if (isNaN(req.query.year)) {
//     next(new Error('Invalid year query'));
//     return;
//   }

//   try {
//     const fromDate = new Date(req.query.year, 0, 1, 0, 0);
//     const toDate = new Date(req.query.year, 11, 31, 0, 0);

//     res.status(200).send({
//       data: await res.locals.prisma.transaction.findMany({
//         where: {
//           date: {
//             gte: fromDate,
//             lt: toDate,
//           },
//         },
//       }),
//     });
//   } catch (err) {
//     next(err);
//   }
// };
