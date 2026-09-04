import { assertEquals, assertExists } from '@std/assert'
import { tryFn } from '@/libs/result/index.ts'

const testUser = {
  username: `user${Math.random().toString(36).substring(7)}`,
  password: "StrongPassword123!"
}

Deno.test({
  name: "API Users - Register and Login Flow",
  async fn(t) {
    const hostname = Deno.env.get('host') || 'localhost'
    const port = Number(Deno.env.get('port')) || 3000
    const baseUrl = `http://${hostname}:${port}`

    await t.step("POST /users/register - should register a user successfully", async () => {
      const res = await fetch(`${baseUrl}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testUser)
      })

      assertEquals(res.status, 201)
      const data = await res.json()
      assertExists(data)
    })

    await t.step("POST /users/register - should fail Zod validation with invalid data", async () => {
      const res = await fetch(`${baseUrl}/users/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: "ab",
          password: "123"
        })
      })

      assertEquals(res.status, 400)
    })

    await t.step("POST /users/login - should authenticate and return a string token", async () => {
      const res = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(testUser)
      })

      const body = await res.json()

      assertEquals(res.status, 200, `Login failed. Body: ${JSON.stringify(body, null, 2)}`)
      
      assertExists(body.token)
      assertEquals(typeof body.token, "string")
    })

    await t.step("POST /users/login - should fail with incorrect credentials", async () => {
      const res = await fetch(`${baseUrl}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: testUser.username,
          password: "WrongPassword"
        })
      })

      const body = await res.text()
      console.log("Status:", res.status, "Body:", body)

      assertEquals(res.status >= 400, true)
    })
  }
})