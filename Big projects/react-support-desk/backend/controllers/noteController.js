const asyncHandler = require('express-async-handler')

const User = require('../models/userModel');
const Ticket = require('../models/ticketModel');
const Note = require('../models/noteModel');

// @desc    Get notes for a ticket
// @route   GET /api/tickets/:ticketId/notes
// @access  Private
const getNotes = asyncHandler( async (req, res) => {
// Get user from JWT
    // const user = await User.findById(req.user.id)

    // if(!user) {
    //     res.status(401)
    //     throw new Error('User not found')
    // }

    const ticket = await Ticket.findById(req.params.ticketId);

    // if(ticket.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('User not authorized.')
    // }

    const notes = await Note.find({ticket: req.params.ticketId}).populate("user");

    res.status(200).json(notes)
})

// @desc Create a ticket note
// @route POST /api/tickets/:ticketId/notes
// @access Private
const addUserNote = asyncHandler( async (req, res) => {
    const user = await User.findById(req.user.id)

    if(!user) {
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.findById(req.params.ticketId)

    // if(ticket.user.toString() !== req.user.id) {
    //     res.status(401)
    //     throw new Error('User not authorised.')
    // }

    let note = await Note.create({
        text: req.body.text,
        isStaff: false,
        ticket: req.params.ticketId,
        user: req.user.id
    });

    note = await note.populate("user");

    res.status(200).json(note)
})
module.exports = {getNotes, addUserNote}