const express = require("express");
const router = express.Router();
const {createHotel, updateHotel, deleteHotel,
    getHotel, getAllHotels} = require("../controllers/hotels")
const {verifyAdmin} = require('../middleware/auth');

router.route("/")
    .post(verifyAdmin, createHotel)
    .get(getAllHotels);

router.route("/:id")
    .put(verifyAdmin, updateHotel)
    .delete(verifyAdmin, deleteHotel)
    .get(getHotel);

module.exports = router;