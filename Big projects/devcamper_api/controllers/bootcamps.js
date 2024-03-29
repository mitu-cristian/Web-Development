const geocoder = require('../utils/geocoder')
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse')
const asyncHandler = require('../middleware/async')
const path = require('path');

// @desc    Get all bootcamps
// @route   GET /api/v1/bootcamps
// @access  Public
exports.getBootcamps = asyncHandler( async (req, res, next) => {
    
    res.status(200).json(res.advancedResults);
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
    // Add user to req.body
    req.body.user = req.user.id;

    // Check for published bootcamp
// Here we will find all the bootcamps that this user has created
    const publishedBootcamp = await Bootcamp.findOne({user: req.user.id});
// If the user is not an admin, they can only add one bootcamp
    if(publishedBootcamp && req.user.role !== 'admin') {
        return next( new ErrorResponse(`The user with ID ${req.user.id} has 
        already published a bootcamp`, 400));
    }

    const bootcamp = await Bootcamp.create(req.body);
    res.status(201).json({success: true, data: bootcamp})
})

// @desc    Update a bootcamp
// @route   PUT /api/v1/bootcamps/:id
// @access  Public
exports.updateBootcamp = asyncHandler (async (req, res, next) => {
// Make sure user is the bootcamp owner
    const bootcamp = await Bootcamp.findById(req.params.id)
    if(!bootcamp) 
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404))
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin')
        return next(new ErrorResponse(`This user is not authorised to update the bootcamp ${bootcamp._id}`, 401))
    const Updbootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, {
// To return the updated object
        new: true})
        
    res.status(200).json({success: true, data: Updbootcamp})    
})

// @desc    Delete a bootcamp
// @route   DELETE /api/v1/bootcamps/:id
// @access  Public
exports.deleteBootcamp = asyncHandler (async (req, res, next) => {
    const bootcamp = await Bootcamp.findById(req.params.id);
    if(!bootcamp)
        return next(new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404));
    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin')
        return next(new ErrorResponse(`This user is not authorised to delete the bootcamp ${req.params.id}`, 401));
    const deletedBootcamp = await Bootcamp.findById(req.params.id)
    
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

    if(bootcamp.user.toString() !== req.user.id && req.user.role !== 'admin')
        return next(new ErrorResponse(`This user is not authorised to update the bootcamp ${bootcamp._id}`, 401))

    if(!req.files)
        return next( new ErrorResponse('Please upload a file', 400))
    
    const file = req.files.file;
// Make sure that the file is an image
    if(!file.mimetype.startsWith('image'))
        return next (new ErrorResponse('Please upload an image', 400))

// Check filesize
    if(file.size > process.env.MAX_FILE_UPLOAD)
        return next (new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400))
    
// Create custom filename
    file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
    file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async error => {
        if(error) {
            console.error(error);
            return next (new ErrorResponse(`Problem with file upload`, 500));
        }

    await Bootcamp.findByIdAndUpdate(req.params.id, {photo: file.name});
    res.status(200).json({
        sucess: true,
        data: file.name
    })
    })
})