import { NextFunction, Request, Response } from 'express'
import { unlink } from 'fs/promises'
import { constants } from 'http2'
import { basename } from 'path'
import sharp from 'sharp'
import BadRequestError from '../errors/bad-request-error'
import { MIN_FILE_SIZE } from '../middlewares/file'

const allowedFormats = ['png', 'jpeg', 'gif']

export const uploadFile = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (!req.file) {
        return next(new BadRequestError('Файл не загружен'))
    }
    const { path, size, filename, originalname } = req.file
    try {
        if (size < MIN_FILE_SIZE) {
            throw new BadRequestError('Файл слишком мал')
        }
        const metadata = await sharp(path).metadata()
        if (
            !metadata.format ||
            !allowedFormats.includes(metadata.format) ||
            !metadata.width ||
            !metadata.height
        ) {
            throw new BadRequestError('Файл не является изображением')
        }
        const fileName = process.env.UPLOAD_PATH
            ? `/${process.env.UPLOAD_PATH}/${filename}`
            : `/${filename}`
        return res.status(constants.HTTP_STATUS_CREATED).send({
            fileName,
            originalName: basename(originalname),
        })
    } catch (error) {
        await unlink(path).catch(() => undefined)
        return next(
            error instanceof BadRequestError
                ? error
                : new BadRequestError('Файл не является изображением')
        )
    }
}

export default {}
