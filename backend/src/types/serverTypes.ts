import { ApolloServerOptions, BaseContext } from "@apollo/server";
import { PrismaClient } from "@prisma/client";

export type context = {
	prisma: PrismaClient;
};

export type serverType = ApolloServerOptions<BaseContext> & { context };
