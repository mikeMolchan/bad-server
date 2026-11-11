export default function getPagination(
    query: { page?: unknown; limit?: unknown },
    defaultLimit = 10,
    maxLimit = 10
) {
    const page = Math.max(1, Math.floor(Number(query.page)) || 1)
    const limit = Math.min(
        maxLimit,
        Math.max(1, Math.floor(Number(query.limit)) || defaultLimit)
    )
    return { page, limit, skip: (page - 1) * limit }
}
