import DOMPurify from 'dompurify'

export const sanitizeComment = (html: string) =>
    DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
            'b',
            'i',
            'u',
            's',
            'strong',
            'em',
            'p',
            'div',
            'span',
            'br',
            'ul',
            'ol',
            'li',
            'a',
        ],
        ALLOWED_ATTR: ['href', 'rel', 'target'],
    })
