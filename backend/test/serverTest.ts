import { ApolloServer } from '@apollo/server';
import { resolvers } from '../src/controllers';
import { schema } from '../src/schema';

const serverTest = new ApolloServer({
  typeDefs: schema,
  resolvers, 
});

export {  serverTest };

