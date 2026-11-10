type UserUpdate = { name?: string; phone?: string; email?: string }

export default function pickUserUpdate(body: UserUpdate) {
    const { name, phone, email } = body
    return Object.fromEntries(
        Object.entries({ name, phone, email }).filter(
            ([, value]) => value !== undefined
        )
    )
}
