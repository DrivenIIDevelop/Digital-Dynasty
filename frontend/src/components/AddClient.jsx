import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import httpRequest from "../js/httpRequest";
import { PORT } from "../port";
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

export default function AddClient(props) {
  const [clientData, setClientData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [startChecking, setStartChecking] = useState(false);
  const [isDuplicationError, setIsDuplicationError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { updateClient } = props;
  if (updateClient) {
    setClientData(updateClient);
  }

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
      handleClose();
    }
  };
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
      handleClose();
    }
  };

  return (
    <div>
      <Button onClick={handleOpen} className="add-client">
        Add Client
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            style={{ textAlign: "center" }}
          >
            Add Client
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <form
              onSubmit={updateClient ? handleUpdate : handleSubmit}
              className="form"
            >
              {isDuplicationError && (
                <span className="error">Client with email already exists</span>
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
                    setClientData({ ...clientData, name: e.target.value });
                    setIsDuplicationError(false);
                    setIsValidName(e.target.value.length >= 3);
                  }}
                  required
                />
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
                    setClientData({ ...clientData, email: e.target.value });
                    setIsDuplicationError(false);
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    setIsValidEmail(emailRegex.test(e.target.value));
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
                    setClientData({ ...clientData, phone: e.target.value });

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
                Submit
              </button>
            </form>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

AddClient.propTypes = {
  updateClient: PropTypes.object, // You can specify the shape more specifically if needed
};
