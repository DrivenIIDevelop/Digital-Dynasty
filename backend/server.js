const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const { connectToMongo, disconnectFromMongo} = require("./db");

const startServer = async () => {
  try {
    await connectToMongo();
    // set port, listen for requests
    const PORT = process.env.PORT || 8080;
    
    const server = app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });

    // Server Shutting down
    process.on("SIGINT", async () => {
      console.log("Shutting down the server...");
      await disconnectFromMongo();

      server.close(() => {
        console.log("Server successfully shut down.");
        process.exit(0);
      });
    });
    
  } catch (error) {
    console.error("Error starting server:", error);
    disconnectFromMongo();
  }
};

startServer();