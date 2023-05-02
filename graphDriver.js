var { graphql, buildSchema } = require("graphql")
var db = require('./db.js');

// GraphQL schema - structure for queries and the like
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `)
var schema = buildSchema(
  `type Query {
    hello: String
    chicken: String
    getChicken(id: String): String
  }
  type Chicken {
    name: String
  }`
)


// function for each GraphQL endpoint
var rootValue = {
  hello: () => {
    return "Hello world!"
  },
  chicken: (obj, args, context, info) => {
    //     // return context.db.loadHumanByID(args.id).then(
    //     //   userData => new Human(userData)
    //     // )
    // console.log(obj, args, context, info)
    // console.log("hello?")
    return "test"
  },
  getChicken: (obj, args, context, info) => {
    var chk = db.chickens.get(obj.id)
    return chk.name
  } 
}

  


// graphql({
//   schema,
//   source: '{ getChicken(id: "chk-101") }',
//   rootValue,
// }).then(response => {
//   console.log(response)
// })
  // source: '{ getChicken(id: "test") }',


exports.getChickenById = (id) => {
  return db.chickens.get(id).name
}

// function getAllChickens(){}
// function deleteChicken(){}
// function updateChicken(){}

