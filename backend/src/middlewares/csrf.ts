import { doubleCsrf } from 'csrf-csrf'
import { CSRF_SECRET, REFRESH_TOKEN } from '../config'

export const { doubleCsrfProtection, generateCsrfToken } = doubleCsrf({
    getSecret: () => CSRF_SECRET,
    getSessionIdentifier: (req) =>
        req.cookies?.[REFRESH_TOKEN.cookie.name] ?? '',
    cookieName: '_csrf',
    cookieOptions: {
        sameSite: 'strict',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        path: '/',
    },
    getCsrfTokenFromRequest: (req) => req.headers['x-csrf-token'],
})
