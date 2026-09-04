import { drizzle as drizzleSqlite } from 'drizzle-orm/libsql'
import { createClient } from '@libsql/client'
import * as sqliteSchema from '../schemas/sqlite/index.ts'

const client = createClient({ url: 'file:../development/local.db' })

export const schema = sqliteSchema
export const db = drizzleSqlite(client, { schema: sqliteSchema })