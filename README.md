# Wise-Backend #


# This backend is hosted on heroku #
https://wise-trace.herokuapp.com/api
It uses TypeScript, GraphQL and Prism.
We have yet to implement a way to run this within the frontend
However for each Query or Mutation you just need to run them in Postman to see if they work.

## implemented as of 25/11 ##
# Queries #


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





# Mutations #

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

