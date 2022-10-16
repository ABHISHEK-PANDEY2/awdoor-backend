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

function getDestinationImage(searchPlace) {
  const place = searchPlace.toLowerCase();
  if (place === "delhi")
    return "https://images.unsplash.com/photo-1586183189334-1ad3cd238e21?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fGRlbGhpfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
  if (place === "kasol")
    return "https://images.unsplash.com/photo-1581791534721-e599df4417f7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8a2Fzb2x8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60";
  if (place === "jammu")
    return "https://images.unsplash.com/photo-1629929065472-9b…fHx8fGVufDB8fHx8&auto=format&fit=crop&w=1031&q=80";
  if (place === "himachal")
    return "https://images.unsplash.com/photo-1565348271242-23…ufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60";
  if (place === "shimla")
    return "https://images.unsplash.com/photo-1619417889956-c7…XxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60";
  if (place === "bangalore")
    return "	https://images.unsplash.com/photo-1596176530529-78…ufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60";
  if (place === "allahabad")
    return "https://images.unsplash.com/photo-1601750059072-b0…ufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=600&q=60";
  if (place === "varanasi")
    return "	https://images.unsplash.com/photo-1599831069477-b2…lfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80";
  if (place === "agra")
    return "https://images.unsplash.com/photo-1524492412937-b2…HxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=600&q=60";
  if (place === "rajasthan")
    return "	https://images.unsplash.com/photo-1616693139578-f1…ufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
  if (place === "jaipur")
    return "	https://images.unsplash.com/photo-1477586957327-84…ufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60";
  if (place === "mumbai")
    return "	https://images.unsplash.com/photo-1580581096469-8a…kaWF8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60";
  if (place === "manali")
    return "https://images.unsplash.com/photo-1581793745862-99…XxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";
  if (place === "kolkata")
    return "https://images.unsplash.com/photo-1644476533828-9c…XxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60";
}

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
  res.json({
    tripDetail: tripData.data,
    destinationImage: getDestinationImage(req.query.dest),
  });
});

module.exports = router;
