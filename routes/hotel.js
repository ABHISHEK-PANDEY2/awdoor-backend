const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const Hotel = require("../model/hotel");
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

router.get("/fare/hotel", async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ location: `${req.query.dest}` });
    console.log(hotel);
    hotel.hotelData.map((hotelData) => {
      if (hotelData.stars == req.query.stars) {
        res.json({
          price: Math.floor(Math.random() * 100) + hotelData.price,
        });
      }
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
