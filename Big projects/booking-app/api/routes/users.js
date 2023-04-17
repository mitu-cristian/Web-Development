const express = require("express");
const {verifyToken, verifyUser, verifyAdmin} = require('../middleware/auth');
const {updateUser, getUser, getAllUsers, deleteUser} = require('../controllers/user');

const router = express.Router();
router.get('/checkauthentication', verifyToken, (req, res, next) => {
    res.send('You are logged in.');
})
router.get('/checkuser/:id', verifyUser, (req, res, next) => {
    res.send('You are logged in and you can delete an account.')
})

router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
    res.send('Hello admin, you are logged in and you can delete all accounts.')
})

router.route('/:id')
    .get(verifyUser, getUser)
    .put(verifyUser, updateUser)
    .delete(verifyUser, deleteUser);
router.route('/').get(verifyAdmin, getAllUsers);

module.exports = router;