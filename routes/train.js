const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

function getStationCode(searchPlace) {
  const place = searchPlace.toLowerCase();
  if (place === "kasol") return "NLDM";
  if (place === "delhi") return "NDLS";
  if (place === "jammu") return "JAT";
  if (place === "himachal") return "VHL";
  if (place === "shimla") return "VHL";
  if (place === "bangalore") return "SBC";
  if (place === "allahabad") return "ALD";
  if (place === "varanasi") return "BSBS";
  if (place === "agra") return "AGC";
  if (place === "rajasthan") return "JP";
  if (place === "jaipur") return "JP";
  if (place === "mumbai") return "MMCT";
  if (place === "manali") return "MNLI";
  if (place === "kolkata") return "KOAA";
  if (place === "chennai") return "MAS";
}

/* GET trainFare page. */
// http://localhost:8000/fare/train?src=srcCity&dest=destCity&date=yyyy-mm-dd

async function trainFare(req) {
  const config = {
    method: "get",
    url: `https://www.ixigo.com/trains/v1/search/between/${getStationCode(
      req.query.src
    )}/${getStationCode(req.query.dest)}?date=${
      req.query.date
    }&languageCode=en`,
    headers: {
      authority: "www.ixigo.com",
      method: "GET",
      path: `/trains/v1/search/between/${getStationCode(
        req.query.src
      )}/${getStationCode(req.query.dest)}?date=${
        req.query.date
      }&languageCode=en`,
      scheme: "https",
      accept: " */*",
      "accept-encoding": " gzip, deflate, br",
      "accept-language": " en-US,en;q=0.9",
      apikey: " ixiweb!2$",
      clientid: " ixiweb",
      cookie:
        ' _gcl_au=1.1.1514243046.1665762985; ixiUID=c04b96f818ef4d8da90e; ixiSrc="FrvUGF8X9feKJ6fNDSoTwUe2+vz+FxCFvYKvWf2H1SFOLWNF1caMl8K7AZ/zVyQESFpkrUXQBoDFxcDiBHJe89hADXUQytATo3Q2tEKPub0="; ixigoSrc="c04b96f818ef4d8da90e|SEO-goog:14102022|SEO-goog:14102022|SEO-goog:14102022"; WZRK_G=614a78846600456389366be3d8b8d66a; _fbp=fb.1.1665762985650.1650104683; G_ENABLED_IDPS=google; __gads=ID=e6fa942a741b6b61:T=1665763034:S=ALNI_Ma6RWFZnNnPPQhLtRlzFVfQS-Ui7Q; __cf_bm=_rCKROdWx4cUSThigUGyExkr5O2KPFGq1.ULe0rBLeQ-1665850650-0-AU0dBV4cG+AqjGEfTssifLDSm+QVXYLCCvUPKDS56wvXv5OrsfC5JhLVJNoctPYsPER1kYxlHSkJl2juJ3RCfu4=; _gid=GA1.2.1145748014.1665850649; _ztap=1; ixiUsrLocale=urgn=-:ucnc=-:ucty=-:uctz=-:cnc=IN:cc=INR:lng=en; _uetsid=dd64e5504ca411edaf80d364ea857e5c; _uetvid=c1e410f04bd811ed8bdc495f562adab7; __gpi=UID=00000b619c6f1fdc:T=1665763034:RT=1665850680:S=ALNI_MZRJcaDx_9T92FqVx5pMTPTGXkh9w; availabilitySession=eyJhbGciOiJIUzI1NiJ9.eyJzZWFyY2giOnsiZGVzdGluYXRpb25Db2RlIjoiQURJIiwidHJhdmVsRGF0ZSI6IjE1MTAyMDIyIiwib3JpZ2luQ29kZSI6Ik5ETFMifSwiaWF0IjoxNjY1ODUwNjgyLCJleHAiOjE2NjU4NTQyODJ9.tXxgX4ag6_b8aOWlY6HfAOP3a92s9KMl5joCRgADkW4; _ga=GA1.2.182733988.1665762985; _gat_UA-949229-1=1; _ga_LJX9T6MDKX=GS1.1.1665850649.2.1.1665850871.60.0.0; WZRK_S_R5Z-849-WZ4Z=%7B%22p%22%3A3%2C%22s%22%3A1665850652%2C%22t%22%3A1665850871%7D; __cf_bm=BD4ORU1wLyPjTPy8BQfQe7YcNlGJtmw6SFVEZzRm58E-1665851053-0-AW/l8psc+cTuoCaeaSSQFFpiz6ApgAkAu/PbXCrTLqDHQYjGBY3KYJVANZrrH452DUmKb8WprgC1xGMTtqHM9+s=',
      deviceid: " c04b96f818ef4d8da90e",
      gauth:
        " 03AIIukzhO8wqYfmV8qyi32OjeTwP7ZoPzp0eoYFvXn0Fn5rY_B5pcV3cY01QUeNBOd4jl_ugFn0ATIuGWOmyJrfIvNs1H-3e7KWeD-2ZrTL1xsOOyyDpHNjWKNrrOo50QCJABxHU8ENPzt-3qfg9SZny0Vjtqx5PbCk9R13U816yFMT49i8QM7jZgVs3ynXNBmlR2fH9SBudhktgHfXt8EQoqKM9RoQMBghAPMZq4yjYVBrYaxGUt2lBQszWx5GuXX0l1gL_GOyNeSmWtWymIgG6erAVPUkkKL_0rOwEOX2-7MbVjyn1Sw1wDfg6tdKnT3b679VX60wpmKPILW0SD4u63zIqhri9C-YwRWwAHk2Q7lzUXVux3OB6fzYF9XgttxLRX0qB3gF7wON_o9QzX2DhXDDDjRWVJTrEF5SmgmxuzdtmmxhlJ2s11G5OuIvWUFTWe9tcxsLx9DxNgA-6pOVS2CIBv9ue0OC_LfmJYiyUSs0ziJ5qm0zt_XGIUANn0mfgrLUUSXFb7cRrn-Zrn1hmXR0DmR-aNG409doLciO8ndOe_L-_yEqgkdz2nn68dh6gM7cZTIYJRmr5EbGFHTEDFJHwVvyXDoA",
      ixisrc: " ixiweb",
      pwaversion: " 1",
      referer:
        " https://www.ixigo.com/search/result/train/NDLS/ADI/20102022//1/0/0/0/ALL",
      "sec-ch-ua":
        ' "Chromium";v="106", "Google Chrome";v="106", "Not;A=Brand";v="99"',
      "sec-ch-ua-mobile": " ?0",
      "sec-ch-ua-platform": ' "Windows"',
      "sec-fetch-dest": " empty",
      "sec-fetch-mode": " cors",
      "sec-fetch-site": " same-origin",
      "user-agent":
        " Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36",
      uuid: " c04b96f818ef4d8da90e",
      "x-requested-with": " XMLHttpRequest",
    },
  };

  const rawres = await axios(config);
  console.log(rawres);
  return rawres;
}

router.get("/fare/train", async function (req, res, next) {
  const train = await trainFare(req);
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
  const trainData = JSON.stringify(train, getCircularReplacer());
  const trains = await JSON.parse(trainData);
  const highestFare = {};
  const lowestFare = {};
  let maxPrice = 0;
  let minPrice = 1000000;
  const trainLists = trains.data.data.trainsBetweenStations;
  const dataArr = [];

  trainLists.map((train) => {
    Object.values(train.fares).map((fare) => {
      if (fare.baseFare > maxPrice) {
        maxPrice = fare.baseFare;
        highestFare.price = maxPrice;
        highestFare.name = train.attributes.localName;
        highestFare.trainNumber = train.attributes.number;
        highestFare.boardStation = train.boardStation;
        highestFare.deboardStation = train.deboardStation;
        highestFare.departDate = train.departDate;
        highestFare.arrivalDate = train.arrivalDate;
        highestFare.departTime = train.attributes.departTime;
        highestFare.arrivalTime = train.attributes.arrivalTime;
      }
      if (fare.baseFare < minPrice) {
        minPrice = fare.baseFare;
        lowestFare.price = minPrice;
        lowestFare.name = train.attributes.localName;
        lowestFare.trainNumber = train.attributes.number;
        lowestFare.boardStation = train.boardStation;
        lowestFare.deboardStation = train.deboardStation;
        lowestFare.departDate = train.departDate;
        lowestFare.arrivalDate = train.arrivalDate;
        lowestFare.departTime = train.attributes.departTime;
        lowestFare.arrivalTime = train.attributes.arrivalTime;
      }
    });
  });
  //
  res.json({
    cheap: lowestFare,
    expensive: highestFare,
    link: `https://www.ixigo.com/trains/v1/search/between/${req.query.src}/${req.query.dest}?date=${req.query.date}&languageCode=en`,
  });
  //   res.send(trainLists);
});

module.exports = router;
