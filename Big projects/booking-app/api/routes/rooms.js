const express = require("express");
const {createRoom, updateRoom, deleteRoom,
    getSingleRoom, getAllRooms, updateRoomAvailability} = require('../controllers/rooms');
const {verifyAdmin} = require('../middleware/auth');

const router = express.Router();

router.route('/').get(getAllRooms);

router.route('/:id')
    .post(verifyAdmin, createRoom)
    .put(verifyAdmin, updateRoom)
    .get(getSingleRoom);

router.delete('/:roomId/:hotelId', verifyAdmin, deleteRoom);
router.put('/availability/:id', updateRoomAvailability)

module.exports = router;