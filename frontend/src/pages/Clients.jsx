import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import httpRequest from "../js/httpRequest";
import { PORT } from "../port";
import AddClient from "../components/AddClient";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import PropTypes from "prop-types";

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

const Clients = () => {
  const [clientsArr, setClientsArr] = useState([]);
  // Date formatter
  const dateOptions = { day: "2-digit", month: "2-digit", year: "2-digit" };

  // Get clients
  const getClients = async () => {
    const clients = await httpRequest({
      url: `http://localhost:${PORT}/clients`,
      http_method: "GET",
      request_headers: {
        "Content-Type": "application/json",
      },
    });

    if (clients?.error) return console.log(clients.error);
    setClientsArr(clients);
  };

  useEffect(() => {
    getClients();
  }, []);
  // handle modal

  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [updateClient, setUpdateClient] = useState(null);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [startChecking, setStartChecking] = useState(false);
  const [isDuplicationError, setIsDuplicationError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Add client
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStartChecking(true);
    if (
      !isValidName ||
      !isValidEmail ||
      !isValidPhoneNumber ||
      isDuplicationError
    )
      return;
    const duplicationError = await httpRequest({
      url: `http://localhost:${PORT}/clients`,
      http_method: "POST",
      request_headers: {
        "Content-Type": "application/json",
      },
      request_body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
      }),
    });
    console.log(duplicationError);
    if (duplicationError?.message) setIsDuplicationError(true);
    else {
      setIsDuplicationError(false);
      getClients();
      handleClose();
    }
  };
  // Update client
  const handleUpdate = async (e) => {
    e.preventDefault();
    setStartChecking(true);
    if (
      !isValidName ||
      !isValidEmail ||
      !isValidPhoneNumber ||
      isDuplicationError
    )
      return;
    const duplicationError = await httpRequest({
      url: `http://localhost:${PORT}/clients/${updateClient._id}`,
      http_method: "PUT",
      request_headers: {
        "Content-Type": "application/json",
      },
      request_body: JSON.stringify({
        name: e.target.name.value,
        email: e.target.email.value,
        phone: e.target.phone.value,
      }),
    });
    if (duplicationError?.error) setIsDuplicationError(true);
    else {
      setIsDuplicationError(false);
      getClients();
      handleClose();
    }
  };

  // Delete client
  const handleDelete = async () => {
    const deletionError = await httpRequest({
      url: `http://localhost:${PORT}/clients/${updateClient._id}`,
      http_method: "DELETE",
      request_headers: {
        "Content-Type": "application/json",
      },
    });
    if (deletionError?.error) setIsDuplicationError(true);
    else {
      setIsDuplicationError(false);
      getClients();
      handleClose();
    }
  };

  return (
    <div id="clients">
      <DashboardHeader currentPage="Clients" />
      <div className="container">
        <h1 className="title">Clients</h1>
        <p className="description">View and manage your clients.</p>
        <div className="table-container">
          {/* Material UI modal */}
          <div className="add-client-container">
            <Button
              onClick={() => {
                handleOpen();
                setClientData({ name: "", email: "", phone: "" });
                setUpdateClient(null);
              }}
              className="add-client"
            >
              Add Client
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
                  {updateClient ? "Update Client" : "Add Client"}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                ></Typography>
                <form
                  onSubmit={updateClient ? handleUpdate : handleSubmit}
                  className="form"
                >
                  {isDuplicationError && (
                    <span className="error">
                      Client with email already exists
                    </span>
                  )}
                  <label htmlFor="name">
                    Name
                    <input
                      type="text"
                      placeholder="Enter client's name"
                      name="name"
                      id="name"
                      title="Name"
                      value={clientData.name}
                      onChange={(e) => {
                        setClientData({
                          ...clientData,
                          name: e.target.value,
                        });
                        setIsDuplicationError(false);
                        setIsValidName(e.target.value.length >= 3);
                      }}
                      required
                    />
                    {!isValidName && startChecking && (
                      <span className="error">
                        Name must be at least 3 chars
                      </span>
                    )}
                  </label>
                  <label htmlFor="email">
                    Email
                    <input
                      type="text"
                      placeholder="Enter client's email"
                      name="email"
                      id="email"
                      title="Email"
                      value={clientData.email}
                      onChange={(e) => {
                        setClientData({
                          ...clientData,
                          email: e.target.value,
                        });
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                        setIsValidEmail(emailRegex.test(e.target.value));
                        setIsDuplicationError(false);
                      }}
                      required
                    />
                    {!isValidEmail && startChecking && (
                      <span className="error">Invalid email</span>
                    )}
                  </label>
                  <label htmlFor="phone">
                    Phone
                    <input
                      type="text"
                      placeholder="Enter client's phone number"
                      name="phone"
                      id="phone"
                      title="Phone"
                      value={clientData.phone}
                      onChange={(e) => {
                        setClientData({
                          ...clientData,
                          phone: e.target.value,
                        });

                        setIsDuplicationError(false);
                        if (e.target.value === "")
                          return setIsValidPhoneNumber(true);
                        const phoneRegex = /^[0-9]{10}$/;
                        setIsValidPhoneNumber(phoneRegex.test(e.target.value));
                      }}
                      style={{
                        border:
                          !isValidPhoneNumber && startChecking
                            ? "1px solid red"
                            : "",
                      }}
                      required
                    />
                    {!isValidPhoneNumber && startChecking && (
                      <span className="error">Invalid phone number</span>
                    )}
                  </label>
                  <button type="submit" className="submit">
                    {updateClient ? "Update Client" : "Add Client"}
                  </button>
                  {updateClient && (
                    <button onClick={handleDelete} className="delete">
                      Delete Client
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
                <th>Email</th>
                <th>Phone</th>
                <th>Created at</th>
                <th>Updated at</th>
              </tr>
            </thead>
            <tbody>
              {clientsArr?.message && (
                <tr>
                  <td colSpan="5">{clientsArr?.message}</td>
                </tr>
              )}
              {!clientsArr?.message &&
                clientsArr?.map((client) => (
                  <tr
                    onClick={() => {
                      setClientData(client);
                      setUpdateClient(client);
                      setOpen(true);
                    }}
                    key={client._id}
                  >
                    <td>{client.name}</td>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>
                      {new Date(client.createdAt).toLocaleDateString(
                        "en-GB",
                        dateOptions
                      )}
                    </td>
                    <td>
                      {new Date(client.updatedAt).toLocaleDateString(
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

export default Clients;

AddClient.propTypes = {
  updateClient: PropTypes.object, // You can specify the shape more specifically if needed
};
