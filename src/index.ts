import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
const { prisma } = require('./prisma/client')

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

  type Query {
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
    createFish(imguri: String! description: String! name: String!): Fish
    createLocation(name: String!): Location
    createHarbour(name: String! latitude: Float! longitude: Float!):Harbour
    createFishingEquipment(name:String!):Fishingequipment
    createBoat(name:String! imguri: String! fishingequipmentId: Int! freeze_trawler: Boolean!):Boat
  }

`;

const resolvers = {
  Query: {
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