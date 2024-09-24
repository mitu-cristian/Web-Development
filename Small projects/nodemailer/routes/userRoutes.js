const express = require("express");
const router = express.Router();
const {registerUser, loginUser, verifyRegisterEmailLink, sendChangePasswordEmail, verifyChangePasswordEmailLink} = require("../controllers/userController");
const {protect} = require("../middleware/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-register-link/:userId/:uniqueString", verifyRegisterEmailLink);
router.post("/change-password-email", sendChangePasswordEmail);
router.get("/verify-change-password-link/:userId/:uniqueString", verifyChangePasswordEmailLink);

module.exports = router;