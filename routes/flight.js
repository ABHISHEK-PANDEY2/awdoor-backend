const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

/* GET flightFare page. */
// http://localhost:8000/fare/flight?src=srcCity&dest=destCity&date=DD/MM/YYYY

async function flightFare(req) {
  const data = `{"CalKey_":"${req.query.src}_${req.query.dest}_${req.query.date}"}`;

  const config = {
    method: "post",
    url: "https://flightservice-web.easemytrip.com/EmtAppService/FareCalendar/FareCalendarByDate",
    headers: {
      authority: "flightservice-web.easemytrip.com",
      method: "POST",
      path: "/EmtAppService/FareCalendar/FareCalendarByDate",
      scheme: "https",
      accept: " application/json, text/plain, */*",
      "accept-encoding": " gzip, deflate, br",
      "accept-language": " en-US,en;q=0.9",
      "access-control-allow-headers": " X-Requested-With",
      "access-control-allow-orgin": " *",
      "access-control-max-age": " 1728000",
      "content-length": " 32",
      "content-type": " application/json",
      origin: " https://flight.easemytrip.com",
      referer: " https://flight.easemytrip.com/",
      "sec-ch-ua":
        ' "Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
      "sec-ch-ua-mobile": " ?0",
      "sec-ch-ua-platform": ' "Windows"',
      "sec-fetch-dest": " empty",
      "sec-fetch-mode": " cors",
      "sec-fetch-site": " same-site",
      "user-agent":
        " Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
    },
    data: data,
  };

  const rawres = await axios(config);
  console.log(rawres);
  return rawres;
}

router.get("/fare/flight", async function (req, res, next) {
  const flight = await flightFare(req);
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
  const flightData = JSON.stringify(flight, getCircularReplacer());
  const flights = await JSON.parse(flightData);
  const highestFare = {};
  const lowestFare = {};
  const maxPrice = 0;
  flights.data.map((flight) => {
    if (flight.IsCheapest === true) {
      lowestFare.fare = flight.TtlFre;
      lowestFare.dept = flight.DepDate;
      lowestFare.name = flight.AirCode;
    }
    if (flight.TtlFre > maxPrice) {
      highestFare.fare = flight.TtlFre;
      highestFare.dept = flight.DepDate;
      highestFare.name = flight.AirCode;
    }
  });
  res.json({
    cheap: lowestFare,
    expensive: highestFare,
    link: `https://www.makemytrip.com/flight/search?tripType=O&itinerary=${req.query.src}-${req.query.dest}-${req.query.date}&paxType=A-1_C-0_I-0&intl=false&cabinClass=E&ccde=IN`,
  });
});

module.exports = router;
