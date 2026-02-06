import fs from 'fs'
import path from 'path'
import ApiError from '../../exceptions/ApiError.js'
import type { NextFunction, Request, Response } from 'express'

class uploadsController {
  getGallery = (req: Request, res: Response, next: NextFunction) => {
    try {
      const { page } = req.params

      if (!page) {
        throw ApiError.BadRequest('Страница не выбрана')
      }

      const dirPath = path.join(
        process.cwd(),
        `uploads/gallery/${String(page)}`
      )

      fs.readdir(dirPath, (err, files) => {
        if (err) {
          throw ApiError.InternalError('Не удалось прочитать папку')
        }

        const images = files.map(
          (file) => `/uploads/gallery/${String(page)}/${file}`
        )

        return res.json(images)
      })
    } catch (e) {
      next(e)
    }
  }
}

export default new uploadsController()
