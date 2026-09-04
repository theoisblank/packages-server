import { Hono } from 'hono'
import { mainRouter } from './routers/main.router.ts'

const app = new Hono()

app.route('/', mainRouter)

export default app