  const { ApolloServer } = require("apollo-server");
  const { PubSub } = require("graphql-subscriptions"); 

  const mongoose = require("mongoose");
  const { MONGODB } = require("./config");

  const typeDefs = require("./graphql/typeDefs");
  const resolvers = require("./graphql/resolvers");

  const pubsub = new PubSub();

  const startServer = async () => {
    try { 
      await mongoose.connect(MONGODB);
      console.log("Database connected successfully");

      const server = new ApolloServer({
        typeDefs,
        resolvers,
        context:({req}) => ({ req , pubsub }),
      });

      const { url } = await server.listen({ port: 5000 });
      console.log(`Server running at ${url}`);
    } catch (error) {
      console.error(
        "Error connecting to the database or starting the server:",
        error
      );
    }
  };

  startServer();
