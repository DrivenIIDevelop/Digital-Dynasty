const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

// list all expenses
router.get('/', expenseController.getAllExpenses);

// create new expense
router.post('/', expenseController.createExpense);

// retrieve expense details
router.get('/expenses/:expense_id', expenseController.getExpenseById);

// update expense ditails
router.put('/expenses/:expense_id', expenseController.updateExpense);

// delete expense
router.delete('/expenses/:expense_id', expenseController.deleteExpense);

module.exports = router;
