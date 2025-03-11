import { validationResult } from 'express-validator';
import ExpenseService from '../services/expenseService.mjs';

class ExpenseController {
    constructor() {
        this.expenseService = new ExpenseService();
    }

    async addExpense(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { description, amount, date } = req.body;

        try {
            const newExpense = await this.expenseService.addExpense({ description, amount, date });
            res.status(201).json(newExpense);
        } catch (error) {
            res.status(500).json({ message: 'Error adding expense', error: error.message });
        }
    }

    async editExpense(req, res) {
        const { id } = req.params;
        const { description, amount, date } = req.body;

        try {
            const updatedExpense = await this.expenseService.editExpense(id, { description, amount, date });
            if (updatedExpense) {
                res.status(200).json(updatedExpense);
            } else {
                res.status(404).json({ message: 'Expense not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error updating expense', error: error.message });
        }
    }

    async deleteExpense(req, res) {
        const { id } = req.params;

        try {
            const deleted = await this.expenseService.deleteExpense(id);
            if (deleted) {
                res.status(204).send();
            } else {
                res.status(404).json({ message: 'Expense not found' });
            }
        } catch (error) {
            res.status(500).json({ message: 'Error deleting expense', error: error.message });
        }
    }

    async getExpenses(req, res) {
        try {
            console.log("getting expenses");
            const expenses = await this.expenseService.getExpenses(req.query);
            res.status(200).json(expenses);
        } catch (error) {
            res.status(500).json({ message: 'Error retrieving expenses', error: error.message });
        }
    }
}

export default ExpenseController;