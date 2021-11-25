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