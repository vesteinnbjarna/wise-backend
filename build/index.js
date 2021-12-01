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
//import { GraphQLDateTime } from "graphql-iso-date";
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

  type Treatedby {
    id: ID!
    name: String!
    description: String!
    logouri: String!
    homepage: String!
    imguri: String!
  }

  type Fish {
    id: ID!
    imguri: String!
    description: String!
    name: String!
  }

  type Location {
    id: ID!
    name: String!
  }

  type Harbour {
    id: ID!
    name: String!
    latitude: Float!
    longitude: Float!
  }

  type Fishingequipment{
    id: ID!
    name: String!
  }

  type Boat{
    id: ID!
    name: String!
    imguri: String!
    fishingequipmentId: Int!
    fishingequipment: Fishingequipment
    freeze_trawler: Boolean!
  }

  type Fishingtrip{
    id: ID!
    startDate: String!
    endDate: String!
    fishId: Int!
    fish: Fish
    boatId: Int!
    boat: Boat
    harbourId: Int!
    harbour: Harbour
    locationId: Int!
    location: Location
    treatedbyid: Int!
    treatedby: Treatedby
  }

  type Traceability{
    id: ID!
    fishingtripId: Int!
    fishingtrip: Fishingtrip
  }

  type Query {
    traceability(id:Int):Traceability
    traceabilities:[Traceability]
    fishingtrips: [Fishingtrip]
    fishingtrip(id:Int): Fishingtrip
    treatedby(id:Int): Treatedby
    treatedbys:[Treatedby]
    boards: [Board]
    board: Board
    fishes: [Fish]
    fish(id: Int): Fish
    location(id: Int): Location
    locations:[Location]
    harbours: [Harbour]
    harbour(id:Int):Harbour
    fishingequipments:[Fishingequipment]
    fishingequipment(id:Int): Fishingequipment
    boat(id:Int):Boat
    boats:[Boat]
  }

  type Mutation {
    createTraceability(fishingtripId: Int!):Traceability
    createFishingTrip(startDate: String! endDate: String! fishId:Int! boatId:Int! harbourId:Int! locationId:Int! treatedbyid: Int!):Fishingtrip
    createTreatedBy(name:String! description:String! logouri:String! homepage:String! imguri:String!):Treatedby
    createFish(imguri: String! description: String! name: String!): Fish
    createLocation(name: String!): Location
    createHarbour(name: String! latitude: Float! longitude: Float!):Harbour
    createFishingEquipment(name:String!):Fishingequipment
    createBoat(name:String! imguri: String! fishingequipmentId: Int! freeze_trawler: Boolean!):Boat
  }

`;
    const resolvers = {
        Query: {
            traceability(parent, args, context, info) {
                return prisma.traceability.findUnique({
                    where: {
                        id: args.id
                    },
                    include: {
                        fishingtrip: true
                    }
                });
            },
            traceabilities: () => { return prisma.traceability.findMany(); },
            fishingtrips: () => { return prisma.fishingtrip.findMany(); },
            fishingtrip(parent, args, context, info) {
                return prisma.fishingtrip.findUnique({
                    where: {
                        id: args.id
                    },
                    include: {
                        boat: true,
                        treatedby: true,
                        fish: true,
                        location: true,
                        harbour: true,
                    }
                });
            },
            treatedby: (parent, args, context, info) => {
                return prisma.treatedby.findUnique({
                    where: {
                        id: args.id
                    }
                });
            },
            treatedbys: () => { return prisma.treatedby.findMany(); },
            boats: (parent, args, context, info) => {
                return prisma.boat.findMany({
                    include: { fishingequipment: true }
                });
            },
            boat: (parent, args, context, info) => {
                console.log(parent, args, context, info);
                return prisma.boat.findUnique({
                    where: {
                        id: args.id
                    },
                    include: {
                        fishingequipment: true
                    }
                });
            },
            harbours: () => { return prisma.harbour.findMany(); },
            harbour: (parent, args, context, info) => {
                console.log(args);
                return prisma.harbour.findUnique({
                    where: {
                        id: args.id
                    }
                });
            },
            boards: () => {
                return prisma.board.findMany();
            },
            fishes: () => {
                return prisma.fish.findMany();
            },
            fish: (parent, args, context, info) => {
                console.log(args);
                return prisma.fish.findUnique({
                    where: {
                        id: args.id
                    }
                });
            },
            location: (parent, args, context, info) => {
                console.log(args);
                return prisma.location.findUnique({
                    where: {
                        id: args.id
                    }
                });
            },
            locations: () => { return prisma.location.findMany(); },
            fishingequipment: (parent, args, context, info) => {
                return prisma.fishingequipment.findUnique({
                    where: {
                        id: args.id
                    }
                });
            },
            fishingequipments: () => { return prisma.fishingequipment.findMany(); },
        },
        Mutation: {
            createTraceability: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                const newTraceability = yield prisma.traceability.create({
                    data: {
                        fishingtripId: args.fishingtripId
                    }
                });
                return newTraceability;
            }),
            createFishingTrip: (parent, args, context) => __awaiter(void 0, void 0, void 0, function* () {
                const newFishingTrip = yield prisma.fishingtrip.create({
                    data: {
                        startDate: args.startDate,
                        endDate: args.endDate,
                        fishId: args.fishId,
                        boatId: args.boatId,
                        harbourId: args.harbourId,
                        locationId: args.locationId,
                        treatedbyid: args.treatedbyid
                    }
                });
                return newFishingTrip;
            }),
            createTreatedBy: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                const newTreatedBy = yield prisma.treatedby.create({
                    data: {
                        name: args.name,
                        description: args.description,
                        logouri: args.logouri,
                        homepage: args.homepage,
                        imguri: args.imguri,
                    }
                });
                return newTreatedBy;
            }),
            createBoat: (parent, args, context, info) => __awaiter(void 0, void 0, void 0, function* () {
                const newBoat = yield prisma.boat.create({
                    data: {
                        name: args.name,
                        imguri: args.imguri,
                        fishingequipmentId: args.fishingequipmentId,
                        freeze_trawler: args.freeze_trawler,
                    }
                });
                return newBoat;
            }),
            createFish: (parent, args, context, info) => {
                const newFish = prisma.fish.create({
                    data: {
                        name: args.name,
                        description: args.description,
                        imguri: args.imguri,
                    }
                });
                return newFish;
            },
            createHarbour: (parent, args, context, info) => {
                console.log(args);
                const newHarbour = prisma.harbour.create({
                    data: {
                        name: args.name,
                        latitude: args.latitude,
                        longitude: args.longitude,
                    }
                });
                return newHarbour;
            },
            createLocation: (parent, args, context, info) => {
                const newLocation = prisma.location.create({
                    data: {
                        name: args.name
                    }
                });
                return newLocation;
            },
            createFishingEquipment: (parent, args, context, info) => {
                const newFe = prisma.fishingequipment.create({
                    data: {
                        name: args.name
                    }
                });
                return newFe;
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
