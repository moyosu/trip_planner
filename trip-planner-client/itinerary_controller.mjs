import 'dotenv/config';
import express from 'express';
import * as itineraries from './model.mjs';
import asyncHandler from 'express-async-handler';
import { check, validationResult } from 'express-validator';


const requestValidation = [
    (req, res, next) => {
        const allowedProperties = ['destination', 'startDate', 'endDate'];
        const keys = Object.keys(req.body);

        if (keys.length !== 3 || !keys.every((key) => allowedProperties.includes(key))) {
            return res.status(400).json({ Error: 'Invalid Request Inputs' });
        }
        next();
    },

    check('destination').exists().isString().notEmpty(),
    check('startDate').exists().matches(/^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-\d{2}$/),
    check('endDate').exists().matches(/^(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])-\d{2}$/),

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
app.post('/itineraries', asyncHandler(async (req, res) => {
    const { destination, startDate, endDate } = req.body;
    try {
        const newItinerary = await itineraries.createItinerary(destination, startDate, endDate);
        res.status(201).json(newItinerary);
    } catch (err) {
        console.log(err);
        res.status(400).json({ Error: 'Invalid request'});
    }
}));

// GET - Get an itinerary
app.get('/itineraries', asyncHandler(async (req, res) => {
    const query = req.query;
    try {
        const itineraryList = await itineraries.getItinerary(query);
        res.status(200).json(itineraryList);
    } catch (err) {
        res.status(500).json({message: 'Failed to retrieve exercises.'});
    }
}));


