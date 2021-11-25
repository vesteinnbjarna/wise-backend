"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_1 = require("http");
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const { prisma } = require('./prisma/client');
// Alltaf að muna að breyta url-inu fyrir DB fyrir deployment
const startServer = () => __awaiter(void 0, void 0, void 0, function* () {
    // 2
    const app = (0, express_1.default)();
    const httpServer = (0, http_1.createServer)(app);
    // 3
    const typeDefs = (0, apollo_server_express_1.gql) `
    type Board {
    id: ID!
    title: String!
    description: String
    path: String!
  }

  type FishInput {
    imguri: String!
    description: String!
    name: String!
  }

  type Fish {
    id: ID!
    imguri: String!
    description: String!
    name: String!
  }



  type Query {
    boards: [Board]
    board: Board
    fishes: [Fish]
    fish(id: ID!): Fish
  }

  type Mutation {
    createFish(
      imguri: String!
      description: String!
      name: String!
    ): Fish 
  }

`;
    const resolvers = {
        Query: {
            boards: () => {
                return prisma.board.findMany();
            },
            fishes: () => {
                return prisma.fish.findMany();
            },
            fish: (id) => {
                return prisma.fish.find(id);
            }
        },
        Mutation: {
            createFish: (parent, args, context, info) => {
                const newFish = prisma.fish.create({
                    data: {
                        name: args.name,
                        description: args.description,
                        imguri: args.imguri,
                    }
                });
                return newFish;
            }
        }
    };
    // 5
    const apolloServer = new apollo_server_express_1.ApolloServer({
        typeDefs,
        resolvers,
    });
    // 6
    yield apolloServer.start();
    // 7
    apolloServer.applyMiddleware({
        app,
        path: '/api'
    });
    // 8
    httpServer.listen({ port: process.env.PORT || 4000 }, () => console.log(`Server listening on localhost:4000${apolloServer.graphqlPath}`));
});
startServer();
