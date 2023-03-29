class ErrorResponse extends Error {
    constructor(message, statusCode) {
// We call the constructor of the Error
        super(message);
        this.statusCode = statusCode
    } 
}

module.exports = ErrorResponse;