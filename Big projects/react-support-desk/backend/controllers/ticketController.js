const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')

// @desc    Get all tickets
// @route   GET     /api/tickets
// @access  Public
const getAllTickets = asyncHandler(async (req, res) => {
    const tickets = await Ticket.find().populate("user");
    res.status(200).json(tickets);
})

// @desc    Retrieve the most recent 3 tickets
// @route   GET     /api/tickets/summary
// @access  Public
const getTicketsSummary = asyncHandler(async (req, res) => {
    const recentNewTickets = await Ticket.find({status: "new"}).sort({updatedAt: -1}).limit(3).populate("user");
    const recentClosedTickets = await Ticket.find({status: "closed"}).sort({updatedAt: -1}).limit(3).populate("user");
    res.status(200).json({recentNewTickets, recentClosedTickets});
})

// @desc    Get user tickets
// @route   GET    /api/tickets/user
// @access  Private
const getUserTickets = asyncHandler(async (req, res) => {
// We have acces to req.user from the auth middleware

// Get user using the id in JWT
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401);
        throw new Error('User not found');
    }

    const tickets = await Ticket.find({user: req.user.id}).sort({updatedAt: -1});
    res.status(200).json(tickets)
})

// @desc    Get user ticket
// @route   GET /api/tickets/:id
// @access  Private
const getTicket = asyncHandler(async (req, res) => {
// Get user using the id in the JWT

    // const user = await User.findById(req.user.id)

    // if(!user) {
    //     res.status(401);
    //     throw new Error('User not found.')
    // }

    const ticket = await Ticket.findById(req.params.id).populate("user");
    if(!ticket) {
        res.status(404);
        throw new Error("Ticket not found");
    }

    // if(ticket.user.toString() !== req.user.id) {
    //     res.status(401);
    //     throw new Error('Not Authorised');
    // }

    res.status(200).json(ticket)
})

// @desc    Create new ticket
// @route   POST    /api/tickets
// @access  Private
const createTicket = asyncHandler(async (req, res) => {
    const {product, description} = req.body;
    if(!product || !description) {
        res.status(400);
        throw new Error('Please add a product and a description.')
    }

// Get user using the id in the JWT
    const user = await User.findById(req.user.id);
    if(!user) {
        res.status(401)
        throw new Error('User not found');
    }

    const ticket = await Ticket.create({
        product,
        description,
        user: req.user.id,
        status: 'new'
    })
    res.status(201).json(ticket)
})

// @desc    Delete ticket
// @route   DELETE /api/tickets/:id
// @access  Private
const deleteTicket = asyncHandler (async(req, res) => {
// Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401);
        throw new Error("User not found");
    }

    const ticket = await Ticket.findById(req.params.id)

    if(!ticket) {
        res.status(404)
        throw new Error('Ticket not found.')
    }

    if (ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorised')
    }

    await Ticket.findOneAndDelete(req.params.id)
    res.status(200).json({success: true});
})

// @desc    Update ticket
// @route   PUT /api/tickets/:id
// @access  Private
const updateTicket = asyncHandler(async (req, res) => {
// Get user using the id in the JWT
    const user = await User.findById(req.user.id)
    if(!user) {
        res.status(401);
        throw new Error('User not found.')
    } 

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket) {
        res.status(404);
        throw new Error('Ticket not found');
    }

    if(ticket.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not Authorized');
    }

    const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})
    res.status(200).json(updatedTicket)
})

module.exports = {getAllTickets, getUserTickets, createTicket, getTicket, deleteTicket, updateTicket,
    getTicketsSummary};