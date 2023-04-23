const express = require("express")
const {verifyAdmin} = require("../middleware/auth");
const {addHotel, updateHotel} = require("../controllers/hotelsController");
const router = express.Router();

router.post("/", verifyAdmin, addHotel);
router.put("/", verifyAdmin, updateHotel);

module.exports = router;