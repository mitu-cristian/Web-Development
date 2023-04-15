const express = require("express");
const {updateUser, getUser, getAllUsers} = require('../controllers/user');

const router = express.Router();
router.route('/:id').get(getUser).put(updateUser);
router.route('/').get(getAllUsers);

module.exports = router;