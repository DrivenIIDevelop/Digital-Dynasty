const express = require("express");
const cors = require("cors");

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const clientRoutes = require('./routes/clientRoutes');
const invoiceRoutes = require('./routes/invoice');
const expenseRoutes= require('./routes/expenseRoutes');
const vendorRoutes= require('./routes/vendorRoutes');
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



app.use('/expenses', expenseRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/clients', clientRoutes);
app.use('/invoices', invoiceRoutes);
app.use('/vendors', vendorRoutes);

module.exports = app;
