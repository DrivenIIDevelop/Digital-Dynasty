const express = require("express");
const cors = require("cors");

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const clientRoutes = require('./routes/clientRoutes');
const invoiceRoutes = require('./routes/invoice');

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
app.use('/user', userRoutes);
app.use('/clients', clientRoutes);
app.use('/invoices', invoiceRoutes);

module.exports = app;
