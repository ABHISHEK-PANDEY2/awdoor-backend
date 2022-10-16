const mongoose = require("mongoose");
const hotelSchema = new mongoose.Schema({
  location: String,
  hotelData: [
    {
      price: Number,
      stars: Number,
    },
  ],
});

const Hotel = new mongoose.model("Hotel", hotelSchema);

module.exports = Hotel;
