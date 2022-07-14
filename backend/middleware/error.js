const ErrorHandler = require("../utils/errorhandler");

module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //wrong mongodb id error
    if(err.name === "CastError"){
        const message = `Resourse not found. Inavalid: ${err.path}`;
        err = new ErrorHandler(message, 400);
    }

    //mongoose duplicate error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400);
    }

    //wrong JWT error
    if(err.code === "JsonWebTokenError"){
        const message = `Json Web Token is invalid, try again`;
        err = new ErrorHandler(message, 400);
    }

    //JWT expire error
    if(err.code === "TokenExpiredError"){
        const message = `Json Web Token is Expired, try again`;
        err = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
        success: false,
        message: err.message,
    });
};