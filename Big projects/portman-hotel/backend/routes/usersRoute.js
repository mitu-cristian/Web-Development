const express = require("express");
const router = express.Router();
const {verifyUser, verifyAdmin} = require ("../middleware/auth");
const {registerUser, loginUser, logoutUser, updateMyUserDetails, 
    getMe, deleteMe, updateMyPassword, getAnUser, deleteAnUser} = require("../controllers/usersController")

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.put("/updatePassword", verifyUser, updateMyPassword);

router.route("/:userId")
    .get(verifyAdmin, getAnUser)
    .delete(verifyAdmin, deleteAnUser)

router.route("/")
    .put(verifyUser, updateMyUserDetails)
    .get(verifyUser, getMe)
    .delete(verifyUser, deleteMe)
module.exports = router;