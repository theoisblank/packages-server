import { Hono } from 'hono'
import { z } from 'zod'
import { registerSchema, loginSchema } from "@/validation/user.validator.ts"
import * as UsersController from '@/controllers/users.controller.ts'

export const userRouter = new Hono()

userRouter.post('/register', async (context) => {
    const body = await context.req.json()
    const validationResult = registerSchema.safeParse(body)

    if (!validationResult.success) return context.json({ 
        error: "Invalid request.", 
        details: z.treeifyError(validationResult.error)
    }, 400)

    const registerResult = await UsersController.register(validationResult.data)
    if (registerResult.error) return context.json({ 
        error: registerResult.message
    }, 400)

    return context.text('You have registered succesfully.', 201)
})

userRouter.post('/login', async (context) => {
    const body = await context.req.json()
    const validationResult = loginSchema.safeParse(body)

    if (!validationResult.success) return context.json({ 
        error: "Invalid request.", 
        details: z.treeifyError(validationResult.error)
    }, 400)

    const loginResult = await UsersController.login(validationResult.data)
    if (loginResult.error) return context.json({ 
        error: loginResult.message
    }, 400)

    return context.json({ token: loginResult.value }, 200)
})