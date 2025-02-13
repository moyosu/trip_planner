import mongoose from 'mongoose';
import 'dotenv/config';

const ITINERARY_DB_NAME = 'itinerary';
const ITINERARY_CLASS = 'ITINERARY';

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
        Itinerary = createModel();
    } catch(err){
        console.log(err);
        throw Error(`Could not connect to MongoDB ${err.message}`)
    }
}

/*
* This function creates an Itinerary model in Mongoose
*/
function createModel() {
    const itinerarySchema = mongoose.Schema({
        destination: { type: String, required: true },
        startDate: { type: String, required: true },
        endDate: { type: String, required: true }
    });

    return mongoose.model(ITINERARY_CLASS, itinerarySchema);
}

/**
 * Creates an itinerary
 * @param {string} destination 
 * @param {Date} startDate
 * @param {Date} endDate
 * @returns 
 */
async function createItinerary(destination, startDate, endDate){
    const itinerary = new Itinerary({destination: destination, startDate: startDate, endDate: endDate})
    return itinerary.save();
}

async function getItinerary(query) {
    try {
        const filter = {};
        if (query.destination) filter.destination = query.destination;
        if (query.startDate) filter.startDate = query.startDate;
        if (query.endDate) filter.endDate = query.endDate;

        const itinerary = await Itinerary.find(filter);
        return itinerary;
    } catch (err) {
        console.log(err);
        throw Error(`Could not retrieve itinerary: ${err.message}`);
    }
}


export { connect, createItinerary, getItinerary };