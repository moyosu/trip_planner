import mongoose from 'mongoose';
import Expense from '../models/expenseModel.mjs';

class ExpenseService {
    async addExpense(expenseData) {
        console.log("adding expense");
        const expense = new Expense(expenseData);
        return await expense.save();
    }

    async editExpense(expenseId, updatedData) {
        return await Expense.findByIdAndUpdate(expenseId, updatedData, { new: true, runValidators: true });
    }

    async deleteExpense(expenseId) {
        return await Expense.findByIdAndDelete(expenseId);
    }

    async getExpenses(query) {
        const filter = {};
        if (query.description) filter.description = query.description;
        if (query.amount) filter.amount = query.amount;
        if (query.date) filter.date = query.date;
        return await Expense.find(filter);
    }
}

export default ExpenseService;