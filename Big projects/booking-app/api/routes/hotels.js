const express = require("express");
const router = express.Router();
const {createHotel, updateHotel, deleteHotel,
    getHotel, getAllHotels, countByCity,
    countByType, getHotelRooms} = require("../controllers/hotels")
const {verifyAdmin} = require('../middleware/auth');

router.route("/")
    .post(verifyAdmin, createHotel)
    .get(getAllHotels);

    
router.route("/find/:id")
    .put(verifyAdmin, updateHotel)
    .delete(verifyAdmin, deleteHotel)
    .get(getHotel);
    
    
router.get('/countByCity', countByCity);
router.get('/countByType', countByType);
router.get('/room/:hotelId', getHotelRooms);

module.exports = router;