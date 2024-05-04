import DashboardHeader from "../components/DashboardHeader";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useEffect, useState } from "react";
import httpRequest from "../js/httpRequest";
import { PORT } from "../port";
import { Link } from "react-router-dom";
import { CircularProgress } from "@mui/material";

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

const Invoices = () => {
  const [invoicesArray, setInvoicesArray] = useState([]);
  const [clientsArray, setClientsArray] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [invoiceData, setInvoiceData] = useState({
    name: "",
    user_id: "",
    client_id: "",
    invoice_date: "",
    amount: {
      $numberDecimal: "",
    },
    status: "pending",
  });
  const [updateInvoice, setUpdateInvoice] = useState(false);
  // check if there are any clients
  const [noClients, setNoClients] = useState(false);

  // Date formatter
  const dateOptions = { day: "2-digit", month: "2-digit", year: "2-digit" };

  // Get invoices
  const getInvoices = async () => {
    const response = await httpRequest({
      url: `http://localhost:${PORT}/invoices`,
      http_method: "GET",
      request_headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    setInvoicesArray(response);
    if (response?.error) return;
  };

  useEffect(() => {
    getClients();
    getInvoices();
  }, []);

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
    setClientsArray(clients);
  };

  // Handle modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Add invoice
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (noClients) return;
    if (!e.target.client) return setNoClients(true);

    // const formattedDate = new Date(invoiceData.invoice_date).toISOString();

    const response = await httpRequest({
      url: `http://localhost:${PORT}/invoices`,
      http_method: "POST",
      request_headers: {
        "Content-Type": "application/json",
      },
      request_body: JSON.stringify({
        client_id: invoiceData.client_id,
        user_id: localStorage.getItem("userId"),
        invoice_date: invoiceData.invoice_date,
        amount: {
          $numberDecimal: invoiceData.amount.$numberDecimal,
        },
        status: invoiceData.status,
      }),
    });
    console.log(response);
    if (response?.error) return console.log(response?.error); //Set error
    getInvoices();
    handleClose();
  };

  // Update invoice
  const handleUpdate = async (e) => {
    e.preventDefault();

    const response = await httpRequest({
      url: `http://localhost:${PORT}/invoices/${invoiceData._id}`,
      http_method: "PUT",
      request_headers: {
        "Content-Type": "application/json",
      },
      request_body: JSON.stringify({
        client_id: invoiceData.client_id,
        user_id: localStorage.getItem("userId"),
        invoice_date: invoiceData.invoice_date,
        amount: {
          $numberDecimal: invoiceData.amount.$numberDecimal,
        },
        status: invoiceData.status,
      }),
    });
    if (response?.error) return; //Set error
    getInvoices();
    handleClose();
  };

  // Delete invoice
  const handleDelete = async () => {
    const response = await httpRequest({
      url: `http://localhost:${PORT}/invoices/${invoiceData._id}`,
      http_method: "DELETE",
      request_headers: {
        "Content-Type": "application/json",
      },
    });
    if (response?.error) return; //Set error
    getInvoices();
    handleClose();
  };
  return (
    <div id="invoices">
      <DashboardHeader currentPage="Invoices" />
      <div className="container">
        <h1 className="title">Invoices</h1>
        <p className="description">View and create your invoices</p>
        <div className="table-container">
          {/* Material UI modal */}
          <div className="add-client-container">
            <Button
              onClick={() => {
                handleOpen();
                setUpdateInvoice(false);
                setInvoiceData({
                  name: "",
                  user_id: "",
                  client_id: "",
                  invoice_date: "",
                  amount: {
                    $numberDecimal: "",
                  },
                  status: "pending",
                });
              }}
              className="add-invoice"
            >
              Add Invoice
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
                  {updateInvoice ? "Update Invoice" : "Add Invoice"}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                ></Typography>
                <form
                  onSubmit={updateInvoice ? handleUpdate : handleSubmit}
                  className="form"
                >
                  {noClients && (
                    <span className="error">Please add a client</span>
                  )}
                  <label htmlFor="client">
                    Client
                    {clientsArray ? (
                      <select
                        value={invoiceData.client_id}
                        onChange={(e) => {
                          // I added client id this way to avoid a warning
                          invoiceData.client_id = e.target.value;
                          setInvoiceData({
                            ...invoiceData,
                            client_id: e.target.value,
                          });
                        }}
                        name="client"
                        id="client"
                        required
                      >
                        <option value="">Select a client</option>
                        {clientsArray?.map((client) => (
                          <option key={client?._id} value={client?._id}>
                            {client?.name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <Link className="link" to="/clients">
                        Add a client
                      </Link>
                    )}
                  </label>
                  <label htmlFor="date">
                    Invoice Date
                    <input
                      type="date"
                      value={invoiceData.invoice_date}
                      onChange={(e) => {
                        // I added date this way to avoid a warning
                        invoiceData.invoice_date = e.target.value;
                        setInvoiceData({
                          ...invoiceData,
                          invoice_date: e.target.value,
                        });
                      }}
                      name="date"
                      id="date"
                      placeholder="Invoice Date"
                      required
                    />
                  </label>
                  <label htmlFor="amount">
                    Amount
                    <input
                      type="number"
                      value={invoiceData.amount.$numberDecimal}
                      onChange={(e) => {
                        setInvoiceData({
                          ...invoiceData,
                          amount: {
                            $numberDecimal: e.target.value,
                          },
                        });
                      }}
                      name="amount"
                      id="amount"
                      placeholder="Amount"
                      required
                    />
                  </label>
                  <label htmlFor="status">
                    Status
                    <select
                      value={invoiceData.status}
                      onChange={(e) => {
                        // I added Status this way to avoid a warning
                        invoiceData.status = e.target.value;
                        setInvoiceData({
                          ...invoiceData,
                          status: e.target.value,
                        });
                      }}
                      name="status"
                      id="status"
                      required
                    >
                      <option value="pending">Pending</option>
                      <option value="paid">Paid</option>
                      <option value="overdue">Overdue</option>
                    </select>
                  </label>

                  <button type="submit" className="submit">
                    {updateInvoice ? "Update Invoice" : "Create Invoice"}
                  </button>
                  {updateInvoice && (
                    <button onClick={handleDelete} className="delete">
                      Delete Invoice
                    </button>
                  )}
                </form>
              </Box>
            </Modal>
          </div>

          <table className="table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Invoice Date</th>
                <th>Amount</th>
                <th>Created at</th>
                <th>Updated at</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading && (
                <tr>
                  <td colSpan="5">
                    <CircularProgress />
                  </td>
                </tr>
              )}
              {invoicesArray?.error && (
                <tr>
                  <td colSpan="5">{invoicesArray?.error}</td>
                </tr>
              )}
              {!invoicesArray?.error &&
                invoicesArray?.map((invoice) => (
                  <tr
                    onClick={() => {
                      setUpdateInvoice(true);
                      const formattedDate = new Date(invoice.invoice_date)
                        .toISOString()
                        .slice(0, 10);

                      setInvoiceData({
                        ...invoice,
                        invoice_date: formattedDate,
                      });
                      setOpen(true);
                    }}
                    key={invoice._id}
                  >
                    <td>
                      {
                        clientsArray?.find(
                          (client) => client?._id === invoice?.client_id
                        )?.name
                      }
                    </td>
                    <td>
                      {new Date(invoice?.invoice_date).toLocaleDateString(
                        "en-GB",
                        dateOptions
                      )}
                    </td>
                    <td>{invoice?.amount.$numberDecimal} $</td>
                    <td>
                      {new Date(invoice?.createdAt).toLocaleDateString(
                        "en-GB",
                        dateOptions
                      )}
                    </td>
                    <td>
                      {new Date(invoice?.updatedAt).toLocaleDateString(
                        "en-GB",
                        dateOptions
                      )}
                    </td>
                    <td>
                      <span className={`status ${invoice?.status}`}>
                        {invoice?.status}
                      </span>
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

export default Invoices;
