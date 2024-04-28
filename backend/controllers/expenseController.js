const Expense = require('../models/Expense');

exports.getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().exec();
    if (!expenses || expenses.length === 0) {
      return res.status(404).json({ message: 'No expenses found' });
    }
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};

exports.getExpenseById = async (req, res) => {
  try {
    const expenseId = req.params.expense_id;
    const expense = await Expense.findById(expenseId).exec();
    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(expense);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};

exports.createExpense = async (req, res) => {
  try {
    const { vendor_id, expense_date, amount, category } = req.body;

    // check for required fields
    if (!vendor_id || !expense_date || !amount || !category) {
      return res.status(400).json({ message: 'Vendor ID, expense date, amount, and category are required' });
    }

    const newExpense = await Expense.create({ vendor_id, expense_date, amount, category });
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.expense_id;
    const updatedExpenseData = req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(expenseId, updatedExpenseData, { new: true }).exec();
    if (!updatedExpense) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.json(updatedExpense);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.expense_id;
    const result = await Expense.deleteOne({ _id: expenseId }).exec();
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'Expense not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
    console.error(error);
  }
};
