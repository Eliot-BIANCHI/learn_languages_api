import { z } from 'https://deno.land/x/zod@v3.21.4/mod.ts'

export const userSchema = z.object({
	username: z.string().min(3).max(50),
	password: z.string().min(16).max(32),
})

export type User = z.infer<typeof userSchema> & { userId: number }
