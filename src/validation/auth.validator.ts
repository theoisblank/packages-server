import { z } from 'zod'

export const authSchema = z.object({
    token: z.string().regex(
        /^[a-zA-Z0-9]+:.+$/, 
        'Must be in the format: alphanumeric:free'
    )
})