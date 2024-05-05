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

const Expenses = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [expensesArray, setExpensesArray] = useState([]);
  const [expenseData, setExpenseData] = useState({
    vendor_id: "",
    expense_date: "",
    amount: "",
    category: "",
  });
  const [updateExpense, setUpdateExpense] = useState(null);
  const [vendors, setVendors] = useState([]);
  // Date formatter
  const dateOptions = { day: "2-digit", month: "2-digit", year: "2-digit" };

  // Get expenses
  const getExpenses = async () => {
    const expenses = await httpRequest({
      url: `http://localhost:${PORT}/expenses`,
      http_method: "GET",
      request_headers: {
        "Content-Type": "application/json",
      },
    });
    setIsLoading(false);
    if (expenses?.error) return;
    setExpensesArray(expenses);
  };

  // Get Vendors
  const getVendors = async () => {
    const vendors = await httpRequest({
      url: `http://localhost:${PORT}/vendors`,
      http_method: "GET",
      request_headers: {
        "Content-Type": "application/json",
      },
    });
    if (vendors?.error || vendors?.message) return;

    setVendors(vendors);
  };

  useEffect(() => {
    getExpenses();
    getVendors();
  }, []);

  // Handle modal
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    await httpRequest({
      url: `http://localhost:${PORT}/expenses`,
      http_method: "POST",
      request_headers: {
        "Content-Type": "application/json",
      },
      request_body: JSON.stringify({
        vendor_id: expenseData.vendor_id,
        expense_date: expenseData.expense_date,
        amount: expenseData.amount,
        category: expenseData.category,
      }),
    });
    getExpenses();
    handleClose();
  };

  // handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    await httpRequest({
      url: `http://localhost:${PORT}/expenses/${expenseData._id}`,
      http_method: "PUT",
      request_headers: {
        "Content-Type": "application/json",
      },
      request_body: JSON.stringify({
        vendor_id: expenseData.vendor_id,
        expense_date: expenseData.expense_date,
        amount: expenseData.amount,
        category: expenseData.category,
      }),
    });
    getExpenses();
    handleClose();
  };

  // handle delete
  const handleDelete = async () => {
    await httpRequest({
      url: `http://localhost:${PORT}/expenses/${expenseData._id}`,
      http_method: "DELETE",
      request_headers: {
        "Content-Type": "application/json",
      },
    });
    getExpenses();
    handleClose();
  };

  return (
    <div id="expenses">
      <DashboardHeader currentPage="Expenses" />
      <div className="container">
        <h1 className="title">EXPENSES</h1>
        <p className="description">Optimize your expenses</p>
        <div className="table-container">
          <div className="add-expenses-container"></div>

          {/* Material UI modal */}
          <div className="add-vendors-container">
            <Button
              onClick={() => {
                setUpdateExpense(false);
                setExpenseData({
                  vendor_id: "",
                  expense_date: "",
                  amount: "",
                  category: "",
                });
                handleOpen();
              }}
              className="add-client"
            >
              Add expense
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
                  {updateExpense ? "Update Expense" : "Add Expense"}
                </Typography>
                <Typography
                  id="modal-modal-description"
                  sx={{ mt: 2 }}
                ></Typography>
                <form
                  onSubmit={updateExpense ? handleUpdate : handleSubmit}
                  className="form"
                >
                  <label htmlFor="vendorId">
                    Vendor
                    <select
                      value={expenseData.vendor_id}
                      onChange={(e) =>
                        setExpenseData({
                          ...expenseData,
                          vendor_id: e.target.value,
                        })
                      }
                      name="vendorId"
                      id="vendorId"
                      required
                    >
                      <option value="">Select vendor</option>
                      {vendors?.map((vendor) => (
                        <option value={vendor._id} key={vendor._id}>
                          {vendor.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label htmlFor="expenseDate">
                    Expense date
                    <input
                      type="date"
                      name="expenseDate"
                      id="expenseDate"
                      value={expenseData.expense_date}
                      onChange={(e) =>
                        setExpenseData({
                          ...expenseData,
                          expense_date: e.target.value,
                        })
                      }
                      required
                    />
                  </label>
                  <label htmlFor="amount">
                    Amount
                    <input
                      type="number"
                      name="amount"
                      id="amount"
                      value={expenseData.amount}
                      onChange={(e) =>
                        setExpenseData({
                          ...expenseData,
                          amount: e.target.value,
                        })
                      }
                      required
                    />
                  </label>
                  <label htmlFor="category">
                    Category
                    <input
                      type="text"
                      name="category"
                      id="category"
                      value={expenseData.category}
                      onChange={(e) =>
                        setExpenseData({
                          ...expenseData,
                          category: e.target.value,
                        })
                      }
                    />
                  </label>
                  <button type="submit" className="submit">
                    {updateExpense ? "Update expense" : "Add expense"}
                  </button>
                  {updateExpense && (
                    <button onClick={handleDelete} className="delete">
                      Delete expense
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
                <th>Expense date</th>
                <th>Amount</th>
                <th>Category</th>
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
              {(expensesArray?.message || expensesArray.error) && (
                <tr>
                  <td colSpan="6">{expensesArray?.message}</td>
                </tr>
              )}
              {!expensesArray?.message &&
                expensesArray?.map((expense) => (
                  <tr
                    onClick={() => {
                      setUpdateExpense(true);
                      const formattedDate = new Date(expense.expense_date)
                        .toISOString()
                        .slice(0, 10);

                      setExpenseData({
                        ...expense,
                        expense_date: formattedDate,
                      });
                      handleOpen();
                    }}
                    key={expense._id}
                  >
                    <td>
                      {vendors.find((v) => v._id === expense.vendor_id)?.name}
                    </td>
                    <td>
                      {new Date(expense.expense_date).toLocaleDateString(
                        "en-GB",
                        dateOptions
                      )}
                    </td>
                    <td>${expense.amount}</td>
                    <td>{expense.category}</td>
                    <td>
                      {new Date(expense.createdAt).toLocaleDateString(
                        "en-GB",
                        dateOptions
                      )}
                    </td>
                    <td>
                      {new Date(expense.updatedAt).toLocaleDateString(
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

export default Expenses;
