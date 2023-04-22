const express = require("express");
const {addReview} = require("../controllers/reviewsController");
const {verifyOnlyUser} = require("../middleware/auth");
const router = express.Router();

router.route("/")
    .post(verifyOnlyUser, addReview)

module.exports = router;