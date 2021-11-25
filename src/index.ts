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



  type Query {
    boards: [Board]
    board: Board
    fishes: [Fish]
    fish(id: Int): Fish
    location(id: Int): Location
    locations:[Location]
    harbours: [Harbour]
    harbour(id:Int):Harbour
  }

  type Mutation {
    createFish(imguri: String! description: String! name: String!): Fish
    createLocation(name: String!): Location
    createHarbour(name: String! latitude: Float! longitude: Float!):Harbour
  }

`;

const resolvers = {
  Query: {
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
  
  },

  Mutation: {
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