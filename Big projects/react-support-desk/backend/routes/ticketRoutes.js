const express = require('express')
const router = express.Router()
const {protect} = require('../middleware/authMiddleware')

const noteRouter = require('./noteRoutes')
router.use('/:ticketId/notes', noteRouter)

const {getAllTickets, getTicketsSummary, getUserTickets, createTicket, getTicket,
    deleteTicket, updateTicket} = require('../controllers/ticketController')

router.route("/").get(getAllTickets);
router.route("/summary").get(getTicketsSummary);
router.route('/user').get(protect, getUserTickets);
router.route("/").post(protect, createTicket);
router.route('/:id').get(getTicket).delete(protect, deleteTicket).put(protect, updateTicket);

module.exports = router; 