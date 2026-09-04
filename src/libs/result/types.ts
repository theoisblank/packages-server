export type Result<T = undefined> =
    | { value: T; error?: never; message?: never }
    | { value?: never; error: true; message?: string }