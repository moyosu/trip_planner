import 'dotenv/config';
import express from 'express';
import * as itineraries from './model.mjs';
import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';


const requestValidation = [
    (req, res, next) => {
        const allowedProperties = ['destination', 'startDate', 'endDate'];
        const keys = Object.keys(req.body);

        // Check if all required properties are present
        const hasRequiredProperties = allowedProperties.every((key) => keys.includes(key));
        
        if (!hasRequiredProperties) {
            return res.status(400).json({ Error: 'Invalid Request Inputs: Missing required fields' });
        }
        next();
    },

    check('destination').exists().isString().notEmpty(),
    check('startDate').exists().matches(/^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-\d{4}$/),
    check('endDate').exists().matches(/^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-\d{4}$/),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ Error: 'Invalid Request Inputs' });
        }
        next();
    },
];

const app = express();
const PORT = process.env.PORT;

app.use(express.json())

app.listen(PORT, async () => {
    await itineraries.connect(false)
    console.log(`Server listening on port ${PORT}...`);
});

// POST - Create an itinerary
app.post('/itineraries', requestValidation, asyncHandler(async (req, res) => {
    const { destination, startDate, endDate } = req.body;
    try {
        const newItinerary = await itineraries.createItinerary(destination, startDate, endDate);
        res.status(201).json(newItinerary);
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: 'Invalid request'});
    }
}));

// GET - Get all itineraries
app.get('/itineraries', asyncHandler(async (req, res) => {
    const query = req.query;
    try {
        const itineraryList = await itineraries.getItineraries(query);
        res.status(200).json(itineraryList);
    } catch (err) {
        res.status(500).json({message: 'Failed to retrieve exercises.'});
    }
}));

// GET - Get a single itinerary by ID
app.get('/itineraries/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    try { 
        const itinerary = await itineraries.getItinerary(id);
        if (itinerary) {
            res.status(200).json(itinerary);
        } else {
            res.status(404).json({ Error: 'Itinerary not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: 'Invalid request' });
    }
}));


// PUT - Update an itinerary
app.put('/itineraries/:id', requestValidation, asyncHandler(async (req, res) => {
    const { destination, startDate, endDate } = req.body;
    const id = req.params.id;
    try {
        const updatedItinerary = await itineraries.updateItinerary(id, destination, startDate, endDate);
        if (updatedItinerary) {
            res.status(200).json(updatedItinerary);
        } else {
            res.status(404).json({ Error: 'Itinerary not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({ Error: 'Invalid request' });
    }
}));

// DELETE - Delete an itinerary
app.delete('/itineraries/:id', asyncHandler(async (req, res) => {
    const id = req.params.id;
    try {
        const deletedItinerary = await itineraries.deleteItinerary(id);
        if (deletedItinerary) {
            res.status(204).send();
        } else {
            res.status(404).json({ Error: 'Itinerary not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: 'Invalid request' });
    }
}));


