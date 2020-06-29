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

app.post("/stack", (req, res) => {
    console.log("SOMEBODY POSTED SOMETHING TO US:", req.body);
    const intent = req.body.queryResult.intent.displayName;
    switch (intent) {
        case "push":
            console.log("push");
            res.send({
                fulfillmentMessages: [
                    {
                        text: {
                            text: ["Added to your to do list!"]
                        }
                    }
                ]
            });
            break;
        case "pop":
            console.log("pop");
            break;
        case "peek":
            console.log("peek");
            break;
        default:
            console.log("default");
            res.send({
                fulfillmentMessages: [
                    {
                        text: {
                            text: ["Default"]
                        }
                    }
                ]
            });
    }

    // const any = req.body.queryResult.parameters["any"];
    // db.get("stack").push({date_time: dateTime}).write(); // .write ensures it is actually sav
    // const ourMessages = req.body.queryResult.fulfillmentMessages;
    // res.send({fulfillmentMessages: ourMessages});
});

module.exports = app;
