import { eq } from 'drizzle-orm'
import { type Result, ok, error } from '@/libs/result/index.ts'
import { hash } from '@/libs/crypto/index.ts'
import { db, schema } from '@/database/index.ts'
import  type { Credentials } from '@/types/users.types.ts'

type RegisterParams = Credentials
export async function register({ username, password }: RegisterParams): Promise<Result> {
    try {
        const hashed = await hash(password)

        const [credentials] = await db.select().from(schema.credentials).where(eq(schema.credentials.username, username)).limit(1)
        if (credentials !== undefined) return error('That username is taken already.')

        const [{ id }] = await db.insert(schema.users).values({}).returning({ id: schema.users.id })
        
        await db.insert(schema.credentials).values({ userId: id, username, key: hashed })
        return ok()
    } catch(e) {
        const message = e instanceof Error ? e.message : undefined
        return error(message)
    }
}

type LoginParams = Credentials
export async function login({ username, password }: LoginParams): Promise<Result<string>> {
    try {
        const hashed = await hash(password)

        const [credentials] = await db.select().from(schema.credentials).where(eq(schema.credentials.username, username)).limit(1)
        if (credentials == undefined) return error('There is no user with that username.')
        if (credentials.key !== hashed) return error('The pasword is incorrect.')

        const token = `${username}:${password}`
        return ok(token)
    } catch(e) {
        const message = e instanceof Error ? e.message : undefined
        return error(message)
    }
}