const geocoder = require('../utils/geocoder')
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const path = require('path');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    let query;
// reqQuery is a copy of req.query
    const reqQuery = {...req.query}

// Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

// Loop over removeFields and delete them from reqQuery
    removeFields.forEach(param => delete reqQuery[param]);

// Create a query string
    let queryStr = JSON.stringify(reqQuery)
    
// Create operators like ($gt, $gte etc) 
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`)
    
// Finding the resource
    query = Bootcamp.find(JSON.parse(queryStr)).populate('courses')

// Select fields
    if(req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields)
    }

// Sort
    if(req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy)
    }
    else {
        query = query.sort('-createdAt')
    }

// Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Bootcamp.countDocuments();

    query = query.skip(startIndex).limit(limit)

// Execute query 
    const bootcamps = await query;
// Pagination result
    const pagination = {}
    if(endIndex < total) {
        pagination.next = {
            page: page + 1,
            limit
        }
    }
    if(startIndex > 0) {
        pagination.prev = {
            page: page - 1,
            limit
        }
    }
    res.status(200).json({success: true, count: bootcamps.length,
            pagination,data: bootcamps})
})

// @desc    Get a single bootcamps
// @route   GET /api/v1/bootcamps/:id
// @access  Public
exports.getBootcamp = asyncHandler (async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp) 
        return next(new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`, 404))
    res.status(200).json({success: true, data: bootcamp})
})

// @desc    Create a bootcamp
// @route   POST /api/v1/bootcamps
// @access  Private
exports.createBootcamp = asyncHandler (async (req, res, next) => {
    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({success: true, data: bootcamp})
})

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamp = asyncHandler (async (req, res, next) => {
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
// To return the updated object
        new: true
    })
    if(!bootcamp) 
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    res.status(200).json({success: true, data: bootcamp})    
})

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Public
exports.deleteBootcamp = asyncHandler (async (req, res, next) => {
    const deletedBootcamp = await Bootcamp.findById(req.params.id)
    if(!deletedBootcamp)
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    deletedBootcamp.deleteOne();
    res.status(201).json({success: true, data: {}})
})

// @desc    Get bootcamps within a radius
// @route   GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access  Private
exports.getBootcampsInRadius = asyncHandler(async (req, res, next) => {
    const {zipcode, distance} = req.params;

// Get lat/lang from geocoder
    const loc = await geocoder.geocode(zipcode);
    const lat = loc[0].latitude;
    const lng = loc[0].longitude;

// Calculate the radius using radians
// Divide distance by radius of Earth
// Earth Radius = 3.963 miles
    const radius = distance / 3963;
    const bootcamps = await Bootcamp.find({
        location: { $geoWithin: {$centerSphere: [[lng, lat], radius]} } 
})
    res.status(200).json({
        success: true,
        count: bootcamps.length,
        data: bootcamps
    })
})

// @desc    Upload photo for bootcamp
// @route   PUT /api/v1/bootcamps/:id/photo
// @access  Private
exports.bootcampPhotoUpload = asyncHandler ( async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);

    if(!bootcamp) 
        return next( new ErrorResponse(`Bootcamp not found with the id of ${req.params.id}`, 404));

    if(!req.files)
        return next( new ErrorResponse('Please upload a file'), 400)
    
    const file = req.files.file;
// Make sure that the file is an image
    if(!file.mimetype.startsWith('image'))
        return next (new ErrorResponse('Please upload an image'), 400)

// Check filesize
    if(file.size > process.env.MAX_FILE_UPLOAD)
        return next (new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`), 400)
    
// Create custom filename
    file.name = `photo_${bootcamp._id}`;
    console.log(file.name)
})