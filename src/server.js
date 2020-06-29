const express = require("express");
const logger = require("./logger");
const db = require("./db");

const app = express();

app.use(express.json());
app.use(logger());

app.get("/", (req, res) => {
    const appointments = db.get("appointments").value();
    if (!appointments || !appointments.length) {
        res.status(404).json({message: "No appointments found"});
    } else {
        res.json(appointments);
    }
});

app.post("/appointments", (req, res) => {
    const dateTime = req.body.queryResult.parameters["date-time"].date_time;
    db.get("appointments").push({date_time: dateTime}).write(); // .write ensures it is actually sav
    const ourMessages = req.body.queryResult.fulfillmentMessages;
    res.send({fulfillmentMessages: ourMessages});
});

module.exports = app;
