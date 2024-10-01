import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { typeDefs } from "./schema.js";
import { default as db } from "./local-db.js";

const resolvers = {
  Query: {
    reviews: () => db.reviews,
    authors: () => db.authors,
    games: () => db.games,

    game: (parent, args, ctx) => db.games.find((g) => g.id === args.id),
    review: (parent, args, ctx) => db.reviews.find((g) => g.id === args.id),
    author: (parent, args, ctx) => db.authors.find((g) => g.id === args.id),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8000 },
});

console.log(`🚀  Server ready at: ${url}`);
