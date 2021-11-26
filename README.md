# Wise-Backend #


# This backend is hosted on heroku #
https://wise-trace.herokuapp.com/api
It uses TypeScript, GraphQL and Prism.
We have yet to implement a way to run this within the frontend
However for each Query or Mutation you just need to run them in Postman to see if they work.

## implemented as of 25/11 ##
## Fish Queries and Mutations ##

### fishes ###

returns all fishes in the database
```
query
{
    fishes {
        id
        name
        description
        imguri
    }
}
```

### fish ###
returns a single fish or undefined
```
query{
  fish(id: 8) {
    id
    imguri
    description
    name
  }
}
```



### **createFish** ###
creates a fish and then returns it. If the name is already present in the database it will not create it.
```
mutation {
    createFish(imguri: "www.bigfish.com", description: "sad fish eats alot", name: "bigfish3") {
    id
    name
    description
    imguri
    
  }
}
```

## Location Queries and Mutations ##
### locations ###

returns all fishes in the database
```
query {
  locations {
    id,
    name
  }
}
```

### location ###
returns a single fish or undefined
```
query  {
  location(id:1) {
    id,
    name
  }
}
```



### **createLocation** ###
creates a location and then returns it. If the name is already present in the database it will not create it.
```
mutation  {
  createLocation(name: "Reykjavík") {
    id
    name
  }
}
```

### **createFish** ###
creates a fish and then returns it. If the name is already present in the database it will not create it.
```
mutation {
    createFish(imguri: "www.bigfish.com", description: "sad fish eats alot", name: "bigfish3") {
    id
    name
    description
    imguri
    
  }
}
```

## Harbour Queries and Mutations ##
### harbours ###

returns all harbours in the database
```
query Harbours {
  harbours {
    id
    name
    latitude
    longitude
  }
}
```

### harbour ###
returns a single harbour or undefined
```
query Harbour {
  harbour(id:1) {
    id
    name
    longitude
    latitude
  }
}
```

### **createHarbour** ###
creates a harbour and then returns it. If the name is already present in the database it will not create it.
```
mutation {
  createHarbour(name: "Hafnarfjörður", latitude: 55.1, longitude: 55.2) {
    id
    name
    latitude
    longitude
    
  }
}
```

## FishingEquipment Queries and Mutations ##
### FE ###

returns all fe in the database
```
query {
  fishingequipments {
    id
    name
  }
```

### FishingEquipment ###
returns a single fe or undefined
```
query {
  fishingequipment(id:1) {
    id
    name
  }
}
```

### **createFishingEquipment** ###
creates a fe and then returns it. If the name is already present in the database it will not create it.
```
mutation {
  createFishingEquipment(name: "bby") {
    id
    name
  }
}
```


## Boats Queries and Mutations ##
### boats ###

returns all boats in the database
```
query Boats {
  boats {
    id
    name
    imguri
    freeze_trawler
    fishingequipmentId
  }
}
```

### boat ###
returns a single boat or undefined
```
query Query {
  boat(id:1) {
    id
    name
    imguri
    fishingequipmentId
    freeze_trawler  
  }
}
```

### **createBoat** ###
creates a boat and then returns it. If the name is already present in the database it will not create it. Also it has a foreign key contraint on fishingequipmentId, it needs to be present in the data base for it to be created.
```
mutation CreateBoat {
  createBoat(name: "Gullfoss-3", imguri: "www.boat.com", fishingequipmentId: 1, freeze_trawler: true) {
    name
    id
    imguri
    fishingequipmentId
    freeze_trawler 
  }
}
```

## TreatedBy Queries and Mutations ##
### treatedbys ###

returns all treatedby in the database
```
query Treatedbys {
  treatedbys {
    id
    name
    description
    logouri
    homepage
    imguri
  }
}
```

### treatedby ###
returns a single treatedby or undefined
```
query Query {
  treatedby(id:1) {
    name
    description
    id
    logouri
    homepage
    imguri
  }
}
```

### **createTreatedBy** ###
creates a treatedby and then returns it. If the name is already present in the database it will not create it. 
```
mutation CreateTreatedBy{
  createTreatedBy(name: "Brim3", description: "Brim is a cool company", logouri: "www.brim.com/logo", homepage: "brim.is", imguri: "brim.is/img") {
    name
    description
    id
    logouri
    homepage
    imguri
  }
}
```