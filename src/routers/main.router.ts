import { Hono } from 'hono'
import { userRouter } from './users.router.ts'
import { packagesRouter } from './packages/packages.router.ts'

export const mainRouter = new Hono()

mainRouter.route('/users', userRouter)
mainRouter.route('/packages', packagesRouter)