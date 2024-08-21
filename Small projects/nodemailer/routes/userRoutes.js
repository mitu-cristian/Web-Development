const express = require("express");
const router = express.Router();
const {registerUser, loginUser, verifyEmailLink} = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/verify/:userId/:uniqueString", verifyEmailLink)

module.exports = router;