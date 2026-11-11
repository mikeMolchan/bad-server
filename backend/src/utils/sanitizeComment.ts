import sanitizeHtml from 'sanitize-html'

export default function sanitizeComment(html: string) {
    return sanitizeHtml(html, {
        allowedTags: [
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
        allowedAttributes: { a: ['href', 'rel', 'target'] },
        allowedSchemes: ['http', 'https', 'mailto'],
        transformTags: {
            a: sanitizeHtml.simpleTransform('a', {
                rel: 'noopener noreferrer',
                target: '_blank',
            }),
        },
    })
}
