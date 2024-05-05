import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { CircularProgress } from "@mui/material";
import httpRequest from "../js/httpRequest";
import { PORT } from "../port";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Payment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [paymentArray, setPaymentArray] = useState([]);
  const [paymentData, setPaymentData] = useState({
    client_id: "",
    payment_date: "",
    amount: {
      $numberDecimal: "",
    },
    method: "cash",
  });
  const [updatePayment, setUpdatePayment] = useState(null);
  const [clients, setClients] = useState([]);
  // Date formatter
  const dateOptions = { day: "2-digit", month: "2-digit", year: "2-digit" };

  // Get payments
  const getPayments = async () => {
    const payments = await httpRequest({
      url: `http://localhost:${PORT}/payments`,
      http_method: "GET",
      request_headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
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
    if (clients?.error || clients?.message) return;

    setClients(clients);
  };

  useEffect(() => {
    getPayments();
    getClients();
  }, []);
  // Handle modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await httpRequest({
      url: `http://localhost:${PORT}/payments`,
      http_method: "POST",
      request_headers: {
        "Content-Type": "application/json",
      },
      request_body: JSON.stringify({
        client_id: paymentData.client_id,
        payment_date: paymentData.payment_date,
        amount: paymentData.amount,
        method: paymentData.method,
      }),
    });
    getPayments();
    handleClose();
  };

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    await httpRequest({
      url: `http://localhost:${PORT}/payments/${paymentData._id}`,
      http_method: "PUT",
      request_headers: {
        "Content-Type": "application/json",
      },
      request_body: JSON.stringify({
        client_id: paymentData.client_id,
        payment_date: paymentData.payment_date,
        amount: { $numberDecimal: paymentData.amount.$numberDecimal },
        method: paymentData.method,
      }),
    });
    getPayments();
    handleClose();
  };

  // handle delete
  const handleDelete = async () => {
    await httpRequest({
      url: `http://localhost:${PORT}/payments/${paymentData._id}`,
      http_method: "DELETE",
      request_headers: {
        "Content-Type": "application/json",
      },
    });
    getPayments();
    handleClose();
  };

  return (
    <div id="payment">
      <DashboardHeader currentPage="Payment" />
      <div className="container">
        <h1 className="title">PAYMENT</h1>
        <p className="description">Optimize your payments</p>
        <div className="table-container">
          <div className="add-payment-container"></div>

          {/* Material UI modal */}
          <div className="add-client-container">
            <Button
              onClick={() => {
                setUpdatePayment(false);
                setPaymentData({
                  client_id: "",
                  payment_date: "",
                  amount: {
                    $numberDecimal: "",
                  },
                  method: "cash",
                });
                handleOpen();
              }}
              className="add-client"
            >
              Add payment
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-form"
            >
              <Box sx={style}>
                <Typography
                  id="modal-modal-title"
                  variant="h6"
                  component="h2"
                  style={{ textAlign: "center" }}
                >
                  {updatePayment ? "Update Payment" : "Add Payment"}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                ></Typography>
                <form
                  onSubmit={updatePayment ? handleUpdate : handleSubmit}
                  className="form"
                >
                  {!updatePayment && (
                    <label htmlFor="clientId">
                      Client
                      <select
                        value={paymentData.client_id}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            client_id: e.target.value,
                          })
                        }
                        name="clientId"
                        id="clientId"
                        required
                      >
                        <option value="">Select Client</option>
                        {clients?.map((client) => (
                          <option value={client._id} key={client._id}>
                            {client.name}
                          </option>
                        ))}
                      </select>
                    </label>
                  )}
                  {!updatePayment && (
                    <label htmlFor="paymentDate">
                      Payment date
                      <input
                        type="date"
                        name="paymentDate"
                        id="paymentDate"
                        value={paymentData.payment_date}
                        onChange={(e) =>
                          setPaymentData({
                            ...paymentData,
                            payment_date: e.target.value,
                          })
                        }
                        required
                      />
                    </label>
                  )}
                  <label htmlFor="amount">
                    Amount
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      value={paymentData.amount.$numberDecimal}
                      onChange={(e) =>
                        setPaymentData({
                          ...paymentData,
                          amount: { $numberDecimal: e.target.value },
                        })
                      }
                      required
                    />
                  </label>
                  {!updatePayment && (
                    <label htmlFor="method">
                      Method
                      <select
                        value={paymentData.method}
                        onChange={(e) => {
                          setPaymentData({
                            ...paymentData,
                            method: e.target.value,
                          });
                        }}
                        name="method"
                        id="method"
                        required
                      >
                        <option value="cash">Cash</option>
                        <option value="credit_card">Credit Card</option>
                        <option value="bank_transfer">Bank Transfer</option>
                      </select>
                    </label>
                  )}
                  <button type="submit" className="submit">
                    {updatePayment ? "Update Payment" : "Add Payment"}
                  </button>
                  {updatePayment && (
                    <button onClick={handleDelete} className="delete">
                      Delete Payment
                    </button>
                  )}
                </form>
              </Box>
            </Modal>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Payment date</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Created at</th>
                <th>Updated at</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="6">
                    <CircularProgress />
                  </td>
                </tr>
              )}
              {(paymentArray?.message || paymentArray.error) && (
                <tr>
                  <td colSpan="6">{paymentArray?.message}</td>
                </tr>
              )}
              {!paymentArray?.message &&
                paymentArray?.map((payment) => (
                  <tr
                    onClick={() => {
                      setUpdatePayment(true);
                      const formattedDate = new Date(payment.payment_date)
                        .toISOString()
                        .slice(0, 10);

                      setPaymentData({
                        ...payment,
                        payment_date: formattedDate,
                      });
                      handleOpen();
                    }}
                    key={payment._id}
                  >
                    <td>
                      {clients.find((c) => c._id === payment.client_id)?.name}
                    </td>
                    <td>
                      {new Date(payment.payment_date).toLocaleDateString(
                        "en-GB",
                        dateOptions
                      )}
                    </td>
                    <td>${payment.amount.$numberDecimal}</td>
                    <td>{payment.method}</td>
                    <td>
                      {new Date(payment.createdAt).toLocaleDateString(
                        "en-GB",
                        dateOptions
                      )}
                    </td>
                    <td>
                      {new Date(payment.updatedAt).toLocaleDateString(
                        "en-GB",
                        dateOptions
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Payment;
