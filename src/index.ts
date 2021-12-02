import { createServer } from "http";
import express from "express";
import { ApolloServer, gql } from "apollo-server-express";
const { prisma } = require('./prisma/client')

const startServer = async () => { 
  // Create an express server
  const app = express()
  const httpServer = createServer(app)
  // GraphQL
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
    updateTreatedBy(id: Int! name:String! description:String! logouri:String! homepage:String! imguri:String!):Treatedby
    createFish(imguri: String! description: String! name: String!): Fish
    updateFish(id: Int! name:String! description:String! imguri:String!):Fish
    deleteFish(id:Int!):Boolean
    createLocation(name: String!): Location!
    updateLocation(id:Int!  name: String!): Location!
    createHarbour(name: String! latitude: Float! longitude: Float!):Harbour
    updateHarbour(id: Int! name: String! latitude: Float! longitude: Float!):Harbour
    createFishingEquipment(name:String!):Fishingequipment
    updateFishingEquipment(id:Int! name:String!):Fishingequipment
    createBoat(name:String! imguri: String! fishingequipmentId: Int! freeze_trawler: Boolean!):Boat
    updateBoat(id: Int! name:String! imguri: String! freeze_trawler: Boolean!):Boat
  }

`;
// The Resolvers below
const resolvers = {
  Query: {
    traceability(parent:any, args:any, context:any, info:any){
      return prisma.traceability.findUnique({
        where:{
          id: args.id 
        },
        include:{
          fishingtrip: true
        }
      })
    },
    traceabilities:() =>{ return prisma.traceability.findMany()},
    fishingtrips:()=>{ return prisma.fishingtrip.findMany()},
    fishingtrip(parent:any, args:any, context:any, info:any){
      return prisma.fishingtrip.findUnique({
        where:{
          id: args.id 
        },
        include:{
          boat: true,
          treatedby: true,
          fish:true,
          location:true,
          harbour:true,          
        }
      })
    },
    treatedby:(parent:any, args:any, context:any, info:any)=>{
      return prisma.treatedby.findUnique({
        where:{
          id: args.id 
        }
      })
    },
    treatedbys:() => {return prisma.treatedby.findMany()},
    boats:(parent:any, args:any, context:any, info:any) => {
      return prisma.boat.findMany({
        include:{fishingequipment: true}
      })
    },
    boat:(parent:any, args:any, context:any, info:any) => {
      console.log(parent, args, context, info)
      return prisma.boat.findUnique({
        where:{
          id: args.id 
        },
        include: {
          fishingequipment: true
        }

      })
    },
    harbours:()=> { return prisma.harbour.findMany()},
    harbour:(parent:any, args:any, context:any, info:any) => {
      console.log(args)
      return prisma.harbour.findUnique({
        where:{
          id: args.id 
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
          id: args.id 
        }
      })
    },
    location:(parent:any,args:any, context:any, info:any) => {
      console.log(args)
      return prisma.location.findUnique({
        where:{
          id: args.id 
        }
      })
    },
    locations:() => { return prisma.location.findMany()},
    fishingequipment:(parent:any, args:any, context:any, info:any) => {
      return prisma.fishingequipment.findUnique({
        where:{
          id: args.id
        }

      })
    },
    fishingequipments: () => { return prisma.fishingequipment.findMany()},
  
  },

  Mutation: {
    deleteFish: async (parent:any, args:any, context:any, info:any) => {
      const deletedFish = await prisma.fish.delete(
        { where: {
          id: args.id
        }}
      )
      return true;
    },
    updateLocation: async(parent:any, args:any, context:any, info:any) => {
      const updateLocation = await prisma.location.update({
        where:{
          id: args.id
        },
        data:{
          name: args.name
        }
      })
      return updateLocation;
    },
    updateHarbour: async(parent:any, args:any, context:any, info:any)=>{
      const updateHarbour = await prisma.harbour.update({
        where:{
          id: args.id
        },
        data: {
          name: args.name,
          latitude: args.latitude,
          longitude: args.longitude
        }
      })
      return updateHarbour;
    },

    updateFishingEquipment: async (parent:any, args:any, context: any, info:any) => {
      const updateFe = await prisma.fishingequipment.update({
        where:{
          id: args.id
        },
        data:{
          name: args.name
        }
      })
      return updateFe;
    },

    updateBoat: async (parent:any, args:any, context:any, info:any) => {
      const updatedBoat = await prisma.boat.update(
      { 
        where:
        {
          id: args.id
        },
        data: {
          name: args.name,
          imguri: args.imguri,
          freeze_trawler: args.freeze_trawler
        } 
    })
    return updatedBoat;
    },

    updateTreatedBy: async (parent:any, args:any, context: any, info:any) => {
      const updateTreatedBy = await prisma.treatedby.update({
        where:{
          id: args.id
        },
        data: {
          name: args.name,
          description: args.description,
          homepage: args.homepage,
          logouri: args.logouri,
          imguri: args.imguri
        }
      })
      return updateTreatedBy;
    },
  

    updateFish: async (parent:any, args:any, context:any, info:any) => {
      const updatedFish = await prisma.fish.update(
        
        { where:{
          id: args.id
        },
        data: {
          name: args.name,
          description: args.description,
          imguri: args.imguri,
        }

        
      })
      return updatedFish;
    },
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

  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  })

  await apolloServer.start()

  apolloServer.applyMiddleware({
      app,
      path: '/api'
  })

  httpServer.listen({ port: process.env.PORT || 4000 }, () =>
    console.log(`Server listening on localhost:4000${apolloServer.graphqlPath}`)
  )
}

startServer()