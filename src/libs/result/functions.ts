import { Result } from './index.ts'

export function ok<T >(value: T = undefined as unknown as T): Result<T> {
    return { value }
}

export function error<T = undefined>(message?: string): Result<T> {
    return { error: true, message }
}

export function tryFn<T>(fn: ()=>T): Result<T> {
    try {
        return ok(fn())
    } catch (e) {
        if (e instanceof Error) {
            return error(e.message)
        }
        return error()
    }
}