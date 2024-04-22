const app = require("./app");
const dotenv = require("dotenv");
dotenv.config();

const connectToMongo = require("./db");
connectToMongo();

// set port, listen for requests
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});