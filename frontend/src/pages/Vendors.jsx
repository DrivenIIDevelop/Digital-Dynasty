import { useEffect, useState } from "react";
import DashboardHeader from "../components/DashboardHeader";
import httpRequest from "../js/httpRequest";
import { PORT } from "../port";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
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

const Vendors = () => {
  const [vendorsArr, setVendorsArr] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get vendors
  const getVendors = async () => {
    const vendors = await httpRequest({
      url: `http://localhost:${PORT}/vendors`,
      http_method: "GET",
      request_headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    if (vendors?.error) return;
    setVendorsArr(vendors);
  };

  useEffect(() => {
    getVendors();
  }, []);
  // handle modal

  const [vendorData, setVendorsData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [updateVendor, setUpdateVendor] = useState(null);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(true);
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isValidName, setIsValidName] = useState(true);
  const [startChecking, setStartChecking] = useState(false);
  const [isDuplicationError, setIsDuplicationError] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Add vendor
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
      url: `http://localhost:${PORT}/vendors`,
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
    if (duplicationError?.message) setIsDuplicationError(true);
    else {
      setIsDuplicationError(false);
      getVendors();
      handleClose();
    }
  };
  // Update vendor
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
      url: `http://localhost:${PORT}/vendors/${updateVendor._id}`,
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
      getVendors();
      handleClose();
    }
  };

  // Delete vendor
  const handleDelete = async () => {
    const deletionError = await httpRequest({
      url: `http://localhost:${PORT}/vendors/${updateVendor._id}`,
      http_method: "DELETE",
      request_headers: {
        "Content-Type": "application/json",
      },
    });
    if (deletionError?.error) setIsDuplicationError(true);
    else {
      setIsDuplicationError(false);
      getVendors();
      handleClose();
    }
  };

  return (
    <div className="clients">
      <DashboardHeader currentPage="Vendors" />
      <div className="container">
        <h1 className="title">Vendors</h1>
        <p className="description">View and manage your vendors.</p>
        <div className="table-container">
          {/* Material UI modal */}
          <div className="add-client-container">
            <Button
              onClick={() => {
                handleOpen();
                setVendorsData({ name: "", email: "", phone: "" });
                setUpdateVendor(null);
              }}
              className="add-client"
            >
              Add Vendor
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
                  {updateVendor ? "Update Vendor" : "Add Vendor"}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                ></Typography>
                <form
                  onSubmit={updateVendor ? handleUpdate : handleSubmit}
                  className="form"
                >
                  {isDuplicationError && (
                    <span className="error">
                      Vendor with email already exists
                    </span>
                  )}
                  <label htmlFor="name">
                    Name
                    <input
                      type="text"
                      placeholder="Enter vendor's name"
                      name="name"
                      id="name"
                      title="Name"
                      value={vendorData.name}
                      onChange={(e) => {
                        setVendorsData({
                          ...vendorData,
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
                      placeholder="Enter vendor's email"
                      name="email"
                      id="email"
                      title="Email"
                      value={vendorData.email}
                      onChange={(e) => {
                        setVendorsData({
                          ...vendorData,
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
                      placeholder="Enter vendor's phone number"
                      name="phone"
                      id="phone"
                      title="Phone"
                      value={vendorData.phone}
                      onChange={(e) => {
                        setVendorsData({
                          ...vendorData,
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
                    {updateVendor ? "Update Vendor" : "Add Vendor"}
                  </button>
                  {updateVendor && (
                    <button onClick={handleDelete} className="delete">
                      Delete Vendor
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
              {vendorsArr?.message && (
                <tr>
                  <td colSpan="5">{vendorsArr?.message}</td>
                </tr>
              )}
              {!vendorsArr?.message &&
                vendorsArr?.map((vendor) => (
                  <tr
                    onClick={() => {
                      setVendorsData(vendor);
                      setUpdateVendor(vendor);
                      setOpen(true);
                    }}
                    key={vendor._id}
                  >
                    <td>{vendor.name}</td>
                    <td>{vendor.email}</td>
                    <td>{vendor.phone}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Vendors;
