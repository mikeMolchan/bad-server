import { NextFunction, Request, Response } from 'express'

export default function serveStatic(baseDir: string) {
    return (req: Request, res: Response, next: NextFunction) => {
        if (
            (req.method !== 'GET' && req.method !== 'HEAD') ||
            /^\/temp(\/|$)/i.test(req.path)
        ) {
            return next()
        }
        return res.sendFile(
            req.path,
            { root: baseDir, dotfiles: 'deny', maxAge: '1d' },
            (error) => {
                if (!error || res.headersSent) {
                    return
                }
                const { status } = error as { status?: number }
                if (status === 403 || status === 404) {
                    next()
                } else {
                    next(error)
                }
            }
        )
    }
}
