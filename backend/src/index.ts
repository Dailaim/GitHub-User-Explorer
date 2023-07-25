import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { resolvers } from "./controllers";
import { prisma } from "./prismaClient";
import { schema } from "./schema";

const server = new ApolloServer({
	typeDefs: schema,
	resolvers, 
} );

const port = (process.env.PORT || 4000) as number;

try {
	const { url } = await startStandaloneServer(server, {
		listen: { 
      port: port
    },
    context: async () => ({
      prisma:  prisma  ,
    }),

	});

	console.log(`🚀  Server ready at: ${url}`);
} catch (err) {
	console.error(err);
}
