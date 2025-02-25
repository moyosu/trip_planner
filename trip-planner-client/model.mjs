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
 */
async function createItinerary(destination, startDate, endDate){
    const itinerary = new Itinerary({destination: destination, startDate: startDate, endDate: endDate})
    return itinerary.save();
}

/**
 * Retrieves all itineraries based on the provided query parameters
 */
async function getItineraries(query) {
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

/**
 * Retrieves a single itinerary by ID
 */
async function getItinerary(id) {
    try {
        const itinerary = await Itinerary.findById(id);
        return itinerary;
    } catch (err) {
        console.log(err);
        throw Error(`Could not retrieve itinerary: ${err.message}`);
    }
}

/**
 * Updates an itinerary by ID
 */
async function updateItinerary(id, destination, startDate, endDate) {
    try {
        const updatedItinerary = await Itinerary.findByIdAndUpdate(
            id,
            { destination, startDate, endDate },
            { new: true, runValidators: true }
        );
        return updatedItinerary;
    } catch (err) {
        console.log(err);
        throw Error(`Could not update itinerary: ${err.message}`);
    }
}

/**
 * Deletes an itinerary by ID
 */
async function deleteItinerary(id) {
    try {
        const deletedItinerary = await Itinerary.findByIdAndDelete(id);
        return deletedItinerary !== null;
    } catch (err) {
        console.log(err);
        throw Error(`Could not delete itinerary: ${err.message}`);
    }
}



export { connect, createItinerary, getItineraries, getItinerary, updateItinerary, deleteItinerary };