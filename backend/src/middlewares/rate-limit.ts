import rateLimit from 'express-rate-limit'

export default rateLimit({
    windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS) || 10000,
    limit: Number(process.env.RATE_LIMIT_MAX) || 30,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: { message: 'Слишком много запросов, попробуйте позже' },
})
