import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
const { prisma } = require('./prisma/client')
//import { GraphQLDateTime } from "graphql-iso-date";

// Alltaf að muna að breyta url-inu fyrir DB fyrir deployment
const startServer = async () => { 

  // 2
  
  const app = express()
  const httpServer = createServer(app)

  // 3
  const typeDefs = gql`
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
    freeze_trawler: Boolean!
  }

  type Fishingtrip{
    id: ID!
    startDate: String!
    endDate: String!
    fishId: Int!
    boatId: Int!
    harbourId: Int!
    locationId: Int!
    treatedbyid: Int!
  }

  type Traceability{
    id: ID!
    fishingtripId: Int!
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
    traceability(parent:any, args:any, context:any, info:any){
      return prisma.traceability.findUnique({
        where:{
          id: args.id || undefined,
        }
      })
    },
    traceabilities:() =>{ return prisma.traceability.findMany()},
    fishingtrips:()=>{ return prisma.fishingtrip.findMany()},
    fishingtrip(parent:any, args:any, context:any, info:any){
      return prisma.fishingtrip.findUnique({
        where:{
          id: args.id || undefined
        }
      })
    },
    treatedby:(parent:any, args:any, context:any, info:any)=>{
      return prisma.treatedby.findUnique({
        where:{
          id: args.id || undefined
        }
      })
    },
    treatedbys:() => {return prisma.treatedby.findMany()},
    boats:() => {return prisma.boat.findMany()},
    boat:(parent:any, args:any, context:any, info:any) => {
      return prisma.boat.findUnique({
        where:{
          id: args.id || undefined
        }
      })
    },
    harbours:()=> { return prisma.harbour.findMany()},
    harbour:(parent:any, args:any, context:any, info:any) => {
      console.log(args)
      return prisma.harbour.findUnique({
        where:{
          id: args.id || undefined
        }
      })
    },
    boards: () => {
      return prisma.board.findMany()
    },
    fishes: () => {
      return prisma.fish.findMany()
    },
    fish: (parent:any, args:any, context:any, info:any) => {
      console.log(args)
      return prisma.fish.findUnique({
        where:{
          id: args.id || undefined
        }
      })
    },
    location:(parent:any,args:any, context:any, info:any) => {
      console.log(args)
      return prisma.location.findUnique({
        where:{
          id: args.id || undefined
        }
      })
    },
    locations:() => { return prisma.location.findMany()},
    fishingequipment:(parent:any, args:any, context:any, info:any) => {
      return prisma.fishingequipment.findUnique({
        where:{
          id: args.id || undefined
        }
      })
    },
    fishingequipments: () => { return prisma.fishingequipment.findMany()},
  
  },

  Mutation: {
    createTraceability: async(parent:any, args:any, context:any, info:any) => { 
      const newTraceability = await prisma.traceability.create({
        data: {
          fishingtripId: args.fishingtripId
        }
      })
      return newTraceability},

    createFishingTrip: async(parent:any, args:any, context:any) => { 
      const newFishingTrip = await prisma.fishingtrip.create({

        data: {
          startDate: args.startDate,
          endDate: args.endDate,
          fishId: args.fishId,
          boatId: args.boatId,
          harbourId: args.harbourId,
          locationId: args.locationId,
          treatedbyid: args.treatedbyid
        }
      })
      return newFishingTrip;
    },

    createTreatedBy: async (parent:any, args:any, context:any, info:any) =>
    {
      const newTreatedBy = await prisma.treatedby.create({
        data: {
          name: args.name,
          description: args.description,
          logouri: args.logouri,
          homepage: args.homepage,
          imguri: args.imguri,
        }
      })
      return newTreatedBy
    },


    createBoat: async (parent:any, args:any, context:any, info:any) => {
      const newBoat = await prisma.boat.create({
        data: {
          name: args.name,
          imguri: args.imguri,
          fishingequipmentId: args.fishingequipmentId,
          freeze_trawler: args.freeze_trawler,
        }
      })
      return newBoat
    },
    createFish: (parent:any, args:any, context:any, info:any) => {
      const newFish = prisma.fish.create({
        data: {
          name: args.name,
          description: args.description,
          imguri: args.imguri,
        }
      })
      return newFish;
    },
     createHarbour: (parent:any, args:any, context:any, info:any) => {
      console.log(args)
      const newHarbour= prisma.harbour.create({
        data: {
          name: args.name,
          latitude: args.latitude,
          longitude: args.longitude,
        }
      })
      return newHarbour;
    },


    createLocation: (parent:any, args:any, context:any, info:any) => {
      const newLocation = prisma.location.create({
        data: {
          name: args.name
        }
      })

      return newLocation;
    },

    createFishingEquipment:(parent:any, args:any, context:any, info:any) => { 
      const newFe = prisma.fishingequipment.create({
        data: {
          name: args.name
        }
      })

      return newFe;
    }



  }
};

  // 5
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  // 6
  await apolloServer.start()

  // 7
  apolloServer.applyMiddleware({
      app,
      path: '/api'
  })

  // 8
  httpServer.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`Server listening on localhost:4000${apolloServer.graphqlPath}`)
  )
}

startServer()