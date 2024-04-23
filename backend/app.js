const express = require("express");
const cors = require("cors");

const authRoutes = require('./routes/auth');
const clientRoutes = require('./routes/clientRoutes');

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Hello PU" });
});


app.use('/auth', authRoutes);

// Include client routes
app.use('/clients', clientRoutes);

module.exports = app;
