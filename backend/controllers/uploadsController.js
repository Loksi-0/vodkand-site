import fs from 'fs'
import path from 'path'
import ApiError from '../exceptions/ApiError.js'

class uploadsController {
    getGallery(req, res, next) {
        try {
            const { page } = req.params
            const dirPath = path.join(process.cwd(), `uploads/gallery/${page}`)

            fs.readdir(dirPath, (err, files) => {
                if (err) {
                    throw ApiError.InternalError('Не удалось прочитать папку')
                }

                const images = files
                    .map(file => `/uploads/gallery/${page}/${file}`)

                return res.json(images)
            })
        } catch(e) {
            next(e)
        }
    }
}

export default new uploadsController()