import ApiError from "../exceptions/apiError.js"

export default function (err, req, res, next) {
    if (process.env.ENABLE_ERRORS_LOG === 'true' && !err.status === 401) {
        console.log(err)
    }

    if(err instanceof ApiError) {
        return res.status(err.status).json({ message: err.message, errors: err.errors })
    }

    return res.status(500).json({ message: 'Непредвиденная ошибка' })
}