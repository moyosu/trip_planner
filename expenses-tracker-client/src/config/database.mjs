import mongoose from 'mongoose';
import 'dotenv/config';
import Expense from '../models/expenseModel.mjs';

let connection = undefined;
let Itinerary = undefined;
/**
 * This function connects to the MongoDB server.
 */
async function connect(){
    try{
        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);
        connection = mongoose.connection;
        console.log("Successfully connected to MongoDB using Mongoose!");
        Itinerary = Expense;
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

export { connect };