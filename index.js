require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const hotelRouter = require("./routes/hotel");
const busRouter = require("./routes/bus");
const flightRouter = require("./routes/flight");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(hotelRouter);
app.use(busRouter);
app.use(flightRouter);

let port = process.env.PORT;
if (process.env.PORT == "null" || process.env.PORT == "") {
  port = 8000;
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
