import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

// db
import db from "./db.js";

// Import TypeDefs
import { typeDefs } from "./schema.js";

// Resolver
const resolvers = {
  Query: {
    games() {
      return db.games;
    },
    reviews() {
      return db.reviews;
    },
    authors() {
      return db.authors;
    },
    review(_, args){
        return db.reviews.find((review) => review.id === args.id)
    },
    author(_, args){
        return db.authors.find((author) => author.id === args.id)
    },
    game(_, args){
        return db.games.find((game) => game.id === args.id)
    }
  },
};

// server setup
const server = new ApolloServer({
  typeDefs,
  resolvers
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 8000 },
});

console.log("server started at port ", 8000);