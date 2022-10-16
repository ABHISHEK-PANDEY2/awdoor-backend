const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();
const getDate = require("../tools/tripDate");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* GET trainFare page. */
// http://localhost:8000/fare?mode=mode_type&src=srcCity&dest=destCity&date=dd/mm/yyyy

async function getTripDetails(src, dest, date, mode) {
  if (mode === "train") {
    const config = {
      method: "get",
      url: `https://young-bastion-57330.herokuapp.com/fare/train?src=${src}&dest=${dest}&date=${date}`,
      headers: {},
    };

    const rawres = await axios(config);
    console.log(rawres);
    return rawres;
  }
  if (mode === "bus") {
    const config = {
      method: "get",
      url: `https://young-bastion-57330.herokuapp.com/fare/bus?src=${src}&dest=${dest}&date=${date}`,
      headers: {},
    };

    const rawres = await axios(config);
    console.log(rawres);
    return rawres;
  }
  if (mode === "flight") {
    const config = {
      method: "get",
      url: `https://young-bastion-57330.herokuapp.com/fare/flight?src=${src}&dest=${dest}&date=${date}`,
      headers: {},
    };

    const rawres = await axios(config);
    console.log(rawres);
    return rawres;
  }
}

router.get("/fare", async (req, res) => {
  const result = await getTripDetails(
    req.query.src,
    req.query.dest,
    getDate(req.query.date, req.query.mode),
    req.query.mode
  );
  console.log(getDate(req.query.date, req.query.mode));
  const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
      if (typeof value === "object" && value !== null) {
        if (seen.has(value)) {
          return;
        }
        seen.add(value);
      }
      return value;
    };
  };
  const trip = JSON.stringify(result, getCircularReplacer());
  const tripData = await JSON.parse(trip);
  res.json({ tripDetail: tripData.data });
});

module.exports = router;
