const mongoose = require('mongoose')

const File = new mongoose.Schema({
    path: {
        type: String,
        required: true
    },

    originalName: {
        type: String,
        required: true
    },

    password: String,

    downloadCount: {
        type: Number,
        required: true,
        default: 0
    }
})

// Create a tabel called file with the
// File interface which was described above
module.exports = mongoose.model("File", File)