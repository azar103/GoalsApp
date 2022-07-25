
const errorHandler = (err, req, res, next) => {
    const statusCode = res.status ? res.status : 500;

    res.status(statusCode);
    res.send({
        message: err.message,
        stack: process.env.DOT_ENV === 'production' ? null : err.stack ,
    });
    
}

module.exports = {
    errorHandler
}