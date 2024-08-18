const express = require('express');
const router = express.Router({mergeParams: true})
const {getNotes, addUserNote} = require('../controllers/noteController')
const {protect} = require('../middleware/authMiddleware')

router.route('/').get(getNotes).post(protect, addUserNote)

module.exports = router