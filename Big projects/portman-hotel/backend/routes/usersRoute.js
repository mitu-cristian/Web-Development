const express = require("express");
const router = express.Router();
const {verifyUser} = require ("../middleware/auth");
const {registerUser, loginUser, logoutUser, updateMyUser, getMe, deleteMe} = require("../controllers/usersController")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);

router.route("/")
    .put(verifyUser, updateMyUser)
    .get(verifyUser, getMe)
    .delete(verifyUser, deleteMe)
module.exports = router;