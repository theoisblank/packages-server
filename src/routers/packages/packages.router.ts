import { Hono } from 'hono'
import { searchRouter } from './search.router.ts'
import { storageRouter } from './storage.router.ts'

export const packagesRouter = new Hono()

packagesRouter.route('/search', searchRouter)
packagesRouter.route('/storage', storageRouter)