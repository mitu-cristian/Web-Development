const express = require("express");
const router = express.Router();
const {createHotel, updateHotel, deleteHotel,
    getHotel, getAllHotels} = require("../controllers/hotels")

router.route("/").post(createHotel).get(getAllHotels);
router.route("/:id").put(updateHotel).delete(deleteHotel).get(getHotel);

module.exports = router;