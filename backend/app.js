const express = require("express");
const cors = require("cors");

const authenticateUser = require('./middlewares/authenticateUser');

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const clientRoutes = require('./routes/clientRoutes');
const invoiceRoutes = require('./routes/invoice');
const expenseRoutes = require('./routes/expenseRoutes')

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
app.use('/expenses', authenticateUser, expenseRoutes);
app.use('/user', authenticateUser, userRoutes);
app.use('/clients', authenticateUser, clientRoutes);
app.use('/invoices', authenticateUser, invoiceRoutes);

module.exports = app;
