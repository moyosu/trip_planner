import mongoose from 'mongoose';

const EXPENSE_CLASS = 'Expense';
const createModel = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true,
    },
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now,
    },
}, {
    timestamps: true,
});

const Expense = mongoose.model(EXPENSE_CLASS, createModel);

export default Expense;