const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectToMongo = async () => {
  try {
    // todo: determine the environment and establish a connection to the corresponding database.
    // at the moment, test and development are using the same database.
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("CONNECTED TO MONGO DB DATABASE 🌐");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  } 
};

const disconnectFromMongo =  () => {
  try {
    mongoose.disconnect();
    console.log("DISCONNECTED FROM MONGO DB DATABASE 🌐");
  } catch (error) {
    console.error("Error disconnecting from MongoDB:", error);
  }
}

module.exports = {
  connectToMongo,
  disconnectFromMongo
};