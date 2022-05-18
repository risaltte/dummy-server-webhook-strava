import express from "express";

export const router = express.Router();

router.get('/test', (request, response) => {
    return response.send("Test OK!!!");
});

// Creates the endpoint for our webhook
router.post('/webhook', (request, response) => {
    console.log("webhook event received!", request.query, request.body);
    return response.status(200).send('EVENT_RECEIVED');
});

// Adds support for GET requests to our webhook
router.get('/webhook', (request, response) => {
    // Your verify token. Should be a random string.
    const VERIFY_TOKEN = "STRAVA";

    // Parses the query params
    let mode = request.query['hub.mode'];
    let token = request.query['hub.verify_token'];
    let challenge = request.query['hub.challenge'];

    // const { mode, token, challenge } = request.query;
    console.log(mode, token, challenge);

    // Checks if a token and mode is in the query string of the request
    if (mode && token) {
        // Verifies that the mode and token sent are valid
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            return response.json({ "hub.challenge": challenge });
        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            console.log("tokens do not match");
            return response.sendStatus(403);
        }
    }
});