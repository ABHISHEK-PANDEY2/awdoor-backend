require("dotenv");
require("./mongoose/mongoose");
const express = require("express");
const bodyParser = require("body-parser");
const hotelRouter = require("./routes/hotel");
const busRouter = require("./routes/bus");
const flightRouter = require("./routes/flight");
const trainRouter = require("./routes/train");
const unifiedRouter = require("./routes/unified");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// app.use(hotelRouter);
app.use(unifiedRouter);
app.use(busRouter);
app.use(flightRouter);
app.use(trainRouter);
app.use(hotelRouter);

app.get("/", (req, res) => {
  res.send("hello");
});

let port = process.env.PORT || 8000;
if (process.env.PORT == "null" || process.env.PORT == "") {
  port = 8000;
}

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
