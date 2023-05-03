var { graphql, buildSchema } = require("graphql")
var db = require('./db.js');

// GraphQL schema - structure for queries and the like

var schema = buildSchema(
  `type Query {
    chicken: String
    getChicken(id: String): Chicken
    getAllChickens: [Chicken]
  }
  type Mutation {
    hatch(id: String, name: String, breed: String, color: String, farmID: Int): String
    decapitate(id: String!): String
    mutateChicken (id: String! name: String, breed: String, color: String, avgEggsPerWeek: Int farmID: Int): String
  }
  type Chicken {
    id: String
    name: String
    age: Int
    breed: String
    color: String
    avgEggsPerWeek: Int
    farmID: Int
  }`
)


// function for each GraphQL endpoint
var rootValue = {
  chicken: (obj, args, context, info) => {
    return "test"
  },
  getChicken: (obj, args, context, info) => {
    var chk = db.chickens.get(obj.id)
    return chk
  },
  getAllChickens: () => {
    var chk = db.chickens.list()
    return chk
  },
  hatch: (obj) => {
    obj.age = 0;
    obj.avgEggsPerWeek = 0;

    try {
      db.chickens.create(obj)
    } catch (err) {
      return "Failed";
    }
    return "Success";
  },
  decapitate: (obj) => {
    console.log(obj.id)

    try {
      db.chickens.delete(obj.id);
    } catch (err) {
      return "Failed";
    }
    return "Success";
  },
  mutateChicken: (obj) => {
    console.log(obj)

    try {
      db.chickens.update(obj);
    } catch (err) {
      return "Failed";
    }
    return "Success";
  }
}


//exported functions to plug for API

//GET
exports.getChickenById = async (id) => {
  var chicken = null;
  console.log(id)

  await graphql({
    schema,
    source: '{ getChicken(id: "' + id + '"){name} }',
    rootValue,
  }).then(response => {
    chicken = response
  })

  return chicken
}

exports.getAllChickens = async() => {
  var result = null;

  await graphql({
    schema,
    source: '{ getAllChickens{id, name} }',
    rootValue,
  }).then(response => {
    result = response
  })

  console.log(result)

  return result
}




//CREATE
exports.hatch = async (obj) => {
  var result = null

  await graphql({
    schema,
    source: 'mutation Hatch { hatch (id: "' + obj.id + '", name:"' + obj.name + '", breed: "' + obj.breed + '", color: "' + obj.color + '", farmID: ' + parseInt(obj.farmID) + ') }',
    rootValue,
  }).then(response => {
    result = response
  })

  console.log(result)
  return result
}



//DELETE
exports.deleteChicken = async (id) => {
  var result = null

  await graphql({
    schema,
    source: 'mutation Decapitate { decapitate(id: "' + id + '") }',
    rootValue,
  }).then(response => {
    result = response
  })

  return result
}



//UPDATE
exports.mutateChicken = async (obj) => {
  var result = null

  var query = 'mutation MutateChicken { mutateChicken (id: "'+ obj.id + '"';

  if(obj.hasOwnProperty("name")){
    query += ', name:"' + obj.name + '"'
  }
  if(obj.hasOwnProperty("age")){
    query += ', age:' + obj.age
  }
  if(obj.hasOwnProperty("breed")){
    query += ', breed:"' + obj.breed + '"'
  }
  if(obj.hasOwnProperty("color")){
    query += ', color:"' + obj.color + '"'
  }
  if(obj.hasOwnProperty("avgEggsPerWeek")){
    query += ', avgEggsPerWeek:' + obj.avgEggsPerWeek
  }
  if(obj.hasOwnProperty("farmID")){
    query += ', farmID:' + obj.farmID
  }

  query += ') }';

  await graphql({
    schema,
    source: query,
    rootValue,
  }).then(response => {
    result = response
  })

  return result
}

