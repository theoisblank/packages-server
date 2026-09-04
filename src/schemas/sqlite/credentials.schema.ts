import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core'

export const credentials = sqliteTable('credentials', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('userId').notNull().unique(),
  key: text('key').notNull(),
  username: text('username').notNull()
})