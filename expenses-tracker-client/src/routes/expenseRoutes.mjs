import express from 'express';
import ExpenseController from '../controllers/expenseController.mjs';

const router = express.Router();
const expenseController = new ExpenseController();

// Route to add a new expense
router.post('/expenses', expenseController.addExpense.bind(expenseController));

// Route to edit an existing expense
router.put('/expenses/:id', expenseController.editExpense.bind(expenseController));

// Route to delete an expense
router.delete('/expenses/:id', expenseController.deleteExpense.bind(expenseController));

// Route to get all expenses
router.get('/expenses', expenseController.getExpenses.bind(expenseController));

export default router;