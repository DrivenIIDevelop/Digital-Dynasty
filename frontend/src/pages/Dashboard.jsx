import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import ExpensesPie from "../components/ExpensesPie";
import { PORT } from "../port";
import httpRequest from "../js/httpRequest";
import { CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import CallMadeIcon from "@mui/icons-material/CallMade";
import CallReceivedIcon from "@mui/icons-material/CallReceived";

const expensesPieBg = [
  "#17449D",
  "#1F5ACF",
  "#447AE3",
  "#7098EA",
  "#9BB7F0",
  "#C6D6F7",
  "#102E6B",
];

const Dashboard = () => {
  const [expensesArray, setExpensesArray] = useState();
  const [paymentArray, setPaymentArray] = useState();
  const [clients, setClients] = useState();
  const [invoicesArray, setInvoicesArray] = useState();

  // Get expenses
  const getExpenses = async () => {
    const response = await httpRequest({
      url: `http://localhost:${PORT}/expenses`,
      http_method: "GET",
      request_headers: {
        "Content-Type": "application/json",
      },
    });
    if (response?.error || response?.message) return console.log(response);
    setExpensesArray(response);
  };

  // Get payments
  const getPayments = async () => {
    const payments = await httpRequest({
      url: `http://localhost:${PORT}/payments`,
      http_method: "GET",
      request_headers: {
        "Content-Type": "application/json",
      },
    });
    if (payments?.error) return;
    setPaymentArray(payments);
  };

  // Get clients
  const getClients = async () => {
    const clients = await httpRequest({
      url: `http://localhost:${PORT}/clients`,
      http_method: "GET",
      request_headers: {
        "Content-Type": "application/json",
      },
    });
    if (clients?.error) return;
    setClients(clients);
  };

  // Get invoices
  const getInvoices = async () => {
    const invoices = await httpRequest({
      url: `http://localhost:${PORT}/invoices`,
      http_method: "GET",
      request_headers: {
        "Content-Type": "application/json",
      },
    });
    if (invoices?.error) return;
    setInvoicesArray(invoices);
  };

  useEffect(() => {
    getClients();
    getInvoices();
    getExpenses();
    getPayments();
  }, [expensesArray]);

  return (
    <div id="dashboard">
      <DashboardHeader currentPage="Dashboard" />
      <h1 className="title">Welcome to PayMaven 👋</h1>
      <div className="dashboard-container">
        <div className="expenses">
          <h2 className="title-secondary">
            Expenses Analysis{" "}
            <Link className="link" to="/expenses">
              View All
            </Link>
          </h2>
          {!expensesArray && <CircularProgress />}
          <div className="expenses-doughnut-wrapper">
            {expensesArray && (
              <div className="expenses-doughnut">
                <ExpensesPie
                  data={{
                    // labels: expensesArray?.map((expense) => expense.category),
                    datasets: [
                      {
                        data: expensesArray?.map((expense) => expense.amount),
                        backgroundColor: expensesPieBg,
                        hoverBackgroundColor: expensesPieBg,
                      },
                    ],
                    hoverOffset: 4,
                  }}
                />
              </div>
            )}
            <div className="labels">
              {expensesArray?.map((expense, index) => (
                <div key={index} className="label">
                  <span
                    className="label-color"
                    style={{
                      backgroundColor: expensesPieBg[index],
                    }}
                  ></span>
                  <span className="category">{expense.category}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="payment">
          <div className="title-secondary">
            Latest Transactions
            <Link className="link" to="/payments">
              View All
            </Link>
          </div>
          <div className="wrapper">
            <div className="today-transfer">
              <span className="small">Today</span>
              <div className="transfer">
                {paymentArray &&
                  clients &&
                  paymentArray.map((payment, index) => (
                    <div key={index} className="holder">
                      <p className="transfer-type">
                        <span className="payment-icon">
                          <CallMadeIcon />
                        </span>
                        Payment to{" "}
                        {clients.find((c) => c._id === payment.client_id)?.name}
                      </p>
                      <span className="status paid">Paid</span>
                      <span className="amount">
                        ${payment.amount.$numberDecimal}.00
                      </span>
                    </div>
                  ))}
                {invoicesArray &&
                  clients &&
                  invoicesArray.map((invoice, index) => {
                    if (index > 3) return;
                    return (
                      <div key={index} className="holder">
                        <p className="transfer-type">
                          <span className={`expense-icon ${invoice.status}`}>
                            <CallReceivedIcon />
                          </span>
                          Invoice from{" "}
                          {
                            clients.find((c) => c._id === invoice.client_id)
                              ?.name
                          }
                        </p>
                        <span className={`status ${invoice.status}`}>
                          {invoice.status}
                        </span>
                        <span className="amount">
                          ${invoice.amount.$numberDecimal}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
