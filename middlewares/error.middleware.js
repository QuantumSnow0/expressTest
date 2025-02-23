export const errorMiddleware = (err, req, res, next) => {
    try {
        // Copy the error object
        let error = { ...err };
        error.message = err.message;

        console.error(error); // Logs the error to the console

        // Handle Mongoose bad ObjectId error
        if (err.name === "CastError") {
            const message = `Resource not found`;
            error = new Error(message);
            error.statusCode = 404;
        }

        // Handle Duplicate Key error (Mongoose)
        if (err.code === 11000) {
            const message = `Duplicate ${Object.keys(error.keyValue)} entered`;
            error = new Error(message);
            error.statusCode = 400;
        }

        // Handle Validation Errors (Mongoose)
        if (err.name === "ValidationError") {
            const message = Object.values(err.errors).map(val => val.message).join(", ");
            error = new Error(message);
            error.statusCode = 400;
        }

        // Send the error response
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.message || "Server Error"
        });
    } catch (error) {
        // If this middleware fails, pass error to default Express handler
        next(error);
    }
};
