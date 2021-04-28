import { PrismaClient } from ".prisma/client";

import { RequestHandler } from "express";
import createLoader from "./loader";
import { RootContext } from "./types";

const prisma = new PrismaClient();
const context: RootContext = {
  prisma,
  loader: createLoader(prisma),
};
export const createDbContext: RequestHandler<undefined, any, any, undefined, RootContext> = (_, res, next)=>{
    res.locals = context
    next()
}
