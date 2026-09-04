import { z } from 'zod'

export const registerSchema = z.object(({
    username: z.string().min(3, 'Username must be 3 characters length atleast'),
    password: z.string().min(12, 'Password must be 12 characters length atleast'),
}))

export const loginSchema = z.object({
    username: z.string()
        .min(3, 'Username must be 3 characters length atleast')
        .regex(/^[a-zA-Z0-9]+$/, 'Username must be alphanumeric'),
    password: z.string()
        .min(12, 'Password must be 12 characters length atleast')
})