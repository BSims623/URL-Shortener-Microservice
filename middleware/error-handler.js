const { CustomApiError } = require('../errors')
const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = (err, req, res, next) => {
    if (err instanceof CustomApiError) {
        return res.json({ error: err.message })
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong, please try again later.' })
}

module.exports = errorHandlerMiddleware