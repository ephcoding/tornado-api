require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");

const schema = require("./graphql/schema");
const resolvers = require("./graphql/resolvers");
const { client, connectDB } = require("./og_api_code/db/connect");

const cors = require("cors");

const port = process.env.PORT || 5000;
const app = express();

connectDB();
var MongoClient = require("mongodb").MongoClient;

// ******************************************
// Initialize connection once
// MongoClient.connect("mongodb://localhost:27017/integration_test", function(err, database) {
//   if(err) throw err;

//   const db = database;

// Start the application after the database connection is ready
//   app.listen(3000);
//   console.log("Listening on port 3000");
// });
// Reuse database object in request handlers
// app.get("/", function(req, res) {
//   db.collection("replicaset_mongo_client_collection").find({}, function(err, docs) {
//     docs.each(function(err, doc) {
//       if(doc) {
//         console.log(doc);
//       }
//       else {
//         res.end();
//       }
//     });
//   });
// });
// ******************************************

app.use(cors());
app.use(
	"/graphql",
	graphqlHTTP({
		schema,
		rootValue: resolvers,
		// validationRules: ,
		// fieldResolver: ,
		// typeResolver: ,
		graphiql: true,
		// extensions: ,
		// context: ,
		// customParseFn: ,
		// customExecuteFn: ,
		// customValidateFn: ,
	})
);

app.listen(port, console.log(`>> SERVER: running on port [${port}]`));
